import { useEffect,useRef,useState,useCallback,useMemo,useContext} from "react";

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



export  function Pagina() {
const mensaje = "Dante";
const [contador, setContador] = useState(0);
const actulizar =() => {
setContador(contador + 1);
if(contador === 5){
  alert(mensaje);
}else if(contador === 10){
alert(mensaje = "Vergirl");
}
}
  return (

    <div>
      <h1>{contador}</h1>
      <button onClick={actulizar}>click</button>
    </div>
  )

}

export function context () {
  const valor = useContext(context);
  return(
    <div>
      <h1>{valor}</h1>
    </div>
  )
}




