import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuestion } from "./Question";

import Feedback from "./Feedback";

const Counter = () => {
    const [first, setFirst] = useState(0);
    const [second, setSecond] = useState(0);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [mode, setMode] = useState("*");
    const [isCorrect, setIsCorrect] = useState(true);
    const [showFeedback, setShowFeedback] = useState(false);
    const [systemMessage, setSystemMessage] = useState("Have Fun!");

    const currentAnswer = {
        '*': () => { return first * second;},
        '+': () => { return first + second;},
        '-': () => { return first - second;},
        '/': () => { return Math.floor(first / second);}
    };

    const currentOperation = {
        '*': <img src='.././times.svg' alt="times" />,
        '+': <img src='.././plus.svg' alt="plus" />,
        '-': <img src=".././minus.svg" alt="minus" />,
        '/': <img src=".././divide.svg" alt="divide" />
    }

    const [questions, setQuestions] = useState(useQuestion());

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const calculate = (data) => {
        console.log(data)
        let userAnswer = parseInt(data.answer);
        let correctAnswer = currentAnswer[mode]();
        setShowFeedback(true);
        if (second === 0 && mode === '/') {
            setSystemMessage("You have just tried to divide by 0! Please try a different operation.");
        } else {
            setSystemMessage("");
        }

        if (userAnswer === correctAnswer) {
            console.log("it's correct");
            console.log("you've answered: " + userAnswer);
            let newQuestion = questions[0];
            setFirst(newQuestion.firstNumber);
            setSecond(newQuestion.secondNumber);
            setScore(score + 1);
            setQuestions(questions.slice(1));
            setIsCorrect(true);
        } else {
            console.log("it's wrong");
            console.log("you've answered: " + userAnswer);
            console.log("answer should be: " + currentAnswer[mode]());
            setIsCorrect(false);
            setScore(score - 1)
        }
        setRound(round + 1);
        reset();
    }

    const handleModeClick = (event, mode) => {
        setMode(mode);
    }

    return (<>        
        <div className="top">
            <p>Round {round}</p> <p data-testid="score-test">Current Score: {score}</p>
          </div>
          <div className="mode">
            <img className="operation" src='.././plus.svg' alt="plus" onClick={(event) => handleModeClick(event, '+')} />
            <img className="operation" src='.././minus.svg' alt="minus" onClick={(event) => handleModeClick(event, '-')}  />
            <img className="operation" src='.././times.svg' alt="times" onClick={(event) => handleModeClick(event, '*')}  />
            <img className="operation" src='.././divide.svg' alt="divide" onClick={(event) => handleModeClick(event, '/')}  />
          </div>
        <div className="middle">
            <div className="numbers">
              <div className="first">{first}</div>
              <div className="mode">{currentOperation[mode]}</div>
              <div className="second">{second}</div>
            </div>
            {mode === '/' ? <p>Round your answers to the nearest integer!</p> : <></>}
            <p>{systemMessage}</p>
            <form onSubmit={handleSubmit(calculate)}>
              <input data-testid="user-input" type="text" name="answer" placeholder="Your Answer" {...register("answer")} />
              <button data-testid="calculate-button" type="submit">Calculate</button>
            </form>
        </div>
            {showFeedback ? <Feedback 
                isCorrect={isCorrect}
            /> : null}
        </>
    )
}

export default Counter