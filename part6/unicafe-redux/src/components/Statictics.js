const Statistics = ({good, neutral, bad}) => {
    // console.log(`${good} ${neutral} ${bad}`);
  
    const average = () => {
      return (good - bad) / all();
    };
  
    const positive = () => {
      return (good / all()) * 100;
    };
  
    const all = () => {
      return good + neutral + bad;
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
                <StatisticLine value={good} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="neutral" />
              </td>
              <td>
                <StatisticLine value={neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="bad" />
              </td>
              <td>
                <StatisticLine value={bad} />
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

export default Statistics