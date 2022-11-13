const express = require("express");
const Dog = require("./dogs-model");
const router = express.Router();

// DOGS ENDPOINTS
// DOGS ENDPOINTS
// DOGS ENDPOINTS
router.get("/", (req, res) => {
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

router.get("/api/dogs/only", (req, res) => {
  Dog.onlyDog()
    .then((dogs) => {
      if (dogs) {
        res.status(200).json(dogs);
      } else {
        res.status(404).json({ message: "no dogs found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = router;
