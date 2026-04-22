import React, { useState, useEffect } from 'react';
import './style.css';

export default function Actividad() {
  const [verdadero, setVerdadero] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [now, setNow] = useState(new Date());

useEffect(() => {
  const interval = setInterval(() => setNow(new Date()), 1000);
  return () => clearInterval(interval);
}, []);

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    searchTerm: ""
  });

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: ""
  });


  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/tareas")
      .then(res => res.json())
      .then(data => {
        setTareas(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error al cargar tareas");
        setIsLoading(false);
      });
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchTerm);
    }, 3000);
    return () => clearTimeout(timer); 
  }, [filters.searchTerm]);


  const saveSnapshot = () => {
    setHistory(prev => {
      const nuevaHistory = [...prev, tareas];
      return nuevaHistory.slice(-5); // máximo 5 snapshots
    });
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setRedoStack(prev => [...prev, tareas]);
    setTareas(previousState);
    setHistory(prev => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setHistory(prev => [...prev, tareas]);
    setTareas(nextState);
    setRedoStack(prev => prev.slice(0, -1));
  };

  

  // --- Crear tarea ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(formData.dueDate) < new Date()) {
      alert("No puedes poner una fecha pasada");
      return;
    }

    saveSnapshot();

    const nuevaTarea = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "in-progress"
    };

    setIsSaving(true);
    fetch("http://localhost:4000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTarea)
    })
      .then(res => res.json())
      .then(data => {
        setTareas([...tareas, data]);
        setIsSaving(false);
        setLastSaved(new Date());
        alert("Tarea creada");
      })
      .catch(() => {
        setError("Error al guardar la tarea");
        setIsSaving(false);
      });
  };

  // Filtrado usando debouncedSearchTerm
const tareasFiltradas = tareas.filter(t => {
const coincideNombre = t.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
const coincideStatus = filters.status === "all" || t.status === filters.status;
const coincidePriority = filters.priority === "all" || t.priority === filters.priority;
return coincideNombre && coincideStatus && coincidePriority;
  });

  return (
    <div className="app-container">

      <form>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
        />

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">Todo</option>
          <option value="done">Terminado</option>
          <option value="todo">Pendiente</option>
          <option value="in-progress">En Proceso</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="all">Todo</option>
          <option value="low">Bajo</option>
          <option value="medium">Medio</option>
          <option value="high">Alto</option>
        </select>
      </form>

      {/* Formulario de creación */}
      {verdadero && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Agregue Nombre"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <input
            type="text"
            placeholder="Agregue descripción"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <select
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="low">Bajo</option>
            <option value="medium">Medio</option>
            <option value="high">Alto</option>
          </select>

          <input
            type="date"
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />

          <button type="submit" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Crear Tarea"}
          </button>
        </form>
      )}

      <button onClick={() => setVerdadero(!verdadero)}>
        {verdadero ? 'Ocultar' : 'Mostrar'} Formulario
      </button>

      <button onClick={handleUndo} disabled={history.length === 0}>Deshacer</button>
      <button onClick={handleRedo} disabled={redoStack.length === 0}>Rehacer</button>

      {isLoading && <p>Cargando tareas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {lastSaved && <p>Último guardado: {lastSaved.toLocaleTimeString()}</p>}

      <div className="tareas-container">
  {tareasFiltradas.map((t) => (
    <div key={t.id} className="tarea-card">
      <h3>{t.title}</h3>
      <p>{t.description}</p>
      <p>Estado: {t.status}</p>
      <p>Prioridad: {t.priority}</p>
      <p>Fecha límite: {t.dueDate}</p>
      <p>Creado: {t.createdAt}</p>
    </div>
  ))}
</div>
    </div>
  );
}