import React, { useState } from 'react'

export default function Filtros
() {

const [verdadero,setVerdadero] = useState(true);


  return (
    <div>
        <form /*method="post"*/>
            <input type="text" id='nombre' placeholder="Buscar por nombre"/>

            <select name="estado" id="estado">
                <option value="">Todo</option>
                <option value="estado1">Terminado</option>
                <option value="estado2">Pendiente</option>
                <option value="estado3">En Proceso</option>
            </select>

            <select name="prioridad" id="prioridad">
                <option value="">Todo</option>  
                <option value="prioridad1">Bajo</option>
                <option value="prioridad2">Medio</option>
                <option value="prioridad3">Alto</option>
            </select>

            <button>Filtrar</button>
             
        </form>

        {verdadero && (
    <form method="post">
        <input type="text" placeholder="Agrege Nombre"/>

        <input type="text" placeholder="Agrege un descripcion"/>

        <select placeholder="Agrege un estado">
            <option value="estado1">Terminado</option>
            <option value="estado2">Pendiente</option>
            <option value="estado3">En Proceso</option>
        </select>

        <select value="prioridad" placeholder="Agrege una categoria">
            <option value="prioridad1">Bajo</option>
            <option value="prioridad2">Medio</option>
            <option value="prioridad3">Alto</option>
        </select>
           <input type="datetime-local" name="startTime" />

    </form>
)}
<button onClick={() => setVerdadero(!verdadero)}>{verdadero ? 'Ocultar' : 'Mostrar'} Formulario</button>
    </div>
  )
}
