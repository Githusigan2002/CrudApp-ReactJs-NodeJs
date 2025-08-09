const express = require("express");
const users = require("./user.json");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;
<<<<<<< HEAD
=======


>>>>>>> 05a2ab3ca62fa03ca03bac0a87fd0fe45112506e

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

//Display All Users
app.get("/users", (req, res) => {
  return res.json(users);
});

//Delete User
app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let filteredUsers = users.filter((user) => user.id !== id);

  // fs.writeFile("./user.json", JSON.stringify(filteredUser), (err, data) => {
  //     return res.json(filteredUsers);
  // });

  fs.writeFile("./user.json", JSON.stringify(filteredUsers, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete user" });
    }
    return res.json(filteredUsers);
  });
});

//Add new User
app.post("/users", (req, res) => {
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).send({ message: "All Fields Required!" });
  }

  let id = Date.now();
  users.push({ id, name, age, city });

  fs.writeFile("./user.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add user" });
    }
    return res.json({ Message: "User Added Success" });
  });
});

//Update User
app.patch("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).send({ message: "All Fields Required!" });
  }

  let index = users.findIndex((users) => users.id == id);
  users.splice(index, 1, { ...req.body });

  fs.writeFile("./user.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update user" });
    }
    return res.json({ Message: "User Updated Success" });
  });
});

app.listen(port, (err) => {
<<<<<<< HEAD
  console.log(`App is running in port ${port}`);
=======
    console.log(`App is running in port ${port}`);
>>>>>>> 05a2ab3ca62fa03ca03bac0a87fd0fe45112506e
});
