import React from 'react'

import './Game.css'
import { useAppSelector, useAppDispatch } from '../hooks'
import { nextRound } from './gameSlice'
import store from '../store'

function Game(props: any) {
  const roundNumber = useAppSelector((state: any) => state.game.roundNumber);
  const loses = useAppSelector((state: any) => state.game.loses);
  const wins = useAppSelector((state: any) => state.game.wins);
  const dispatch = useAppDispatch();

  let initialX: number = Math.round(Math.random() * (props.fieldSizeX - 1))
  let initialY: number = Math.round(Math.random() * (props.fieldSizeY - 1))
  var gameFieldInJsx: JSX.Element[] = [];
  // Initial filling (Starting line.)
  for (let col = 0; col < props.fieldSizeX; col++) {
    let thisRowOfJsx: JSX.Element[] = [];
    for (let row = 0; row < props.fieldSizeY; row++) {
      thisRowOfJsx.push(
        <div onClick={userChoseAnswer} className={'cell' + ((initialY == col && initialX == row) ? ' cell_start' : '')} data-pos-x={row} data-pos-y={col}></div>
      )
    }
    gameFieldInJsx.unshift(
      <div className='col'>{thisRowOfJsx}</div>
    )
  }
  var [localState, setLocalState] = React.useState({
    header: 'Welcome, let\'s play the Game',
    resultMsg: '',
    gameFieldInJsx: gameFieldInJsx
  });
  // Initial filling (Ending line.)

  // Generate solution (Starting line.)
  let playerPosX: number = initialX;
  let playerPosY: number = initialY;
  let guideFieldInJsx: JSX.Element[] = [];
  let finalPosShouldBeX: number;
  let finalPosShouldBeY: number;

  for (let turnNum = 0; turnNum < props.gameLength; turnNum++) {
    let allowedMoves: string[] = [];

    if (playerPosX - 1 >= 0) allowedMoves.push('left');
    if (playerPosX + 1 < props.fieldSizeX) allowedMoves.push('right');
    if (playerPosY - 1 >= 0) allowedMoves.push('down');
    if (playerPosY + 1 < props.fieldSizeY) allowedMoves.push('up');

    let randomNextMove = allowedMoves[Math.round(Math.random() * (allowedMoves.length - 1))]

    if (randomNextMove === 'up') playerPosY++;
    if (randomNextMove === 'down') playerPosY--;
    if (randomNextMove === 'left') playerPosX--;
    if (randomNextMove === 'right') playerPosX++;

    guideFieldInJsx.push(
      <div className={'arrow arrow-' + randomNextMove}></div>
    )
  }
  finalPosShouldBeX = playerPosX;
  finalPosShouldBeY = playerPosY;
  // Generate solution (Ending line.)

  function userChoseAnswer(event: React.MouseEvent<HTMLElement>) {
    let clickedCell: EventTarget = event.target;
    if (clickedCell instanceof Element) {
      clickedCell.classList.add('the-chosen-one')
      let clickedX: string | null = clickedCell.getAttribute('data-pos-x');
      let clickedY: string | null = clickedCell.getAttribute('data-pos-y');
      if (clickedX === null || clickedY === null)
        return;
      let resultMsgLocal = (parseInt(clickedX) == finalPosShouldBeX && parseInt(clickedY) == finalPosShouldBeY) ? 'win' : 'lose';
      let headerLocal = 'You ' + resultMsgLocal + '!';
      
      let shouldChooseElement: HTMLElement | null = document.querySelector(`*[data-pos-x="${finalPosShouldBeX}"][data-pos-y="${finalPosShouldBeY}"]`);
      if (shouldChooseElement != null) shouldChooseElement.classList.add('cell_should-been-chosen');
      
      let gameField: HTMLElement | null = document.querySelector('.game-field');
      if (gameField != null) gameField.style.pointerEvents = 'none';
      setLocalState((prevState) => {
        store.dispatch(nextRound(resultMsgLocal));
        return {
          ...prevState, header: headerLocal,
          resultMsg: resultMsgLocal
        }
      })
    }
  }
  function tryAgain() {
    // if (localState.resultMsg === '') store.dispatch(nextRound('')); /Uncomment if want to count skipped rounds.
    props.mainRender(props.keyNow + 1);
  }
  return (
    <div className='game'>
      <div className='statistics'>
        <h3>Answered times: {roundNumber}</h3>
        <h3>Wins: {wins}</h3>
        <h3>Loses: {loses}</h3>
      </div>
      <h1>{localState.header}</h1>
      <h2 style={{ fontStyle: 'italic' }}>Please, follow all arrows from 'Start' tile and click on considered result of such journey!</h2>
      <div className="game-field">
        <div className="guide">{guideFieldInJsx}</div>
        {localState.gameFieldInJsx}
      </div>
      {/* <div className="">Expecting to click on x {finalPosShouldBeX} y {finalPosShouldBeY}</div> */}
      <button onClick={tryAgain}>Try again</button>
    </div>
  )

}
export default Game;
