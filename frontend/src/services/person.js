import axios from 'axios';

const baseURL = '/api/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

const create = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((res) => res.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((res) => res);
};

const replaceNumber = (id, newObj) => {
  const request = axios.put(`${baseURL}/${id}`, newObj);
  return request.then((res) => res.data);
};

const service = {
  getAll,
  create,
  remove,
  replaceNumber
};

export default service
