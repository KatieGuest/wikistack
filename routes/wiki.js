const express = require('express')
const router = express.Router();
const addPage = require('../views/addPage')


router.get('/', (req, res) => {
 res.send('/');
})

router.post('/', (req, res) => {
  res.send('/');
 })

router.get('/add', (req, res) => {
  res.send(addPage());
 })

module.exports = router;

