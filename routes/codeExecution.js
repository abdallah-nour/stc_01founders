const router = require("express").Router();
const {
  executeCode,
  executeCodeCallback,
} = require("../controllers/codeExecutionController");
const { isAuthenticated, checkUser } = require("../middleware/auth");

router.post("/execute-code", isAuthenticated, checkUser, executeCode);

router.post("/execute-code/callback", executeCodeCallback);

module.exports = router;
