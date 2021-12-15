
const calculateBmi = (h: number, w: number): string => {
  if(h <= 0 || w <= 0){
    throw new Error('malformated parameters')
  }
  const bmi = (w / h / h) * 10000
  // console.log(bmi);
  if(bmi >= 40) {
    return "Obese (Class III)"
  }
  else if (bmi >= 35) {
    return "Obese (Class II)"
  }
  else if (bmi >= 30) {
    return "Obese (Class I)"
  }
  else if (bmi >= 25) {
    return "Overweight (Pre-obese)"
  }
  else if (bmi >= 18.5) {
    return "Normal range"
  }
  else if (bmi >= 17) {
    return "Underweight (Mild thinness)"
  }
  else if (bmi >= 16) {
    return "Underweight (Moderate thinness)"
  }
  else if (bmi < 16) {
    return "Underweight (Severe thinness)"
  }
  throw new Error('malformated parametres')
}

/*
try {
  // console.log(calculateBmi(180, 74))
  const height = Number(process.argv[2])
  const weigth = Number(process.argv[3])
  console.log(calculateBmi(height, weigth));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
*/

export default calculateBmi
