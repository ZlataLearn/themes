const glob = require("glob");
const fs = require("fs");

const README_FILENAME = "README.md";

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

const linkRegex = /\[([^\]]*)\]\(([^)]*\.md)\)/giu;

const getReadmeTODO = (unusedLinks) => `# TODO

*Cсылки, которые никуда не ведут*

${unusedLinks
	.map(
		({ filename, from }) => `* ${filename} *[src](${from})*`
	)
	.join("\n")}

`;

const README_GETTING_STARTED = `# С чего начать

* [Переменные](variables.md)
* [Типы](types.md)
* [Условия](conditions.md)
* [Циклы](loops.md)
* [Функции](functions.md)

`;

const getReadmeTOC = (data) => `# Список файлов

${data
	.map(
		({ title, filename, definition }) => `**[${title}](${filename})**
> ${definition}`
	)
	.join("\n\n")}

`;

glob(__dirname + "/*.md", {}, async (err, files) => {
	if (err) {
		return;
	}
	try {
		const fileNames = files.reduce((acc, path) => {
			acc[path] = path.split("/").reverse()[0];
			return acc;
		}, {});
		const fileNamesArray = Object.values(fileNames);
		const promises = files.map(async (file) => {
			const currentFileName = fileNames[file];
			if (currentFileName === README_FILENAME) {
				return false;
			}
			const data = await readFileP(file);
			const lines = data.split("\n");
			const title = lines
				.find((line) => line.slice(0, 2) === "# ")
				.slice(2)
				.trim();
			const definition = (() => {
				const index = lines.findIndex((line) =>
					line.includes("## Определение")
				);
				if (index === -1) {
					return "";
				}
				return lines[index + 2].trim();
			})();
			const unusedLinks = [];
			{
				let result;
				while ((result = linkRegex.exec(data)) !== null) {
					if (result[0] === "[Назад](README.md)") {
						continue;
					}
					const [, name, filename] = result;
					if (fileNamesArray.includes(filename)) {
						continue;
					}
					unusedLinks.push({
						filename,
						from: currentFileName,
					});
				}
			}
			return {
				title,
				filename: currentFileName,
				definition,
				unusedLinks,
			};
		});
		const data = (await Promise.all(promises)).filter((item) => item);
		const readmeTOC = getReadmeTOC(data);
		const unusedLinks = data.reduce((acc, item) => {
			item.unusedLinks.forEach((link) => {
				if (
					!acc.some((accItem) => accItem.filename === link.filename)
				) {
					acc.push(link);
				}
			});
			return acc;
		}, []);
		const readmeTODO = getReadmeTODO(unusedLinks);
		fs.writeFile(
			README_FILENAME,
			`${readmeTOC}${README_GETTING_STARTED}${readmeTODO}`,
			(err) => {
				if (err) {
					console.log(err);
				}
			}
		);
	} catch (e) {
		console.log(e);
	}
});
