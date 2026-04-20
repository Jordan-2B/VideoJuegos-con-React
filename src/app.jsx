import {Reloj,Pagina} from './useeffect'
import {AnimatedCard} from './animasion'
import { context } from 'react';
import { createContext, useContext } from "react";



export function App (){
    const ThemeContext = createContext("light");
    return(

        
<article  >
     <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
    
    <aside>

    <Reloj/> 
    <Pagina/>
    <context/>
    <AnimatedCard/>
    </aside>
</article>


   )
   function Button() {
  const theme = useContext(ThemeContext);

  return <button>Modo: {theme}</button>;
}
    }





