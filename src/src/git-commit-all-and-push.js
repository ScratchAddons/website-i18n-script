const simpleGit = require("simple-git").default

const git = simpleGit("./")

module.exports = (commitMessage, gitEmail, gitName) => {
	console.log("Commiting all files...")
	console.log(`user: ${gitName} <${gitEmail}>`)
	console.log(`message: ${commitMessage}`)
	git.addConfig("user.email", gitEmail)
	git.addConfig("user.name", gitName)
	git.add(".")
	git.commit(commitMessage)

	console.log("Pushing...")
	git.push("origin", "master")

	console.log("Done!")
}