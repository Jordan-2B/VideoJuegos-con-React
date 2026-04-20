import { useEffect,useRef,useState,useCallback,useMemo} from "react";



export const FollowMouse =() =>{
  const [enabled,setEnabled] = useState(false)
  const [position,setposition] = useState({ x : 0 , y : 0})

 useEffect(() => {
  console.log("Componente montado");

  return () => {
    console.log("desmontado");
  };
}, []);

  
 useEffect(() =>{
    console.log('effect', {enabled})

const handleMove = (event) => {
  const { clientX, clientY} = event  
console.log('handleMove', {clientX,clientY})
setposition({x :clientX, y : clientY})
}

if (enabled){
  window.addEventListener('pointermove',handleMove)
}

return ( )=> {
  window.removeEventListener('pointermove', handleMove)
}



  },[enabled])
return(
   <>
    <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(255, 0, 0, 0.55)',
        border: '1px solid #ff0055',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    
    />
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? 'Desactivado' : 'Activar'} Seguir puntero
      </button>
    </>
  )
}

function Mauser(){
  const [enabled, setEnabled] = useState(false);

  return(
    <main>
      <button onClick={() => setEnabled(prev => !prev)}>
        Toggle componente
      </button>

      {enabled && <FollowMouse />}
    </main>
  )
}
export default Mauser;

export function Usuarios() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        setUsers(data);
      } catch (err) {
        setError("Hubo un error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}



export function SegundoPlano() {
  const nombres = [
    {
     id: 1, nombre:'Jin Mori',poder: 1 ,
     id: 2, nombre: 'Sun Wukong (Rey Mono)', poder: 2 ,
    id:3, nombre:'Jaecheondaeseong', poder: 3 ,
    id:4, nombre:'Mori Dan', poder: 4
    }
  ];

  const[cadavez,setCadavez]= useState(0)
  

useEffect(() => {
  console.log(nombres[cadavez]);
}, [cadavez]);

const siguiente = ()=>{
  if (cadavez < nombres.length - 1){
    setCadavez(cadavez + 1);
  }
  else {
    setCadavez(0);
  }
}

  return (
    <div>
      <ul>
          <li>
<a href="#">{nombres[cadavez].nombre} {nombres[cadavez].poder}</a>
          </li>
      </ul>
      <button onClick={siguiente} >click</button>
      </div>
  );
};



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



export function EjercicioMemo() {
  const [numero, setNumero] = useState(1);
  const [contador, setContador] = useState(0);

  const resultado = useMemo(()=>{
 return numero * 5;


  },[numero])
  return (
    <div>
      <h2>Resultado: {resultado}</h2>

      <button onClick={() => setNumero(numero + 1)}>
        Subir número
      </button>

      <button onClick={() => setContador(contador + 1)}>
        Contador {contador}
      </button>
    </div>
  );
}

export function EjercicioCallback() {
  const [contador, setContador] = useState(0);

  const sumar = useCallback(()=>{
    setContador(c => c + 1);
  })

  return (
    <div>
      <h2>{contador}</h2>
      <button onClick={sumar}>Sumar</button>
    </div>
  );
}

window.removeEventListener




