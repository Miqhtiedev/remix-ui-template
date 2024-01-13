interface ListProps {
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function List({ list, setList }: ListProps) {
  const removeFromList = (i: number) => {
    const arr = [...list];
    arr.splice(i, 1);
    setList(arr);
  };

  return (
    <div
      className={`flex flex-col rounded-box bg-neutral w-full min-h-60 ${
        list.length === 0 ? "items-center justify-center" : ""
      }`}
    >
      <h1 className="text-center text-2xl">List</h1>
      <ul className="p-4 pt-0">
        {list.length > 0 ? (
          list.map((item, i) => (
            <li key={i} className="flex">
              {" "}
              <span className="mr-1 text-primary">{"> "}</span>
              <button
                className="hover:underline hover:font-bold hover:transition-all"
                onClick={() => removeFromList(i)}
              >
                {item}
              </button>
            </li>
          ))
        ) : (
          <h1>List is empty</h1>
        )}
      </ul>
    </div>
  );
}
