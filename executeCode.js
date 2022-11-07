// Dependencies
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { stdout, stderr } = require("process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

const executeCode = (filePath) => {
    const fileName = path.basename(filePath.split(".")[0]);
    const format = path.basename(filePath.split(".")[1]);
    const outPath = path.join(outputPath, `${fileName}.out`);

    return new Promise((resolve, reject) => {
        switch (format) {
            case "cpp":
                exec(
                    `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${fileName}.out`,
                    (err, stdout, stderr) => {
                        if (err) {
                            reject(err, stderr);
                        }
                        if (stderr) {
                            reject(stderr);
                        }
                    }
                );
                break;
            case "js":
                exec(`node ${filePath}`, (err, stdout, stderr) => {
                    // if (err) {
                    //     resolve(err, stderr);
                    // }
                    if (stderr) {
                        console.log(stderr);
                        resolve(stderr.split(":")[1]);
                    }

                    resolve(stdout);
                });
                break;
        }
    });
};

// Export module
module.exports = { executeCode };
