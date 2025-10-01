import React from "react";

interface Props {
  title: string;
  subTitle: string;
}

// const MyComponent: React.FC<Props> = ({ title }) => {
//   return <div>MyComponent {title}</div>;
// };

function MyComponent({ title, subTitle = "No Sub Title" }: Props) {
  return <div>MyComponent {title}</div>;
}

export default MyComponent;
