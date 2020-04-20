const { readFileP, writeFileP, getFileNameFromPath } = require("./utils");
const { listFilePath } = require("./constants");

const proceedFilesList = async (filesRaw) => {
	const filesContent = await readFileP(listFilePath);
	const filesArr = filesContent.split("\n").map((s) => s.trim());
	let files = [
		...filesArr,
		...filesRaw.filter(
			(file) =>
				!filesArr.some(
					(fileName) => fileName === getFileNameFromPath(file)
				)
		),
	];
	await writeFileP(listFilePath, files.map(getFileNameFromPath).join("\n"));
	return files;
};

module.exports = proceedFilesList;
