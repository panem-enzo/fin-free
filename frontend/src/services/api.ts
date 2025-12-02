import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api/v1" });
const currentDate = new Date();
const date = {
  month: currentDate.getMonth() + 1,
  day: currentDate.getDate(),
  year: currentDate.getFullYear(),
};

// GET
export const getAllExpenses = () =>
  api.get("/expenses").then((response) => {
    console.log(response.data);
  });

// POST
export const insertExpense = (
  amount: number,
  category: string,
  description: string
) => {
  api
    .post("/expenses", {
      date: `${date.month}-${date.day}-${date.year}`,
      amount: amount,
      category: category,
      description: description,
    })
    .then((response) => {
      console.log(response.data);
    });

};
