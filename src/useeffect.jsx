import { useEffect,useRef,useState,useCallback,useMemo,useContext} from "react";
import './button.css'

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

export function Myboton (){

const [estado, setEstado] = useState(false);
const [contador, setContador] = useState(false );

let mensaje1 ="Chainsaw Man";
let mensaje2 = "the god of high school";


const elige = (valor) => {
  setContador(valor);
  alert(valor ? mensaje1 : mensaje2);
};

const Cambios = ()=> {
  setEstado(!estado);
} 
return (
<div >

<h1>Anime</h1>
<p> que anime Pertenece</p>
{estado && (
  <div>
  <button className="btn"onClick={() => elige(true)}> Reze </button><br/><br/>
  <button className="btn1"onClick={() => elige(false)}> Mori Jin </button><br/><br/>
  </div>
)}


<button onClick={Cambios} >{estado ? "True" : "False"}</button>
</div>
  );
}