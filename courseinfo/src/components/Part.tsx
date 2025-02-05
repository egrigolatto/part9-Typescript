import { CoursePart } from "../App";

export interface IPartProps {
  part: CoursePart;
}

export function Part({ part }: IPartProps) {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
      break;

    case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Projects: {part.groupProjectCount}</p>
        </div>
      );
      break;

    case "background":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            Background Material:{" "}
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
      );
      break;

    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );
      break;

    default:
      return assertNever(part);
      break;
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
