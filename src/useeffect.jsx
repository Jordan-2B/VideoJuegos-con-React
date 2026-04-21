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