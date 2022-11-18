# TODO

- [ ] webhook POST request from API (OR request results every 1s for 5 times)
  - will update DB with response result
  - download output
  - extract output
  - store in DB (OR assert then store in DB)
- [ ] client request API results
  - every 1s for 5 times (await then fire next one if no result)
  - API check DB (code-execution results)
  - once result received
- [ ] user open challenge 1 page
  - request challenge one details
  - also check for challenge one status (for this user)
    - send challenge title
    - check challenges_solutions.isDone
- [ ] challenges_solutions
  - contain **latest** submitted code with it's API response
  -

## Flow

- [x] user submit code to /execute-code
- [x] send code to API
- [x] store API init response code in challengesSubmissions with PENDING/ERROR state
- [ ] get code result from output
- [ ] store code result in challengesSubmissions
- [ ] assert code result with our test results
- [ ] client keep requesting from challengesSubmissions Status

## Handle multiple test for each challenges

- [ ] test schema
  - array of tests required result
  - array of tests inputs
  - relational stuff (challengeTitle)
- [ ] user submit code
  - get challenge testsInput[]
  - execute code with each input, one by one
    - store execute results in DB (What about using realtime DB, e.g. firestore?)
  - assert each execution results with testsResults[]
    - store tests results in DB
    - if success => isDone=true
- [ ] user retrieve execution & tests results
  - fetch("challenge-results");
  - check codeSubmissions isDone

# TODO

- [ ] delete node_modules, .env
- [ ] add route inputs validation

# BEFORE UPLOAD

- [ ]

# Future

- [ ] when user had already passed test, add his solution in editor
- [ ] rename Many to many relation between USER and CHALLENGES_SOLUTIONS
- [ ] change ChallengesSubmissions.challengeTitle to be challenge
- [ ] better handle for ChallengesSubmissions.status and it's transition
- [ ] realtime DB
