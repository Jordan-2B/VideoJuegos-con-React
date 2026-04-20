export const Square =({children, isSelected ,updateBoard,index})=>
    {
     const className = `square ${isSelected ? 'is-selected' : ''}`
    
      const handleclick =()=>{
            updateBoard(index)
        }
     return(
       
        <div onClick={handleclick} className={className}>
{children}
        </div>
    )
}