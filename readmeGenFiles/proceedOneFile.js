const { readFileP } = require("./utils");
const { README_FILENAME, README_LINK_TEXT, linkRegex } = require("./constants");
const findDefinition = require('./findDefinition');
const findTitle = require('./findTitle');

const proceedOneFile = ({ files }) => async (currentFileName) => {
	if (currentFileName === README_FILENAME) {
		return false;
	}
	const data = await readFileP(currentFileName);
	const lines = data.split("\n");
	const title = findTitle(lines);
	const definition = findDefinition(lines);
	const unusedLinks = [];
	{
		let prevTitle = {
			index: 0,
			text: "",
		};
		lines.forEach((line, lineIndex) => {
			if (line.slice(0, 3) === "## ") {
				prevTitle = {
					index: lineIndex,
					text: line.replace("## ", ""),
				};
			}
			let result;
			while ((result = linkRegex.exec(line)) !== null) {
				if (result[0] === README_LINK_TEXT) {
					continue;
				}
				const [, name, filename] = result;
				if (files.includes(filename)) {
					continue;
				}
				unusedLinks.push({
					filename,
					from: [
						{
							title,
							currentFileName,
							prevTitle: prevTitle.text,
						},
					],
					names: [name],
				});
			}
		});
	}
	return {
		title,
		filename: currentFileName,
		definition,
		unusedLinks,
	};
};

module.exports = proceedOneFile;
