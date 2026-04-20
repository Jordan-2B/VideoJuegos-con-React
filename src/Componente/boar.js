 import { WINNER_combos } from "./constante"
export const checkWinner=(boardTocheck)=>{
    for( const combo of WINNER_combos){
        const [a,b,c] = combo
        if(
            boardTocheck[a] &&
            boardTocheck[a] === boardTocheck[b] &&
            boardTocheck[a] === boardTocheck[c]
        ){
            return boardTocheck[a]
        }
    }
    return null
}
