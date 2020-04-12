const glob = require("glob");
const fs = require("fs");

const README_FILENAME = "README.md";

const readFileP = file => new Promise((resolve, reject) => {
	fs.readFile(file, (err, data) => {
		if (err) {
			reject();
			return;
		}
		resolve(data.toString());
	})
});

const getReadme = data => `# Список файлов

${data.map(({title, filename}) => `* [${title}](${filename})`).join('\n')}`;

glob(__dirname + "/*.md", {}, async (err, files) => {
	if (err) {
		return;
	}
	try {
		const promises = files.map(async file => {
			const filename = file.split('/').reverse()[0];
			if (filename === README_FILENAME) {
				return false;
			}
			const data = await readFileP(file);
			const title = data
				.split("\n")
				.find(line => line.slice(0, 2) === '# ')
				.slice(2)
				.trim();
			return {
				title,
				filename
			};
		});
		const data = await Promise.all(promises);
		const readme = getReadme(data.filter(item => item));
		fs.writeFile(README_FILENAME, readme, (err) => {
			if (err) {
				console.log(err);
			}
		})
	}
	catch (e) {
		console.log(e)
	}
});
