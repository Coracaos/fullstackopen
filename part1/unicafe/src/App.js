import { useState } from "react";

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )  
}

const StatisticLine = ({text, value,unit}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value} {unit}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {

  const all = () => good + neutral + bad;
  const average = () => (good - bad)/(good + neutral + bad);
  const positive = () => (good/(good + neutral + bad))*100;

  if (good === 0 && neutral === 0 && bad === 0){
    return (
       <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all()} />
      <StatisticLine text='average' value={average()} />
      <StatisticLine text='positive' value={positive()} unit='%'/>
      </tbody>
    </table>
  )
} 

function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text='good'/>
      <Button handleClick={incrementNeutral} text='neutral'/>
      <Button handleClick={incrementBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}

export default App;
