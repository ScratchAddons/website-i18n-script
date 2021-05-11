const simpleGit = require("simple-git").default

const git = simpleGit("./")

module.exports = (commitMessage, gitEmail, gitName) => {
	git.addConfig("user.email", gitEmail)
	git.addConfig("user.name", gitName)
	git.add(".")
	git.commit(commitMessage)
	git.push("origin", "master")
}