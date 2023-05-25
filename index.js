const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    important: false,
  },
  {
    id: 3,
    content: "HTML is easy",
    important: true,
  },
];

let persons = [

    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello, Express!!</h1>");
});

app.get("/api/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>`)
});

app.get("/api/notes", (request, response) => {
  response.status(200).json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);

  response.status(200).json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  notes = notes.filter((note) => note.id === id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const maxId = notes.length + 1;
  const note = request.body;
  note.id = maxId;

  notes = notes.concat(note);
  response.json(note);
});

app.get("/api/persons", (request, response) => {
  response.status(200).json(persons);
});


app.get("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const person = persons.find((person) => person.id === id);

  response.status(200).json(person);
  
});

app.delete("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  persons = persons.filter((person) => person.id === id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const {name, number} = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: "name or number missing"
    });
  }
  const checkNameExists = persons.some((person) => person.name === name);

  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    name,
    number,
    id: generateId(persons),
  };
  
  persons = persons.concat(person);
  response.status(201).json(person);
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});