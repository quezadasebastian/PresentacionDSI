# 🚀 Presentación Interactiva: Service Desk TI (UNMSM - FISI)

> **Diseño de Sistemas de Información (DSI 2026-2)**  
> **Caso Asignado B:** Sistema de Mesa de Ayuda de TI (Service Desk) - Oficina General de Tecnologías de la Información (OGTI).  
> **Docente:** Ing. Teodoro Andrade Mogollon  
> **Equipo de Proyecto (Grupo 5):**
> - Rodrigo Christopher Granda Salazar (24200017)
> - Sebastian Emanuel Quezada Pairazaman (24200030)
> - Juan Pablo Quispe Arango (24200121)
> - Luis Mario Saldaña Sánchez (24200038)
> - Milagros Sofia Treviño Alvarado (24200219)

---

## ⌨️ Atajos de Teclado durante la Exposición

| Tecla | Acción |
| :---: | :--- |
| `➡️` / `Espacio` / `PageDown` | Avanzar a la siguiente diapositiva |
| `⬅️` / `Shift + Espacio` / `PageUp` | Retroceder a la diapositiva anterior |
| `F` | Alternar modo **Pantalla Completa** (`Fullscreen API`) |
| `G` | Abrir el **Selector Rápido de Diapositivas (Grid Overview)** |
| `Esc` | Cerrar modales (Lightbox del diagrama o Grid) |
| `Home` / `End` | Ir a la primera / última diapositiva |

### 🔍 Controles de Diagramas (Pan & Zoom)
- **Rueda del ratón:** Zoom in / Zoom out focal sobre el punto del cursor.
- **Arrastre con clic izquierdo:** Desplazamiento libre por el lienzo arquitectónico.
- **Doble clic:** Restablecer zoom al 100%.
- **Botón Maximizar:** Abre el diagrama en modo Lightbox a pantalla completa con renderizado vectorial nativo sin pérdida.

---

## 📂 Estructura del Proyecto

```text
├── Assets/                 # Diagramas vectoriales (.svg) y mapa de bits Ultra-HD (.png)
├── index.html              # Slide deck interactivo (21 diapositivas semánticas)
├── styles.css              # Sistema de diseño, temas ITIL v4 y variables CSS
├── app.js                  # Motor de la presentación, Pan & Zoom y gestor de eventos
├── vercel.json             # Configuración de rutas, MIME types para SVG y caché en Edge
├── package.json            # Metadatos y scripts para Vercel y desarrollo local
└── .gitignore              # Archivos y carpetas excluidas de control de versiones
```
