var utils = require("./utils");

const releaseRe = /^release/;
const isProd = (branchInfo) => releaseRe.test(branchInfo);
let branchInfo = utils.getGitBranchInfo();
const DSN = "http://8fd088d690d74d6ead1b3bfc78752d06@172.20.5.44:9000/5";

const config = {
  dsn: DSN,
  maxBreadcrumbs: 50,
  debug: !isProd(branchInfo),
  environment: isProd(branchInfo) ? "production" : "dev",
  attachStacktrace: true,
  autoSessionTracking: true,
  sampleRate: 1.0,
  beforeSend(event) {
    if (isProd(branchInfo) && event.user) {
      delete event.user.email;
      delete event.user.username;
    }
    // console.log("event", event);
    return event;
  },
};
if (isProd(branchInfo)) {
  config.release = branchInfo;
} else {
  // config.release = "releases/20331111";
  // config.release = "ccc@0.0.1";
}

// console.log(">>>>>>>>loading sentry config ...");
module.exports = {
  ...config,
};
