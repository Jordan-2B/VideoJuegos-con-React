import { Square } from "./Square"

export const WinnerModal = ({ winner, resetGame })  =>{
    if (winner === null) return null

    const winnertext = winner === false ? 'Empate' : 'Gano'
    return (


        <div className="winner">
            <div className='text'>
                <h2>{winnertext}
                </h2>
                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>

                <fooder>
                    <button onClick={resetGame}>Empesar de nuevo</button>
                </fooder>
            </div>
        </div>
    )
}