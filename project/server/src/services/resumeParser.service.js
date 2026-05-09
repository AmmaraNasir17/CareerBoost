const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

const extractTextFromDOCX = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

const extractTextFromFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") return await extractTextFromPDF(filePath);
  if (ext === ".docx" || ext === ".doc") return await extractTextFromDOCX(filePath);

  throw new Error("Unsupported file type");
};

const extractKeywordsFromText = (text) => {
  const commonWords = new Set([
    "the", "and", "for", "with", "this", "that", "from", "are", "was",
    "were", "have", "has", "had", "been", "will", "would", "could", "should",
    "may", "might", "shall", "can", "not", "but", "also", "than", "then",
    "when", "where", "who", "what", "how", "all", "any", "both", "each",
    "few", "more", "most", "other", "into", "through", "during", "before",
    "after", "above", "below", "between", "out", "off", "over", "under",
    "again", "further", "once", "here", "there", "why", "which"
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !commonWords.has(word));

  const frequency = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([word]) => word);
};

module.exports = {
  extractTextFromFile,
  extractKeywordsFromText,
};