const ratingDescriptions: string[] = [
  'You failed successfully',
  'Not too bad..',
  'Congrats!'
]

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescriptions: string,
  target: number,
  average: number 
}

const setDesc = (average: number, target: number): string => {
  if(average < target - 0.5) {
    return ratingDescriptions[0]
  }
  if(average < target) {
    return ratingDescriptions[1]
  }
  if(average >= target) {
    return ratingDescriptions[2]
  }
  return "Error"
}

const setSuccess = (average: number, target: number): boolean => {
  if (average < target) return false
  else return true
}



const calculateExercices = (hours: number[], target: number): Result => {
  const period: number = hours.length
  const trainingdays: number[] = hours.filter(num => num > 0)
  const average: number = trainingdays.reduce((p, c) => p + c) / period
  const rating: number = parseInt(average.toFixed())

  // console.log(average);
  return {
  periodLength: period,
  trainingDays: trainingdays.length,
  success: setSuccess(average, target),
  rating: rating,
  ratingDescriptions: setDesc(average, target),
  target: target,
  average: average
  }
}


/*
const getTarget = (args: number[]): number => {
  const value = args.pop()
  return value === undefined ?  0 : value
}


try {
  const args: number[] = process.argv.slice(2).map(i => parseFloat(i))
  const last: number = getTarget(args)
  console.log(calculateExercices(args, last));
} catch (error) {
  throw new TypeError("Error")
}
*/


export default calculateExercices

