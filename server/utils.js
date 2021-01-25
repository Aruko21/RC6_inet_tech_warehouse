const fs = require("fs");
const path = require("path");

// Working with filesystem with promises
const fsp = fs.promises;

const dirPath = path.resolve(__dirname, "temp");
console.log("check path: ", dirPath)
const filePath = path.resolve(dirPath, "warehouse.json");

const readData = async () => {
    if (!fs.existsSync(filePath)) {
        if (!fs.existsSync(dirPath)) {
            // Create directory if not exists
            await fsp.mkdir(dirPath);
        }
        // If file not exists - it creates when open to write
        const file = await fsp.open(filePath, "w");
        await file.write("[]");
        await file.close();

        return [];
    }

    const data = await fsp.readFile(filePath, { encoding: "utf-8" });
    return JSON.parse(data);
};

const writeData = async (data) => {
    if (data === undefined) return;

    if (!fs.existsSync(dirPath)) {
        // Create directory if not exists
        await fsp.mkdir(dirPath);
    }

    await fsp.writeFile(filePath, JSON.stringify(data), "utf-8");
};

module.exports = {
    readData,
    writeData
}

