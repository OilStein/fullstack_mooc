require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const Person = require('./models/person');
const app = express();

app.use(express.json());

app.use(cors())

app.use(express.static('build'))
// app.use(morgan('tiny', (req, res) => {
//   return res.statusCode
// }))

morgan.token("post", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
);

let persons = [{
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
  Person.find({}).then(persons => {
    res.json(persons)
  })
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
  // const id = Number(req.params.id);
  // const person = persons.find((person) => person.id === id);

  // if (person) {
  //   res.json(person);
  // } else {
  //   res.status(404).end();
  // }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const getRandomId = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

console.log(getRandomId(1, 100000));

app.post("/api/persons", (req, res) => {
  const body = req.body;

  // console.log('body content',body);

  if (body.name === undefined && body.number === undefined) {
    return res.status(400).json({
      error: "Name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })

  // if (persons.find((f) => f.name === body.name)) {
  //   return res.status(405).json({
  //     error: "Name must be unique",
  //   });
  // }

  // const person = {
  //   id: getRandomId(1, 100000),
  //   name: body.name,
  //   number: body.number,
  // };
  // persons = persons.concat(person);

  // // console.log(person);

  // res.json(person);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});