const { REQUEST_STATUS } = require("../data/HE_API");
const getUserCodeWrapper = require("../helpers/getUserCodeWrapper");
const doAsync = require("../helpers/doAsync");
const error = require("../helpers/error");
const executeCodeByAPI = require("../helpers/executeCodeByAPI");
const getOutput = require("../helpers/fetchOutput");
const ChallengesSubmissions = require("../models/ChallengesSubmissions");
const splitExecutionLogs = require("../helpers/splitExecutionLogs");
const challengesTests = require("../helpers/challengesTests");
const User = require("../models/User");
const Challenge = require("../models/Challenge");
const isEqual = require("../helpers/isEqual");

const executeCode = async (req, res, next) => {
  const { lang, code, challengeTitle } = req.body;
  const { user } = res.locals;

  const challengeTest = challengesTests[challengeTitle];
  const wrappedCode = getUserCodeWrapper({
    challengeTitle,
    lang,
    userCode: code,
    params: challengeTest.params,
  });
  const [err2, executionData] = await doAsync(executeCodeByAPI)(
    lang,
    wrappedCode
  );
  if (err2) return next(err2);

  const { result, request_status, he_id } = executionData;
  if (request_status.code === REQUEST_STATUS.FAILED) return next(error());

  const data = {
    user: user.id,
    lang,
    code,
    challengeTitle,
    status: "PENDING",
    // from API response
    result,
    requestId: he_id,
  };
  await doAsync(() => ChallengesSubmissions.create(data))();
  res.status(201).json({ success: true, requestId: he_id }).end();
};

const executeCodeCallback = async (req, res, next) => {
  const { result, he_id: requestId } = req.body;
  const { code: statusCode } = req.body.request_status;
  const isCompileError = result?.compile_status !== "OK";

  if (statusCode === REQUEST_STATUS.COMPILED && !isCompileError)
    return res.json({ success: true });

  const isExecutionError = result?.run_status?.status !== "AC";
  const [err, submission] = await doAsync(() =>
    ChallengesSubmissions.findOne({ requestId })
  )();
  if (err || !submission) return res.json({ success: true });

  if (
    statusCode !== REQUEST_STATUS.COMPLETED ||
    isCompileError ||
    isExecutionError
  ) {
    submission.status = "FAILED";
    submission.stderr = result?.run_status?.stderr;
    await doAsync(() => submission.save())();
    return res.json({ success: true });
  }

  submission.result = { ...result };

  // fetch output
  const outputUrl = result.run_status.output;
  submission.outputUrl = outputUrl;
  const [err2, output] = await doAsync(getOutput)(outputUrl);
  if (err2) return res.json({ success: true });

  const [userFunctionReturnValue, userLogs] = splitExecutionLogs(output);

  // update submission doc
  submission.logs = userLogs;
  submission.executionReturnValue = userFunctionReturnValue;
  if (
    isEqual(userFunctionReturnValue,
      challengesTests[submission.challengeTitle].expectedResult)
  ) {
    submission.status = "SUCCESS";
    submission.isDone = true
    await doAsync(() => submission.save())();
  }
  else {
    submission.status = "TESTS_FAILED";
    return await doAsync(() => submission.save())();
  }

  // update user score
  const [err4, user] = await doAsync(() => User.findById(submission.user))();
  if (err4) return next(error());

  const didUserDoneChallenge = user.solvedChallenges.find(
    (title) => title === submission.challengeTitle
  );

  if (!didUserDoneChallenge) {
    user.solvedChallenges.push(submission.challengeTitle);
    const [err5, challenge] = await doAsync(() =>
      Challenge.findOne({ title: submission.challengeTitle })
    )();
    if (err5) return next(error());

    user.score = user.score + challenge.xp;
    await doAsync(() => user.save())();
  }
  res.json({ success: true });
};

const getCodeStatus = async (req, res, next) => {
  const { title, requestId } = req.params;
  const { user } = res.locals;

  const searchObj = requestId
    ? { challengeTest: title, user: user.id, requestId }
    : { challengeTest: title, user: user.id, isDone: true };
  const [err, submission] = await doAsync(() =>
    ChallengesSubmissions.findOne(searchObj)
  )();
  if (err || !submission)
    return next(error({ statusCode: 404 }));

  const { status, logs, stderr, executionReturnValue, isDone } = submission;
  res.json({ isDone, status, logs, stderr, executionReturnValue, submission });
};

module.exports = {
  executeCode,
  executeCodeCallback,
  getCodeStatus,
};
