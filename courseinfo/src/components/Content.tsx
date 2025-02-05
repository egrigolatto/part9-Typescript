import { CoursePart } from "../App";
import { Part } from "./Part";
export interface IContentProps {
  parts: CoursePart[];
}

export function Content({ parts }: IContentProps) {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
}