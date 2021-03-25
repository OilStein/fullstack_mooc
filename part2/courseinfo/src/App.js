import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },

      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };
  return (
    <div>
      <Course course={course} />
    </div>
  );
};

const Course = (props) => {
  const { course } = props;
  console.log("Course props", course);
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  console.log("Header props: ", props);
  return <h1>{props.name}</h1>;
};

const Content = ({ parts }) => {
  console.log("Content props", parts);
  return (
    <div>
      <Part part={parts} />
    </div>
  );
};

const Part = ({ part }) => {
  console.log("Parts props:", part);
  const p = part;
  console.log(p);

  const total = p.reduce((s, p) => {
    // console.log('reduce', s , p);
    return s + p.exercises;
  }, 0);

  console.log('sum from reduce', total);



  return (
    <div>
      {p.map((p, i) => (
        <p key={i}>
          {p.name} {p.exercises}
        </p>
      ))}
      <p>
        total of {total} exercises
      </p>
    </div>
  );
};

export default App;
