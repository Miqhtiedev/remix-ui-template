import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface Drink {
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  strAlcoholic: string;
}

export default function Drink() {
  const [drink, setDrink] = useState<Drink | undefined>(undefined);
  const [selectedDrink, setSelectedDrink] = useState("Load Saved Drink");

  const [drinkList, setDrinkList] = useState<Drink[] | undefined>([]);

  const refreshData = () => {
    setSelectedDrink("Load Saved Drink");
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php").then((response) => {
      setDrink(response.data.drinks[0]);
    });
  };

  const saveDrink = () => {
    if (!drinkList || !drink) return;
    localStorage.setItem("drink-list", JSON.stringify([...drinkList, drink]));
    setDrinkList([...drinkList, drink]);
    setSelectedDrink(drink.strDrink);
    const list = localStorage.getItem("drink-list");
    console.log(list);
  };

  const ref = useRef<HTMLSelectElement>(null);
  const loadDrink = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const drinkName = event.target.value;

    const drink = drinkList?.find((d) => d.strDrink === drinkName);
    setDrink(drink);
    setSelectedDrink(drink?.strDrink ?? "N/A");
  };

  useEffect(() => {
    const list = localStorage.getItem("drink-list");
    if (list) setDrinkList(JSON.parse(list));
    refreshData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center ">
      <div className="card w-[30rem] bg-base-300 shadow-xl">
        <figure>
          <img src={drink?.strDrinkThumb} alt="drink" />
        </figure>
        <div className="card-body">
          <div className="flex card-title">
            <h1 className="text-2xl min-w-min break-words">{drink?.strDrink}</h1>
            <div className="badge badge-outline min-w-max ml-auto">{drink?.strAlcoholic}</div>
          </div>
          <p>{drink?.strInstructions}</p>
          <div className="card-actions justify-end">
            <select
              value={selectedDrink}
              onChange={(e) => loadDrink(e)}
              ref={ref}
              className="mr-auto select select-primary w-full max-w-60"
            >
              <option disabled>Load Saved Drink</option>
              {drinkList?.map((drink) => <option key={drink.strDrink}>{drink.strDrink}</option>)}
            </select>

            <button className="btn btn-primary" onClick={() => refreshData()}>
              Refresh
            </button>
            <button
              className={`btn btn-accent ${
                drinkList?.find((d) => d.strDrink === drink?.strDrink) ? "btn-disabled" : ""
              }`}
              onClick={() => saveDrink()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
