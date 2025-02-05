export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface IContentProps {
  parts: CoursePart[];
}

export function Content({ parts }: IContentProps) {
  return (
    <div>
      {parts.map((part, index) => (
        <p key={index}>
          {part.name}: {part.exerciseCount}
        </p>
      ))}
    </div>
  );
}