const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout')
const { db } = require('./models');
const models = require('./models');

app.use(morgan('dev'));
app.use(express.static(__dirname + "public"));
app.use(express.urlencoded({ extended: false }));


db.authenticate().
then(() => {
  console.log('connected to the database');
})


app.get('/', (req, res) => {
  res.send(layout(''))
});

const PORT = 3000;

async function init(){
  await models.Page.sync();
  await models.User.sync();

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`)
  })
}

init();

module.exports = app
