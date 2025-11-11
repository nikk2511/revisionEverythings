import React, { useState } from "react";

interface MyButtonProps {
    text: string | number | boolean;
    onClick: () => void;
    something?: boolean;
}

interface Book {
    name: string;
    price: number;
}
// type props = {text: string}


const MyButton: React.FC <MyButtonProps> = (props) => {
    const {text, onClick} = props;

    const [value, setValue] = useState<Book>({
        name: "One",
        price: 10
    });

    return (<div>
        <h3>Name {value.name} (Rs. {value.price})</h3>
        <button onClick={() => setValue({name: "Two", price: 20})}>{text}</button>
    </div>);

}

export default MyButton;