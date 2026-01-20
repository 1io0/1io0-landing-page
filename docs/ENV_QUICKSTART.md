# 🔐 Gestión de Variables de Entorno - Resumen Rápido

## ✅ La Estrategia Correcta

```
┌─────────────────────────────────────────────────────────────┐
│  Archivo                │  Git  │  Contiene  │  Propósito   │
├─────────────────────────────────────────────────────────────┤
│  .env                   │  ❌   │  Reales    │  Dev local   │
│  .env.example           │  ✅   │  Ejemplos  │  Template    │
│  .env.development       │  ✅   │  Dev/Test  │  CI/CD dev   │
│  .env.production        │  ✅   │  Placeh.   │  Referencia  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Setup Rápido

### Para nuevos desarrolladores

```powershell
# 1. Clonar repo
git clone <url>
cd landing

# 2. Setup automático
.\setup-env.ps1

# 3. Instalar y ejecutar
npm install
npm run dev
```

## 📋 Checklist de Seguridad

- [ ] `.env` está en `.gitignore`
- [ ] `.env.example` tiene placeholders (no valores reales)
- [ ] Valores reales solo en `.env` local
- [ ] Variables de producción en plataforma de deployment (Vercel/Netlify)
- [ ] No compartir `.env` por Slack/email/screenshots

## 🌍 Por Entorno

### Desarrollo Local
```bash
# .env (no versionado)
VITE_GOOGLE_SCRIPT_ID=<tu_id_real_de_dev>
```

### Staging/Producción
```bash
# Configura en tu plataforma:
Vercel Dashboard → Settings → Environment Variables
Netlify Dashboard → Site settings → Environment variables
```

## 🆘 Emergencia: Key Filtrada

```bash
# 1. Revocar key inmediatamente en el servicio
# 2. Generar nueva key
# 3. Actualizar en todos los entornos
# 4. Si se commiteó, limpiar historial:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

## 📚 Recursos

- **Guía completa**: [ENV_BEST_PRACTICES.md](ENV_BEST_PRACTICES.md)
- **Setup de contacto**: [GOOGLE_APPS_SCRIPT_SETUP.md](GOOGLE_APPS_SCRIPT_SETUP.md)
- **Vite Env Vars**: https://vitejs.dev/guide/env-and-mode.html

## 💡 Tips Pro

1. **Usa diferentes keys por entorno** (dev, staging, prod)
2. **Rota keys regularmente** (cada 3-6 meses)
3. **Documenta cada variable** en `.env.example`
4. **Usa 1Password/LastPass** para compartir keys en el equipo
5. **Prefijo `VITE_`** es obligatorio para variables en el cliente

## ❓ FAQ

**P: ¿Por qué mis variables son `undefined`?**  
R: Asegúrate que empiecen con `VITE_` y reinicia el dev server.

**P: ¿Debo versionar `.env.development`?**  
R: Sí, si solo tiene valores de prueba que no son sensibles.

**P: ¿Cómo comparto keys con mi equipo?**  
R: Usa un gestor de contraseñas o herramientas como dotenv-vault.

---

**¿Dudas?** Consulta la [guía completa](ENV_BEST_PRACTICES.md) o contacta al equipo.
