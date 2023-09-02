import Person from './Person';

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map(p =>
        <Person
          key={p.id}
          name={p.name}
          number={p.number}
          handleDelete={() => handleDelete(p)} />
      )}
    </ul>
  );
};

export default Persons;
