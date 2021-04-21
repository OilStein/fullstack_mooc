const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-1234456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-3213213",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-2321-421",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-321-3213",
  },
];

app.get("/info", (req, res) => {
  const n = persons.length;
  const date = new Date();
  res.send(
    `<div> Phonebook has info for ${n} people </div>` + `<div>${date}</div>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const person = req.body
    console.log(person);
    res.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
