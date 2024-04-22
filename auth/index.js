const router = require('express').Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');

router.use(express.json());

router.post('/register', async (req, res, next) => {
  try{
    const { username, password } = req.body;
    console.log(req.body)
    const hashedPass = await bcrypt.hash(password, saltRounds);
    createdUser = await prisma.users.create({
      data: {
        username,
        password: hashedPass
      }
    })
    const token = jwt.sign({ id: createdUser.id }, process.env.SECRET)
    res.status(201).send({token});
  }catch(err){
    throw err
  }
});

router.post('/login', async (req,res, next) => {
  try{
    const { username, password } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        username
      }
    });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return res.status(401).send("Invalid login credentials.");
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET)
    res.send(token);    
  }catch(err){
    throw err
  }
})

module.exports = router;