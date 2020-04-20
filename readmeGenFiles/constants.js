const README_FILENAME = "README.md";
const README_LINK_TEXT = `[Назад](${README_FILENAME})`;
const DEFINITION_LINE = "## Определение";
const linkRegex = /\[([^\]]*)\]\(([^)]*\.md)\)/giu;
const listFilePath = "./readmeGenFiles/files.txt";
const TITLE_PREFIXES = {
	1: "# ",
	2: "## "
}

module.exports = {
	README_FILENAME,
	README_LINK_TEXT,
	DEFINITION_LINE,
	linkRegex,
	listFilePath,
	TITLE_PREFIXES,
};
