# A Father's Lullaby

[![Build Status](https://travis-ci.org/thoughtworksarts/a-fathers-lullaby.svg?branch=release)](https://travis-ci.org/thoughtworksarts/a-fathers-lullaby)

### To run locally

* Clone this repo to your local device
* `cd` into the repo directory
* Run `npm install` (only for the first time you run the app)
* Run `npm start`

### To commit and push

* First, push to the `master` branch:
  1. Make your changes on the `master` branch
  2. Lint the code by running `npm run lint:fix`
  3. Run all tests (`npm test a`) and check that they pass
  4. `git add [your changed files]`
  5. `git commit -m [your commit message]`
  6. `git push`
* Second, push to the `release` branch (this branch is the one that's connected to our CI pipeline):
  1. `git checkout release`
  2. `git merge master`
  3. `git push`
* Checkout to the `master` branch again (`git checkout master`) and [check the CI builds](https://travis-ci.org/thoughtworksarts/a-fathers-lullaby/builds)
* If the build <span style="color:green">passes</span>, you're done!
* If the build <span style="color:red">fails</span>, click the link highlighted below to read the errors, fix the issue, and commit/push the fix by following the instructions above
![screenshot for readme](src/assets/screenshot-for-readme.png)

### To run tests

* Jest and Enzyme, ie. unit/component tests
  1. Run `npm test` to launch the tests in watch mode
  2. Type `a` to run all tests
  3. The one-liner for the two commands above is `npm test a`
* Cypress, ie. end-to-end tests
  1. Run `npm install` (only for the first time you run the E2E tests)
  2. Run `npm start` or `npm start` to run the app so that Cypress can access it at localhost:3000
  3. In a different terminal tab/window, run `npm run cypress` to launch the Cypress app and click the `▶️ Run all specs` button
  4. To run the end to end testing in the terminal, you may also run `npm run cypress:headless`
