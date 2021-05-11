module.exports = (commitMessage, gitEmail, gitName) => {
	child_process.execSync("git", ["config", "user.email", gitEmail])
	child_process.execSync("git", ["config", "user.name", gitName])
	child_process.execSync("git", ["add", "-A"])
	child_process.execSync("git", ["commit", "-m", commitMessage])
	child_process.execSync("git", ["push", "origin", "master"])
}