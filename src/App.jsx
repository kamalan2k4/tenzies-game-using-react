import React, {useState, useEffect} from "react";
import Die from "./Die.jsx";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => new Array(10).fill(null).map(diceState));
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isClicked);
    const allSameValue = dice.every(die => die.value === dice[0].value);
    if (allHeld && allSameValue) setTenzies(true);
  }, [dice]);

  function diceState() {
    return { value: Math.ceil(Math.random() *6), isClicked: false, key: nanoid() };
  }

  const dieElements = dice.map(ele => (
    <Die number={ele.value} isClicked={ele.isClicked} key={ele.key} clickDice={() => clickDice(ele.key, ele.value)} />
  ));

  function rollDice() {
    if (!tenzies) setDice(prevDice => prevDice.map(die => (die.isClicked ? die : diceState())));
    else {
      setTenzies(false);
      setDice(new Array(10).fill(null).map(diceState));
    }
  }

  function clickDice(key) {
     setDice(prevDice => prevDice.map(die => (die.key === key ? {...die, isClicked: !die.isClicked } : die)));
  }

  return (
    <>
      {tenzies && <Confetti />}
      <main>
        <h1 className="main-h1">Tenzies</h1>
        <h1 className="main-h2">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h1>
        <div className="dice-container">{dieElements}</div>
        <button className="button" onClick={rollDice}>{tenzies ? "Start New" : "Roll"}</button>
      </main>
    </>
  );
}
