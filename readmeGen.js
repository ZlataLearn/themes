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

const writeFileP = (file, data) =>
	new Promise((resolve) => {
		fs.writeFile(file, data, resolve);
	});

const linkRegex = /\[([^\]]*)\]\(([^)]*\.md)\)/giu;

const getReadmeTODO = (unusedLinks) => `# TODO

*Cсылки, которые никуда не ведут*

${unusedLinks
	.map(
		({ filename, from, names }) =>
			`**${filename}**<br />
*Названия: ${names.map((name) => `"${name}"`).join(", ")}*

> ${from
				.map(
					({ title, currentFileName: link, prevTitle }, index) =>
						`[${title}](${link}), раздел "[${prevTitle}](${link}#${prevTitle
							.toLowerCase()
							.split("`")
							.join("")
							.split(" ")
							.join("-")})"`
				)
				.join("<br />")}
`
	)
	.join("\n")}

`;

const getReadmeTOC = (data) => `# Список файлов

${data
	.map(
		({ title, filename, definition }, index) =>
			`**${index + 1}. [${title}](${filename})**${
				definition
					? `
> ${definition}`
					: ""
			}`
	)
	.join("\n\n")}

`;

const getFileNameFromPath = (path) => path.split("/").reverse()[0];

glob(__dirname + "/*.md", {}, async (err, filesRaw) => {
	let files = [];
	{
		const jsonFilePath = __dirname + "/files.txt";
		const filesContent = await readFileP(jsonFilePath);
		const filesArr = filesContent.split("\n").map((s) => s.trim());
		files = [
			...filesArr,
			...filesRaw.filter(
				(file) =>
					!filesArr.some(
						(fileName) => fileName === getFileNameFromPath(file)
					)
			),
		];
		writeFileP(jsonFilePath, files.map(getFileNameFromPath).join("\n"));
	}
	if (err) {
		return;
	}
	try {
		const fileNames = files.reduce((acc, path) => {
			acc[path] = getFileNameFromPath(path);
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
				const index = (() => {
					const definitionTitleIndex = lines.findIndex((line) =>
						line.includes("## Определение")
					);
					if (definitionTitleIndex !== -1) {
						return definitionTitleIndex;
					}
					const fileTitleIndex = lines.findIndex(
						(line) => line.slice(0, 2) === "# "
					);
					return fileTitleIndex;
				})();
				if (index === -1) {
					return "";
				}
				return lines[index + 2].trim();
			})();
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
						if (result[0] === "[Назад](README.md)") {
							continue;
						}
						const [, name, filename] = result;
						if (fileNamesArray.includes(filename)) {
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
		});
		const data = (await Promise.all(promises)).filter((item) => item);
		const readmeTOC = getReadmeTOC(data);
		const unusedLinks = data.reduce((acc, item) => {
			item.unusedLinks.forEach((link) => {
				const similarIndex = acc.findIndex(
					(accItem) => accItem.filename === link.filename
				);
				if (similarIndex === -1) {
					acc.push(link);
				} else {
					acc[similarIndex].from.push(...link.from);
					acc[similarIndex].names.push(
						...link.names.filter(
							(name) => !acc[similarIndex].names.includes(name)
						)
					);
				}
			});
			return acc;
		}, []);
		const readmeTODO = getReadmeTODO(unusedLinks);
		fs.writeFile(README_FILENAME, `${readmeTOC}${readmeTODO}`, (err) => {
			if (err) {
				console.log(err);
			}
		});
	} catch (e) {
		console.log(e);
	}
});
