import React, { createContext, useState, useContext } from 'react';

interface counterProviderProps {
    children: React.ReactNode;
}

interface CounterContextValue {
    counter: number;
    setCount: (num: number) => void;  

}

const CounterContext = createContext<CounterContextValue | null>(null);

export const useCounter = () => {
    return useContext(CounterContext);
}

export const counterProvider: React.FC = (props) => {
    const [counter, setCounter] = useState<number>(0);
    return (
        <CounterContext.Provider value={{
            value: count,
            setCount,
        }}>
            {props.children}
        </CounterContext.Provider>
    )
}

export default CounterContext;