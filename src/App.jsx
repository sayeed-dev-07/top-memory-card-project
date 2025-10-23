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
    let newData = []
    let indexes = []

    while (newData.length < 12) {
      let randomIndex = Math.floor(Math.random() * 12);
      if (!indexes.includes(randomIndex)) {
        newData.push(Data[randomIndex])
        indexes.push(randomIndex)
      }
    }
    return newData;
  }
  function handleClick(propID){
      if (!clickArr.includes(propID)) {
        setScore(prev => prev + 1)
        setClickArr([...clickArr, propID])
        setArray(randomArray())
        
      }else{
        if (score > bestScore) {
          setBestScore(score)
        }
        setFinalScore(score)
        document.getElementById('my_modal_5').showModal()
        setClickArr([])
        setScore(0)
      }
  }

  return (
    <>
      <div className='min-h-screen py-12 px-8 bg-[#e6e1e1bf]'>
        <Modal score={finalscore} bestScore={bestScore}/>
        <div className='flex items-center justify-between flex-wrap gap-y-3'>
          <div className='text-black'>
            <h1 className='text-4xl font-semibold'>Amphibia Memory Game</h1>
            <p className='text-xl mt-6 italic font-normal'>Get points by clicking on an image but don't click on any more than once!</p>
          </div>

          <div className='text-xl font-semibold'>
            <p>Score : {score}</p>
            <p>Best Score  : {bestScore}</p>
          </div>
        </div>
        <div className="card-container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-16 mt-24 gap-y-12 items-start ">
          {
            array.map((elem) => (
              <Card  name={elem.Name} url={elem.url} index={elem.id} func={handleClick}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
