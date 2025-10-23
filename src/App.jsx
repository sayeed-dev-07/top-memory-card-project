import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';

function App() {
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
    async function fetchData() {
      try {
        const response = await fetch(
          'https://bobsburgers-api.herokuapp.com/characters/?limit=12&skip=563'
        );
        const data = await response.json();

        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.name,
          url: item.image,
        }));

        setCharData(formattedData); 
      } catch (err) {
        console.error(err);
      }
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

        <div className="card-container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] py-2 gap-x-16 mt-10 gap-y-8 items-stretch">
          {charData.map((elem) => (
            <Card
              key={elem.id}
              name={elem.name}
              url={elem.url}
              index={elem.id}
              func={handleClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
