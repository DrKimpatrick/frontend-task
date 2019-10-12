import React, { Component } from 'react';

import Board from './Board'

class Puzzle extends Component {
  state = { board: [0, 1, 2, 3, 4, 5, 6, 7, 8], size: 3,sprite:[] };
  
  componentWillMount() {
    const size = prompt("What size do you want the board in?")
    if (/^\d+$/.test(size)) {
      this.newGame(size)
    } else {
      alert('Please input a number')
      window.location.href = '/'
    }
  }
  
  isArrayUnique = (arr) => {
    for (let i = 0; i < arr.length; i++){
      if(arr.indexOf(arr[i]) !== i ) return false
    }
    return true
}

  newGame =(size) =>{
    let board = new Array(size * size);
    let sprite = new Array(size);
    for (let i = 0; i < size * size; ++i) board[i] = i;


    do {
    for (let x = 0; x < size; x++) {
      sprite[x] = Math.floor(Math.random() * (size*size - 1) + 1)
    }
  }
  while (!this.isArrayUnique(sprite));
    
    console.log(sprite)
    
    const sizee = size -1
    let mid = Math.round(Math.abs((sizee * sizee) / 2))
    let middata = board[mid]
    let firstdata = board[0]
    board[0] = middata
    board[mid] = firstdata
    this.updateBoard(board, size);
    this.setState({ size: size,sprite });
  }
  updateBoard = (board) => {
    this.setState({ board: board });
  }
  shuffle = (o) => {
    const temp = o.slice();
    for(var j, x, i = temp.length; i; j = Math.floor(Math.random() * i), x = temp[--i], temp[i] = temp[j], temp[j] = x);
    return temp;
  }
  render() {
    return (
      <div className='puzzle'>
        <h1>Save the Princess</h1>
      
        {
          this.state && this.state.board ? 
            <Board size={this.state.size} board={this.state.board} updateBoard={this.updateBoard} sprite={this.state.sprite}/>
            : null
        }
      </div>
    );
  }
}




export default Puzzle;
