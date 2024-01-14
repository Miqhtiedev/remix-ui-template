import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import List from "~/components/List";

export const meta: MetaFunction = () => {
  return [{ title: "New App" }, { name: "description", content: "Welcome" }];
};

export default function Index() {
  const [list, setList] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleButtonClick = () => {
    if (text === "") return;
    setList([...list, text]);
    setText("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="flex flex-col items-center justify-center min-w-min">
        <List list={list} setList={setList} />

        <div className="mt-9">
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            placeholder="Add to list"
            className="input input-bordered input-primary"
            onKeyDown={(e) => (e.key === "Enter" ? handleButtonClick() : "")}
            value={text}
          ></input>

          <button onClick={handleButtonClick} className="btn btn-primary ml-5">
            Add!
          </button>
        </div>
      </div>
    </div>
  );
}
