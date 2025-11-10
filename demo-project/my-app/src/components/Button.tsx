import React from "react";

interface MyButtonProps {
    text: string;
    onClick: () => void;
}

const MyButton: React.FC <MyButtonProps> = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
}

export default MyButton;