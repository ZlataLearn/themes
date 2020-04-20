const isTitle = (line, level) =>
	line.slice(0, level + 1) === `${"#".repeat(level)} `;

const isTitleForMap = (level) => (line) => isTitle(line, level);

module.exports = { isTitle, isTitleForMap };
