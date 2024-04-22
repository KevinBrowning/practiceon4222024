const router = require('express').Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const express = require('express');
router.use(express.json());

router.get('/', async (req, res, next) => {
  try {
    const robots = await prisma.robots.findMany();
    res.json(robots);
    next();
  } catch (err) {
    throw err;
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const robot = await prisma.robots.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    res.json(robot);
  } catch (err) {
    throw err;
  }
});

router.post('/', async (req, res) => {
  const authHeader = req.headers['authentication'];
  const { name, color } = req.body;

  if (!authHeader) {
    res.status(401).send(`Please log in first`);
  };
  const prefix = `Bearer `
  const token = authHeader.slice(prefix.length);

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send('Please try logging in again');
    }
    const userid = decoded.id;
    const createdRobot = await prisma.robots.create({
      data: {
        name,
        color,
        userid
      }
    });
    res.status(201).json(createdRobot);
  });
});

router.put('/:id', async (req, res) => {
  const authHeader = req.headers['authentication'];
  const { name, color } = req.body;
  const { id } = req.params;

  if (!authHeader) {
    res.status(401).send(`Please log in first`);
  };
  const prefix = `Bearer `
  const token = authHeader.slice(prefix.length);

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send('Please try logging in again');
    };
    const userid = decoded.id
    const updatedRobot = await prisma.robots.update({
      where: {
        id: parseInt(id),
        userid
      },
      data: {
        name,
        color,
      }
    });
    res.status(201).json(updatedRobot);
  });
});

router.delete('/:id', async (req, res) => {
  const authHeader = req.headers['authentication'];
  const { id } = req.params;

  if (!authHeader) {
    res.status(401).send(`Please log in first`);
  };
  const prefix = `Bearer `
  const token = authHeader.slice(prefix.length);

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send('Please try logging in again');
    };
    const userid = decoded.id
    const deletedRobot = await prisma.robots.delete({
      where: {
        id: parseInt(id),
        userid
      }
    });
    res.status(201).json(deletedRobot);
  });
});


module.exports = router;