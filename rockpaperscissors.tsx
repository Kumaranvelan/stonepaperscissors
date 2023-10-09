import React, { useState } from "react";
import "./rps.css";
import stone from './stone.png';
import paper from './paper.png';
import scissors from './scissors.png';
import { text } from "stream/consumers";

const Rockpaperscissors = () => {
  const storedScore = localStorage.getItem("score");
  const initialScore = storedScore
    ? JSON.parse(storedScore)
    : { wins: 0, loses: 0, draws: 0 };
  const [score, setScore] = useState(initialScore);
  // if(!score){
  //     score = {
  //     wins :0,
  //     loses:0,
  //     draws:0}
  // }

  function playgame(playermove: string) {
    const computermove = pickedcomputermove();

    let result = " ";

    if (playermove === "scissors") {
      if (computermove === "rock") result = "you lose";
      else if (computermove === "paper") result = "you win";
      else if (computermove === "scissors") result = "draw";
    }

    if (playermove === "paper") {
      if (computermove === "rock") result = "you win";
      else if (computermove === "paper") result = "draw";
      else if (computermove === "scissors") result = "you lose";
    }

    if (playermove === "rock") {
      if (computermove === "rock") result = "draw";
      else if (computermove === "paper") result = "you lose";
      else if (computermove === "scissors") result = "you win";
    }

    if (result === "you win") {
      score.wins += 1;
    } else if (result === "you lose") {
      score.loses += 1;
    } else if (result === "draw") {
      score.draws += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    scoreupdate();

    const movesElement = document.querySelector(".jsmoves");
    if (movesElement) {
      movesElement.innerHTML = `you picked ${playermove} - computer picked ${computermove}`;
    }
    const resultElement = document.querySelector(".jsresult");
    if (resultElement) {
      resultElement.innerHTML = "Result is" + result;
    }

    // alert(`you picked ${playermove} , computer picked ${computermove}, Result is ${result}
    // wins: ${score.wins} ,loses:${score.loses},draws:${score.draws}` )
  }

  function scoreupdate() {
    const scoreElement = document.querySelector(".jsscore");
    if (scoreElement) {
      scoreElement.innerHTML = `wins: ${score.wins} ,loses:${score.loses},draws:${score.draws}`;
    }
  }
  function pickedcomputermove() {
    const randomnumber = Math.random();

    let computermove = " ";

    if (randomnumber >= 0 && randomnumber < 1 / 3) {
      computermove = "rock";
    } else if (randomnumber >= 1 / 3 && randomnumber < 2 / 3) {
      computermove = "paper";
    } else if (randomnumber >= 2 / 3 && randomnumber <= 1) {
      computermove = "scissors";
    }
    return computermove;
  }
  const handleResetScore = () => {
    localStorage.removeItem("score");
    setScore({ wins: 0, loses: 0, draws: 0 });
    scoreupdate();
  };

  return (
    <p >
     <h1>ROCK PAPER SCISSORS</h1>
    <div className="main">
     <div className="stone">
        <img src={stone} alt="stone" /> 
    <button onClick={() => playgame("rock")}>Rock</button>
        </div>
      <div className="paper">
      <img src={paper} alt="paper" />
      <button onClick={() => playgame("paper")}>Paper</button>
      </div>
      <div className="scissors">
        <img src={scissors} alt="scissors" />
      <button onClick={() => playgame("scissors")}>Scissors</button>
      </div>
      </div>
      <p className="reset">
      <div className="jsresult"></div> <br />
      <div className="jsmoves"></div><br />
      <div className="jsscore"></div><br />
      <button   onClick={handleResetScore}>Reset Score</button>
      </p>
      </p>
  );
};

export default Rockpaperscissors;

// function useState(arg0: any): [any, any] {
//     throw new Error("Function not implemented.");
// }
