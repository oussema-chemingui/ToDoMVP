const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 5000;

app.use(cors())
app.use(bodyParser.json())

app.get('/todos', (req, res) => {
  db.queryAsync('SELECT * FROM todosTable ORDER BY id DESC')
  .then( data => res.json(data))
  .catch( err => res.send(err));
});

app.post('/create', (req, res) => {
  console.log(req.body)
db.queryAsync(`INSERT INTO todosTable (todos , completed) VALUES ('${req.body.task}' , false)`)
.then( () => console.log('todo added'))
.catch( err => console.log(err));
});

app.delete('/delete/:id', (req, res) => {
  console.log(req.params.id)
  db.queryAsync(`DELETE FROM todostable WHERE id = ${req.params.id} `)
  .then( () => console.log('todo removed'))
  .catch( err => res.send(err));
});

app.put('/edit/:id', (req, res) => {
  console.log(req.params) 
  db.queryAsync(`UPDATE todosTable SET todos = '${req.body.todos}' WHERE id = ${req.params.id} `)
  .then( () => console.log('todo updated'))
  .catch( err => res.send(err));
});

app.put('/done/:id', (req, res) => {
  console.log(req.params) 
  console.log(req.body)
  db.queryAsync(`UPDATE todosTable SET completed = ${req.body.completed} WHERE id = ${req.params.id} `)
  .then( () => console.log('todo Done'))
  .catch( err => res.send(err));
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});