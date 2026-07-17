import { ExpenseWrapper } from "./components/ExpenseWrapper";
import { Sidebar } from "./components/Sidebar";

function App() {

  return (
    <>
      <div className="grid grid-cols-6 h-[100vh] bg-stone-50 cursor-default select-none">
        <Sidebar/>
        <ExpenseWrapper/>
      </div>
    </>
  );
}

export default App;
