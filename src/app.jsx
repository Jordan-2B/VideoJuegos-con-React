import {Reloj,Myboton} from './useeffect'
import {AnimatedCard} from './animasion'




export function App (){

    return(

        
<article  >
    <aside>

    <Reloj/> 
    <AnimatedCard/>
    <Myboton/>
    </aside>
</article>


   )
   function Button() {
  const theme = useContext(ThemeContext);

  return <button>Modo: {theme}</button>;
}
    }





