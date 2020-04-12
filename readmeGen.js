const glob = require("glob");
const fs = require("fs");

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

${data.map(({title, file}) => `* [${title}](${file})`).join('\n')}`;

glob(__dirname + "/*.md", {}, async (err, files) => {
	if (err) {
		return;
	}
	try {
		const promises = files.map(async file => {
			const data = await readFileP(file);
			const title = data
				.split("\n")
				.find(line => line.slice(0, 2) === '# ')
				.slice(2)
				.trim();
			return {
				title,
				file: file.split('/').reverse()[0]
			};
		});
		const data = await Promise.all(promises);
		const readme = getReadme(data);
		fs.writeFile('README.md', readme, (err) => {
			if (err) {
				console.log(err);
			}
		})
	}
	catch (e) {
		console.log(e)
	}
});
