const { isTitle } = require("./isTitle");
const { README_LINK_TEXT, linkRegex } = require("./constants");

const findUnusedLinks = ({ lines, files, title, currentFileName }) => {
	const unusedLinks = [];
	let prevTitle = {
		index: 0,
		text: "",
	};
	lines.forEach((line, lineIndex) => {
		if (isTitle(line, 2)) {
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

	return unusedLinks;
};

module.exports = findUnusedLinks;
