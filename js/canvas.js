/**
 * Motor de dibujo (Canvas)
 * Soporta Pincel, Línea Recta, Relleno por inundación (Flood Fill), Rectángulo, Círculo,
 * Modo Espejo (Simetría Vertical/Horizontal), Deshacer y Limpiar.
 * Optimizado para PointerEvents (ratón y táctil mobile-first).
 */

export class CanvasManager {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    this.width = options.width || 300;
    this.height = options.height || 200;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Overlay opcional para guías (Modo Espejo)
    this.overlayCanvas = options.overlayCanvas || null;
    this.overlayCtx = this.overlayCanvas ? this.overlayCanvas.getContext('2d') : null;
    if (this.overlayCanvas) {
      this.overlayCanvas.width = this.width;
      this.overlayCanvas.height = this.height;
    }

    // Configuración inicial de herramientas
    this.currentTool = 'brush'; // 'brush' | 'line' | 'fill' | 'rectangle' | 'circle'
    this.isLineToolActive = false;
    this.mirrorMode = null; // null | 'vertical' | 'horizontal'
    this.currentColor = '#CE1126'; // Rojo carmesí por defecto
    this.brushSize = 10;
    this.shapeMode = 'fill';

    // Historial para Undo / Redo (Límite de 25 estados)
    this.undoStack = [];
    this.redoStack = [];
    this.maxUndo = 25;

    // Estado del cursor/puntero
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.startX = 0;
    this.startY = 0;
    this.dragSnapshot = null;

    // Callbacks
    this.onStateChange = options.onStateChange || null;

    this.initCanvas();
    this.attachEvents();
  }

  setDimensions(width, height) {
    if (this.width === width && this.height === height) {
      this.clear();
      return;
    }
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;

    if (this.overlayCanvas) {
      this.overlayCanvas.width = width;
      this.overlayCanvas.height = height;
    }

    this.undoStack = [];
    this.redoStack = [];
    this.initCanvas();
    this.notifyStateChange();
  }

  initCanvas() {
    // Fondo blanco normalizado
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.saveState();
    this.renderMirrorGuide();
  }

  saveState() {
    try {
      const state = this.ctx.getImageData(0, 0, this.width, this.height);
      this.undoStack.push(state);
      if (this.undoStack.length > this.maxUndo) {
        this.undoStack.shift();
      }
      this.redoStack = [];
      this.notifyStateChange();
    } catch (e) {
      console.warn('No se pudo guardar el estado de deshacer:', e);
    }
  }

  undo() {
    if (this.undoStack.length > 1) {
      const currentState = this.undoStack.pop();
      this.redoStack.push(currentState);
      const prevState = this.undoStack[this.undoStack.length - 1];
      this.ctx.putImageData(prevState, 0, 0);
      this.notifyStateChange();
      return true;
    }
    return false;
  }

  redo() {
    if (this.redoStack.length > 0) {
      const nextState = this.redoStack.pop();
      this.undoStack.push(nextState);
      this.ctx.putImageData(nextState, 0, 0);
      this.notifyStateChange();
      return true;
    }
    return false;
  }

  canUndo() {
    return this.undoStack.length > 1;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  clear() {
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.saveState();
  }

  setTool(tool) {
    this.currentTool = tool;
    this.isLineToolActive = (tool === 'line');
    this.notifyStateChange();
  }

  setColor(color) {
    this.currentColor = color;
    this.notifyStateChange();
  }

  setSize(size) {
    this.brushSize = Math.max(2, Math.min(50, size));
    this.notifyStateChange();
  }

  /**
   * Alterna cíclicamente el Modo Espejo: Off -> Vertical -> Horizontal -> Off
   */
  cycleMirrorMode() {
    if (this.mirrorMode === null) {
      this.setMirrorMode('vertical');
    } else if (this.mirrorMode === 'vertical') {
      this.setMirrorMode('horizontal');
    } else {
      this.setMirrorMode(null);
    }
    return this.mirrorMode;
  }

  setMirrorMode(mode) {
    this.mirrorMode = mode;
    this.renderMirrorGuide();
    this.notifyStateChange();
  }

  /**
   * Lógica Matemática de Reflejo:
   * Eje Vertical (Reflejo en X): x' = width - 1 - x, y' = y
   * Eje Horizontal (Reflejo en Y): x' = x, y' = height - 1 - y
   */
  applySymmetry(x, y) {
    if (this.mirrorMode === 'vertical') {
      return { x: this.width - 1 - x, y };
    } else if (this.mirrorMode === 'horizontal') {
      return { x, y: this.height - 1 - y };
    }
    return null;
  }

  /**
   * Dibuja o limpia la línea guía punteada del modo espejo en el canvas overlay
   */
  renderMirrorGuide() {
    if (!this.overlayCtx) return;
    this.overlayCtx.clearRect(0, 0, this.width, this.height);

    if (!this.mirrorMode) return;

    this.overlayCtx.save();
    this.overlayCtx.setLineDash([4, 4]);
    this.overlayCtx.lineWidth = 1.5;
    this.overlayCtx.strokeStyle = 'rgba(59, 130, 246, 0.75)';

    if (this.mirrorMode === 'vertical') {
      const midX = Math.floor(this.width / 2);
      this.overlayCtx.beginPath();
      this.overlayCtx.moveTo(midX, 0);
      this.overlayCtx.lineTo(midX, this.height);
      this.overlayCtx.stroke();
    } else if (this.mirrorMode === 'horizontal') {
      const midY = Math.floor(this.height / 2);
      this.overlayCtx.beginPath();
      this.overlayCtx.moveTo(0, midY);
      this.overlayCtx.lineTo(this.width, midY);
      this.overlayCtx.stroke();
    }

    this.overlayCtx.restore();
  }

  notifyStateChange() {
    if (typeof this.onStateChange === 'function') {
      this.onStateChange({
        canUndo: this.canUndo(),
        canRedo: this.canRedo(),
        tool: this.currentTool,
        color: this.currentColor,
        size: this.brushSize,
        mirrorMode: this.mirrorMode,
        isLineToolActive: this.isLineToolActive
      });
    }
  }

  getCanvasCoords(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.width / rect.width;
    const scaleY = this.height / rect.height;

    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY)
    };
  }

  attachEvents() {
    this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    this.canvas.addEventListener('pointerup', (e) => this.handlePointerUp(e));
    this.canvas.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  handlePointerDown(e) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch (_) {}

    const coords = this.getCanvasCoords(e);
    this.isDrawing = true;
    this.startX = coords.x;
    this.startY = coords.y;
    this.lastX = coords.x;
    this.lastY = coords.y;

    if (this.currentTool === 'fill') {
      this.floodFill(coords.x, coords.y, this.currentColor);
      // Relleno simétrico si está activo el modo espejo
      if (this.mirrorMode) {
        const sym = this.applySymmetry(coords.x, coords.y);
        if (sym) {
          this.floodFill(sym.x, sym.y, this.currentColor);
        }
      }
      this.saveState();
      this.isDrawing = false;
    } else if (this.currentTool === 'brush') {
      // Punto inicial principal
      this.drawDot(coords.x, coords.y);
      // Punto inicial simétrico
      if (this.mirrorMode) {
        const sym = this.applySymmetry(coords.x, coords.y);
        if (sym) {
          this.drawDot(sym.x, sym.y);
        }
      }
    } else if (
      this.currentTool === 'line' ||
      this.currentTool === 'rectangle' ||
      this.currentTool === 'circle'
    ) {
      // Capturar imagen para vista previa mientras arrastra
      this.dragSnapshot = this.ctx.getImageData(0, 0, this.width, this.height);
    }
  }

  handlePointerMove(e) {
    if (!this.isDrawing) return;
    const coords = this.getCanvasCoords(e);

    if (this.currentTool === 'brush') {
      // Trazo principal
      this.drawLine(this.lastX, this.lastY, coords.x, coords.y);

      // Trazo reflejado
      if (this.mirrorMode) {
        const s0 = this.applySymmetry(this.lastX, this.lastY);
        const s1 = this.applySymmetry(coords.x, coords.y);
        if (s0 && s1) {
          this.drawLine(s0.x, s0.y, s1.x, s1.y);
        }
      }

      this.lastX = coords.x;
      this.lastY = coords.y;
    } else if (this.currentTool === 'line') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawLine(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawLine(s0.x, s0.y, s1.x, s1.y);
          }
        }
      }
    } else if (this.currentTool === 'rectangle') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawRectangle(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawRectangle(s0.x, s0.y, s1.x, s1.y);
          }
        }
      }
    } else if (this.currentTool === 'circle') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawCircle(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawCircle(s0.x, s0.y, s1.x, s1.y);
          }
        }
      }
    }
  }

  handlePointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch (_) {}

    const coords = this.getCanvasCoords(e);

    if (this.currentTool === 'line') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawLine(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawLine(s0.x, s0.y, s1.x, s1.y);
          }
        }
        this.dragSnapshot = null;
        this.saveState();
      }
    } else if (this.currentTool === 'rectangle') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawRectangle(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawRectangle(s0.x, s0.y, s1.x, s1.y);
          }
        }
        this.dragSnapshot = null;
        this.saveState();
      }
    } else if (this.currentTool === 'circle') {
      if (this.dragSnapshot) {
        this.ctx.putImageData(this.dragSnapshot, 0, 0);
        this.drawCircle(this.startX, this.startY, coords.x, coords.y);

        if (this.mirrorMode) {
          const s0 = this.applySymmetry(this.startX, this.startY);
          const s1 = this.applySymmetry(coords.x, coords.y);
          if (s0 && s1) {
            this.drawCircle(s0.x, s0.y, s1.x, s1.y);
          }
        }
        this.dragSnapshot = null;
        this.saveState();
      }
    } else if (this.currentTool === 'brush') {
      this.saveState();
    }
  }

  drawDot(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.currentColor;
    this.ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawRectangle(x1, y1, x2, y2) {
    const rx = Math.min(x1, x2);
    const ry = Math.min(y1, y2);
    const rw = Math.abs(x2 - x1);
    const rh = Math.abs(y2 - y1);

    this.ctx.fillStyle = this.currentColor;
    this.ctx.fillRect(rx, ry, rw, rh);
  }

  drawCircle(x1, y1, x2, y2) {
    const radius = Math.hypot(x2 - x1, y2 - y1);

    if (radius <= 0) return;

    this.ctx.beginPath();
    this.ctx.arc(x1, y1, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.currentColor;
    this.ctx.fill();
  }

  hexToRgba(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) {
      c = c.split('').map((char) => char + char).join('');
    }
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
      a: 255
    };
  }

  /**
   * Algoritmo iterativo de Flood Fill (relleno por inundación)
   * con tolerancia de color y mezcla proporcional en bordes suavizados (antialiasing).
   */
  floodFill(startX, startY, hexColor, tolerance = 48) {
    if (startX < 0 || startX >= this.width || startY < 0 || startY >= this.height) return;

    const imgData = this.ctx.getImageData(0, 0, this.width, this.height);
    const data = imgData.data;
    const w = this.width;
    const h = this.height;

    const targetIdx = (startY * w + startX) * 4;
    const tr = data[targetIdx];
    const tg = data[targetIdx + 1];
    const tb = data[targetIdx + 2];
    const ta = data[targetIdx + 3];

    const fill = this.hexToRgba(hexColor);

    // Evitar bucle si ya es el mismo color
    const initDiffSq = (tr - fill.r) ** 2 + (tg - fill.g) ** 2 + (tb - fill.b) ** 2;
    if (initDiffSq <= 9 && Math.abs(ta - fill.a) < 5) return;

    const tolSq = tolerance * tolerance;
    // 0 = no visitado, 1 = rechazado (borde candidato), 2 = rellenado
    const state = new Uint8Array(w * h);
    const fringeCandidates = [];
    const stack = [startX, startY];

    while (stack.length > 0) {
      const y = stack.pop();
      const x = stack.pop();
      const pos = y * w + x;

      if (state[pos] !== 0) continue;

      const idx = pos * 4;
      const dr = data[idx] - tr;
      const dg = data[idx + 1] - tg;
      const db = data[idx + 2] - tb;
      const diffSq = dr * dr + dg * dg + db * db;

      if (diffSq <= tolSq) {
        state[pos] = 2;
        data[idx] = fill.r;
        data[idx + 1] = fill.g;
        data[idx + 2] = fill.b;
        data[idx + 3] = fill.a;

        if (x > 0 && state[pos - 1] === 0) stack.push(x - 1, y);
        if (x < w - 1 && state[pos + 1] === 0) stack.push(x + 1, y);
        if (y > 0 && state[pos - w] === 0) stack.push(x, y - 1);
        if (y < h - 1 && state[pos + w] === 0) stack.push(x, y + 1);
      } else {
        state[pos] = 1;
        fringeCandidates.push(pos);
      }
    }

    // Mezcla proporcional en 1px de borde suavizado sin invadir trazos sólidos
    const updates = [];
    const deltaR = fill.r - tr;
    const deltaG = fill.g - tg;
    const deltaB = fill.b - tb;

    for (let i = 0; i < fringeCandidates.length; i++) {
      const pos = fringeCandidates[i];
      const x = pos % w;
      const y = (pos - x) / w;
      const idx = pos * 4;

      const dP = Math.hypot(data[idx] - tr, data[idx + 1] - tg, data[idx + 2] - tb);
      let maxDN = dP;

      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= h) continue;
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          if (nx < 0 || nx >= w) continue;
          const npos = ny * w + nx;
          if (state[npos] === 2) continue;
          const nidx = npos * 4;
          const dN = Math.hypot(data[nidx] - tr, data[nidx + 1] - tg, data[nidx + 2] - tb);
          if (dN > maxDN) maxDN = dN;
        }
      }

      if (maxDN > dP + 8) {
        const alpha = 1 - dP / maxDN;
        updates.push(
          pos,
          Math.max(0, Math.min(255, Math.round(data[idx] + alpha * deltaR))),
          Math.max(0, Math.min(255, Math.round(data[idx + 1] + alpha * deltaG))),
          Math.max(0, Math.min(255, Math.round(data[idx + 2] + alpha * deltaB)))
        );
      }
    }

    for (let i = 0; i < updates.length; i += 4) {
      const idx = updates[i] * 4;
      data[idx] = updates[i + 1];
      data[idx + 1] = updates[i + 2];
      data[idx + 2] = updates[i + 3];
      data[idx + 3] = fill.a;
    }

    this.ctx.putImageData(imgData, 0, 0);
  }
}
