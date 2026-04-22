# Prueba Avanzada de React: Maestría en useState + useEffect (Solo estos dos hooks)

## Objetivo de la Prueba

Evaluar si el candidato **realmente domina** React a bajo nivel:
- Gestión de estado compleja con **solo** `useState`
- Efectos secundarios, timers, async, cleanup y dependency arrays con **solo** `useEffect`
- **Abstracción fuerte en JavaScript/TypeScript** (closures, actualizaciones inmutables, funciones puras, comparadores custom, manejo de fechas, etc.)
- Orquestación de múltiples estados y efectos **interconectados** sin que exploten en bucles infinitos, stale closures o memory leaks.

Cualquier solución que use `useRef`, `useMemo`, `useCallback`, custom hooks o patrones copiados de internet fallará en varios puntos. Se requiere pensamiento original y comprensión profunda.

---

## Restricciones Estrictas (0 puntos si se violan)

- **ÚNICAMENTE** `useState` y `useEffect`.
- Prohibido: `useRef`, `useMemo`, `useCallback`, `useContext`, `useReducer`, custom hooks, librerías externas (ni date-fns, ni uuid, ni nada).
- Todo estado debe actualizarse de forma **inmutable**.
- Código 100% TypeScript con tipos estrictos (`noImplicitAny`, interfaces completas, `Record<string, string>` para errores, etc.).
- Sin `any`. Sin `as any`.

---

## Escenario: AdvancedTaskManager

Implementa un componente que simula una aplicación de tareas tipo **Kanban + Dashboard inteligente** con las siguientes características **altamente interconectadas**:

Todas las funcionalidades deben funcionar **juntas** sin problemas. Cambiar una tarea debe impactar inmediatamente:
- Filtros y búsqueda
- Estadísticas
- Historial undo/redo
- Auto-guardado
- Temporizadores
- Estados de vencimiento

---

## Los 10 Requisitos (cada uno = 1 punto)

### 1. Estados y Tipos (1 punto)
Define las siguientes interfaces y estados:

```ts
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;      // ISO 8601
  createdAt: string;    // ISO 8601
  startTime?: string;   // ISO 8601 (solo cuando status === 'in-progress')
}

interface FormData {
  id?: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface Filters {
  status: 'all' | 'todo' | 'in-progress' | 'done';
  priority: 'all' | 'low' | 'medium' | 'high';
  searchTerm: string;
}
```

**Estados obligatorios (mínimo):**
-  `tasks` 
- `formData` 
- `filters`
- `history: Task[][]` (máximo 5 snapshots)
- `redoStack: Task[][]`
-  `now: Date` 
- `isLoading` 
- `error: string | null`
- `isSaving`
- `lastSaved: Date | null`
- `debouncedSearchTerm`

### 2. Carga Inicial + Simulación de Error + Retry (1 punto)
- `useEffect` con `[]` que:
  - Pone `isLoading = true`
  - Espera 800ms (simula red)
  - Carga 7 tareas iniciales variadas (incluye overdue, high priority, in-progress, etc.)
  - Maneja un estado de error simulado (botón "Simular Error de Red" que fuerza `error` en la siguiente carga)
- Muestra spinner durante loading
- UI de error con botón **Reintentar** que vuelve a ejecutar la carga
- Si hay error, no muestra datos

### 3. Formulario con Validación en Tiempo Real + Reglas Complejas (1 punto)
Formulario controlado completo con:
- Campos: `title`, `description`, `priority` (select), `dueDate` (type="date")
- **Validación en tiempo real** usando `useEffect` que depende de `formData`:
  - `title`: mínimo 5 caracteres + debe ser único (no puede existir otra tarea con el mismo título, excepto la que se está editando)
  - `dueDate`: debe ser al menos 24 horas en el futuro
  - Si `priority === 'high'`: `dueDate` debe ser máximo 7 días desde hoy
  - Si `description` tiene contenido: mínimo 20 caracteres
- Muestra errores por campo debajo de cada input
- Botón **Guardar** (deshabilitado si hay errores)
- Modo edición: Al hacer click en cualquier tarea → precarga el formulario y cambia a "Editando"
- Al guardar en modo edición → actualiza la tarea existente (inmutable)
- Botón Cancelar que limpia el formulario y sale de modo edición

### 4. Búsqueda con Debounce Real + Filtros + Ordenamiento (1 punto)
- Input de búsqueda que actualiza `searchTerm` inmediatamente (para UX fluida)
- `useEffect` que hace debounce de 300ms y actualiza `debouncedSearchTerm`
- Filtrado real usando `debouncedSearchTerm` + filtros de status y priority
- **Ordenamiento avanzado** (implementar comparador custom):
  - Por defecto: `dueDate` ascendente
  - Opción para ordenar por `priority` (high > medium > low) + `dueDate` como tiebreaker
  - Opción para ordenar por `createdAt` descendente
- La lista filtrada y ordenada se calcula **en cada render** (sin useMemo) usando funciones puras de JS (`filter`, `sort` con comparador complejo)

### 5. Vista Kanban + Movimiento de Tareas (1 punto)
- 3 columnas visuales: **To Do** | **In Progress** | **Done**
- Cada columna muestra solo las tareas que corresponden a su status (después de aplicar filtros)
- En cada tarjeta de tarea:
  - Título, prioridad (con color), dueDate formateada, descripción truncada
  - Badge de estado de vencimiento (ver punto 6)
  - Botones contextuales:
    - Si está en "todo" → botón "Iniciar" (mueve a in-progress y setea `startTime`)
    - Si está en "in-progress" → botones "Pausar" (vuelve a todo) y "Completar" (a done)
    - Si está en "done" → botón "Reabrir" (a todo)
- Todas las actualizaciones **inmutables** + captura de historial (ver punto 7)

### 6. Temporizadores en Vivo + Estados de Vencimiento (1 punto)
- `useEffect` con `setInterval(1000)` que actualiza `now` cada segundo (cleanup correcto)
- Para tareas en "in-progress":
  - Calcula y muestra **Elapsed: MM:SS** usando `now` y `startTime`
  - El tiempo se actualiza en vivo sin mutar el estado de la tarea
- Estados de vencimiento (calculados con `now`):
  - **OVERDUE** (rojo fuerte): `dueDate < now` y status !== 'done'
  - **Due Soon** (amarillo): `dueDate` está entre ahora y 48 horas
  - **On Track** (verde): resto
- Estos badges deben actualizarse automáticamente cada segundo

### 7. Undo / Redo con Historial Limitado (1 punto)
Implementación **sin useRef** usando solo closures + functional updates:

- Al hacer **cualquier** cambio (agregar, editar, mover, eliminar):
  ```ts
  setHistory(prev => [tasks, ...prev].slice(0, 5));
  setRedoStack([]); // limpiar redo
  setTasks(nuevoEstado);
  ```
- **Undo**:
  - Toma el último snapshot de `history`
  - Mueve el estado actual a `redoStack`
  - Restaura `tasks` al snapshot
  - Elimina ese snapshot de history
- **Redo**:
  - Toma el último de `redoStack`
  - Mueve estado actual a `history`
  - Restaura desde redoStack
- Botones deshabilitados cuando no hay nada que deshacer/rehacer
- Historial máximo 5 pasos (no más)

### 8. Auto-Guardado con Debounce + Simulación Async (1 punto)
- `useEffect` que depende de `tasks`:
  - Cada vez que `tasks` cambia → programa un `setTimeout(2000)`
  - Si llega otro cambio antes de 2 segundos → **cancela** el timer anterior (cleanup)
  - Esto es debounce real de auto-guardado
- Dentro del timeout:
  - `isSaving = true`
  - Simula llamada a API con `new Promise(resolve => setTimeout(resolve, 600))`
  - Al terminar: `isSaving = false`, `lastSaved = new Date()`, `console.log('✅ Guardado en servidor', tasks)`
- UI:
  - Badge "Guardando..." mientras `isSaving`
  - "Guardado hace X minutos" (calculado con `now` y `lastSaved`)
- Debe manejar correctamente múltiples cambios seguidos sin guardar versiones intermedias

### 9. Panel de Estadísticas en Tiempo Real (1 punto)
Muestra (actualizado automáticamente):

- Total de tareas
- % completadas (`done / total * 100`)
- Conteo por prioridad (High: X, Medium: Y, Low: Z)
- **Overdue count** (usando `now`)
- Tiempo promedio en progreso de las tareas actualmente "in-progress" (calculado con `now` y `startTime`)
- Tarea más urgente (la que tiene dueDate más cercano y no está done)

Todo calculado con `reduce`, `filter`, `map` y lógica pura de JS en el render (o en funciones helper puras).

### 10. Calidad, Abstracción y Robustez (1 punto)
Se evalúa:

- **Abstracción**: Mínimo 4 funciones puras helper fuera o dentro del componente:
  - `validateForm(formData, tasks): Record<string, string>`
  - `getFilteredAndSortedTasks(tasks, filters, debouncedSearchTerm): Task[]`
  - `computeStats(tasks, now): Stats`
  - `formatElapsed(startTime, now): string`
- Código limpio, bien indentado, con comentarios explicando closures y efectos críticos
- Manejo de **todos** los edge cases:
  - Lista vacía
  - Undo cuando history está vacío
  - Título duplicado
  - Fechas inválidas
  - Muchas tareas (al menos 15 para probar rendimiento)
- Keys correctas en listas
- Sin warnings de React en consola
- El componente es **completamente funcional** y se puede copiar-pegar en un proyecto Create React App / Vite + TypeScript

---

## Estructura Recomendada del Archivo

```tsx
import React, { useState, useEffect } from 'react';

// Interfaces aquí

const AdvancedTaskManager: React.FC = () => {
  // 1. Todos los useState

  // 2. Funciones helper puras (validateForm, getFiltered..., computeStats, etc.)

  // 3. Funciones de mutación que capturan historial (addOrUpdateTask, moveTask, deleteTask, undo, redo)

  // 4. useEffects (carga inicial, now interval, debounce search, auto-save, validación en tiempo real)

  // 5. JSX completo (Header + Stats + Form + Filtros + Kanban 3 columnas + Historial)

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      {/* UI completa */}
    </div>
  );
};

export default AdvancedTaskManager;
```

---

## Criterios de Evaluación

| Punto | Criterio                                                                 | Peso |
|-------|--------------------------------------------------------------------------|------|
| 1-9   | Cumple el requisito exactamente como se describe                         | 1    |
| 10    | Código profesional, abstracción, sin bugs, edge cases cubiertos          | 1    |
| Extra | Bonus: Implementa "Eliminar tarea" con confirmación y captura en historial | +0.5 |

**Nota importante para el evaluador:**  
Si el candidato usa `useRef` en cualquier parte → **0 puntos** en el requisito correspondiente (aunque funcione).  
La gracia de esta prueba es resolverlo **sin** `useRef`.

---

## Datos Iniciales Sugeridos (copia y adapta)

```ts
const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Diseñar nueva landing page',
    description: 'Crear mockups en Figma y presentar al equipo',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-04-25T00:00:00.000Z',
    createdAt: '2026-04-18T10:00:00.000Z',
    startTime: '2026-04-21T09:30:00.000Z'
  },
  // ... agrega 6 más variadas (incluye overdue, done, low priority, etc.)
];
```

---

**Fin de la prueba.**

