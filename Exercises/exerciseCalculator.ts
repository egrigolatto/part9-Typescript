interface ExerciseValues {
  target: number;
  dailyExerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues  => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map((arg) => Number(arg));

  if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }

  return { target, dailyExerciseHours };
};

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(
  dailyExerciseHours: number[],
  target: number
): ExerciseResult {

  if (!dailyExerciseHours || target === undefined) {
    throw new Error("parameters missing");
  }

  if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
    throw new Error("malformatted parameters");
  }

  if (dailyExerciseHours.length !== 7) {
    throw new Error(
      "malformatted parameters, expected 7 values in daily_exercises array"
    );
  }

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent, you exceeded your target!";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "Not too bad, but could be better.";
  } else {
    rating = 1;
    ratingDescription = "You need to put in more effort.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

//  npm run exerciseCalculator 2 1 0 2 4.5 0 3 1 0 4