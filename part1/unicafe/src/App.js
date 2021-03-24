import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header header="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = (props) => {
  console.log(props);

  const average = () => {
    return (props.good - props.bad) / all();
  };

  const positive = () => {
    return (props.good / all()) * 100;
  };

  const all = () => {
    return props.good + props.neutral + props.bad;
  };

  if (all() === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine text="good" />
            </td>
            <td>
              <StatisticLine value={props.good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="neutral" />
            </td>
            <td>
              <StatisticLine value={props.neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="bad" />
            </td>
            <td>
              <StatisticLine value={props.bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="all" />
            </td>
            <td>
              <StatisticLine value={all()} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="average" />
            </td>
            <td>
              <StatisticLine value={average()} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="positive" />
            </td>
            <td>
              <StatisticLine value={positive()} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <>
      {props.text} {props.value}
    </>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  );
};

export default App;
