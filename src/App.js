import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import { nanoid } from 'nanoid'

function App() {
  const [click, setClick] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [score, setScore] = useState(0)
  const renderEl = useRef(false)
  const [start, setStart] = useState(false)


  useEffect(() => {
    if (!renderEl.current) {
      async function getData() {
        const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        const data = await res.json()
        setQuizData(data.results)
      }
      getData()
    }
    renderEl.current = true
  }, [])

  const questionsEl = quizData.map(question => {
    return(
      <Quiz 
        id={nanoid()}
        key={question}
        title={question.question}
        cans={question.correct_answer}
        ians={question.incorrect_answers}
        click={click}
        score={score}
        setScore={setScore}
      />
    )
  })

  function change() {
    setClick(true)
  }

  return (
    <div className="App">
    { start ?
      <div>
      { questionsEl }
      { click && <h3 className='score'>You scored {score}/5 correct answers</h3>}
        <div className='btncon'>
        { click ? 
          <button className='btn' onClick={() => window.location.reload(false)}>Play again</button>
          :
          <button className='btn' onClick={change}>Check answer</button>
        }          
        </div>
      </div>
      :
      <div className='start'>
        <h1>Quizzical</h1>
        <button onClick={() => setStart(true)}>Start quiz</button>
      </div>
    }             
    </div>
  );
}

export default App;
