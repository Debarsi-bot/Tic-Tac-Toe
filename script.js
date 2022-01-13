let cellGrids = document.querySelectorAll('.grid-item')
let currentPlayer = 0
let moves = 0
let board = new Array(9)
let resetButton = document.getElementById('reset')

//reset function
resetGame = ()=>{
    currentPlayer = 0
    moves = 0
    board = new Array(9)
    Array.from(cellGrids).forEach(cell=>{
        cell.classList.remove('xhover','yhover','filled','xfilled','yfilled')
    })
}
resetButton.addEventListener('click',resetGame)


// board functions


let checkHorizontal = (index)=>{
    start = Math.floor(index/3)*3
    end = start+3
    for(let i = start;i<end;i++){
        if(isNaN(board[i])||board[i] != board[index])
            return false;
    }
    console.log("Horizontal")
    return true
}

let checkVertical = (index)=>{
    start = index%3
    end = start+6
    for(let i = start;i<=end ; i+=3)
        if(isNaN(board[i])||board[i] != board[index])
            return false;
    console.log("Vertical")
    return true
}

let checkDiagonal = (index)=>{
    if(isNaN(board[4]))
        return false

    if((board[0] === board[8] && board[0] === board[4]) || (board[2] === board[6] && board[2] === board[4]))
        return true
    return false
}

let checkWon = (index)=>{
    if(checkHorizontal(index) || checkVertical(index) || checkDiagonal(index))
        return true
    
    return false
}
// end of board functions


//start of functions for handling mouse events

let mouseOver = (target)=>{
    if(!target.classList.contains('filled')){
        if(!currentPlayer)
            target.classList.add('xhover')
        else
            target.classList.add('yhover')
    }
}

let mouseOut = (target)=>{
    target.classList.remove('xhover')
    target.classList.remove('yhover')
}

let mouseClick = (target)=>{
    moves++
    cell = Number(target.id)
    board[cell] = currentPlayer
    console.log(board)
    if(!currentPlayer)
        target.classList.add('filled','xfilled')
    else
        target.classList.add('filled','yfilled')
    
    if(checkWon(cell)){
        //current player has won
        if(currentPlayer)
            alert('0 has won')
        else
            alert('1 has won')
    }
    else
    if(moves === 9){
        //match tied
        alert('Match Tied')
    }
    else
    {
        currentPlayer = Number(!currentPlayer)
        console.log(currentPlayer)
        //current player has not won
    }

}

//end of functions for handling mouse events

Array.from(cellGrids).forEach(cell=>{
    console.log(cell)
    cell.addEventListener('mouseover',(obj)=>{
        mouseOver(obj.target)
    })
    cell.addEventListener('mouseout',(obj)=>{
        mouseOut(obj.target)
    })
    cell.addEventListener('click',(obj) =>{
        mouseClick(obj.target)
    })
})


