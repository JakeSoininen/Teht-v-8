const express = require("express");
const router = express.Router();

const athleteController = require("../controllers/athleteControllers");

router.get("/", athleteController.getAll);
router.get("/:id", athleteController.getById);
router.post("/", athleteController.create);
router.put("/:id", athleteController.update);
router.delete("/:id", athleteController.remove);

module.exports = router;
