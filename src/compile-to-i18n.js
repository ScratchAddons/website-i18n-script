const fs = require("fs-extra")
const globby = require("globby")
const yaml = require("yaml")
const { hugoPath, i18nPath } = require("./consts")

const allIndex = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])

const inputPath = hugoPath
const outputPath = i18nPath + "en/"

if (fs.existsSync(outputPath)) fs.removeSync(outputPath)

;(() => {
	const files = globby.sync(inputPath + "content/"+ "**.html")

	files.forEach(file => {
		let fileLines = fs.readFileSync(file, {encoding: "utf-8"}).split(/\r?\n/)
		let filePath = file.replace(inputPath + "content/", "")
		// console.log(fileLines)
		let frontMatterSeparator = allIndex(fileLines, "---")
		let frontMatterPart = fileLines.slice(frontMatterSeparator[0] + 1, frontMatterSeparator[1])
		let contentPart = fileLines.slice(frontMatterSeparator[1] + 1)
		fs.outputFileSync(outputPath + "html-front/" + filePath + ".yml", frontMatterPart.join("\r\n"))
		fs.outputFileSync(outputPath + "html-content/" + filePath, contentPart.join("\r\n"))
	})
})()

;(() => {
	const files = globby.sync(inputPath + "content/" + "**.md")

	files.forEach(file => {
		let fileLines = fs.readFileSync(file, {encoding: "utf-8"}).split(/\r?\n/)
		let filePath = file.replace(inputPath + "content/", "")
		fs.outputFileSync(outputPath + "markdown/" + filePath, fileLines.join("\r\n"))
	})
})()

;(() => {
	fs.copyFileSync(inputPath + "i18n/en.yaml", outputPath + "hugo-i18n.yml")
	const hugoConfig = yaml.parse(inputPath + "config.yml")
})()