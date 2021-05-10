const fs = require("fs-extra")
const yaml = require("yaml")
const path = require("path")
const chalk = require("chalk")

module.exports = (langaugeJsonPath, configPath, languageCode) => {

	console.log(langaugeJsonPath)

	if (!languageCode) {
		const languageJsonPathPath = path.parse(langaugeJsonPath)
		languageCode = path.basename(languageJsonPathPath.dir)
		console.log(languageCode)
	}

	console.log(chalk`Adding {inverse ${languageCode}} to the site config...`)

	const languageJson = JSON.parse(fs.readFileSync(langaugeJsonPath, "utf-8"))
	const languageName = languageJson.languageName.string

	const config = yaml.parse(fs.readFileSync(configPath, "utf-8"))
	config.languages[languageCode] = {
		languageName,
		weight: 0,
		contentDir: "content-i18n/" + languageCode
	}
	fs.writeFileSync(configPath, yaml.stringify(config))

	console.log("Done!")

}