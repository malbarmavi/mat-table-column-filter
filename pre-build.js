const { execSync } = require("child_process");
const fs = require("fs");

try {
  const path = `${__dirname}\\src\\environments`;
  const files = ["prod"].map((ex) => `${path}\\environment.${ex}.ts`);

  const { TRAVIS_BUILD_NUMBER } = process.env;

  const gitCommand = "git log -1";
  const gitResult = execSync(gitCommand)
    .toString()
    .split(`\n`)
    .map((r) => r.trim())
    .filter((r) => r);
  const branch = execSync("git branch --show-current").toString().trim();

  let [commit] = gitResult;
  commit = commit.split(" ")[1];

  const buildMessage = `${branch}-${commit}-${TRAVIS_BUILD_NUMBER}`;

  files.forEach((filePath) => {
    const f = fs.readFileSync(filePath).toString();
    const result = f.replace("####", buildMessage);
    fs.writeFileSync(filePath, result);
  });
} catch {}