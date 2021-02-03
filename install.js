var utils = require("./utils");
var sentry = utils.isNodeEnv()
  ? require("@sentry/node")
  : require("@sentry/browser");
var config = require("./config");
var tracing = require("@sentry/tracing");
var sentry_integrations = require("@sentry/integrations");
// var http = trequire("http");

const integrations = utils.isNodeEnv()
  ? [
      new sentry.Integrations.Http({ tracing: true }),
      new sentry_integrations.CaptureConsole({ levels: ["error"] }),
    ]
  : [
      new tracing.Integrations.BrowserTracing(),
      new sentry_integrations.CaptureConsole({ levels: ["error"] }),
    ];

const startSentry = () => {
  sentry.init({
    ...config,
    integrations,
    tracesSampleRate: 1.0,
  });
  const username = utils.getGitUserNameInfo();
  const email = utils.getGitUserMailInfo();
  sentry.configureScope((scope) => {
    scope.setUser({ username, email });
  });
  return sentry;
};
let s = startSentry();
// s.close(10000000).then(() => {
//   console.log("Closing sentry.....");
// });
// console.error("asdasdsd");
// Promise.reject("asdsad");
// sentry.captureException(Promise.reject("1"), (scope) => {});
// request = http.get("http://www.baidu.com", (res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
// });
// const transaction = sentry.startTransaction({ name: "test-transaction" });
// const span = transaction.startChild({ op: "functionX" }); // This function returns a Span
// // functionCallX

// setTimeout(() => {
//   span.finish(); // Remember that only finished spans will be sent with the transaction
//   transaction.finish();
// }, 10000);
// sentry.close(5000);
