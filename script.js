let cellGrids = document.querySelectorAll('.grid-item')
let currentPlayer = 0
let moves = 0
let board = new Array(9)
let resetButton = document.getElementById('reset')
let showPopUpMessage = document.getElementById('popupMessage')
let popup1 = document.getElementById('popup1')
let closePopUp1 = document.getElementById('closePopUp1')
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

//function to handel winner of game
showWinner = (winner)=>{
    if(winner == 0)
    showPopUpMessage.innerText = "Player X has Won"
    else
    if(winner == 1) 
    showPopUpMessage.innerText = "Player O has Won"
    else
    showPopUpMessage.innerText = "Match Has ended in a tie"

    Array.from(cellGrids).forEach(cell=>{
        cell.classList.add('filled')
    })
    
    popup1.classList.remove('hidden')
}
//close popup
popup1Close =()=>{
    popup1.classList.add('hidden')
}

closePopUp1.addEventListener('click',()=>{
    popup1Close()
})

document.addEventListener('keydown',(e)=>{
    if(e.key == "Escape")
    popup1Close()
})

document.addEventListener('click',(e)=>{
    console.log(e)
    if(e.target.classList.contains('overlay'))
        e.target.classList.add('hidden')
})



// board functions


let checkHorizontal = (index)=>{
    start = Math.floor(index/3)*3
    end = start+3
    for(let i = start;i<end;i++){
        if(isNaN(board[i])||board[i] != board[index])
            return false;
    }
    return true
}

let checkVertical = (index)=>{
    start = index%3
    end = start+6
    for(let i = start;i<=end ; i+=3)
        if(isNaN(board[i])||board[i] != board[index])
            return false;
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
    if(cellGrids[cell].classList.contains('filled'))
        return
    board[cell] = currentPlayer
    console.log(board)
    if(!currentPlayer)
        target.classList.add('filled','xfilled')
    else
        target.classList.add('filled','yfilled')
    
    if(checkWon(cell)){
        //current player has won
       showWinner(currentPlayer)
    }
    else
    if(moves === 9){
        //match tied
        showWinner(-1)
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


