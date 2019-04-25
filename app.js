const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const { db } = require('./models');
const models = require('./models');
const wiki = require('./routes/wiki')
const user = require('./routes/user')

app.use(morgan('dev'));
app.use(express.static(__dirname + "public"));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wiki);
app.use('/user', user);


db.authenticate().
then(() => {
  console.log('connected to the database');
})


app.get('/', (req, res) => {
  res.redirect('/wiki')
});

const PORT = 3000;

async function init(){
  await models.db.sync({force: true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`)
  })
}

init();

module.exports = app
