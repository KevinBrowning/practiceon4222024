const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const createUsersAndRobots = async() => {
  const hashedPass1 = await bcrypt.hash(`randomPass1`, 10);
  const hashedPass2 = await bcrypt.hash(`randomPass2`, 10);
  const hashedPass3 = await bcrypt.hash(`randomPass3`, 10);

  const user1 = await prisma.users.create({
    data:{
      username: "test user uno",
      password: hashedPass1
    }
  });
  const user2 = await prisma.users.create({
    data:{
      username: "test user dos",
      password: hashedPass2
    }
  });
  const user3 = await prisma.users.create({
    data:{
      username: "test user tres",
      password: hashedPass3
    }
  });
  const robot1 = await prisma.robots.create({
    data: {
      name: `uno`,
      color: `blue`,
      userid: 1
    }
  });
  const robot2 = await prisma.robots.create({
    data: {
      name: `dos`,
      color: `red`,
      userid: 2
    }
  });  
  const robot3 = await prisma.robots.create({
    data: {
      name: `tres`,
      color: `green`,
      userid: 3
    }
  });
};

createUsersAndRobots();