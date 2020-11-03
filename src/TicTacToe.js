import React, { useState, useEffect } from 'react';
import './TicTacToe.css';


function TicTacToe() {

  
const emptyboard = Array(9).fill("")

const [board, setBoard] = useState (emptyboard);
const [currentPlayer, setcurrentPlayer] = useState("O");
const [winner, setWinner] = useState(null);


const handleCellClick = (index) =>{
  if (winner) {return null;}
 
  if (board[index] !== "") {  return null;
  }

  setBoard(
    board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)
  );

  setcurrentPlayer(currentPlayer === "X" ? "O" : "X");
}


const checkWinner = () => {
  const possibleWaysToWin =[
    [board[0],board[1], board[2]],
    [board[3],board[4], board[5]],
    [board[6],board[7], board[8]],

    [board[0],board[3], board[6]],
    [board[1],board[4], board[7]],
    [board[2],board[5], board[8]],

    [board[0],board[4], board[8]],
    [board[2],board[4], board[6]],
  ];

possibleWaysToWin.forEach( cell =>{
  if (cell.every( cell => cell ==="O")) setWinner('O');
  if (cell.every( cell => cell ==="X")) setWinner('X');
 });


 checkDraw();

} 
const checkDraw = () => {
  if (board.every(item => item !== "")) setWinner ("E");
  }


useEffect(checkWinner, [board]);

const reset = () => {
  setBoard(emptyboard);
  setcurrentPlayer("O");
  setWinner(null);
}

  return (
    <main>
      <h1 className='title'>Jogo da Velha</h1>

    <div className={`board ${winner ? "game-over" : ""}`}>
      {board.map ((item, index) =>(
        <div 
        key={index}
        className={`cell ${item}`}
        onClick={()=> handleCellClick(index)}
        >
          {item}
        </div>
      )
      )}
     
    
      

    </div>
    
    {winner &&
    <footer>
      {winner === "E" ?
      <h2 className='winner-message'>
      <span className={winner}> Empate  </span> 
       
     </h2>
    :  
      <h2 className='winner-message'>
       <span className={winner}> {winner}  </span> 
        venceu!
      </h2>
    }


    <button onClick={reset}>Reiniciar Jogo</button>
    
    </footer>
    }
    </main>
  );
}

export default TicTacToe;
