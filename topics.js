const GitHubApi = require('github');
const chalk = require('chalk');

const github = new GitHubApi({
  debug: false,
});

const run = async () => {
  const {data: issues} = await github.issues.getForRepo({
    owner: 'BuildingXwithJS',
    repo: 'proposals',
  });
  const topSortedIssues = issues.sort((a, b) => b.reactions.total_count - a.reactions.total_count).slice(0, 5);
  topSortedIssues.forEach(issue => {
    console.log(
      `${chalk.grey('>')} [${chalk.green(issue.reactions.total_count)}] ${chalk.bold(issue.title)} - ${issue.html_url}`
    );
  });
};

run();
