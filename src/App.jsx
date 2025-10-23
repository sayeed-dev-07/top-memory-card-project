import './App.css'
import Card from './components/Card'
import Data from './assets/Data'
import { useState } from 'react'
import Modal from './components/Modal'

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [array, setArray] = useState(Data)
  const [clickArr, setClickArr] = useState([])
  const [finalscore, setFinalScore] = useState(0)

  function randomArray() {
    let newData = [...Data]
    for (let i = newData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newData[i], newData[j]] = [newData[j], newData[i]]
    }
    
    return newData;
  }
  function handleClick(propID) {
  if (!clickArr.includes(propID)) {
    const newScore = score + 1; // predict next score
    setScore(newScore);
    setClickArr([...clickArr, propID]);
    setArray(randomArray());

    // If user clicked all 12 cards correctly
    if (newScore === 12) {
      document.getElementById('my_modal_4').showModal();
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
      // Reset game
      setScore(0);
      setClickArr([]);
    }

  } else {
    if (score > bestScore) setBestScore(score);
    setFinalScore(score);
    document.getElementById('my_modal_5').showModal();
    setClickArr([]);
    setScore(0);
  }
}


  return (
    <>
      <div className='min-h-screen pt-6 px-8 bg-[#e6e1e1bf]'>
        <Modal score={finalscore} bestScore={bestScore}/>
        <div className='flex items-center justify-between flex-wrap gap-y-1'>
          <div className='text-black'>
            <h1 className='text-4xl font-semibold'>Sayeed's Memory Game</h1>
            <p className='text-xl mt-6 italic font-normal'>Get points by clicking on an image but don't click on any more than once!</p>
          </div>

          <div className='text-xl font-semibold'>
            <p>Score : {score}</p>
            <p>Best Score  : {bestScore}</p>
          </div>
        </div>
        <div className="card-container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] py-2 gap-x-16 mt-10 gap-y-8 items-start ">
          {
            array.map((elem) => (
              <Card key={elem.id} name={elem.Name} url={elem.url} index={elem.id} func={handleClick}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
