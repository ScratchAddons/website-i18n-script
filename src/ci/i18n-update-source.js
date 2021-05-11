const { gitEmail, gitName } = require("./consts.js")

require("../src/compile-en-to-i18n.js")(
	"../website/", 
	"en/"
)

require("../src/git-commit-all-and-push.js")(
	`Update source files (${new Date().toISOString()})`,
	gitEmail,
	gitName
)