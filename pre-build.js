const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

try {
  // generate file path list
  const buildInfoPath = path.join(__dirname, "build-info.json");

  // get travis build number
  const { TRAVIS_BUILD_NUMBER } = process.env;

  // get last commit
  const gitCommand = "git log -1";
  const gitResult = execSync(gitCommand)
    .toString()
    .split(`\n`)
    .map((r) => r.trim())
    .filter((r) => r);

  let [commit] = gitResult;
  commit = commit.split(" ")[1];

  // update build code on the env files

  const buildInfo = {
    buildNo: TRAVIS_BUILD_NUMBER,
    commit,
  };
  fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo));
} catch (err) {
  console.log("error: ", err);
}
