const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

const connectOptions = { authSource: 'admin' };

mongoose.connect(url, connectOptions)
  .then(res => {
    console.log('connection succesfull');
  })
  .catch(err => {
    console.log('connection error', err);
  });

const numberValidator = (num) => {
  return /^\d{2}-\d+$/.test(num);
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: numberValidator,
      message: props => `${props.value} is not a valid number.`,
    },
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
