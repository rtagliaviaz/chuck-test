import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [jokes, setJokes] = useState([]);

  // const getJoke = async() => {
  //   const res = await axios.get('https://api.chucknorris.io/jokes/random')
  //   setJokes(jokes => [...jokes, res.data])
  // }

  //get only 15 jokes
  const get15Jokes = async () => {
    let helper = [];
    for (let i = 0; i < 15; i++) {
      const res = await axios.get("https://api.chucknorris.io/jokes/random");

      helper = [...jokes, res.data];
      //check if the joke  is already in the array, if is in the array, if is not in the array add it, if is in the array, do i --
      if (!jokes.includes(res.data)) {
        setJokes((helper) => [...helper, res.data]);
      } else {
        i--;
      }
    }
  };

  useEffect(() => {
    get15Jokes();
    
  }, []);

  //save the jokes to local storage
  const saveJokes = () => {
    localStorage.setItem("jokes", JSON.stringify(jokes));
  };
  saveJokes()
  //load the jokes from local storage
  const loadJokes = () => {
    const jokes = JSON.parse(localStorage.getItem("jokes"));
    setJokes(jokes);
  };

  //remove a joke by id from local storage
  const removeJoke = (id) => {
    setJokes((jokes) => jokes.filter((joke) => joke.id !== id));
    localStorage.setItem("jokes", JSON.stringify(jokes));
  };

  return (
    <div className='App'>
      <h1>chuck norris tests</h1>

      <div className='col-md-6 offset-md-3'>
        {/* table of jokes */}
        <table className='table'>
          <thead>
            <tr>
              <th>Nº</th>
              <th>joke</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            {jokes.map((joke, index) => (
              <tr key={joke.id}>
                <td>{index + 1}</td>
                <td>{joke.value}</td>
                <td>
                  <button
                    onClick={() => removeJoke(joke.id)}
                    className='btn btn-danger'
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
