const { getSectionNameForLinks } = require("./utils");

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
						`[${title}](${link}), раздел "[${prevTitle}](${link}#${getSectionNameForLinks(
							prevTitle
						)})"`
				)
				.join("<br />")}
`
	)
	.join("\n")}

`;

const getReadmeTOC = (data) => `# Список файлов

${data
	.map(
		({ title, filename, definition, allTitles }, index) =>
			`## [${index + 1}. ${title}](${filename})<br />
${allTitles
	.map(({ text, link }) => `[${text}](${filename}#${link})`)
	.join(" • ")}

> ${definition}
`
	)
	.join("\n\n")}

`;

const getReadmeText = (data, unusedLinks) =>
	`${getReadmeTOC(data)}${getReadmeTODO(unusedLinks)}`;

module.exports = getReadmeText;
