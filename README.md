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

## 🌐 Despliegue en Vercel (Producción)

El proyecto está configurado y optimizado con `vercel.json` para desplegarse como sitio estático de alto rendimiento en el Edge Network de Vercel.

### Opción A: Despliegue Continuo vía GitHub (Recomendado)
Dado que el repositorio ya está conectado a GitHub (`https://github.com/quezadasebastian/PresentacionDSI`):
1. Haz un commit y push de tus cambios a la rama `main`:
   ```bash
   git add .
   git commit -m "feat: preparar proyecto para despliegue en Vercel"
   git push origin main
   ```
2. Entra a [vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"Add New..."** > **"Project"**.
4. Selecciona el repositorio **`PresentacionDSI`**.
5. Deja los valores por defecto (**Framework Preset:** `Other`, **Root Directory:** `./`) y haz clic en **Deploy**.
6. ¡Listo! Vercel te entregará una URL pública (ejemplo: `https://presentacion-dsi.vercel.app`) con HTTPS y CDN global.

### Opción B: Despliegue Directo con la CLI de Vercel
Si tienes Node.js instalado, puedes desplegar desde tu terminal ejecutando:
```bash
# Instalar o ejecutar la CLI de Vercel
npx vercel
```
- Acepta los prompts por defecto presionando `Enter`.
- Para desplegar a producción directa:
```bash
npx vercel --prod
```

---

## 🛠️ Ejecución Local

### Método 1: Abrir directamente el archivo
Simplemente haz doble clic en `index.html` para abrirlo en Chrome, Edge o Firefox.

### Método 2: Servidor Local con Node.js
```bash
npx serve .
# o con el script npm:
npm start
```
Abre en tu navegador: `http://localhost:3000`

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
