import React from "react";

interface Parts {
  name: string,
  exerciseCount: number
}

const Content = ({courseParts}:{courseParts:Parts[]}):JSX.Element => {
  return (
    <div>
      {courseParts.map(course => {
        return <p key={course.name}>{course.name} {course.exerciseCount}</p>
      })}
    </div>
  )
}

export default Content