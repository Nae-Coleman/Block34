import express from "express";
import employees from "./db/employees.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.send(employees);
});

app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  const randomEmployee = employees[randomIndex];

  res.send(randomEmployee);
});

app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);

  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).send(`No employee with id ${id} found.`);
  }

  res.send(employee);
});

// CATCH ALL 404 route
app.use((req, res) => {
  res.status(404).send("Not found");
});

export default app;

//import express → You’re grabbing the Express toolbox.
//const app = express() → You’re creating your little “server machine.”
//export default app → This lets server.js use the machine.
//app.get("/") → This means: “If someone visits the homepage…”
//(req, res) → These are your waiter and kitchen.
//res.send("Hello employees!") → This is what your server says back.
// /employees is like a “button” on your backend machine.
//When someone presses that button, the server sends back the whole list.
//employees is the array we imported from the db folder.
// :id means a placeholder
//It can be any number: 1, 2, 3, 10, 50, etc.
//Express grabs that number from the URL and puts it inside req.params.id.
