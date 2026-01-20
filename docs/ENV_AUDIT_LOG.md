# Registro de Auditoría - Variables de Entorno

> **IMPORTANTE**: Este archivo debe ser versionado. NO incluir valores reales de keys aquí.

## 📋 Formato de Entrada

```
YYYY-MM-DD | Variable | Acción | Entorno | Responsable | Notas
```

## 📝 Historial

### 2026-01

| Fecha      | Variable                | Acción   | Entorno    | Responsable | Notas                           |
|------------|-------------------------|----------|------------|-------------|---------------------------------|
| 2026-01-19 | VITE_GOOGLE_SCRIPT_ID   | Creada   | All        | Setup       | Configuración inicial           |
| 2026-01-19 | Sistema                 | Setup    | All        | Equipo      | Implementación de mejores prácticas |

---

## 🔄 Variables Activas

### VITE_GOOGLE_SCRIPT_ID
- **Propósito**: ID del Google Apps Script para formulario de contacto
- **Última rotación**: 2026-01-19
- **Próxima rotación**: 2026-07-19 (6 meses)
- **Documentación**: [GOOGLE_APPS_SCRIPT_SETUP.md](GOOGLE_APPS_SCRIPT_SETUP.md)
- **Entornos**: Development, Production

---

## 📅 Calendario de Rotación

| Variable                | Frecuencia | Próxima Rotación | Responsable |
|-------------------------|------------|------------------|-------------|
| VITE_GOOGLE_SCRIPT_ID   | 6 meses    | 2026-07-19       | TBD         |

---

## 🔐 Procedimiento de Rotación

1. **Generar nueva key** en el servicio correspondiente
2. **Actualizar en desarrollo**:
   - Tu `.env` local
   - Notificar al equipo
3. **Actualizar en producción**:
   - Dashboard de Vercel/Netlify
   - Verificar deployment exitoso
4. **Revocar key antigua** después de 24h (grace period)
5. **Documentar en este archivo** con fecha y responsable

---

## 🚨 Incidentes

### Template de Incidente

```markdown
#### YYYY-MM-DD - [Título del Incidente]

**Variable afectada**: [nombre]
**Tipo de incidente**: [Filtración / Uso indebido / Otro]
**Severidad**: [Baja / Media / Alta / Crítica]

**Descripción**:
[Qué pasó]

**Acciones tomadas**:
- [ ] Key revocada
- [ ] Nueva key generada
- [ ] Entornos actualizados
- [ ] Equipo notificado
- [ ] Historial de Git limpiado (si aplica)

**Lecciones aprendidas**:
[Qué aprendimos y cómo prevenir]

**Responsable**: [Nombre]
```

---

**Última actualización**: 2026-01-19
