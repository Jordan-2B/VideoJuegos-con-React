import { useEffect,useRef,useState,useCallback,useMemo} from "react";


export function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return <h1>{hora.toLocaleTimeString()}</h1>;
}

export function Ejercicio (){

const[contador, setContador] = useState (false);
const [aumento,setAumento] = useState(100);

const handleClick = useCallback(() => {
  console.log("El botón ha sido clickeado ", aumento);
  setAumento((preaumento) => preaumento + 100);
}, []);
return(
<div>
  {contador &&(
    alert("El estado ha cambiado a verdadero")
  )}
  <button onClick={handleClick}>Aumentar</button>
  <p>Aumento: {aumento}</p>
<button onClick={()=> setContador(!contador)}>Cambiar estado</button>
<p>{contador ? "El estado es verdadero" : "El estado es falso"}</p>

</div>
);
}

export  function Click() {

const Button = ({ onClick }) => {
  console.log("Renderizando botón");
  return <button onClick={onClick}>Incrementar</button>;
};

  const [count, setCount] = useState(0);
  const [texto, setTexto] = useState("");

  const incrementar = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h1>Contador: {count}</h1>

      <Button onClick={incrementar} />

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe algo..."
      />
    </div>
  );
}

export  function Ejemplousemome() {
  const [count, setCount] = useState(0);
  const [texto, setTexto] = useState("");

  const numeros = [1, 2, 3, 4, 5];

  const suma = useMemo(() => {
    console.log("Calculando suma...");
    return numeros.reduce((acc, n) => acc + n, 0);
  }, [numeros]);

  return (
    <div>
      <h1>Contador: {count}</h1>
      <h2>Suma: {suma}</h2>

      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe algo..."
      />
    </div>
  );
}