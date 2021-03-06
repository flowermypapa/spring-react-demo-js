import fetch from "unfetch";

const checkStatus = response => {
  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    response.json().then(e => {
      error.error = e;
    });
    return Promise.reject(error);
  }
};

export const getAllStudents = () => fetch("/api/students").then(checkStatus);
export const addNewStudent = data =>
  fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(checkStatus);
