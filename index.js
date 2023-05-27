const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "Browser can execute only Javascript",
    important: true,
  },
  {
    id: 2,
    content: "CSS is hard",
    important: false,
  },
  {
    id: 3,
    content: "Server programming is cool",
    important: true,
  },
];

let persons = [
  {
    id: 1,
    name: "Ruth Joy Tolentino",
    number: "+63966-5807-599",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    number: "+63909-2453-909",
  },
  {
    id: 3,
    name: "Ramon Gonzales",
    number: "+63906-768-768",
  },

  {
    id: 4,
    name: "Carlo Dacuyan",
    number: "+63996-234-890",
  },
];

function generateId(db) {
  const maxId = db.length > 0 ? Math.max(...db.map((d) => d.id)) : 0;

  return maxId + 1;
}
app.get("/", (request, response) => {
  response.send("<h1>Hello, Nodemon!</h1>");
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
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes),
  };

  notes = notes.concat(note);

  response.status(201).json(note);
});

app.put("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  notes = notes.map((note) => (note.id === id ? note : note));

  response.status(200).json(note);
})

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
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const nameExists = persons.some((person) => person.name === name);

  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
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

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people<p>`);
});

app.listen(PORT, () => {
  console.log(`Server is now running on Port ${PORT}`);
});