const Users = require("./users-model");

const router = express.Router();

router.get("/users", (req, res) => {
  Users.allUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "server error" });
    });
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = Users.userById(id)
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

router.post("/users/add", (req, res) => {
  const user = req.body;

  if (!user.username) {
    res
      .status(400)
      .json({ message: "you must add a username and choose a character" });
  } else {
    Users.add(user)
      .then((user) => {
        res.status(200).json(user, { message: "user added!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "server error" });
      });
  }
});

router.delete("/users/:id", (req, res) => {
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
