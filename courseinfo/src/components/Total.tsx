
export interface ITotalProps {
  total: number;
}

export function Total (props: ITotalProps) {
  return <p>Number of exercises {props.total}</p>;
}
