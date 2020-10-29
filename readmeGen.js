const glob = require("glob");

const getReadmeText = require("./readmeGenFiles/genParts");
const proceedFilesList = require("./readmeGenFiles/proceedFilesList");
const proceedOneFile = require("./readmeGenFiles/proceedOneFile");
const reduceUnusedLinks = require("./readmeGenFiles/reduceUnusedLinks");
const { writeFileP } = require("./readmeGenFiles/utils");
const { README_FILENAME } = require("./readmeGenFiles/constants");

glob("*.md", {}, async (err, filesRaw) => {
  if (err) {
    console.error(err);
    throw err;
  }

  const files = await proceedFilesList(filesRaw);
  const promises = files.map(proceedOneFile({ files }));
  const data = (await Promise.all(promises)).filter((item) => item);
  const unusedLinks = reduceUnusedLinks(data);

  await writeFileP(README_FILENAME, getReadmeText(data, unusedLinks));
});
