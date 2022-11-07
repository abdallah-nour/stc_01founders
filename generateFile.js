// Dependencies
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// Current dir
const dirCode = path.join(__dirname, "files");

// Generate a new file and save if in files directory
const generateFile = async (format, codeBody) => {
    // Check if dir exist
    if (!fs.existsSync(dirCode)) fs.mkdirSync(dirCode, { recursive: true });

    const id = uuid();
    const fileName = `${id}.${format}`;
    const filePath = path.join(dirCode, fileName);
    await fs.writeFileSync(filePath, codeBody);
    return filePath;
};

// Export module
module.exports = { generateFile };
