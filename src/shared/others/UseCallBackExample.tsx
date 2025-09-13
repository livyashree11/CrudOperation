/*import { useCallback,useState } from "react";

export const Parent = () => {
    const[count,setCount]
 =useState<number>(0);
 const childClick = useCallback(()=>{
    console.log('child clicked')
 },[])

 return(
    <>
    <span>{count}</span>
    <button onClick={()=>{setCount(count+1)}}>Increase count</button>
    <Child childClick={childClick}/>
    </>
 )
};

export const Child = (props:any) => {
    return(
        <>
        <button onClick = {props.childClick}>Child Button</button>
        </>
    )
;}*/