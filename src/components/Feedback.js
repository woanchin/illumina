
const Feedback = (data) => {
    
    return <div>  
        {data.isCorrect ? <div className="bottom">
            <img src='.././happy.png' className="happyTan" alt="happyTan" />
            <p>Yes! You're correct</p>
            </div> :
            <div className="bottom">
            <img src=".././unhappy.png" className="unhappyTan" alt="unhappyTan" />
            <p>No! You got it wrong. Try again!</p>
        </div>
}
    </div>
}

export default Feedback;