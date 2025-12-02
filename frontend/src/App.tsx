import { useState } from "react";
import viteLogo from "/vite.svg";
import { getAllExpenses, insertExpense } from "../src/services/api";

function App() {
  const [amount, setAmount] = useState(0.0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="flex justify-content gap-[2rem]">
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </div>
        <h1>FinFree: Smart Budget Tracking</h1>
        <div className="">
          <div>
            <div>
              <input
                type="number"
                placeholder="Amount ($)"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="cursor-pointer rounded-md border-1 p-2"
              onClick={() => insertExpense(amount, category, description)}
            >
              Add Expense
            </button>
          </div>
        </div>
        <button className="cursor-pointer rounded-md border-1 p-2" onClick={() => getAllExpenses()}>Get Expense List</button>
      </div>
    </>
  );
}

export default App;
