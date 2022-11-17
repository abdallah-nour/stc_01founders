const router = require("express").Router();
const {
  executeCode,
  executeCodeCallback,
  getCodeStatus
} = require("../controllers/codeExecutionController");
const { isAuthenticated, checkUser } = require("../middleware/auth");

router.post("/execute-code", isAuthenticated, checkUser, executeCode);

router.post("/execute-code/callback", executeCodeCallback);

router.get("/execution-status/:title/:requestId?", isAuthenticated, checkUser, getCodeStatus);

module.exports = router;
