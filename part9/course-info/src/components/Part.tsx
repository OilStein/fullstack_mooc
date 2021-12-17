import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(`
  Unhandled discriminated union member: ${JSON.stringify(value)}
  `)
}

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <strong>Name: {part.name}</strong> <br /> 
          Exercise count: {part.exerciseCount} <br /> 
          Description: {part.description} <br /> 
          Type: {part.type}
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <strong>Name: {part.name}</strong> <br /> 
          Exercise count: {part.exerciseCount} <br /> 
          Group Project Count: {part.groupProjectCount} <br /> 
          Type: {part.type}
        </p>
      )
    case 'submission':
      return (
        <p>
          <strong>Name: {part.name}</strong> <br /> 
          Exercise count: {part.exerciseCount} <br /> 
          Description: {part.description} <br /> 
          Exercise Submission Link: {part.exerciseSubmissionLink} <br /> 
          Type: {part.type}
        </p>
      )
      
    case 'special':
      return (
        <p>
          <strong>Name: {part.name}</strong> <br /> 
          Exercise count: {part.exerciseCount} <br /> 
          Description: {part.description} <br /> 
          Requirements: {part.requirements.join(', ')} <br /> 
          Type: {part.type}
        </p>
      ) 
    default:
      return assertNever(part);
  }
}

export default Part