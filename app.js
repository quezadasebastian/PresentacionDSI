/**
 * Service Desk TI - UNMSM FISI
 * Arquitectura de Software & Presentación Interactiva Slide Deck
 * Vanilla JavaScript ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. METADATOS DE DIAPOSITIVAS (19 SLIDES)
  // ==========================================
  const SLIDES_METADATA = [
    { id: 1, title: 'Portada Institucional', section: '1. Introducción y Contexto', icon: '🏛️' },
    { id: 2, title: 'Contexto Organizacional (OGTI) y Niveles de Soporte', section: '1. Introducción y Contexto', icon: '🏢' },
    { id: 3, title: 'Problemática Actual y Justificación ITIL v4', section: '1. Introducción y Contexto', icon: '⚠️' },
    { id: 4, title: 'Objetivos, Alcance (Vertical Slice) y Restricciones', section: '1. Introducción y Contexto', icon: '🎯' },
    { id: 5, title: 'Requisitos Funcionales (MoSCoW) y No Funcionales (ISO 25010)', section: '2. Análisis y Requisitos', icon: '📋' },
    { id: 6, title: 'Modelo de Procesos de Negocio (BPMN 2.0)', section: '2. Análisis y Requisitos', icon: '🔄' },
    { id: 7, title: 'Modelo de Casos de Uso y Especificación CU-02', section: '2. Análisis y Requisitos', icon: '👥' },
    { id: 8, title: 'Modelo Conceptual de Dominio', section: '2. Análisis y Requisitos', icon: '🧱' },
    { id: 9, title: 'Diseño Detallado: Diagrama de Clases de Diseño (UML 2.5.1)', section: '2. Análisis y Requisitos', icon: '📊' },
    { id: 10, title: 'Arquitectura de Software: Modelo 4+1 de Kruchten', section: '3. Arquitectura 4+1', icon: '📐' },
    { id: 11, title: 'Vista 1: Vista Lógica (Logical View)', section: '3. Arquitectura 4+1', icon: '🧩' },
    { id: 12, title: 'Vista 2: Vista de Procesos (Process View)', section: '3. Arquitectura 4+1', icon: '⚙️' },
    { id: 13, title: 'Vista 3: Vista de Desarrollo (Development View)', section: '3. Arquitectura 4+1', icon: '📦' },
    { id: 14, title: 'Vista 4: Vista Física / Despliegue (Physical View)', section: '3. Arquitectura 4+1', icon: '🖥️' },
    { id: 15, title: 'Vista +1: Escenario Integrador y Tácticas SEI/ADD', section: '3. Arquitectura 4+1', icon: '🛡️' },
    { id: 16, title: 'Diseño Detallado: Diagrama de Secuencia (CU-02)', section: '4. Diseño Detallado', icon: '⏳' },
    { id: 17, title: 'Diseño Detallado: Diagrama de Estados (Ciclo de Vida)', section: '4. Diseño Detallado', icon: '🔀' },
    { id: 18, title: 'Diseño Detallado: Diagrama de Componentes y Acoplamiento', section: '4. Diseño Detallado', icon: '🔌' },
    { id: 19, title: 'Conclusiones y Recomendaciones Técnicas', section: '5. Cierre y Evaluación', icon: '📝' },
    { id: 20, title: 'Agradecimientos y Ronda de Preguntas (Q&A)', section: '5. Cierre y Evaluación', icon: '🎓' }
  ];

  // ==========================================
  // 2. CONTROLADOR DEL SLIDE DECK
  // ==========================================
  class SlideDeck {
    constructor() {
      this.slides = Array.from(document.querySelectorAll('.slide'));
      this.totalSlides = this.slides.length;
      this.currentIndex = 0;

      // Elementos de UI
      this.progressBar = document.getElementById('progressBar');
      this.slideCounter = document.getElementById('slideCounter');
      this.sectionBadge = document.getElementById('sectionBadge');
      this.prevBtn = document.getElementById('prevBtn');
      this.nextBtn = document.getElementById('nextBtn');
      this.fullscreenBtn = document.getElementById('fullscreenBtn');
      this.gridBtn = document.getElementById('gridBtn');
      this.gridModal = document.getElementById('gridModal');
      this.closeGridBtn = document.getElementById('closeGridBtn');
      this.gridContainer = document.getElementById('gridContainer');

      this.init();
    }

    init() {
      // 1. Leer hash de URL inicial o iniciar en slide 0
      const hash = window.location.hash;
      if (hash && hash.startsWith('#slide-')) {
        const slideNum = parseInt(hash.replace('#slide-', ''), 10);
        if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= this.totalSlides) {
          this.currentIndex = slideNum - 1;
        }
      }

      this.updateSlideView();
      this.setupEventListeners();
      this.renderGridModal();
    }

    goToSlide(index) {
      if (index < 0 || index >= this.totalSlides) return;
      this.currentIndex = index;
      this.updateSlideView();
      window.location.hash = `#slide-${this.currentIndex + 1}`;
      
      // Notificar reset de Pan & Zoom para que los diagramas del slide comiencen centrados
      const currentSlideEl = this.slides[this.currentIndex];
      const pzContainers = currentSlideEl.querySelectorAll('.pan-zoom-container');
      pzContainers.forEach(c => {
        if (c._panZoomInstance) {
          c._panZoomInstance.reset();
        }
      });
    }

    next() {
      if (this.currentIndex < this.totalSlides - 1) {
        this.goToSlide(this.currentIndex + 1);
      }
    }

    prev() {
      if (this.currentIndex > 0) {
        this.goToSlide(this.currentIndex - 1);
      }
    }

    updateSlideView() {
      // Alternar clases activas
      this.slides.forEach((slide, idx) => {
        if (idx === this.currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Actualizar contador y barra de progreso
      const numStr = String(this.currentIndex + 1).padStart(2, '0');
      const totalStr = String(this.totalSlides).padStart(2, '0');
      if (this.slideCounter) {
        this.slideCounter.textContent = `${numStr} / ${totalStr}`;
      }

      const percent = ((this.currentIndex + 1) / this.totalSlides) * 100;
      if (this.progressBar) {
        this.progressBar.style.width = `${percent}%`;
      }

      // Actualizar título de sección en header
      const meta = SLIDES_METADATA[this.currentIndex];
      if (meta && this.sectionBadge) {
        this.sectionBadge.textContent = `${meta.section} • Diapositiva ${meta.id}`;
      }

      // Deshabilitar botones de límites
      if (this.prevBtn) {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.prevBtn.classList.toggle('opacity-40', this.currentIndex === 0);
      }
      if (this.nextBtn) {
        this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
        this.nextBtn.classList.toggle('opacity-40', this.currentIndex === this.totalSlides - 1);
      }

      // Actualizar botón de sección activo en navbar superior si existe
      document.querySelectorAll('.section-nav-pill').forEach(pill => {
        const targetSection = pill.getAttribute('data-section');
        if (targetSection && meta && meta.section.toLowerCase().includes(targetSection.toLowerCase())) {
          pill.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
          pill.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
        } else {
          pill.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
          pill.classList.add('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
        }
      });
    }

    renderGridModal() {
      if (!this.gridContainer) return;
      this.gridContainer.innerHTML = '';

      SLIDES_METADATA.forEach((meta, idx) => {
        const card = document.createElement('div');
        card.className = `p-4 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
          idx === this.currentIndex 
            ? 'bg-blue-900/40 border-blue-500 ring-2 ring-blue-400 text-white shadow-lg' 
            : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
        }`;
        card.innerHTML = `
          <div>
            <div class="flex items-center justify-between text-xs font-mono mb-2">
              <span class="px-2 py-0.5 rounded bg-slate-900/80 font-bold ${idx === this.currentIndex ? 'text-blue-300' : 'text-slate-400'}">
                SLIDE ${String(meta.id).padStart(2, '0')}
              </span>
              <span class="text-base">${meta.icon}</span>
            </div>
            <p class="text-sm font-semibold leading-snug line-clamp-2">${meta.title}</p>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 truncate">
            ${meta.section}
          </div>
        `;
        card.addEventListener('click', () => {
          this.goToSlide(idx);
          this.closeGrid();
        });
        this.gridContainer.appendChild(card);
      });
    }

    openGrid() {
      if (!this.gridModal) return;
      this.renderGridModal();
      this.gridModal.classList.remove('hidden');
    }

    closeGrid() {
      if (!this.gridModal) return;
      this.gridModal.classList.add('hidden');
    }

    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn(`Error al activar pantalla completa: ${err.message}`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    setupEventListeners() {
      // Botones de navegación
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
      if (this.fullscreenBtn) this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
      if (this.gridBtn) this.gridBtn.addEventListener('click', () => this.openGrid());
      if (this.closeGridBtn) this.closeGridBtn.addEventListener('click', () => this.closeGrid());

      // Píldoras de navegación por sección en el header
      document.querySelectorAll('.section-nav-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const targetIndex = parseInt(pill.getAttribute('data-target-slide'), 10);
          if (!isNaN(targetIndex)) {
            this.goToSlide(targetIndex - 1);
          }
        });
      });

      // Atajos de teclado para la exposición
      window.addEventListener('keydown', (e) => {
        // Ignorar si está en un campo de texto
        if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
          return;
        }

        // Si el modal de diagrama o el grid están abiertos
        const diagramModal = document.getElementById('diagramModal');
        const isDiagramModalOpen = diagramModal && !diagramModal.classList.contains('hidden');
        const isGridModalOpen = this.gridModal && !this.gridModal.classList.contains('hidden');

        if (e.key === 'Escape') {
          if (isDiagramModalOpen) {
            window.closeDiagramModal();
            return;
          }
          if (isGridModalOpen) {
            this.closeGrid();
            return;
          }
        }

        if (isDiagramModalOpen) return; // No cambiar de diapositiva mientras inspecciona el diagrama

        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          e.preventDefault();
          this.next();
        } else if (e.key === 'ArrowLeft' || (e.key === ' ' && e.shiftKey) || e.key === 'PageUp') {
          e.preventDefault();
          this.prev();
        } else if (e.key.toLowerCase() === 'f') {
          e.preventDefault();
          this.toggleFullscreen();
        } else if (e.key.toLowerCase() === 'g') {
          e.preventDefault();
          if (isGridModalOpen) {
            this.closeGrid();
          } else {
            this.openGrid();
          }
        } else if (e.key === 'Home') {
          e.preventDefault();
          this.goToSlide(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
        }
      });

      // Sincronizar popstate (botones atrás/adelante del navegador)
      window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#slide-')) {
          const slideNum = parseInt(hash.replace('#slide-', ''), 10);
          if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= this.totalSlides) {
            this.currentIndex = slideNum - 1;
            this.updateSlideView();
          }
        }
      });
    }
  }

  // ==========================================
  // 3. CONTROLADOR INTERACTIVO DE PAN & ZOOM
  // ==========================================
  class PanZoomViewer {
    constructor(container) {
      this.container = container;
      this.viewport = container.querySelector('.pan-zoom-viewport');
      this.stage = container.querySelector('.pan-zoom-stage');
      this.img = container.querySelector('.diagram-image');
      
      this.zoomBadge = container.querySelector('.zoom-level-badge');
      this.btnIn = container.querySelector('.btn-zoom-in');
      this.btnOut = container.querySelector('.btn-zoom-out');
      this.btnReset = container.querySelector('.btn-zoom-reset');
      this.btnModal = container.querySelector('.btn-zoom-modal');

      this.scale = 1.0;
      this.panX = 0;
      this.panY = 0;

      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;

      container._panZoomInstance = this;
      this.init();
    }

    init() {
      if (!this.viewport || !this.stage) return;

      // Eventos de arrastre con ratón (Pan)
      this.viewport.addEventListener('mousedown', (e) => this.onMouseDown(e));
      window.addEventListener('mousemove', (e) => this.onMouseMove(e));
      window.addEventListener('mouseup', () => this.onMouseUp());

      // Zoom con rueda del ratón centrado en el cursor
      this.viewport.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

      // Botones de la barra de herramientas
      if (this.btnIn) this.btnIn.addEventListener('click', (e) => { e.stopPropagation(); this.zoom(1.25); });
      if (this.btnOut) this.btnOut.addEventListener('click', (e) => { e.stopPropagation(); this.zoom(0.8); });
      if (this.btnReset) this.btnReset.addEventListener('click', (e) => { e.stopPropagation(); this.reset(); });

      // Doble clic para restablecer rápidamente
      this.viewport.addEventListener('dblclick', (e) => {
        if (e.target.closest('button')) return;
        this.reset();
      });

      // Botón para maximizar en modal de pantalla completa
      if (this.btnModal) {
        this.btnModal.addEventListener('click', (e) => {
          e.stopPropagation();
          const title = this.container.getAttribute('data-diagram-title') || 'Diagrama de Arquitectura';
          const src = this.img ? this.img.getAttribute('src') : '';
          window.openDiagramModal(title, src);
        });
      }

      this.update();
    }

    onMouseDown(e) {
      if (e.button !== 0) return; // Sólo clic izquierdo
      this.isDragging = true;
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
      this.viewport.classList.add('is-dragging');
    }

    onMouseMove(e) {
      if (!this.isDragging) return;
      this.panX = e.clientX - this.startX;
      this.panY = e.clientY - this.startY;
      this.update();
    }

    onMouseUp() {
      if (this.isDragging) {
        this.isDragging = false;
        this.viewport.classList.remove('is-dragging');
      }
    }

    onWheel(e) {
      e.preventDefault();
      const rect = this.viewport.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      const factor = e.deltaY < 0 ? 1.15 : 0.87;
      const newScale = Math.min(Math.max(this.scale * factor, 0.35), 7.0);

      // Ajuste de pan focal
      this.panX = mouseX - (mouseX - this.panX) * (newScale / this.scale);
      this.panY = mouseY - (mouseY - this.panY) * (newScale / this.scale);
      this.scale = newScale;

      this.update();
    }

    zoom(factor) {
      this.scale = Math.min(Math.max(this.scale * factor, 0.35), 7.0);
      this.update();
    }

    reset() {
      this.scale = 1.0;
      this.panX = 0;
      this.panY = 0;
      this.update();
    }

    update() {
      if (this.stage) {
        this.stage.style.transform = `translate3d(${this.panX}px, ${this.panY}px, 0px) scale(${this.scale})`;
      }
      if (this.zoomBadge) {
        this.zoomBadge.textContent = `${Math.round(this.scale * 100)}%`;
      }
    }
  }

  // ==========================================
  // 4. MODAL DE PANTALLA COMPLETA PARA DIAGRAMAS
  // ==========================================
  const diagramModal = document.getElementById('diagramModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalContainer = document.getElementById('modalPanZoomContainer');
  const closeModalBtn = document.getElementById('closeModalBtn');

  let modalPanZoomInstance = null;
  if (modalContainer) {
    modalPanZoomInstance = new PanZoomViewer(modalContainer);
  }

  window.openDiagramModal = function(title, src) {
    if (!diagramModal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalImg) {
      modalImg.src = src;
      modalImg.alt = title;
    }
    diagramModal.classList.remove('hidden');
    if (modalPanZoomInstance) {
      modalPanZoomInstance.reset();
    }
  };

  window.closeDiagramModal = function() {
    if (!diagramModal) return;
    diagramModal.classList.add('hidden');
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => window.closeDiagramModal());
  }

  // ==========================================
  // 5. INICIALIZAR TODOS LOS CONTENEDORES PAN & ZOOM
  // ==========================================
  document.querySelectorAll('.pan-zoom-container').forEach(container => {
    if (container.id !== 'modalPanZoomContainer') {
      new PanZoomViewer(container);
    }
  });

  // ==========================================
  // 6. MICRO-INTERACCIONES Y TABS EN DIAPOSITIVAS
  // ==========================================

  // Tab Handler Genérico para elementos con data-tab-group
  document.querySelectorAll('[data-tab-target]').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const group = tabBtn.getAttribute('data-tab-group');
      const targetId = tabBtn.getAttribute('data-tab-target');

      // Desactivar todos los botones del grupo
      document.querySelectorAll(`[data-tab-group="${group}"]`).forEach(btn => {
        btn.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-sm', 'border-blue-600');
        btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });

      // Activar botón pulsado
      tabBtn.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-sm', 'border-blue-600');
      tabBtn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');

      // Ocultar contenidos del grupo y mostrar el activo
      document.querySelectorAll(`[data-tab-content="${group}"]`).forEach(content => {
        content.classList.add('hidden');
      });
      const activeContent = document.getElementById(targetId);
      if (activeContent) {
        activeContent.classList.remove('hidden');
      }
    });
  });

  // Filtro de Transiciones en Diagrama de Estados (Slide 18)
  const stateFilterButtons = document.querySelectorAll('.state-filter-btn');
  stateFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      stateFilterButtons.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-600');
      });
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-600');

      const rows = document.querySelectorAll('.state-transition-row');
      rows.forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
        } else {
          const cat = row.getAttribute('data-category');
          row.style.display = (cat === filter) ? '' : 'none';
        }
      });
    });
  });

  // ==========================================
  // 7. INICIALIZAR LA APLICACIÓN
  // ==========================================
  const slideDeck = new SlideDeck();
  window.slideDeck = slideDeck; // Disponible en consola global para debugging
});
