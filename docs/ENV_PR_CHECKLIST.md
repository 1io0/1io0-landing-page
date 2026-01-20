# Pull Request - Checklist de Variables de Entorno

Usa este checklist cuando tu PR incluya cambios relacionados con variables de entorno.

## ✅ Pre-PR Checklist

### Archivos
- [ ] `.env` NO está incluido en el commit
- [ ] `.env.example` actualizado con nuevas variables (si aplica)
- [ ] `.env.development` actualizado (si aplica)
- [ ] Placeholders usados en archivos versionados (no valores reales)

### Documentación
- [ ] Variables documentadas en README.md (sección "Variables de Entorno")
- [ ] Comentarios claros en `.env.example` explicando cada variable
- [ ] Link a documentación adicional si la variable es compleja

### Código
- [ ] Variables accedidas correctamente (`import.meta.env.VITE_*` en Vite)
- [ ] No hay valores hardcodeados de keys/secrets en el código
- [ ] Variables tienen valores por defecto o manejo de errores si son undefined

### Testing
- [ ] Tests locales pasan con las nuevas variables
- [ ] Build de producción funciona (`npm run build`)
- [ ] Preview build funciona (`npm run preview`)

### Deployment
- [ ] Variables configuradas en Vercel/Netlify (producción)
- [ ] Variables configuradas en preview environments (si aplica)
- [ ] CI/CD actualizado con nuevas secrets (GitHub Actions, etc.)

### Comunicación
- [ ] Equipo notificado de nuevas variables requeridas
- [ ] Instrucciones claras en la descripción del PR
- [ ] Valores de desarrollo compartidos de forma segura (1Password, etc.)

### Seguridad
- [ ] No hay keys expuestas en el PR
- [ ] No hay keys en comentarios de código
- [ ] No hay keys en mensajes de commit

## 📋 Descripción del PR (Template)

```markdown
## Cambios en Variables de Entorno

### Variables Agregadas
- `VITE_NEW_VARIABLE`: [Descripción]
  - **Obtener desde**: [Fuente]
  - **Requerida**: Sí/No
  - **Valor de ejemplo**: `placeholder_value`

### Variables Modificadas
- `VITE_EXISTING_VARIABLE`: [Qué cambió]

### Variables Eliminadas
- `VITE_OLD_VARIABLE`: [Por qué se eliminó]

### Instrucciones para el Equipo

1. Actualiza tu `.env` local:
   ```bash
   # Opción A: Re-run setup
   .\setup-env.ps1
   
   # Opción B: Agregar manualmente
   echo "VITE_NEW_VARIABLE=tu_valor" >> .env
   ```

2. Obtén valores de desarrollo desde [ubicación segura]

3. Para producción, las variables ya están configuradas en [Vercel/Netlify]

### Testing

- [ ] Build local exitoso
- [ ] Tests pasan
- [ ] Preview deployment funcional

### Deployment Notes

Las siguientes variables necesitan ser configuradas en producción:
- `VITE_NEW_VARIABLE`: [Ya configurado / Pendiente]
```

## 🔄 Post-Merge Actions

Después de que el PR sea merged:

- [ ] Verificar que el deployment de producción es exitoso
- [ ] Confirmar que las nuevas variables funcionan en producción
- [ ] Actualizar [ENV_AUDIT_LOG.md](ENV_AUDIT_LOG.md) si aplica
- [ ] Notificar en el canal del equipo que el cambio está en producción

## ❌ Errores Comunes a Evitar

1. ❌ Commitear `.env` con valores reales
2. ❌ Hardcodear secrets en el código
3. ❌ Olvidar prefijo `VITE_` para variables del cliente
4. ❌ No documentar variables nuevas
5. ❌ No configurar variables en deployment antes de hacer merge
6. ❌ Compartir keys en descripciones de PR públicos
7. ❌ No notificar al equipo de nuevas variables requeridas

## 🆘 Si Algo Sale Mal

### Caso: Commiteé `.env` por error

```powershell
# 1. Remover del staging
git reset HEAD .env

# 2. Si ya fue committed pero no pushed
git reset --soft HEAD~1

# 3. Si ya fue pushed (cuidado!)
git rm --cached .env
git commit -m "Remove .env from tracking"
git push

# 4. Rotar las keys expuestas INMEDIATAMENTE
```

### Caso: Build falla en deployment

```bash
# 1. Verificar logs en Vercel/Netlify
# 2. Confirmar que todas las variables están configuradas
# 3. Re-deploy después de agregar variables faltantes
```

## 📞 Contacto

¿Dudas sobre variables de entorno? Contacta a:
- Lead del proyecto
- Canal de Slack: #dev-team

---

**Recursos**:
- [ENV_BEST_PRACTICES.md](ENV_BEST_PRACTICES.md)
- [ENV_QUICKSTART.md](ENV_QUICKSTART.md)
- [ENV_AUDIT_LOG.md](ENV_AUDIT_LOG.md)
