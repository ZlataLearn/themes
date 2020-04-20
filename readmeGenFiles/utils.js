const fs = require("fs");

const readFileP = (file) =>
	new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) {
				reject();
				return;
			}
			resolve(data.toString());
		});
	});

const writeFileP = (file, data) =>
	new Promise((resolve) => {
		fs.writeFile(file, data, resolve);
	});

const getFileNameFromPath = (path) => path.split("/").reverse()[0];

module.exports = {
	readFileP,
	writeFileP,
	getFileNameFromPath,
};
