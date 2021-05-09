const { readdirSync } = require("fs-extra");
const fs = require("fs-extra")
const globby = require("globby")

const { i18nPath, hugoReadyPath } = require("./consts")

const inputPath = i18nPath
const outputPath = hugoReadyPath

if (fs.existsSync(outputPath)) fs.removeSync(outputPath)

;(async () => {	
	const inputMarkdownPath = inputPath + "markdown/"
	const files = await globby(inputMarkdownPath + "**{html,md}")

	files.forEach(file => {
		let filePath = file.replace(inputMarkdownPath, "")
		fs.outputFileSync(outputPath + filePath, fs.readFileSync(file, {encoding: "utf-8"}))
	})
})()

;(async () => {
	const inputContentPath = inputPath + "content/"
	const files = await globby(inputContentPath + "**{html,md}")

	files.forEach(file => {
	
		const output = [
			"---",
			...fs.readFileSync(file.replace("content", "front-matter") + ".yml", {encoding: "utf-8"}).split(/\r?\n/),
			"---",
			...fs.readFileSync(file, {encoding: "utf-8"}).split(/\r?\n/)
		]

		let filePath = file.replace(inputContentPath, "")
		fs.outputFileSync(outputPath + filePath, output.join("\r\n"))

	})
})()

