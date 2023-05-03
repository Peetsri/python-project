import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { IAddData } from "@/common/Interface";

export default function Upload() {
  const [count, setCount] = useState(0);
  const [cats, setCat] = useState([]);
  const [input, setInput] = useState("");
  const [data, setData] = useState<IAddData[]>([]);
  const onAddNumber = () => {
    const result = count + 1;
    callService();
    setCount(result);
  };

  const callService = async () => {
    const response: any = await axios.post(
      "https://api.thecatapi.com/v1/images/search?limit=10"
    );
    setCat(response.data);
  };

  const [input, setInput] = useState("");
  
  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    clear();
    console.log("check clear");
  }, [data]);

  const clear = () => {
    setInput("");
  };

  const handleUpdateValue = (e: any) => {
    setInput(e.target.value);
  };

  const add = (e: any) => {
    const object: IAddData = { name: input, id: data.length };
    setData([...data, object]);
  };

  const submit = async () => {
    console.log("submit form");
  };

  return (
    <>
      <input onChange={handleUpdateValue} value={input} />
      <button onClick={submit}> Submit </button>
      <button onClick={add}>Add data</button>

      <div>
        <ul>
          {data.map((obj: IAddData, index) => {
            return <li key={index}> {obj.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
