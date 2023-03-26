import { useCallback, useState } from "react";
import AddNode from "../api";
import { Department } from "../types/types";
import "./App.css";
import EmptyCompany from "./components/EmptyCompany";

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);

  // When we add the first (CEO) we call the backend and then update the frontend.
  const OnFirstDepartmentAdded = useCallback(
    async (
      name: string,
      nameOfDepartment: string,
      programmingLanguage: string
    ) => {
      setDepartments(
        await AddNode(name, nameOfDepartment, programmingLanguage)
      );
    },
    []
  );

  return (
    <div className="App">
      {departments.length === 0 ? (
        <EmptyCompany onSubmit={OnFirstDepartmentAdded} />
      ) : (
        <div>Here we would create the structure</div>
      )}
    </div>
  );
}

export default App;
