import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import { motion } from 'motion/react';
import { div } from 'motion/react-client';

function App() {
  const [loading, setLoading] = useState(true);
  const [charData, setCharData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickArr, setClickArr] = useState([]);
  const [finalScore, setFinalScore] = useState(0);

  // Fisher–Yates shuffle
  function randomArray(arr) {
    let newData = [...arr];
    for (let i = newData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newData[i], newData[j]] = [newData[j], newData[i]];
    }
    return newData;
  }

  // Fetch data only once when the component mounts
  useEffect(() => {
     function fetchData() {
      fetch('https://bobsburgers-api.herokuapp.com/characters/?sortBy=date&OrderBy=asc&limit=12')
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((item) => ({
            id: item.id,
            name: item.name,
            url: item.image,
          }));
          setCharData(formattedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }

    fetchData();
  }, []); //

  function handleClick(propID) {
    if (!clickArr.includes(propID)) {
      const newScore = score + 1;
      setScore(newScore);
      setClickArr([...clickArr, propID]);
      setCharData(randomArray(charData)); // reshuffle cards on each click

      if (newScore === 12) {
        document.getElementById('my_modal_4').showModal();
        if (newScore > bestScore) setBestScore(newScore);
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
  if(loading){
    return (
      <div className='min-h-screen w-full items-center justify-center'>
        <h1 className='text-4xl font-semibold'>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen pt-6 px-8 bg-[#e6e1e1bf]">
        <Modal score={finalScore} bestScore={bestScore} />
        <div className="flex items-center justify-between flex-wrap gap-y-1">
          <div className="text-black">
            <h1 className="text-4xl font-semibold">Sayeed's Memory Game</h1>
            <p className="text-xl mt-6 italic font-normal">
              Get points by clicking on an image but don't click on any more than once!
            </p>
          </div>

          <div className="text-xl font-semibold">
            <p>Score : {score}</p>
            <p>Best Score : {bestScore}</p>
          </div>
        </div>

        <motion.div animate={{ opacity: 1 , y: 0, filter: 'blur(0px)' }} initial={{ opacity: 0, y: 100, filter: 'blur(15px)' }} transition={{duration:1, type: 'spring'}}  className="card-container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] py-2 gap-x-16 mt-10 gap-y-8 items-start">
          {charData.map((elem) => (
            <Card  
              key={elem.id}
              name={elem.name}
              url={elem.url}
              index={elem.id}
              func={handleClick}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default App;
