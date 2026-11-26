import { FLAGS, TIER_META } from './flags.js';
import { CanvasManager } from './canvas.js';
import { compareCanvases, renderTargetFlag } from './comparator.js';

// Constantes de almacenamiento local
const STORAGE_KEYS = {
  STREAK: 'flag_drawer_streak',
  BEST: 'flag_drawer_best',
  PLAYED: 'flag_drawer_played',
  SELECTED_TIERS: 'flag_drawer_selected_tiers',
  DIFF_APPROACH: 'flag_drawer_diff_approach',
  LANG: 'flag_drawer_lang',
  THEME: 'flag_drawer_theme',
  SHIELD_MODE: 'flag_drawer_shield_mode',
  ONLY_SHIELD_FLAGS: 'flag_drawer_only_shield'
};

// Diccionario de traducción para interfaz bilingüe
const I18N = {
  es: {
    appTitle: 'FLAG DRAWER',
    streak: 'RACHA',
    best: 'RÉCORD',
    played: 'JUGADAS',
    difficulty: 'Dificultad',
    allTiers: 'Todas',
    fameApproachTag: 'Fama',
    designApproachTag: 'Diseño',
    drawFlagOf: 'Dibuja la bandera de',
    loading: 'Cargando...',
    skipFlag: 'Saltar',
    checkFlag: 'Evaluar Bandera',
    comparing: 'Comparando...',
    brush: 'Pincel',
    line: 'Línea',
    fill: 'Relleno',
    rect: 'Rect',
    circle: 'Círculo',
    mirror: 'Espejo',
    undo: 'Deshacer',
    redo: 'Rehacer',
    clear: 'Limpiar',
    thickness: 'Grosor',
    colorWheelTitle: 'Rueda cromática',
    brightness: 'Brillo',
    shieldOptional: 'Escudo opcional',
    shieldRequired: 'Escudo obligatorio',
    noShield: 'Sin escudo',
    shieldForgiven: 'Escudo perdonado',
    yourDrawing: 'Tu dibujo',
    realFlag: 'Bandera real',
    showDiff: 'Ver diferencias',
    hideDiff: 'Ocultar diferencias',
    heatmapLegend: 'Mapa de calor (Verde = acierto, Rojo = fallo)',
    feedbackPerfect: 'Perfecto. Practicamente identica.',
    feedbackGood: 'Muy bien, se reconoce claramente.',
    feedbackFair: 'Buen intento, pero aun faltan detalles.',
    feedbackPoor: 'No se parece aun, sigue practicando esta bandera.',
    shareResult: 'Compartir',
    shareModalTitle: 'Compartir resultado',
    copyImage: 'Copiar imagen',
    downloadImage: 'Descargar PNG',
    shareInvite: 'Dibuja banderas de memoria en',
    nextFlag: 'Siguiente bandera',
    // Settings
    settingsTitle: 'Opciones Avanzadas',
    statsSection: 'Estadísticas',
    searchPlaceholder: 'Buscar país para practicar...',
    searchEmpty: 'No se encontraron banderas',
    tierLabels: {
      1: 'Muy fácil',
      2: 'Fácil',
      3: 'Normal',
      4: 'Difícil'
    },
    diffApproach: 'Criterio de Dificultad',
    descDiffApproach: 'Define cómo se clasifican los 4 niveles de dificultad.',
    popApproachBtn: 'Por Fama',
    designApproachBtn: 'Por Complejidad',
    popExpl: 'Modo Fama: Banderas de países más conocidos (EE. UU., Brasil, Francia) son Tier 1, sin importar su complejidad de diseño.',
    designExpl: 'Modo Diseño: Banderas de franjas y bicolores simples son Tier 1 (España, Francia, etc.). Escudos y estrellas son niveles más altos.',
    language: 'Idioma / Language',
    theme: 'Tema Visual / Theme',
    themeDark: 'Oscuro',
    themeLight: 'Claro',
    shieldSetting: 'Evaluación de Escudos',
    descShieldSetting: 'Perdonar o exigir escudos e insignias heráldicas complejas.',
    shieldIgnoreOpt: 'Perdonar (Casual)',
    shieldRequireOpt: 'Exigir (Experto)',
    shieldOnlyOpt: 'Solo banderas con escudo',
    saveSettings: 'Guardar y Continuar',
    // Toasts
    copiedToast: 'Resultado copiado al portapapeles',
    copyFail: 'No se pudo copiar el resultado.',
    imageCopiedToast: 'Imagen copiada al portapapeles',
    imageCopyFail: 'No se pudo copiar la imagen. Usa Descargar PNG.',
    mirrorToastV: 'Espejo: Vertical (Izquierda / Derecha)',
    mirrorToastH: 'Espejo: Horizontal (Arriba / Abajo)',
    mirrorToastOff: 'Espejo: Desactivado',
    settingsSaved: 'Configuración guardada'
  },
  en: {
    appTitle: 'FLAG DRAWER',
    streak: 'STREAK',
    best: 'BEST',
    played: 'PLAYED',
    difficulty: 'Difficulty',
    allTiers: 'All',
    fameApproachTag: 'Fame',
    designApproachTag: 'Design',
    drawFlagOf: 'Draw the flag of',
    loading: 'Loading...',
    skipFlag: 'Skip',
    checkFlag: 'Check Flag',
    comparing: 'Comparing...',
    brush: 'Brush',
    line: 'Line',
    fill: 'Fill',
    rect: 'Rect',
    circle: 'Circle',
    mirror: 'Mirror',
    undo: 'Undo',
    redo: 'Redo',
    clear: 'Clear',
    thickness: 'Thickness',
    colorWheelTitle: 'Color Wheel',
    brightness: 'Brightness',
    shieldOptional: 'Shield optional',
    shieldRequired: 'Shield required',
    noShield: 'No shield',
    shieldForgiven: 'Shield forgiven',
    yourDrawing: 'Your Drawing',
    realFlag: 'The Real Flag',
    showDiff: 'Show Pixel Diff',
    hideDiff: 'Hide Pixel Diff',
    heatmapLegend: 'Heatmap (Green = match, Red = miss)',
    feedbackPerfect: 'Perfect! Spot on.',
    feedbackGood: 'Clearly recognisable, one element is off.',
    feedbackFair: 'Good effort, but needs work.',
    feedbackPoor: 'Not quite, try practicing this one.',
    shareResult: 'Share',
    shareModalTitle: 'Share Result',
    copyImage: 'Copy Image',
    downloadImage: 'Download PNG',
    shareInvite: 'Draw flags from memory at',
    nextFlag: 'Next Flag',
    // Settings
    settingsTitle: 'Advanced Options',
    statsSection: 'Statistics',
    searchPlaceholder: 'Search country to practice...',
    searchEmpty: 'No flags found',
    tierLabels: {
      1: 'Very easy',
      2: 'Easy',
      3: 'Normal',
      4: 'Hard'
    },
    diffApproach: 'Difficulty Criteria',
    descDiffApproach: 'Determines what makes a flag easy or difficult.',
    popApproachBtn: 'By Fame',
    designApproachBtn: 'By Complexity',
    popExpl: 'Fame Mode: Globally famous countries (USA, Brazil, France) are Tier 1, regardless of their design complexity.',
    designExpl: 'Design Mode: Simple stripes and bicolors are Tier 1 (Spain, France, etc.). Intricate coats of arms and stars are higher tiers.',
    language: 'Language',
    theme: 'Visual Theme',
    themeDark: 'Dark',
    themeLight: 'Light',
    shieldSetting: 'Shields & Heraldry',
    descShieldSetting: 'Forgive or require complex heraldic coats of arms.',
    shieldIgnoreOpt: 'Forgive (Casual)',
    shieldRequireOpt: 'Require (Expert)',
    shieldOnlyOpt: 'Only flags with shields',
    saveSettings: 'Done',
    // Toasts
    copiedToast: 'Result copied to clipboard',
    copyFail: 'Could not copy result.',
    imageCopiedToast: 'Image copied to clipboard',
    imageCopyFail: 'Could not copy image. Use Download PNG.',
    mirrorToastV: 'Mirror: Vertical (Left / Right)',
    mirrorToastH: 'Mirror: Horizontal (Top / Bottom)',
    mirrorToastOff: 'Mirror: Off',
    settingsSaved: 'Settings saved'
  }
};

class FlagGame {
  constructor() {
    this.flags = FLAGS;
    this.tierMeta = TIER_META;
    this.currentFlag = null;
    this.lastResult = null;

    // Ajustes del juego
    this.diffApproach = 'popularity'; // 'popularity' | 'design'
    this.selectedTiers = [1]; // Por defecto solo Muy fácil (Tier 1)
    this.currentLang = 'es'; // 'es' | 'en'
    this.currentTheme = 'dark'; // 'dark' | 'light'
    this.shieldMode = 'ignore'; // 'ignore' | 'require'
    this.onlyShieldFlags = false;

    // Estadísticas
    this.stats = {
      streak: 0,
      best: 0,
      played: 0
    };

    this.initElements();
    this.initCanvas();
    this.loadStats();
    this.loadSettings();
    this.attachEventListeners();

    // Iniciar con una bandera aleatoria según los filtros y cargar clasificacion desde JSON
    this.pickNextFlag();
    this.loadClassificationConfig();
  }

  async loadClassificationConfig() {
    try {
      const response = await fetch('data/flags-config.json', { cache: 'no-cache' });
      if (!response.ok) return;
      const config = await response.json();
      if (!config || typeof config !== 'object') return;

      this.flags.forEach((flag) => {
        const entry = config[flag.id];
        if (!entry) return;
        if (typeof entry.popTier === 'number') {
          flag.popTier = entry.popTier;
        }
        if (typeof entry.designTier === 'number') {
          flag.designTier = entry.designTier;
        }
        if (typeof entry.hasShield === 'boolean') {
          flag.hasShield = entry.hasShield;
        }
        if ('shield' in entry) {
          flag.shield = entry.shield;
        }
      });

      this.updateChipsUI();
      this.updateFlagShieldBadge();

      const filtered = this.getFilteredFlags();
      if (this.currentFlag && !filtered.some((f) => f.id === this.currentFlag.id)) {
        this.pickNextFlag();
      }
    } catch (_) {
      // En protocolo file:// fetch puede ser bloqueado por CORS; se mantiene el catalogo base.
    }
  }

  initElements() {
    // Header & Stats
    this.appTitleEl = document.getElementById('app-title');
    this.statStreakEl = document.getElementById('stat-streak');
    this.statBestEl = document.getElementById('stat-best');
    this.statPlayedEl = document.getElementById('stat-played');
    this.lblStatStreak = document.getElementById('lbl-stat-streak');
    this.lblStatBest = document.getElementById('lbl-stat-best');
    this.lblStatPlayed = document.getElementById('lbl-stat-played');
    this.lblStatsSection = document.getElementById('lbl-stats-section');
    this.btnToggleSearch = document.getElementById('btn-toggle-search');
    this.btnToggleDifficulty = document.getElementById('btn-toggle-difficulty');
    this.btnSettings = document.getElementById('btn-settings');
    this.searchPanel = document.getElementById('search-panel');
    this.difficultyPanel = document.getElementById('difficulty-panel');
    this.flagSearchInput = document.getElementById('flag-search-input');
    this.flagSearchResults = document.getElementById('flag-search-results');

    // Multi-select Difficulty Chips
    this.lblDifficulty = document.getElementById('lbl-difficulty');
    this.activeApproachTag = document.getElementById('active-approach-tag');
    this.tierCounterBadge = document.getElementById('tier-counter-badge');
    this.chipAll = document.getElementById('chip-all');
    this.txtChipAll = document.getElementById('txt-chip-all');
    this.tierChips = document.querySelectorAll('.tier-chip[data-tier]');

    // Desafío
    this.lblDrawPrompt = document.getElementById('lbl-draw-prompt');
    this.countryTargetEl = document.getElementById('country-target');
    this.targetTierBadge = document.getElementById('target-tier-badge');
    this.targetRatioBadge = document.getElementById('target-ratio-badge');
    this.targetShieldBadge = document.getElementById('target-shield-badge');
    this.skipBtn = document.getElementById('skip-btn');
    this.lblSkipBtn = document.getElementById('lbl-skip-btn');

    // Canvas principal y overlay
    this.canvasWrapper = document.querySelector('.canvas-wrapper');
    this.drawingCanvas = document.getElementById('drawing-canvas');
    this.overlayCanvas = document.getElementById('overlay-canvas');

    // Herramientas
    this.toolButtons = document.querySelectorAll('.tool-btn[data-tool]');
    this.toolMirror = document.getElementById('tool-mirror');
    this.mirrorBadge = document.getElementById('mirror-badge');
    this.mirrorIcon = document.getElementById('mirror-icon');
    this.undoBtn = document.getElementById('btn-undo');
    this.redoBtn = document.getElementById('btn-redo');
    this.clearBtn = document.getElementById('btn-clear');

    // Nombres de herramientas (I18N)
    this.toolNameBrush = document.getElementById('tool-name-brush');
    this.toolNameLine = document.getElementById('tool-name-line');
    this.toolNameFill = document.getElementById('tool-name-fill');
    this.toolNameRect = document.getElementById('tool-name-rect');
    this.toolNameCircle = document.getElementById('tool-name-circle');
    this.toolNameMirror = document.getElementById('tool-name-mirror');
    this.toolNameUndo = document.getElementById('tool-name-undo');
    this.toolNameRedo = document.getElementById('tool-name-redo');
    this.toolNameClear = document.getElementById('tool-name-clear');

    // Grosor
    this.lblThickness = document.getElementById('lbl-thickness');
    this.brushSlider = document.getElementById('brush-size');
    this.brushSizeVal = document.getElementById('brush-size-val');
    this.brushDot = document.getElementById('brush-dot');

    // Paleta y rueda cromática personalizada
    this.colorSwatches = document.querySelectorAll('.color-swatch[data-color]');
    this.activeColorSwatch = document.getElementById('active-color-swatch');
    this.colorWheelBtn = document.getElementById('color-wheel-btn');
    this.colorPickerPopover = document.getElementById('custom-color-popover');
    this.colorPickerClose = document.getElementById('color-picker-close');
    this.colorWheelCanvas = document.getElementById('color-wheel-canvas');
    this.colorWheelCursor = document.getElementById('color-wheel-cursor');
    this.colorBrightnessSlider = document.getElementById('color-brightness-slider');
    this.colorHexInput = document.getElementById('color-hex-input');
    this.colorPickerPreview = document.getElementById('color-picker-preview');
    this.lblColorWheelTitle = document.getElementById('lbl-color-wheel-title');
    this.lblColorBrightness = document.getElementById('lbl-color-brightness');
    this.pickerHSV = { h: 353, s: 92, v: 81 };

    // Botón de evaluar
    this.submitBtn = document.getElementById('submit-btn');
    this.lblSubmitBtn = document.getElementById('lbl-submit-btn');

    // Modal de resultados
    this.resultsModal = document.getElementById('results-modal');
    this.modalCountryName = document.getElementById('modal-country-name');
    this.modalTierBadge = document.getElementById('modal-tier-badge');
    this.modalShieldBadge = document.getElementById('modal-shield-badge');
    this.modalScoreEl = document.getElementById('modal-score');
    this.modalFeedbackEl = document.getElementById('modal-feedback');
    this.lblHeatmapLegend = document.getElementById('lbl-heatmap-legend');
    this.lblYourDrawing = document.getElementById('lbl-your-drawing');
    this.lblRealFlag = document.getElementById('lbl-real-flag');
    this.resultUserCanvas = document.getElementById('result-user-canvas');
    this.resultTargetCanvas = document.getElementById('result-target-canvas');
    this.resultDiffCanvas = document.getElementById('result-diff-canvas');

    // Modal stats & botones
    this.modalStatStreak = document.getElementById('modal-stat-streak');
    this.modalStatBest = document.getElementById('modal-stat-best');
    this.modalStatPlayed = document.getElementById('modal-stat-played');
    this.lblModalStreak = document.getElementById('lbl-modal-streak');
    this.lblModalBest = document.getElementById('lbl-modal-best');
    this.lblModalPlayed = document.getElementById('lbl-modal-played');
    this.nextFlagBtn = document.getElementById('next-flag-btn');
    this.lblNextFlag = document.getElementById('lbl-next-flag');
    this.shareBtn = document.getElementById('share-btn');
    this.shareTextEl = document.getElementById('share-text');
    this.toggleDiffBtn = document.getElementById('toggle-diff-btn');
    this.diffContainer = document.getElementById('diff-view-container');

    // Modal de compartir imagen
    this.shareModal = document.getElementById('share-modal');
    this.shareModalTitleEl = document.getElementById('share-modal-title');
    this.btnCloseShare = document.getElementById('btn-close-share');
    this.sharePreviewImg = document.getElementById('share-preview-img');
    this.copyShareBtn = document.getElementById('copy-share-btn');
    this.lblCopyShare = document.getElementById('lbl-copy-share');
    this.downloadShareBtn = document.getElementById('download-share-btn');
    this.lblDownloadShare = document.getElementById('lbl-download-share');

    // Modal de configuraciones
    this.settingsModal = document.getElementById('settings-modal');
    this.btnCloseSettings = document.getElementById('btn-close-settings');
    this.btnSaveSettings = document.getElementById('btn-save-settings');
    this.approachExplanation = document.getElementById('approach-explanation');

    // Botones segmentados de configuración
    this.btnApproachPop = document.getElementById('btn-approach-pop');
    this.btnApproachDesign = document.getElementById('btn-approach-design');
    this.btnLangEs = document.getElementById('btn-lang-es');
    this.btnLangEn = document.getElementById('btn-lang-en');
    this.btnThemeDark = document.getElementById('btn-theme-dark');
    this.btnThemeLight = document.getElementById('btn-theme-light');
    this.btnShieldIgnore = document.getElementById('btn-shield-ignore');
    this.btnShieldRequire = document.getElementById('btn-shield-require');
    this.shieldOnlyRow = document.getElementById('shield-only-row');
    this.chkShieldOnly = document.getElementById('chk-shield-only');
    this.lblShieldOnly = document.getElementById('lbl-shield-only');
    this.txtThemeDark = document.getElementById('txt-theme-dark');
    this.txtThemeLight = document.getElementById('txt-theme-light');
    this.txtShieldIgnore = document.getElementById('txt-shield-ignore');
    this.txtShieldRequire = document.getElementById('txt-shield-require');

    // Textos de configuración (I18N)
    this.settingsTitle = document.getElementById('settings-title');
    this.lblDiffApproach = document.getElementById('lbl-diff-approach');
    this.descDiffApproach = document.getElementById('desc-diff-approach');
    this.lblPopApproach = document.getElementById('lbl-pop-approach');
    this.lblDesignApproach = document.getElementById('lbl-design-approach');
    this.lblLanguage = document.getElementById('lbl-language');
    this.lblTheme = document.getElementById('lbl-theme');
    this.lblShieldSetting = document.getElementById('lbl-shield-setting');
    this.descShieldSetting = document.getElementById('desc-shield-setting');
    this.lblSaveSettings = document.getElementById('lbl-save-settings');

    // Toast
    this.toastEl = document.getElementById('toast');
    this.toastTimeout = null;
  }

  initCanvas() {
    this.canvasManager = new CanvasManager(this.drawingCanvas, {
      overlayCanvas: this.overlayCanvas,
      width: 300,
      height: 200,
      onStateChange: (state) => {
        this.undoBtn.disabled = !state.canUndo;
        if (this.redoBtn) this.redoBtn.disabled = !state.canRedo;
        this.updateMirrorUI(state.mirrorMode);
      }
    });

    this.updateColor('#CE1126');
    this.updateBrushSize(10);
  }

  loadStats() {
    try {
      this.stats.streak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK), 10) || 0;
      this.stats.best = parseInt(localStorage.getItem(STORAGE_KEYS.BEST), 10) || 0;
      this.stats.played = parseInt(localStorage.getItem(STORAGE_KEYS.PLAYED), 10) || 0;
    } catch (_) {
      this.stats = { streak: 0, best: 0, played: 0 };
    }
    this.renderStats();
  }

  saveStats() {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, this.stats.streak.toString());
      localStorage.setItem(STORAGE_KEYS.BEST, this.stats.best.toString());
      localStorage.setItem(STORAGE_KEYS.PLAYED, this.stats.played.toString());
    } catch (_) {}
    this.renderStats();
  }

  renderStats() {
    this.statStreakEl.textContent = this.stats.streak;
    this.statBestEl.textContent = `${this.stats.best}%`;
    this.statPlayedEl.textContent = this.stats.played;

    if (this.modalStatStreak) this.modalStatStreak.textContent = this.stats.streak;
    if (this.modalStatBest) this.modalStatBest.textContent = `${this.stats.best}%`;
    if (this.modalStatPlayed) this.modalStatPlayed.textContent = this.stats.played;
  }

  loadSettings() {
    try {
      // Idioma
      const savedLang = localStorage.getItem(STORAGE_KEYS.LANG);
      if (savedLang && ['es', 'en'].includes(savedLang)) {
        this.currentLang = savedLang;
      }

      // Tema
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
        this.currentTheme = savedTheme;
      }

      // Criterio de dificultad
      const savedApproach = localStorage.getItem(STORAGE_KEYS.DIFF_APPROACH);
      if (savedApproach && ['popularity', 'design'].includes(savedApproach)) {
        this.diffApproach = savedApproach;
      }

      // Niveles seleccionados (multi-select)
      const savedTiers = localStorage.getItem(STORAGE_KEYS.SELECTED_TIERS);
      if (savedTiers) {
        const parsed = JSON.parse(savedTiers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.selectedTiers = parsed.map((n) => parseInt(n, 10));
        }
      }

      // Modo escudos
      const savedShieldMode = localStorage.getItem(STORAGE_KEYS.SHIELD_MODE);
      if (savedShieldMode && ['ignore', 'require'].includes(savedShieldMode)) {
        this.shieldMode = savedShieldMode;
      }

      this.onlyShieldFlags = localStorage.getItem(STORAGE_KEYS.ONLY_SHIELD_FLAGS) === 'true';
    } catch (_) {}

    // Aplicar configuraciones al DOM
    this.applyTheme(this.currentTheme);
    this.applyTranslations();
    this.updateChipsUI();
    this.updateSettingsModalUI();
  }

  saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, this.currentLang);
      localStorage.setItem(STORAGE_KEYS.THEME, this.currentTheme);
      localStorage.setItem(STORAGE_KEYS.DIFF_APPROACH, this.diffApproach);
      localStorage.setItem(STORAGE_KEYS.SELECTED_TIERS, JSON.stringify(this.selectedTiers));
      localStorage.setItem(STORAGE_KEYS.SHIELD_MODE, this.shieldMode);
      localStorage.setItem(STORAGE_KEYS.ONLY_SHIELD_FLAGS, this.onlyShieldFlags ? 'true' : 'false');
    } catch (_) {}
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  applyTranslations() {
    const t = I18N[this.currentLang] || I18N.es;
    document.documentElement.lang = this.currentLang;

    // Header & stats
    this.lblStatStreak.textContent = t.streak;
    this.lblStatBest.textContent = t.best;
    this.lblStatPlayed.textContent = t.played;

    // Controls bar
    this.lblDifficulty.textContent = t.difficulty;
    this.txtChipAll.textContent = t.allTiers;
    this.activeApproachTag.textContent = (this.diffApproach === 'popularity') ? t.fameApproachTag : t.designApproachTag;

    // Update chip labels for T1..T4
    for (let i = 1; i <= 4; i++) {
      const chipTxt = document.getElementById(`txt-chip-${i}`);
      if (chipTxt) {
        chipTxt.textContent = (t.tierLabels && t.tierLabels[i]) ? t.tierLabels[i] : `T${i}`;
      }
    }

    if (this.lblStatsSection) this.lblStatsSection.textContent = t.statsSection;
    if (this.flagSearchInput) this.flagSearchInput.placeholder = t.searchPlaceholder;

    // Prompt & buttons
    this.lblDrawPrompt.textContent = t.drawFlagOf;
    this.lblSkipBtn.textContent = t.skipFlag;
    this.lblSubmitBtn.textContent = t.checkFlag;

    // Tools
    this.toolNameBrush.textContent = t.brush;
    this.toolNameLine.textContent = t.line;
    this.toolNameFill.textContent = t.fill;
    this.toolNameRect.textContent = t.rect;
    this.toolNameCircle.textContent = t.circle;
    this.toolNameMirror.textContent = t.mirror;
    this.toolNameUndo.textContent = t.undo;
    if (this.toolNameRedo) this.toolNameRedo.textContent = t.redo;
    this.toolNameClear.textContent = t.clear;
    this.lblThickness.textContent = t.thickness;
    if (this.lblColorWheelTitle) this.lblColorWheelTitle.textContent = t.colorWheelTitle;
    if (this.lblColorBrightness) this.lblColorBrightness.textContent = t.brightness;

    // Modal resultados
    this.lblYourDrawing.textContent = t.yourDrawing;
    this.lblRealFlag.textContent = t.realFlag;
    this.shareTextEl.textContent = t.shareResult;
    this.lblNextFlag.textContent = t.nextFlag;
    if (this.shareModalTitleEl) this.shareModalTitleEl.textContent = t.shareModalTitle;
    if (this.lblCopyShare) this.lblCopyShare.textContent = t.copyImage;
    if (this.lblDownloadShare) this.lblDownloadShare.textContent = t.downloadImage;
    if (this.lblHeatmapLegend) this.lblHeatmapLegend.textContent = t.heatmapLegend;
    if (this.lblShieldOnly) this.lblShieldOnly.textContent = t.shieldOnlyOpt;
    if (this.lblModalStreak) this.lblModalStreak.textContent = t.streak;
    if (this.lblModalBest) this.lblModalBest.textContent = t.best;
    if (this.lblModalPlayed) this.lblModalPlayed.textContent = t.played;

    // Modal settings
    this.settingsTitle.textContent = t.settingsTitle;
    this.lblDiffApproach.textContent = t.diffApproach;
    this.descDiffApproach.textContent = t.descDiffApproach;
    this.lblPopApproach.textContent = t.popApproachBtn;
    this.lblDesignApproach.textContent = t.designApproachBtn;
    this.approachExplanation.textContent = (this.diffApproach === 'popularity') ? t.popExpl : t.designExpl;
    this.lblLanguage.textContent = t.language;
    this.lblTheme.textContent = t.theme;
    this.lblShieldSetting.textContent = t.shieldSetting;
    this.descShieldSetting.textContent = t.descShieldSetting;
    this.lblSaveSettings.textContent = t.saveSettings;
    if (this.txtThemeDark) this.txtThemeDark.textContent = t.themeDark;
    if (this.txtThemeLight) this.txtThemeLight.textContent = t.themeLight;
    if (this.txtShieldIgnore) this.txtShieldIgnore.textContent = t.shieldIgnoreOpt;
    if (this.txtShieldRequire) this.txtShieldRequire.textContent = t.shieldRequireOpt;

    // Actualizar nombre del país actual si ya hay bandera activa
    if (this.currentFlag) {
      this.countryTargetEl.textContent = this.currentFlag.name[this.currentLang];
      const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';
      const tierNum = this.currentFlag[tierProp];
      this.targetTierBadge.textContent = (t.tierLabels && t.tierLabels[tierNum]) ? t.tierLabels[tierNum] : `T${tierNum}`;
      this.updateFlagShieldBadge();
    }
  }

  updateSettingsModalUI() {
    // 1. Enfoque de dificultad
    this.btnApproachPop.classList.toggle('active', this.diffApproach === 'popularity');
    this.btnApproachDesign.classList.toggle('active', this.diffApproach === 'design');
    const t = I18N[this.currentLang] || I18N.es;
    this.approachExplanation.textContent = (this.diffApproach === 'popularity') ? t.popExpl : t.designExpl;

    // 2. Idioma
    this.btnLangEs.classList.toggle('active', this.currentLang === 'es');
    this.btnLangEn.classList.toggle('active', this.currentLang === 'en');

    // 3. Tema
    this.btnThemeDark.classList.toggle('active', this.currentTheme === 'dark');
    this.btnThemeLight.classList.toggle('active', this.currentTheme === 'light');

    // 4. Modo escudos
    this.btnShieldIgnore.classList.toggle('active', this.shieldMode === 'ignore');
    this.btnShieldRequire.classList.toggle('active', this.shieldMode === 'require');
    if (this.shieldOnlyRow) {
      this.shieldOnlyRow.classList.toggle('hidden', this.shieldMode !== 'require');
    }
    if (this.chkShieldOnly) {
      this.chkShieldOnly.checked = this.onlyShieldFlags;
    }
  }

  /**
   * Gestión de Selección Múltiple de Niveles de Dificultad
   */
  toggleTier(tierArg) {
    if (tierArg === 'all') {
      // Si ya estaban todos seleccionados, no hacer nada o alternar
      if (this.selectedTiers.length === 4) {
        // Mantener al menos Tier 1
        this.selectedTiers = [1];
      } else {
        this.selectedTiers = [1, 2, 3, 4];
      }
    } else {
      const num = parseInt(tierArg, 10);
      const idx = this.selectedTiers.indexOf(num);
      if (idx !== -1) {
        // Deseleccionar: solo si queda al menos uno activo
        if (this.selectedTiers.length > 1) {
          this.selectedTiers.splice(idx, 1);
        } else {
          // Si era el único, re-activar todos
          this.selectedTiers = [1, 2, 3, 4];
        }
      } else {
        // Agregar nivel
        this.selectedTiers.push(num);
        this.selectedTiers.sort((a, b) => a - b);
      }
    }

    this.saveSettings();
    this.updateChipsUI();
    this.pickNextFlag();
  }

  updateChipsUI() {
    const isAll = this.selectedTiers.length === 4;
    this.chipAll.classList.toggle('active', isAll);

    for (let i = 1; i <= 4; i++) {
      const chip = document.getElementById(`chip-${i}`);
      if (chip) {
        chip.classList.toggle('active', this.selectedTiers.includes(i));
      }
    }

    // Actualizar contador de banderas disponibles
    const count = this.getFilteredFlags().length;
    const t = I18N[this.currentLang] || I18N.es;
    this.tierCounterBadge.textContent = `${count} ${this.currentLang === 'es' ? 'banderas' : 'flags'}`;
  }

  getFilteredFlags() {
    const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';
    let pool = this.flags;
    if (this.shieldMode === 'require' && this.onlyShieldFlags) {
      const shieldPool = pool.filter((f) => f.hasShield);
      if (shieldPool.length > 0) {
        pool = shieldPool;
      }
    }
    const filtered = pool.filter((f) => this.selectedTiers.includes(f[tierProp]));
    return (filtered.length > 0) ? filtered : pool;
  }

  updateFlagShieldBadge() {
    if (!this.targetShieldBadge) return;
    const t = I18N[this.currentLang] || I18N.es;

    if (this.currentFlag && this.currentFlag.hasShield) {
      this.targetShieldBadge.classList.remove('hidden');
      const isIgnore = (this.shieldMode === 'ignore');
      const shieldLabel = isIgnore ? t.shieldOptional : t.shieldRequired;
      this.targetShieldBadge.className = isIgnore ? 'shield-pill' : 'shield-pill active-shield';
      this.targetShieldBadge.innerHTML = `<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><span>${shieldLabel}</span>`;
    } else {
      this.targetShieldBadge.classList.add('hidden');
    }
  }

  getDimensionsForRatio(ratio) {
    const r = ratio || 1.5;
    const baseArea = 60000;
    let height = Math.round(Math.sqrt(baseArea / r));
    let width = Math.round(height * r);
    if (width % 2 !== 0) width += 1;
    if (height % 2 !== 0) height += 1;
    return { width, height };
  }

  pickNextFlag() {
    const available = this.getFilteredFlags();
    if (available.length === 0) return;

    let pool = available;
    if (this.currentFlag && available.length > 1) {
      pool = available.filter((f) => f.id !== this.currentFlag.id);
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    this.loadFlag(pool[randomIndex]);
  }

  selectSpecificFlag(flag) {
    if (!flag) return;
    this.loadFlag(flag);
    this.toggleSearchPanel(false);
  }

  loadFlag(flag) {
    const t = I18N[this.currentLang] || I18N.es;
    this.currentFlag = flag;

    // Nombre en el idioma activo
    this.countryTargetEl.textContent = this.currentFlag.name[this.currentLang] || this.currentFlag.name.es;

    // Nivel del país según el criterio activo (solo etiqueta simple: Muy fácil, Fácil, Normal, Difícil)
    const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';
    const tierNum = this.currentFlag[tierProp];
    const tierLabel = (t.tierLabels && t.tierLabels[tierNum]) ? t.tierLabels[tierNum] : `T${tierNum}`;

    this.targetTierBadge.textContent = tierLabel;
    this.targetTierBadge.className = `tier-pill tier-${tierNum}`;

    // Adaptar dimensiones y proporción de aspecto al país actual
    const { width, height } = this.getDimensionsForRatio(this.currentFlag.ratio);
    this.canvasManager.setDimensions(width, height);

    if (this.canvasWrapper) {
      this.canvasWrapper.style.setProperty('--flag-aspect-ratio', `${width} / ${height}`);
      this.canvasWrapper.style.setProperty('--flag-aspect-num', `${this.currentFlag.ratio || 1.5}`);
    }

    if (this.targetRatioBadge) {
      this.targetRatioBadge.textContent = this.currentFlag.aspectText || `${(this.currentFlag.ratio || 1.5).toFixed(2)}:1`;
      this.targetRatioBadge.title = `Proporción: ${this.currentFlag.aspectText || this.currentFlag.ratio}`;
    }

    // Actualizar badge de escudo
    this.updateFlagShieldBadge();
  }

  normalizeSearchText(str) {
    return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  toggleSearchPanel(forceState) {
    if (!this.searchPanel || !this.btnToggleSearch) return;
    const isHidden = this.searchPanel.classList.contains('hidden');
    const shouldOpen = (typeof forceState === 'boolean') ? forceState : isHidden;

    if (shouldOpen) {
      this.toggleDifficultyPanel(false);
      this.searchPanel.classList.remove('hidden');
      this.btnToggleSearch.classList.add('active');
      this.btnToggleSearch.setAttribute('aria-expanded', 'true');
      this.renderSearchResults(this.flagSearchInput ? this.flagSearchInput.value : '');
      if (this.flagSearchInput) {
        setTimeout(() => this.flagSearchInput.focus(), 30);
      }
    } else {
      this.searchPanel.classList.add('hidden');
      this.btnToggleSearch.classList.remove('active');
      this.btnToggleSearch.setAttribute('aria-expanded', 'false');
    }
  }

  toggleDifficultyPanel(forceState) {
    if (!this.difficultyPanel || !this.btnToggleDifficulty) return;
    const isHidden = this.difficultyPanel.classList.contains('hidden');
    const shouldOpen = (typeof forceState === 'boolean') ? forceState : isHidden;

    if (shouldOpen) {
      this.toggleSearchPanel(false);
      this.difficultyPanel.classList.remove('hidden');
      this.btnToggleDifficulty.classList.add('active');
      this.btnToggleDifficulty.setAttribute('aria-expanded', 'true');
    } else {
      this.difficultyPanel.classList.add('hidden');
      this.btnToggleDifficulty.classList.remove('active');
      this.btnToggleDifficulty.setAttribute('aria-expanded', 'false');
    }
  }

  renderSearchResults(query = '') {
    if (!this.flagSearchResults) return;
    const t = I18N[this.currentLang] || I18N.es;
    const normQuery = this.normalizeSearchText(query);
    const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';

    const matches = this.flags.filter((f) => {
      if (!normQuery) return true;
      const esName = this.normalizeSearchText(f.name.es);
      const enName = this.normalizeSearchText(f.name.en);
      return esName.includes(normQuery) || enName.includes(normQuery);
    });

    this.flagSearchResults.innerHTML = '';

    if (matches.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'search-empty';
      empty.textContent = t.searchEmpty;
      this.flagSearchResults.appendChild(empty);
      return;
    }

    matches.forEach((flag) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'search-result-item';
      btn.setAttribute('role', 'option');

      const nameSpan = document.createElement('span');
      nameSpan.textContent = flag.name[this.currentLang] || flag.name.es;

      const metaDiv = document.createElement('div');
      metaDiv.className = 'search-result-meta';

      const tierNum = flag[tierProp];
      const tierSpan = document.createElement('span');
      tierSpan.className = `tier-pill tier-${tierNum}`;
      tierSpan.textContent = (t.tierLabels && t.tierLabels[tierNum]) ? t.tierLabels[tierNum] : `T${tierNum}`;

      const ratioSpan = document.createElement('span');
      ratioSpan.className = 'ratio-pill';
      ratioSpan.textContent = flag.aspectText || '3:2';

      metaDiv.appendChild(tierSpan);
      metaDiv.appendChild(ratioSpan);
      btn.appendChild(nameSpan);
      btn.appendChild(metaDiv);

      btn.addEventListener('click', () => {
        if (this.flagSearchInput) this.flagSearchInput.value = '';
        this.selectSpecificFlag(flag);
      });

      this.flagSearchResults.appendChild(btn);
    });
  }

  selectTool(tool) {
    this.canvasManager.setTool(tool);
    this.toolButtons.forEach((b) => {
      b.classList.toggle('active', b.dataset.tool === tool);
    });
  }

  attachEventListeners() {
    // Botones de cabecera: Buscar, Dificultad, Opciones Avanzadas
    if (this.btnToggleSearch) {
      this.btnToggleSearch.addEventListener('click', () => {
        this.toggleSearchPanel();
      });
    }

    if (this.btnToggleDifficulty) {
      this.btnToggleDifficulty.addEventListener('click', () => {
        this.toggleDifficultyPanel();
      });
    }

    if (this.flagSearchInput) {
      this.flagSearchInput.addEventListener('input', (e) => {
        this.renderSearchResults(e.target.value);
      });
    }

    // Abrir modal de opciones avanzadas
    this.btnSettings.addEventListener('click', () => {
      this.openSettingsModal();
    });

    this.activeApproachTag.addEventListener('click', () => {
      this.openSettingsModal();
    });

    this.btnCloseSettings.addEventListener('click', () => {
      this.closeSettingsModal();
    });

    this.btnSaveSettings.addEventListener('click', () => {
      this.closeSettingsModal();
      this.showToast(I18N[this.currentLang].settingsSaved);
    });

    // Segmented: Criterio de dificultad
    this.btnApproachPop.addEventListener('click', () => {
      this.setDiffApproach('popularity');
    });

    this.btnApproachDesign.addEventListener('click', () => {
      this.setDiffApproach('design');
    });

    // Segmented: Idioma
    this.btnLangEs.addEventListener('click', () => {
      this.setLanguage('es');
    });

    this.btnLangEn.addEventListener('click', () => {
      this.setLanguage('en');
    });

    // Segmented: Tema
    this.btnThemeDark.addEventListener('click', () => {
      this.setTheme('dark');
    });

    this.btnThemeLight.addEventListener('click', () => {
      this.setTheme('light');
    });

    // Segmented: Modo Escudos
    this.btnShieldIgnore.addEventListener('click', () => {
      this.setShieldMode('ignore');
    });

    this.btnShieldRequire.addEventListener('click', () => {
      this.setShieldMode('require');
    });

    if (this.chkShieldOnly) {
      this.chkShieldOnly.addEventListener('change', (e) => {
        this.setOnlyShieldFlags(Boolean(e.target.checked));
      });
    }

    // Chips de selección múltiple de dificultad
    this.tierChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const tier = chip.dataset.tier;
        this.toggleTier(tier);
      });
    });

    // Saltar bandera
    this.skipBtn.addEventListener('click', () => {
      this.pickNextFlag();
    });

    // Selección de herramientas (Brush, Line, Fill, Rect, Circle)
    this.toolButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;
        this.selectTool(tool);
      });
    });

    // Modo Espejo: ciclo de 3 estados
    if (this.toolMirror) {
      this.toolMirror.addEventListener('click', () => {
        const mode = this.canvasManager.cycleMirrorMode();
        const t = I18N[this.currentLang];
        if (mode === 'vertical') {
          this.showToast(t.mirrorToastV);
        } else if (mode === 'horizontal') {
          this.showToast(t.mirrorToastH);
        } else {
          this.showToast(t.mirrorToastOff);
        }
      });
    }

    // Deshacer, Rehacer y Limpiar
    this.undoBtn.addEventListener('click', () => this.canvasManager.undo());
    if (this.redoBtn) {
      this.redoBtn.addEventListener('click', () => this.canvasManager.redo());
    }
    this.clearBtn.addEventListener('click', () => this.canvasManager.clear());

    // Control de grosor del trazo
    this.brushSlider.addEventListener('input', (e) => {
      const size = parseInt(e.target.value, 10);
      this.updateBrushSize(size);
    });

    // Paleta de colores predefinidos
    this.colorSwatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;
        this.updateColor(color);
      });
    });

    // Rueda cromática personalizada
    this.initColorWheel();

    // Evaluar / Submit
    this.submitBtn.addEventListener('click', () => {
      this.evaluateDrawing();
    });

    // Siguiente bandera desde modal
    this.nextFlagBtn.addEventListener('click', () => {
      this.closeModal();
      this.pickNextFlag();
    });

    // Compartir resultado
    this.shareBtn.addEventListener('click', () => {
      this.shareResult();
    });

    // Modal compartir imagen
    if (this.btnCloseShare) {
      this.btnCloseShare.addEventListener('click', () => this.closeShareModal());
    }
    if (this.shareModal) {
      this.shareModal.addEventListener('click', (e) => {
        if (e.target === this.shareModal) {
          this.closeShareModal();
        }
      });
    }
    if (this.copyShareBtn) {
      this.copyShareBtn.addEventListener('click', () => this.copyShareImage());
    }
    if (this.downloadShareBtn) {
      this.downloadShareBtn.addEventListener('click', () => this.downloadShareImage());
    }

    // Toggle de Diff heatmap
    this.toggleDiffBtn.addEventListener('click', () => {
      const isHidden = this.diffContainer.classList.toggle('hidden');
      const t = I18N[this.currentLang];
      this.toggleDiffBtn.textContent = isHidden ? t.showDiff : t.hideDiff;
    });

    // Atajos de teclado útiles para PC y accesibilidad
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          this.canvasManager.redo();
        } else {
          this.canvasManager.undo();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        this.canvasManager.redo();
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'b') {
        this.selectTool('brush');
      } else if (key === 'l') {
        this.selectTool('line');
      } else if (key === 'f') {
        this.selectTool('fill');
      } else if (key === 'r') {
        this.selectTool('rectangle');
      } else if (key === 'c') {
        this.selectTool('circle');
      } else if (key === 'm') {
        if (this.toolMirror) this.toolMirror.click();
      } else if (e.key === 'Enter') {
        if (!this.resultsModal.classList.contains('hidden')) {
          this.closeModal();
          this.pickNextFlag();
        } else if (!this.submitBtn.disabled) {
          this.evaluateDrawing();
        }
      } else if (e.key === 'Escape') {
        if (this.colorPickerPopover && !this.colorPickerPopover.classList.contains('hidden')) {
          this.closeColorPopover();
        } else if (this.shareModal && !this.shareModal.classList.contains('hidden')) {
          this.closeShareModal();
        } else if (!this.resultsModal.classList.contains('hidden')) {
          this.closeModal();
        } else if (!this.settingsModal.classList.contains('hidden')) {
          this.closeSettingsModal();
        }
      }
    });
  }

  setDiffApproach(approach) {
    this.diffApproach = approach;
    this.saveSettings();
    this.applyTranslations();
    this.updateChipsUI();
    this.updateSettingsModalUI();
    this.pickNextFlag();
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.saveSettings();
    this.applyTranslations();
    this.updateChipsUI();
    this.updateSettingsModalUI();
  }

  setTheme(theme) {
    this.applyTheme(theme);
    this.saveSettings();
    this.updateSettingsModalUI();
  }

  setShieldMode(mode) {
    this.shieldMode = mode;
    this.saveSettings();
    this.updateSettingsModalUI();
    this.updateChipsUI();
    this.updateFlagShieldBadge();
    if (this.shieldMode === 'require' && this.onlyShieldFlags && this.currentFlag && !this.currentFlag.hasShield) {
      this.pickNextFlag();
    }
  }

  setOnlyShieldFlags(enabled) {
    this.onlyShieldFlags = Boolean(enabled);
    this.saveSettings();
    this.updateSettingsModalUI();
    this.updateChipsUI();
    if (this.shieldMode === 'require' && this.onlyShieldFlags && this.currentFlag && !this.currentFlag.hasShield) {
      this.pickNextFlag();
    }
  }

  openSettingsModal() {
    this.updateSettingsModalUI();
    this.settingsModal.classList.remove('hidden');
  }

  closeSettingsModal() {
    this.settingsModal.classList.add('hidden');
  }

  updateBrushSize(size) {
    this.canvasManager.setSize(size);
    this.brushSizeVal.textContent = `${size}px`;
    const dotSize = Math.max(4, Math.min(22, size * 0.75));
    this.brushDot.style.width = `${dotSize}px`;
    this.brushDot.style.height = `${dotSize}px`;
  }

  updateColor(color, syncWheel = true) {
    this.canvasManager.setColor(color);
    this.brushDot.style.backgroundColor = color;

    if (this.activeColorSwatch) {
      this.activeColorSwatch.style.setProperty('--swatch-color', color);
    }

    if (syncWheel && this.colorWheelCanvas) {
      this.syncWheelFromHex(color);
    }

    let foundMatch = false;
    const normalizedColor = color.toUpperCase();
    this.colorSwatches.forEach((swatch) => {
      if (swatch.dataset.color.toUpperCase() === normalizedColor) {
        swatch.classList.add('active');
        foundMatch = true;
      } else {
        swatch.classList.remove('active');
      }
    });

    if (!foundMatch && this.activeColorSwatch) {
      this.activeColorSwatch.classList.add('active-custom');
    } else if (this.activeColorSwatch) {
      this.activeColorSwatch.classList.remove('active-custom');
    }
  }

  initColorWheel() {
    if (!this.colorWheelBtn || !this.colorPickerPopover || !this.colorWheelCanvas) return;

    this.colorWheelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = this.colorPickerPopover.classList.contains('hidden');
      if (isHidden) {
        this.openColorPopover();
      } else {
        this.closeColorPopover();
      }
    });

    if (this.colorPickerClose) {
      this.colorPickerClose.addEventListener('click', () => this.closeColorPopover());
    }

    document.addEventListener('click', (e) => {
      if (
        !this.colorPickerPopover.classList.contains('hidden') &&
        !this.colorPickerPopover.contains(e.target) &&
        !this.colorWheelBtn.contains(e.target)
      ) {
        this.closeColorPopover();
      }
    });

    let isDraggingWheel = false;
    const pickFromPointer = (e) => {
      const rect = this.colorWheelCanvas.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = e.clientX - rect.left - cx;
      const dy = e.clientY - rect.top - cy;
      const radius = Math.min(cx, cy);
      const dist = Math.min(Math.hypot(dx, dy), radius);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      this.pickerHSV.h = (angle + 360) % 360;
      this.pickerHSV.s = (dist / radius) * 100;
      this.applyPickerHSV();
    };

    this.colorWheelCanvas.addEventListener('pointerdown', (e) => {
      isDraggingWheel = true;
      try { this.colorWheelCanvas.setPointerCapture(e.pointerId); } catch (_) {}
      pickFromPointer(e);
    });

    this.colorWheelCanvas.addEventListener('pointermove', (e) => {
      if (isDraggingWheel) pickFromPointer(e);
    });

    const stopWheelDrag = (e) => {
      if (!isDraggingWheel) return;
      isDraggingWheel = false;
      try { this.colorWheelCanvas.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    this.colorWheelCanvas.addEventListener('pointerup', stopWheelDrag);
    this.colorWheelCanvas.addEventListener('pointercancel', stopWheelDrag);

    if (this.colorBrightnessSlider) {
      this.colorBrightnessSlider.addEventListener('input', (e) => {
        this.pickerHSV.v = parseInt(e.target.value, 10);
        this.drawColorWheel(this.pickerHSV.v);
        this.applyPickerHSV();
      });
    }

    if (this.colorHexInput) {
      this.colorHexInput.addEventListener('input', (e) => {
        let val = e.target.value.trim();
        if (!val.startsWith('#')) val = '#' + val;
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          this.updateColor(val.toUpperCase(), true);
        }
      });
    }

    this.drawColorWheel(this.pickerHSV.v);
    this.updateWheelCursor();
  }

  openColorPopover() {
    if (!this.colorPickerPopover) return;
    this.colorPickerPopover.classList.remove('hidden');
    this.colorWheelBtn.setAttribute('aria-expanded', 'true');
    this.drawColorWheel(this.pickerHSV.v);
    this.updateWheelCursor();
  }

  closeColorPopover() {
    if (!this.colorPickerPopover) return;
    this.colorPickerPopover.classList.add('hidden');
    this.colorWheelBtn.setAttribute('aria-expanded', 'false');
  }

  drawColorWheel(brightness = 100) {
    if (!this.colorWheelCanvas) return;
    const ctx = this.colorWheelCanvas.getContext('2d');
    const w = this.colorWheelCanvas.width;
    const h = this.colorWheelCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy);
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    for (let y = 0; y < h; y++) {
      const dy = y - cy;
      for (let x = 0; x < w; x++) {
        const dx = x - cx;
        const dist = Math.hypot(dx, dy);
        if (dist <= radius) {
          const hue = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
          const sat = (dist / radius) * 100;
          const { r, g, b } = this.hsvToRgb(hue, sat, brightness);
          const idx = (y * w + x) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = dist > radius - 1 ? Math.round((radius - dist) * 255) : 255;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  applyPickerHSV() {
    const { r, g, b } = this.hsvToRgb(this.pickerHSV.h, this.pickerHSV.s, this.pickerHSV.v);
    const hex = this.rgbToHex(r, g, b);
    if (this.colorPickerPreview) this.colorPickerPreview.style.backgroundColor = hex;
    if (this.colorHexInput) this.colorHexInput.value = hex;
    this.updateWheelCursor();
    this.updateColor(hex, false);
  }

  syncWheelFromHex(hex) {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    this.pickerHSV = this.rgbToHsv(r, g, b);
    if (this.colorBrightnessSlider) {
      this.colorBrightnessSlider.value = Math.round(this.pickerHSV.v);
    }
    if (this.colorPickerPreview) this.colorPickerPreview.style.backgroundColor = hex.toUpperCase();
    if (this.colorHexInput) this.colorHexInput.value = hex.toUpperCase();
    this.drawColorWheel(this.pickerHSV.v);
    this.updateWheelCursor();
  }

  updateWheelCursor() {
    if (!this.colorWheelCursor || !this.colorWheelCanvas) return;
    const radius = this.colorWheelCanvas.width / 2;
    const rDist = (this.pickerHSV.s / 100) * radius;
    const rad = (this.pickerHSV.h * Math.PI) / 180;
    const x = radius + Math.cos(rad) * rDist;
    const y = radius + Math.sin(rad) * rDist;
    this.colorWheelCursor.style.left = `${(x / this.colorWheelCanvas.width) * 100}%`;
    this.colorWheelCursor.style.top = `${(y / this.colorWheelCanvas.height) * 100}%`;
  }

  hsvToRgb(h, s, v) {
    const sNorm = s / 100;
    const vNorm = v / 100;
    const c = vNorm * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = vNorm - c;
    let r1 = 0, g1 = 0, b1 = 0;

    if (h < 60) { r1 = c; g1 = x; }
    else if (h < 120) { r1 = x; g1 = c; }
    else if (h < 180) { g1 = c; b1 = x; }
    else if (h < 240) { g1 = x; b1 = c; }
    else if (h < 300) { r1 = x; b1 = c; }
    else { r1 = c; b1 = x; }

    return {
      r: Math.round((r1 + m) * 255),
      g: Math.round((g1 + m) * 255),
      b: Math.round((b1 + m) * 255)
    };
  }

  rgbToHsv(r, g, b) {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === rNorm) h = ((gNorm - bNorm) / d) % 6;
      else if (max === gNorm) h = (bNorm - rNorm) / d + 2;
      else h = (rNorm - gNorm) / d + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
    const s = max === 0 ? 0 : (d / max) * 100;
    const v = max * 100;
    return { h, s, v };
  }

  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  updateMirrorUI(mode) {
    if (!this.toolMirror || !this.mirrorBadge) return;

    if (mode === 'vertical') {
      this.toolMirror.classList.add('active');
      this.mirrorBadge.textContent = 'M-V';
      this.mirrorBadge.className = 'mirror-indicator mode-v';
      if (this.mirrorIcon) {
        this.mirrorIcon.innerHTML = `
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-dasharray="3 3"></line>
          <path d="M7 6l-4 6 4 6" stroke="currentColor"></path>
          <path d="M17 6l4 6-4 6" stroke="currentColor"></path>
        `;
      }
    } else if (mode === 'horizontal') {
      this.toolMirror.classList.add('active');
      this.mirrorBadge.textContent = 'M-H';
      this.mirrorBadge.className = 'mirror-indicator mode-h';
      if (this.mirrorIcon) {
        this.mirrorIcon.innerHTML = `
          <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-dasharray="3 3"></line>
          <path d="M6 7l6-4 6 4" stroke="currentColor"></path>
          <path d="M6 17l6 4 6-4" stroke="currentColor"></path>
        `;
      }
    } else {
      this.toolMirror.classList.remove('active');
      this.mirrorBadge.textContent = 'Off';
      this.mirrorBadge.className = 'mirror-indicator';
      if (this.mirrorIcon) {
        this.mirrorIcon.innerHTML = `
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-dasharray="3 3"></line>
          <path d="M7 6l-4 6 4 6"></path>
          <path d="M17 6l4 6-4 6"></path>
        `;
      }
    }
  }

  async evaluateDrawing() {
    if (!this.currentFlag) return;

    const t = I18N[this.currentLang];
    this.submitBtn.disabled = true;
    if (this.lblSubmitBtn) {
      this.lblSubmitBtn.textContent = t.comparing;
    }

    try {
      const targetCanvas = await renderTargetFlag(
        this.currentFlag.url,
        this.canvasManager.width,
        this.canvasManager.height
      );

      const comparisonOptions = {
        ignoreShield: (this.shieldMode === 'ignore'),
        shield: this.currentFlag.shield
      };

      const result = compareCanvases(this.canvasManager.canvas, targetCanvas, comparisonOptions);
      this.lastResult = result;

      this.stats.played += 1;
      if (result.score >= 60) {
        this.stats.streak += 1;
      } else {
        this.stats.streak = 0;
      }

      if (result.score > this.stats.best) {
        this.stats.best = result.score;
      }

      this.saveStats();
      this.renderResultsModal(targetCanvas, result);
      this.openModal();
    } catch (error) {
      console.error('Error al evaluar dibujo:', error);
      this.showToast('Error al evaluar bandera');
    } finally {
      this.submitBtn.disabled = false;
      if (this.lblSubmitBtn) {
        this.lblSubmitBtn.textContent = t.checkFlag;
      }
    }
  }

  renderResultsModal(targetCanvas, result) {
    const t = I18N[this.currentLang];
    this.modalCountryName.textContent = this.currentFlag.name[this.currentLang] || this.currentFlag.name.es;

    const tierProp = (this.diffApproach === 'popularity') ? 'popTier' : 'designTier';
    const tierNum = this.currentFlag[tierProp];
    const tierLabel = (t.tierLabels && t.tierLabels[tierNum]) ? t.tierLabels[tierNum] : `T${tierNum}`;

    this.modalTierBadge.textContent = tierLabel;
    this.modalTierBadge.className = `tier-pill tier-${tierNum}`;

    if (this.currentFlag.hasShield) {
      const isIgnore = (this.shieldMode === 'ignore');
      const shieldLabel = isIgnore ? t.shieldForgiven : t.shieldRequired;
      this.modalShieldBadge.className = isIgnore ? 'shield-pill' : 'shield-pill active-shield';
      this.modalShieldBadge.innerHTML = `<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><span>${shieldLabel}</span>`;
      this.modalShieldBadge.classList.remove('hidden');
    } else {
      this.modalShieldBadge.textContent = t.noShield;
      this.modalShieldBadge.className = 'shield-pill';
      this.modalShieldBadge.classList.remove('hidden');
    }

    this.modalScoreEl.textContent = `${result.score}%`;
    this.modalScoreEl.style.color = result.color;
    this.modalFeedbackEl.textContent = t[result.feedbackKey] || '';

    const w = this.canvasManager.width;
    const h = this.canvasManager.height;

    this.resultUserCanvas.width = w;
    this.resultUserCanvas.height = h;
    this.resultTargetCanvas.width = w;
    this.resultTargetCanvas.height = h;
    this.resultDiffCanvas.width = w;
    this.resultDiffCanvas.height = h;

    const modalFrames = document.querySelectorAll('.comparison-box .frame, .diff-container .frame');
    const ratioNum = this.currentFlag.ratio || (w / h);
    modalFrames.forEach((frame) => {
      frame.style.setProperty('--flag-aspect-ratio', `${w} / ${h}`);
      frame.style.setProperty('--flag-aspect-num', `${ratioNum}`);
    });

    const userResultCtx = this.resultUserCanvas.getContext('2d');
    userResultCtx.clearRect(0, 0, w, h);
    userResultCtx.drawImage(this.canvasManager.canvas, 0, 0, w, h);

    const targetResultCtx = this.resultTargetCanvas.getContext('2d');
    targetResultCtx.clearRect(0, 0, w, h);
    targetResultCtx.drawImage(targetCanvas, 0, 0, w, h);

    const diffResultCtx = this.resultDiffCanvas.getContext('2d');
    diffResultCtx.clearRect(0, 0, w, h);
    diffResultCtx.drawImage(result.diffCanvas, 0, 0, w, h);

    this.diffContainer.classList.add('hidden');
    this.toggleDiffBtn.textContent = t.showDiff;
  }

  openModal() {
    this.resultsModal.classList.remove('hidden');
  }

  closeModal() {
    this.resultsModal.classList.add('hidden');
  }

  openShareModal() {
    if (this.shareModal) {
      this.shareModal.classList.remove('hidden');
    }
  }

  closeShareModal() {
    if (this.shareModal) {
      this.shareModal.classList.add('hidden');
    }
  }

  generateShareSummaryImage() {
    const t = I18N[this.currentLang];
    const w = this.resultUserCanvas.width || 300;
    const h = this.resultUserCanvas.height || 200;
    const ratio = w / h;

    const cardWidth = 900;
    const padX = 48;
    const gap = 32;
    const flagW = Math.floor((cardWidth - padX * 2 - gap) / 2);
    const flagH = Math.round(flagW / ratio);

    const headerH = 104;
    const labelH = 30;
    const footerH = 82;
    const bottomGap = 32;
    const cardHeight = headerH + labelH + flagH + bottomGap + footerH;

    const canvas = document.createElement('canvas');
    canvas.width = cardWidth;
    canvas.height = cardHeight;
    const ctx = canvas.getContext('2d');

    // Fondo blanco limpio estilo Suizo
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Borde exterior sutil
    ctx.strokeStyle = '#E2E2E2';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, cardWidth - 2, cardHeight - 2);

    // Barra superior: marca a la izquierda, pais + puntuacion a la derecha
    ctx.fillStyle = '#E63946';
    ctx.fillRect(padX, 32, 8, 34);

    ctx.fillStyle = '#0D0D0D';
    ctx.font = '800 24px "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('FLAG DRAWER', padX + 20, 49);

    const scoreText = `${this.lastResult.score}%`;
    ctx.font = '800 32px "JetBrains Mono", monospace';
    const scoreWidth = ctx.measureText(scoreText).width;
    ctx.fillStyle = this.lastResult.color || '#0D0D0D';
    ctx.textAlign = 'right';
    ctx.fillText(scoreText, cardWidth - padX, 49);

    const countryName = (this.currentFlag.name[this.currentLang] || this.currentFlag.name.es).toUpperCase();
    ctx.fillStyle = '#0D0D0D';
    ctx.font = '700 24px "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(countryName, cardWidth - padX - scoreWidth - 18, 49);

    // Linea divisoria superior
    ctx.strokeStyle = '#EAEAEA';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, headerH - 12);
    ctx.lineTo(cardWidth - padX, headerH - 12);
    ctx.stroke();

    // Etiquetas de comparacion
    const flagsTopY = headerH + 6;
    const leftX = padX;
    const rightX = padX + flagW + gap;

    ctx.fillStyle = '#555555';
    ctx.font = '700 14px "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.yourDrawing.toUpperCase(), leftX + flagW / 2, flagsTopY + 10);
    ctx.fillText(t.realFlag.toUpperCase(), rightX + flagW / 2, flagsTopY + 10);

    // Dibujo del usuario y bandera real
    const imgY = flagsTopY + labelH;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(leftX, imgY, flagW, flagH);
    ctx.drawImage(this.resultUserCanvas, leftX, imgY, flagW, flagH);
    ctx.strokeStyle = '#D4D4D4';
    ctx.lineWidth = 2;
    ctx.strokeRect(leftX, imgY, flagW, flagH);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(rightX, imgY, flagW, flagH);
    ctx.drawImage(this.resultTargetCanvas, rightX, imgY, flagW, flagH);
    ctx.strokeStyle = '#D4D4D4';
    ctx.lineWidth = 2;
    ctx.strokeRect(rightX, imgY, flagW, flagH);

    // Footer con link para invitar a jugar (texto mas grande)
    const footerY = cardHeight - footerH;
    ctx.fillStyle = '#F7F7F7';
    ctx.fillRect(2, footerY, cardWidth - 4, footerH - 2);
    ctx.strokeStyle = '#E2E2E2';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(2, footerY);
    ctx.lineTo(cardWidth - 2, footerY);
    ctx.stroke();

    ctx.fillStyle = '#444444';
    ctx.font = '600 19px "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.shareInvite, padX, footerY + footerH / 2);

    ctx.fillStyle = '#0D0D0D';
    ctx.font = '700 19px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('https://gabriel5znk.github.io/flag-drawer/', cardWidth - padX, footerY + footerH / 2);

    return new Promise((resolve) => {
      const dataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => {
        resolve({ blob, dataUrl });
      }, 'image/png');
    });
  }

  async shareResult() {
    if (!this.lastResult || !this.currentFlag) return;

    try {
      const { blob, dataUrl } = await this.generateShareSummaryImage();
      this.shareImageBlob = blob;
      this.shareImageDataUrl = dataUrl;
      if (this.sharePreviewImg) {
        this.sharePreviewImg.src = dataUrl;
      }
      this.openShareModal();
    } catch (err) {
      console.error('Error generando imagen de resumen:', err);
      this.showToast(I18N[this.currentLang].copyFail);
    }
  }

  downloadShareImage() {
    if (!this.shareImageDataUrl || !this.currentFlag) return;
    const link = document.createElement('a');
    link.download = `flag-drawer-${this.currentFlag.id}.png`;
    link.href = this.shareImageDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async copyShareImage() {
    const t = I18N[this.currentLang];
    if (!this.shareImageBlob) return;

    try {
      if (navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': this.shareImageBlob })
        ]);
        this.showToast(t.imageCopiedToast);
      } else {
        this.showToast(t.imageCopyFail);
      }
    } catch (err) {
      console.warn('Error al copiar imagen al portapapeles:', err);
      this.showToast(t.imageCopyFail);
    }
  }

  showToast(message) {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastEl.textContent = message;
    this.toastEl.classList.remove('hidden');

    this.toastTimeout = setTimeout(() => {
      this.toastEl.classList.add('hidden');
      this.toastTimeout = null;
    }, 2400);
  }
}

// Inicialización universal
function startFlagGame() {
  try {
    window.flagGame = new FlagGame();
  } catch (err) {
    console.error('Fatal initialization error in FlagGame:', err);
    const target = document.getElementById('country-target');
    if (target) {
      target.textContent = 'Error: ' + err.message;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startFlagGame);
} else {
  startFlagGame();
}
