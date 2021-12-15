import express from "express"
import calculateBmi from "./bmiCalculator"
import calculateExercices from "./exerciceCalculator"

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  try {
    const h:number = req.query.height ? parseInt(req.query.height.toString()) : 0
    const w:number = req.query.weight ? parseInt(req.query.weight.toString()) : 0
    const bmi:string = calculateBmi(h, w)

    res.send({
      weight: w,
      height: h,
      bmi: bmi
    })

  } catch (error) {
    res.status(400)
    res.send({
      error: error.message
    })
  }
})

app.post('/calculator', (req, res) => {
  try {
    const {daily_exercises, target} = req.body
    if(daily_exercises.some(isNaN) || isNaN(target) ){
      throw new Error("malformated parameters")
    }
    const result = calculateExercices(daily_exercises, target)
    res.send(result)
  } catch (error) {
    res.status(400)
    res.send({
      error: error.message
    })
  }

})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}`);
})