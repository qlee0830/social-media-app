const express = require("express");
const router = express.Router();

const userController = require("./../controllers/userController");
const { register, login } = require("./../controllers/authController");

router.post("/auth/register", register);
router.post("/auth/login", login);

router.route("/users").get(userController.getAllUsers);

router
  .route("/users/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  // follow & unfollow user
  .put(userController.followUser)
  .put(userController.unfollowUser);

module.exports = router;
