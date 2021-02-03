var cp = {};
try {
  cp = require("child_process");
} catch (err) {
  cp.execSync = (cmd) => {
    throw new Error("not a node environment. use default config instead.");
  };
}
const execCmd = (cmd) => cp.execSync(cmd).toString().replace(/\s+/, "");

const isNodeEnv = () => typeof window === "undefined";

const structDef = (cmd, alternative, errLog) => () => {
  let result = null;
  try {
    result = execCmd(cmd);
  } catch (err) {
    console.warn(`[error:]${errLog || err.message}`);
    result = alternative || "default ";
  }
  return result;
};
const getGitBranchInfo = structDef(
  "git rev-parse --abbrev-ref HEAD",
  "no-git-branch-detected-running"
  //   "fetching git information failed. use default instead.",
);
const getGitUserNameInfo = structDef(
  "git config user.name",
  "anonymous name"
  //   "fetching git user.name failed.use default instead.",
);
const getGitUserMailInfo = structDef(
  "git config user.email",
  "anonymous mail"
  //   "fetching git user.name failed.use default instead.",
);
module.exports = {
  execCmd,
  getGitUserNameInfo,
  getGitUserMailInfo,
  getGitBranchInfo,
  isNodeEnv,
};
