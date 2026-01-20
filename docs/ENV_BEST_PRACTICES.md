# Guía de Mejores Prácticas: Variables de Entorno

## 📋 Tabla de Contenidos
- [¿Por qué no versionar archivos .env?](#por-qué-no-versionar-archivos-env)
- [Estructura de archivos](#estructura-de-archivos)
- [Flujo de trabajo](#flujo-de-trabajo)
- [Deployment](#deployment)
- [Seguridad](#seguridad)
- [Troubleshooting](#troubleshooting)

## 🔒 ¿Por qué no versionar archivos .env?

### ❌ Problemas de versionar .env con valores reales:
1. **Riesgo de seguridad**: Credenciales expuestas en el historial de Git
2. **Difícil de rotar**: Cambiar una key requiere commits
3. **Conflictos entre entornos**: Dev, staging y producción necesitan valores diferentes
4. **Compliance**: Viola políticas de seguridad empresarial (GDPR, SOC2, etc.)

### ✅ La solución correcta:
- `.env.example` → Versionado (sin valores reales)
- `.env` → Local, ignorado por Git
- `.env.development` → Versionado con valores de desarrollo/prueba (opcional)
- `.env.production` → Placeholder, valores reales en plataforma de deployment

## 📁 Estructura de archivos

```
landing/
├── .env                      # ❌ NO VERSIONADO - Valores locales reales
├── .env.example              # ✅ VERSIONADO - Template con placeholders
├── .env.development          # ✅ VERSIONADO - Valores para desarrollo
├── .env.production           # ✅ VERSIONADO - Placeholders para producción
└── .gitignore                # Incluye .env, .env.local, etc.
```

## 🔄 Flujo de trabajo

### Para nuevos desarrolladores

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd landing
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables locales**
   ```bash
   # En Windows (PowerShell)
   Copy-Item .env.example .env
   
   # En Mac/Linux
   cp .env.example .env
   ```

4. **Editar .env con valores reales**
   - Solicita las credenciales al lead del equipo
   - O usa las de desarrollo que te proporcionen
   - Nunca las compartas en canales públicos (Slack, email sin cifrar, etc.)

### Para agregar nuevas variables

1. **Agregar al .env.example con documentación**
   ```bash
   # Nueva variable para [propósito]
   # Obtén este valor desde [fuente]
   # Documentación: [link]
   VITE_NEW_VARIABLE=placeholder_value
   ```

2. **Documentar en README.md**
   - Qué hace la variable
   - Dónde obtener el valor
   - Si es requerida u opcional

3. **Actualizar tu .env local**
   ```bash
   VITE_NEW_VARIABLE=tu_valor_real
   ```

4. **Comunicar al equipo**
   - Notifica en el canal del equipo
   - Documenta en la wiki si existe
   - Actualiza las variables en plataformas de deployment

## 🚀 Deployment

### Vercel

1. **Desde la CLI**
   ```bash
   vercel env add VITE_GOOGLE_SCRIPT_ID
   # Ingresa el valor cuando lo solicite
   ```

2. **Desde el Dashboard**
   - Ve a tu proyecto en vercel.com
   - Settings → Environment Variables
   - Agrega cada variable con su valor
   - Selecciona los entornos (Production, Preview, Development)

### Netlify

1. **Desde la CLI**
   ```bash
   netlify env:set VITE_GOOGLE_SCRIPT_ID "tu_valor_real"
   ```

2. **Desde el Dashboard**
   - Site settings → Environment variables
   - Add a variable
   - Ingresa key y value
   - Deploy para aplicar cambios

### GitHub Actions / CI/CD

```yaml
# .github/workflows/deploy.yml
env:
  VITE_GOOGLE_SCRIPT_ID: ${{ secrets.VITE_GOOGLE_SCRIPT_ID }}

steps:
  - name: Build
    run: npm run build
```

Configura los secrets en:
- Repository → Settings → Secrets and variables → Actions

## 🔐 Seguridad

### ✅ Hacer
- Usar `.env.example` como template
- Rotar keys regularmente
- Usar diferentes keys para dev/staging/prod
- Almacenar secrets en gestores de contraseñas del equipo
- Auditar acceso a variables sensibles
- Usar herramientas como `dotenv-vault` para equipos

### ❌ No hacer
- Commitear archivos `.env` con valores reales
- Compartir keys en Slack/email sin cifrar
- Usar las mismas keys en todos los entornos
- Dejar keys hardcodeadas en el código
- Compartir tu `.env` por screenshot

### 🚨 Si una key se filtra

1. **Revocar inmediatamente** la key comprometida
2. **Generar nueva key** en el servicio
3. **Actualizar en todos los entornos**:
   - Tu `.env` local
   - Plataforma de deployment (Vercel/Netlify)
   - Comunicar al equipo
4. **Investigar el historial de Git**:
   ```bash
   # Si se commiteó por error
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Forzar push (cuidado!)
   git push origin --force --all
   ```

## 🔍 Troubleshooting

### "Variable undefined en build"

**Problema**: `import.meta.env.VITE_MY_VAR` es `undefined`

**Solución**:
1. Verifica que la variable empiece con `VITE_` (requerido por Vite)
2. Reinicia el dev server (`npm run dev`)
3. Verifica que `.env` esté en la raíz del proyecto
4. En producción, verifica que esté configurada en la plataforma

### "Build local funciona, pero deployment falla"

**Problema**: El build en Vercel/Netlify no tiene las variables

**Solución**:
1. Configura las variables en el dashboard de la plataforma
2. Re-deploy después de agregar variables
3. Verifica los logs de build

### "Git quiere commitear mi .env"

**Problema**: `.env` aparece en `git status`

**Solución**:
```bash
# Verificar .gitignore
cat .gitignore | Select-String ".env"

# Si no está, agregarlo
echo ".env" >> .gitignore

# Si ya fue trackeado antes
git rm --cached .env
git commit -m "Remove .env from tracking"
```

## 📚 Recursos adicionales

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [The Twelve-Factor App: Config](https://12factor.net/config)
- [OWASP: Secrets Management](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
- [dotenv-vault](https://www.dotenv.org/docs/security/vault) (para equipos)

## 🎯 Checklist para Pull Requests

Antes de crear un PR que incluya cambios en variables de entorno:

- [ ] `.env.example` actualizado con nuevas variables
- [ ] Documentación en README.md
- [ ] `.env` NO incluido en el commit
- [ ] Variables configuradas en plataforma de deployment
- [ ] Equipo notificado de nuevas variables requeridas
- [ ] Tests pasan con las nuevas variables

---

**Última actualización**: Enero 2026
**Mantenedor**: Equipo 1io0
