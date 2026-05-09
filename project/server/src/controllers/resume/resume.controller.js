const resumeBuilder = require("./resumeBuilder.controller");
const resumeAnalyzer = require("./resumeAnalyzer.controller");

module.exports = { ...resumeBuilder, ...resumeAnalyzer };