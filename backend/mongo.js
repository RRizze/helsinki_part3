const mongoose = require('mongoose');

const argvLength = process.argv.length;

if (argvLength < 3) {
  console.log('give password as third argument');
  process.exit(1);
} else if (argvLength >= 6) {
  console.log('name must be enclosed in quotes');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb://root:${password}@127.0.0.1:27017/phonebook`;

mongoose.set('strictQuery', false);

const connectOptions = { authSource: 'admin' };

mongoose.connect(url, connectOptions)
  .then(res => {
    console.log('connection succesfull');
  })
  .catch(err => {
    console.log('connection error', err);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (argvLength === 3) {
  console.log('phonebook:');

  Person.find({}).then(res => {
    res.forEach(person => console.log(person));
    mongoose.connection.close();
  });


} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then(res => {
    console.log(`addded ${name} number ${number} to phonebook`);

    mongoose.connection.close();
  });
}
