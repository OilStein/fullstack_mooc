import React from 'react'

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
  return <h2>{props.name}</h2>;
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

  console.log("sum from reduce", total);

  return (
    <div>
      {p.map((p, i) => (
        <p key={i}>
          {p.name} {p.exercises}
        </p>
      ))}
      <p style={{fontWeight: "bold"}}>total of {total} exercises</p>
    </div>
  );
};

export default Course