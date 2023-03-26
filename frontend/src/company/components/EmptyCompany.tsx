import React, { useState } from "react";
import "./EmptyCompany.css";

export interface EmptyCompanyProps {
  onSubmit: (
    name: string,
    nameOfDepartment: string,
    programmingLanguage: string
  ) => void;
}

export default function EmptyCompany({ onSubmit }: EmptyCompanyProps) {
  const [name, setName] = useState("");
  const [nameOfDepartment, setNameOfDepartment] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");

  const handleSubmit = () => {
    onSubmit(name, nameOfDepartment, programmingLanguage);
  };

  return (
    <div className="vertical-layout">
      <label>
        Name:
        <input
          type="text"
          name="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </label>
      <label>
        Name of department:
        <input
          type="text"
          name="nameOfDepartment"
          onChange={(event) => setNameOfDepartment(event.target.value)}
          value={nameOfDepartment}
        />
      </label>
      <label>
        Programming language:
        <input
          type="text"
          name="programmingLanguage"
          onChange={(event) => setProgrammingLanguage(event.target.value)}
          value={programmingLanguage}
        />
      </label>
      <button onClick={() => handleSubmit()}>Add first department</button>
    </div>
  );
}
