const { exec } = require("child_process");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");

const execAndLog = ({ command, startMsg, endMsg, callback }) => {
  const spinner = ora(startMsg).start();
  exec(command, (err) => {
    if (err) {
      return spinner.fail(chalk.red(err));
    } else {
      spinner.succeed(endMsg);
      if (callback) {
        return callback();
      }
    }
  });
};

if (process.argv.length < 3) {
  return console.error(
    chalk.red(
      `${chalk.bold("Error!")}  ${chalk.white(
        `You ${chalk.bold("must")} specify a valid ${chalk.italic(
          ".git"
        )} repo.`
      )}`
    )
  );
}

const url = process.argv[2];
const gitRepo = process.argv[2].split("/").slice(3).join("/");
const folderName = path.parse(process.argv[2]).name;
const destinationPath = path.join("~/Desktop/code", folderName);

execAndLog({
  command: `git clone ${url} ${destinationPath}`,
  startMsg: `${chalk.italic("(1/3)")} Cloning ${chalk.bold(
    gitRepo
  )} into ${chalk.italic(destinationPath)}...`,
  endMsg: chalk.green("Cloned successfully!"),
  callback: () =>
    execAndLog({
      command: `cd ${destinationPath} && yarn`,
      startMsg: `${chalk.italic("(2/3)")} Running ${chalk.italic(
        "yarn install"
      )}... Please wait, it may take a while.`,
      endMsg: chalk.green("Yarn-installed successfully!"),
      callback: () =>
        execAndLog({
          command: `code ${destinationPath}`,
          startMsg: `${chalk.italic("(3/3)")} Opening VS Code...`,
          endMsg: chalk.green(`${chalk.bold("SUCCESS!")} Happy coding :)`),
        }),
    }),
});
