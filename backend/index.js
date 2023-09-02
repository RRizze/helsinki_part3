require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('res-body', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'));

// GET /api/persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

// GET /api/info
app.get('/api/info', (req, res) => {
  Person.countDocuments({})
    .then((count) => {
      let info = `<p>Phonebook has info for ${count} people</p>`;
      const date = new Date();
      info += `<p>${date}</p>`;

      res.send(info);
    });
});

// GET /api/persons/:id
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      console.log(`failed to get person of id`, err);
      res.status(400).send({ error: 'malformatted id' });
    });
});

// DELETE /api/persons/:id
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      console.log('DELETED', result);
      res.status(204).end();
    })
    .catch(err => next(err));
});

// POST /api/persons
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  Person.find({ name })
    .then(personFind => {
      if (personFind.length !== 0) {
        return res.status(400).json({ error: 'name must be unique' });
      }
      else {
        const person = new Person({ name, number });
        person.save()
          .then(savedPerson => {
            res.json(savedPerson);
          })
          .catch(err => next(err));
      }
    })
    .catch(err => console.log(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  const person = {
    name, number,
  };

  Person.findByIdAndUpdate(
    req.params.id,
    person,
    { new: true, runValidators: true },
  )
    .then(updatedPerson => {
      res.json(updatedPerson);
    })
    .catch(err => next(err));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
