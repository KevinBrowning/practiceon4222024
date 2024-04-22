const router = require('express').Router();
const express = require('express');

router.use('/robots', require('./robots'));

router.get('/', (req, res) => {
  res.send(`<h1>Hello!</h1>`)
});


module.exports = router;