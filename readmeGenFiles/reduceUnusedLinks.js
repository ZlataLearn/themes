const reduceUnusedLinks = (data) => {
	return data.reduce((acc, item) => {
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
};

module.exports = reduceUnusedLinks;
