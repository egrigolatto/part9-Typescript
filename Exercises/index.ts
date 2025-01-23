import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculator, Operation } from "./calculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  
  const heightNum = Number(height);
  const weightNum = Number(weight);

  try {
    const bmi = calculateBmi(heightNum, weightNum);
    res.json({
      weight: weightNum,
      height: heightNum,
      bmi: bmi,
    });
  } catch (error: unknown) {
    let errorMessage = "malformatted parameters";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({
      error: errorMessage,
    });
  }
});

app.post("/calculate", (req, res) => {
  const { value1, value2, op } = req.body;

  const operation = op as Operation;

  const result = calculator(value1, value2, operation);
  res.send({ result });
});

app.post("/exercises", (req, res) => {

  const { daily_exercises, target } = req.body;
  
 
  try {
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (error: unknown) {
    let errorMessage = "malformatted parameters";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).json({
      error: errorMessage,
    });
  }

  

  
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
