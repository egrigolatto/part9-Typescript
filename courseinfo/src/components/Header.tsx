
export interface IHeaderProps {
  name: string
}

export function Header (props: IHeaderProps) {
  return <h1>{props.name}</h1>;
}
