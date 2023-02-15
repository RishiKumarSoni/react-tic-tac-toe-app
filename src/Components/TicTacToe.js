import './TicTacToe.css'

import { useState } from 'react';

function Square({value, onSquareClick}) {
    return(
        <button className="button" onClick={onSquareClick}>{value}</button>
    );
}

export default function Board() {
    const [square, setSquare] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {
        if (square[i] || Winner(square)){
            setSquare(Array(9).fill(null));
            return;
        }

        // take a copy of square array
        const temp = square.slice();

        if(xIsNext && temp[i]!=='X') {
            temp[i] = 'X';
        } else if(temp[i]!=='O') {
            temp[i] = 'O';
        }

        setSquare(temp);
        setXIsNext(!xIsNext);
    }

    const winner = Winner(square);
    let status;

    if(winner) {
        status = 'The Winner is ' + winner;
    }

    return (
        <>
        <div className='board'>
            <div className='boardRow'>
                <Square value={square[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={square[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={square[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className='boardRow'>
                <Square value={square[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={square[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={square[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className='boardRow'>
                <Square value={square[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={square[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={square[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </div>
        <p className='status'>{status} </p>
        {
            winner ? <span>Click any box to refresh</span> : ''
        }
        </>
    );
}

function Winner(square) {
    let pattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for(let i=0; i<pattern.length; ++i) {
        const [x, y, z] = pattern[i];

        if(square[x] && square[x]===square[y] && square[x]===square[z]) {
            return square[x];
        }
    }

    return null;
}