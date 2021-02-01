const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

try {
  // generate file path list
  const basePath = path.join(__dirname, "src", "environments");
  const files = ["prod"].map((ex) =>
    path.join(basePath, `environment.${ex}.ts`)
  );

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

  // generate the build code message
  const buildMessage = `${commit}-${TRAVIS_BUILD_NUMBER}`;

  // update build code on the env files
  files.forEach((filePath) => {
    const f = fs.readFileSync(filePath).toString();
    const result = f.replace("####", buildMessage);
    fs.writeFileSync(filePath, result);
  });
} catch (err) {
  console.log("error: ", err);
}
