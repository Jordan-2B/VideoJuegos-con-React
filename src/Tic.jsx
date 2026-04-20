 import { useState } from 'react'
import { Square } from './Componente/Square'
import {WINNER_combos,Turnos} from './Componente/constante'
import { checkWinner } from './Componente/boar'
import { WinnerModal } from './Componente/winnermodal'
import './tic.css'

export function Tic (){
console.log('Render')
const [board,setBoard] = useState(Array(9).fill(null))
const [Turno,setTurno] = useState(Turnos.x)
const [winner, serWinner] = useState(null)


const resetGame = ()=> {
    setBoard(Array(9).fill(null))
    setTurno(Turnos.x)
    serWinner(null)
}

const checkEndGame = (newBoard) =>{
return newBoard.every((square)=> square == null)
}

const updateBoard = (index) =>{
    if(board[index] || winner)return 
    const newBoard = [...board]
    newBoard[index] = Turno
    setBoard(newBoard)

const newTurn = Turno === Turnos.x ? Turnos.o : Turnos.x
setTurno(newTurn)

const  neWinner = checkWinner(newBoard)
if (neWinner){
    serWinner(neWinner)
}
else if (checkEndGame(newBoard)){
    serWinner(false)
}
}

    return(
        <main className='board'>
            <h1>Tic tac toc</h1>
            <button onClick={resetGame}>Reinciar</button>
            <div className="game">
                {
                board.map((Value,index)=>{
                    return(
                       <Square 
                       key={index}
                       index={index}
                       updateBoard={updateBoard}
                       >
                        {Value}
                       </Square>
                    )
                })
                }
            </div>
            <div className='turn'>
                <Square isSelected={Turno == Turnos.x}>
                    {Turnos.x}
                    </Square>
                <Square isSelected={Turno == Turnos.o}>{
                Turnos.o}
                </Square>
               
            </div>
            <WinnerModal resetGame={resetGame} winner={winner}/>
        </main>
    );
}