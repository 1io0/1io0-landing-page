# 1io0 - Tech for Real Missions

> Landing page para 1io0: Soluciones tecnológicas innovadoras con impacto real.

Una experiencia web inmersiva construida con React, Three.js y TypeScript que presenta los servicios, capacidades y visión de 1io0.

## ✨ Características

- 🚀 **Escena 3D interactiva** con Three.js y React Three Fiber
- 🎨 **Diseño moderno** con animaciones suaves y efectos visuales
- 📱 **Completamente responsive** para todos los dispositivos
- ⚡ **Rendimiento optimizado** con Vite
- 🌐 **Soporte multiidioma** (i18n configurado)
- 🎯 **Navegación fluida** con scroll animations
- 📧 **Formulario de contacto** integrado con Google Apps Script

## 🛠️ Tecnologías

- **React** 18.2.0
- **TypeScript** 5.8.2
- **Vite** 6.2.0
- **Three.js** 0.160.0
- **React Three Fiber** 8.15.14
- **React Three Drei** 9.99.0

## 🚀 Inicio Rápido

### Requisitos previos

- Node.js (v16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd landing
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   **Opción A - Automático (recomendado):**
   ```powershell
   # Windows PowerShell
   .\setup-env.ps1
   ```
   ```bash
   # Mac/Linux
   chmod +x setup-env.sh
   ./setup-env.sh
   ```
   
   **Opción B - Manual:**
   ```bash
   # Copia el archivo de ejemplo
   cp .env.example .env
   
   # Edita .env y agrega tus credenciales reales
   # VITE_GOOGLE_SCRIPT_ID=tu_script_id_real
   ```
   
   📚 **Lee [ENV_BEST_PRACTICES.md](docs/ENV_BEST_PRACTICES.md) para más información**

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   
   Visita [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
landing/
├── components/          # Componentes React reutilizables
│   ├── SpaceScene.tsx   # Escena 3D principal
│   ├── VoyagerModel.tsx # Modelo 3D Voyager
│   ├── VoyagerSVG.tsx   # Versión SVG del Voyager
│   └── ui/              # Componentes UI
├── sections/            # Secciones de la landing page
│   ├── Hero.tsx         # Sección hero principal
│   ├── Services.tsx     # Servicios ofrecidos
│   ├── Capabilities.tsx # Capacidades técnicas
│   ├── Process.tsx      # Proceso de trabajo
│   ├── About.tsx        # Sobre nosotros
│   ├── Contact.tsx      # Formulario de contacto
│   ├── Quotes.tsx       # Citas inspiradoras
│   └── Footer.tsx       # Pie de página
├── data/                # Datos y contenido
├── lib/                 # Utilidades y configuración
├── assets/              # Recursos estáticos
└── App.tsx              # Componente principal
```

## 🎨 Características Principales

### Escena 3D Espacial
Una experiencia visual inmersiva con un modelo 3D del Voyager que flota en el espacio, creando una atmósfera futurista y tecnológica.

### Secciones Interactivas
- **Hero**: Presentación impactante con llamada a la acción
- **Services**: Catálogo de servicios ofrecidos
- **Capabilities**: Tecnologías y capacidades técnicas
- **Process**: Metodología de trabajo
- **About**: Historia y misión de 1io0
- **Contact**: Formulario de contacto funcional
- **Quotes**: Citas inspiradoras con diseño elegante

### Animaciones y Transiciones
Todas las secciones incluyen animaciones de revelación al hacer scroll, creando una experiencia fluida y moderna.

## 📧 Configuración del Formulario de Contacto

El formulario de contacto está integrado con Google Apps Script. Para configurarlo:

1. Consulta [GOOGLE_APPS_SCRIPT_SETUP.md](docs/GOOGLE_APPS_SCRIPT_SETUP.md)
2. Copia el código de [google-apps-script.js](docs/google-apps-script.js)
3. Configura el script en Google Apps Script
4. Actualiza el `VITE_GOOGLE_SCRIPT_ID` en tu archivo `.env`

## 🔐 Variables de Entorno

Este proyecto usa variables de entorno para manejar configuraciones sensibles.

### Desarrollo Local

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Completa los valores reales en `.env`

### Deployment en Producción

**Nunca incluyas credenciales reales en archivos versionados.** Configura las variables en tu plataforma de deployment:

#### Vercel
```bash
vercel env add VITE_GOOGLE_SCRIPT_ID
```

O desde el dashboard: Settings → Environment Variables

#### Netlify
```bash
netlify env:set VITE_GOOGLE_SCRIPT_ID "tu_valor"
```

O desde el dashboard: Site settings → Environment variables

#### GitHub Actions
Agrega secrets en: Repository → Settings → Secrets and variables → Actions

### Variables Disponibles

- `VITE_GOOGLE_SCRIPT_ID`: ID del Google Apps Script para el formulario de contacto


## 🌐 Deployment

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Opciones de Hosting

Este proyecto puede desplegarse en:
- **Vercel** (recomendado para proyectos Vite)
- **Netlify**
- **GitHub Pages**
- **Google Cloud Platform**
- Cualquier servicio de hosting estático

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y propiedad de 1io0.

## 📞 Contacto

1io0 - Tech for Real Missions

Para consultas o soporte, visita nuestra [página de contacto](https://www.1io0.com/#contact).

---

<div align="center">
Hecho con ❤️ por el equipo de 1io0
</div>
