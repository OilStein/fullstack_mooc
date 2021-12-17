import React from "react";

import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({courseParts}:{courseParts:CoursePart[]}):JSX.Element => {
  return (
    <div>
      {courseParts.map(course=> {
        return <Part part={course} key={course.name}></Part>
      })}
    </div>
  )
}

export default Content