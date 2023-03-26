import { Department } from "../types/types";

export default async function AddNode(
  name: string,
  nameOfDepartment: string,
  programmingLanguage: string
): Promise<Department[]> {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({
      name: name,
      nameOfDepartment: nameOfDepartment,
      programmingLanguage: programmingLanguage,
    }),
  };
  const data = await fetch("http://localhost:3000/add-node", requestOptions);
  const test = data.json();

  console.log("TEST", test);

  return data.json();
}
