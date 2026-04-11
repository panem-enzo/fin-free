import { ExpenseWrapper } from "./components/ExpenseWrapper";
import { Sidebar } from "./components/Sidebar";

function App() {

  return (
    <>
      <div className="grid grid-cols-2 gap-4 h-[100vh] cursor-default select-none">
        <Sidebar/>
        <ExpenseWrapper/>
      </div>
    </>
  );
}

export default App;
