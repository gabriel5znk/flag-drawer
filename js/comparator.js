/**
 * Algoritmo de contraste y scoring pixel a pixel
 * Soporta Modo Normal (con perdón/máscara de escudos) y Modo Experto (con escudo obligatorio).
 */

export const DEFAULT_THRESHOLD = 45; // Tolerancia perfecta (distancia RGB donde aún es 100%)
export const MAX_COLOR_TOLERANCE = 135; // Límite máximo permisivo (por encima es 0%)

/**
 * Devuelve la calificación cualitativa, medalla y mensaje de retroalimentación
 * según el porcentaje obtenido.
 */
export function getGradeInfo(score) {
  if (score >= 90) {
    return {
      grade: 'S',
      badge: 'Grade S',
      color: '#10b981', // Emerald green
      feedback: 'Perfect! Spot on.',
      isPass: true
    };
  } else if (score >= 70) {
    return {
      grade: 'B',
      badge: 'Grade B',
      color: '#3b82f6', // Blue
      feedback: 'Clearly recognisable, one element is off.',
      isPass: true
    };
  } else if (score >= 40) {
    return {
      grade: 'C',
      badge: 'Grade C',
      color: '#f59e0b', // Amber
      feedback: 'Good effort, but needs work.',
      isPass: false
    };
  } else {
    return {
      grade: 'F',
      badge: 'Grade F',
      color: '#ef4444', // Red
      feedback: 'Not quite, try practicing this one.',
      isPass: false
    };
  }
}

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Carga una imagen de bandera en un lienzo fuera de pantalla (Offscreen Canvas)
 * normalizado a la resolución estándar (300 x 200).
 */
export function renderTargetFlag(flagUrl, width = 300, height = 200) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    if (window.location && window.location.protocol.startsWith('http')) {
      img.crossOrigin = 'Anonymous';
    }

    img.onload = () => {
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
      const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

      // Fondo blanco por defecto para normalizar transparencias
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Dibujar la imagen escalada al lienzo
      ctx.drawImage(img, 0, 0, width, height);
      resolve(offscreenCanvas);
    };

    img.onerror = () => {
      // Fallback sin crossOrigin
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(fallbackImg, 0, 0, width, height);
        resolve(offscreenCanvas);
      };
      fallbackImg.onerror = (err) => {
        reject(new Error(`No se pudo cargar la bandera desde ${flagUrl}`));
      };
      fallbackImg.src = flagUrl;
    };

    img.src = flagUrl;
  });
}

/**
 * Compara pixel a pixel la ilustración del usuario con la bandera original.
 * 
 * Si options.ignoreShield es true y la bandera tiene metadatos de escudo (options.shield):
 * Los píxeles dentro del área del escudo se computan como acierto si coinciden con el
 * escudo original O con el color base de la franja de fondo (shield.fill).
 * 
 * @param {HTMLCanvasElement} userCanvas
 * @param {HTMLCanvasElement} targetCanvas
 * @param {Object} options { threshold, ignoreShield, shield }
 */
export function compareCanvases(userCanvas, targetCanvas, options = {}) {
  const width = userCanvas.width;
  const height = userCanvas.height;
  const threshold = options.threshold || DEFAULT_THRESHOLD;
  const ignoreShield = Boolean(options.ignoreShield);
  const shield = options.shield || null;

  const userCtx = userCanvas.getContext('2d', { willReadFrequently: true });
  const targetCtx = targetCanvas.getContext('2d', { willReadFrequently: true });

  const userData = userCtx.getImageData(0, 0, width, height).data;
  const targetData = targetCtx.getImageData(0, 0, width, height).data;

  const totalPixels = width * height;
  let scoreSum = 0;
  let matches = 0;
  const perfectThreshold = threshold;
  const maxTolerance = options.maxTolerance || MAX_COLOR_TOLERANCE;
  const toleranceRange = Math.max(1, maxTolerance - perfectThreshold);

  // Si hay escudo que perdonar, parseamos el color base de fondo
  let shieldFillRgb = null;
  let sX1 = 0, sX2 = 0, sY1 = 0, sY2 = 0;
  if (ignoreShield && shield && shield.x && shield.y && shield.fill) {
    shieldFillRgb = hexToRgb(shield.fill);
    // Escalar coordenadas del escudo si la resolución difiere de la base 300x200
    const scaleX = width / 300;
    const scaleY = height / 200;
    sX1 = Math.round(shield.x[0] * scaleX);
    sX2 = Math.round(shield.x[1] * scaleX);
    sY1 = Math.round(shield.y[0] * scaleY);
    sY2 = Math.round(shield.y[1] * scaleY);
  }

  // Canvas para visualizar las diferencias (Mapa de calor: verde intenso -> verde tenue -> rojo)
  const diffCanvas = document.createElement('canvas');
  diffCanvas.width = width;
  diffCanvas.height = height;
  const diffCtx = diffCanvas.getContext('2d');
  const diffImageData = diffCtx.createImageData(width, height);
  const diffData = diffImageData.data;

  const t0 = performance.now();
  for (let i = 0; i < userData.length; i += 4) {
    const pixelIndex = i / 4;
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);

    const uR = userData[i];
    const uG = userData[i + 1];
    const uB = userData[i + 2];

    const tR = targetData[i];
    const tG = targetData[i + 1];
    const tB = targetData[i + 2];

    // Distancia cromática euclidiana contra la bandera original
    const dr = uR - tR;
    const dg = uG - tG;
    const db = uB - tB;
    let dist = Math.sqrt(dr * dr + dg * dg + db * db);

    // Si estamos en modo perdonar escudo y cae en la zona del escudo, usar la mejor coincidencia
    if (shieldFillRgb && x >= sX1 && x <= sX2 && y >= sY1 && y <= sY2) {
      const dFillR = uR - shieldFillRgb.r;
      const dFillG = uG - shieldFillRgb.g;
      const dFillB = uB - shieldFillRgb.b;
      const distFill = Math.sqrt(dFillR * dFillR + dFillG * dFillG + dFillB * dFillB);
      if (distFill < dist) {
        dist = distFill;
      }
    }

    let pixelScore = 0;
    if (dist <= perfectThreshold) {
      pixelScore = 1;
    } else if (dist < maxTolerance) {
      pixelScore = 1 - (dist - perfectThreshold) / toleranceRange;
    }

    scoreSum += pixelScore;
    if (pixelScore >= 0.5) {
      matches++;
    }

    // Luminancia sutil de la bandera objetivo para mantener referencia visual de la forma
    const lum = tR * 0.299 + tG * 0.587 + tB * 0.114;

    if (pixelScore > 0) {
      // Acierto: verde cuya intensidad disminuye conforme se aleja del tono objetivo
      diffData[i] = Math.round(lum * 0.12 + (1 - pixelScore) * 65);
      diffData[i + 1] = Math.min(255, Math.round(lum * 0.12 + 45 + pixelScore * 195));
      diffData[i + 2] = Math.round(lum * 0.12 + 20);
      diffData[i + 3] = 255;
    } else {
      // Fallo: rojo claro/intenso
      diffData[i] = Math.min(255, Math.round(lum * 0.12 + 215));
      diffData[i + 1] = Math.round(lum * 0.12 + 24);
      diffData[i + 2] = Math.round(lum * 0.12 + 28);
      diffData[i + 3] = 255;
    }
  }
  const calcTime = performance.now() - t0;
  diffCtx.putImageData(diffImageData, 0, 0);

  const rawScore = (scoreSum / totalPixels) * 100;
  const score = Math.round(rawScore);
  const gradeInfo = getGradeInfo(score);

  return {
    score,
    rawScore: rawScore.toFixed(1),
    matches,
    totalPixels,
    calcTimeMs: calcTime.toFixed(2),
    diffCanvas,
    ...gradeInfo
  };
}
