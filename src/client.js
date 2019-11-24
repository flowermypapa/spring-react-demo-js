import fetch from "unfetch";

export const getAllStudents = () => fetch("/api/students");
export const addNewStudent = data =>
  fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
