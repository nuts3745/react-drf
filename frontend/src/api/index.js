import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export function fetchTasks() {
  return client.get('/api/todo/');
}

export function createTask(params) {
  console.log(params);
  return client.post('/api/todo/', params);
}

export function editTask(id, params) {
  return client.put(`/api/todo/${id}`, params);
}

export function deleteTask(id) {
  return client.delete(`/api/todo/${id}/`)
}