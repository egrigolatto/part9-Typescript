import { parseArguments } from "./utils";

export function calculateBmi(height: number, weight: number): string {
  if (!height || !weight || height <= 0 || weight <= 0) {
    throw new Error(
      "Invalid parameters for BMI calculation. 'height' and 'weight' must be positive numbers."
    );
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
