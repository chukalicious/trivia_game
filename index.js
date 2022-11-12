const express = require("express");

const server = express();

server.use(express.json());

const Adopter = require("./api/adopters/adopters-model");
const Dog = require("./api/dogs/dogs-model");
const Users = require("./api/users/users-model");

// ADOPTERS ENDPOINTS
// ADOPTERS ENDPOINTS
// ADOPTERS ENDPOINTS
server.get("/api/adopters", (req, res) => {
  Adopter.find(req.query)
    .then((adopters) => {
      res.status(200).json(adopters);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the adopters",
      });
    });
});

server.get("/api/adopters/all", (req, res) => {
  Adopter.findAll()
    .then((adopters) => {
      if (adopters) {
        res.status(200).json(adopters);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

server.get("/api/adopters/:id", (req, res) => {
  Adopter.findById(req.params.id)
    .then((adopter) => {
      if (adopter) {
        res.status(200).json(adopter);
      } else {
        res.status(404).json({ message: "Adopter not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the adopter",
      });
    });
});

server.get("/api/adopters/:id/dogs", (req, res) => {
  Adopter.findDogs(req.params.id)
    .then((dogs) => {
      if (dogs.length > 0) {
        res.status(200).json(dogs);
      } else {
        res.status(404).json({ message: "No dogs for this adopter" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the dogs for this adopter",
      });
    });
});

server.post("/api/adopters", (req, res) => {
  Adopter.add(req.body)
    .then((adopter) => {
      res.status(201).json(adopter);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the adopter",
      });
    });
});

server.delete("/api/adopters/:id", (req, res) => {
  Adopter.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The adopter has been nuked" });
      } else {
        res.status(404).json({ message: "The adopter could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the adopter",
      });
    });
});

server.put("/api/adopters/:id", (req, res) => {
  const changes = req.body;
  Adopter.update(req.params.id, changes)
    .then((adopter) => {
      if (adopter) {
        res.status(200).json(adopter);
      } else {
        res.status(404).json({ message: "The adopter could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the adopter",
      });
    });
});

// DOGS ENDPOINTS
// DOGS ENDPOINTS
// DOGS ENDPOINTS
server.get("/api/dogs", (req, res) => {
  Dog.find()
    .then((dogs) => {
      res.status(200).json(dogs);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the dogs",
      });
    });
});

// USER ENDPOINTS
// USER ENDPOINTS
// USER ENDPOINTS

server.get("/users", (req, res) => {
  Users.allUsers()
    .then((users) => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(402).json({ message: "not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "server error" });
    });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  Users.userById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "could not find user by the id" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "server error" });
    });
});

server.post("/users/add", (req, res) => {
  const user = req.body;
  if (!user.username) {
    res
      .status(400)
      .json({ message: "you must add a user name and choose a character" });
  } else {
    Users.add(user)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "server error" });
      });
  }
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

// OTHER ENDPOINTS
// OTHER ENDPOINTS
// OTHER ENDPOINTS
server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Shelter API</h>
    <p>Welcome to the Lambda Shelter API</p>
  `);
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
