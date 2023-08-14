const express = require("express");
const { sequelize, User, Post } = require("./models");
const { where } = require("sequelize");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
      include: "posts",
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.post("/tasks", async (req, res) => {
  const { id, task } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    const todoTask = await Post.create({ task, userId: user.id });
    return res.json(todoTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
//Delete this
app.get("/tasks", async (req, res) => {
  try {
    const todoTask = await Post.findAll({
      include: "user",
    });
    return res.json(todoTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
//
app.listen({ port: 5000 }, async () => {
  console.log("Sever is up");
  await sequelize.authenticate();
  console.log("DATABASE CONNECTED!!");
});
