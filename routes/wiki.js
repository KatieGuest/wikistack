const express = require('express')
const router = express.Router();
//const addPageP = require('../views/addPage')
// const showPage = require('../views/wikipage')
const { Page } = require("../models");
const { addPage, wikiPage, main } = require("../views");


router.get('/', async (req, res) => {
  const allPages = await Page.findAll()
  console.log('all pages are:', allPages)
  res.send('/');
})

router.post('/', async (req, res, next) => {
    const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }

  console.log(page);
});

router.get('/add', (req, res) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  //res.send(`hit dynamic route at ${req.params.slug}`);
  // let slugName = req.params.slug;

  // const page = await Page.findOne({
  //   where: {slug: slugName}
  // });
  // console.log(page);
  // res.json(showPage(page.));

  try{
    const page = await Page.findOne({
      where:{
        slug: req.params.slug
      }
    });
    res.send(wikiPage(page));
  }
  catch(error){next(error)}
});

module.exports = router;

