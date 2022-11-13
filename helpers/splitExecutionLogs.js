
module.exports = (outputLog) => {
  const outputAsArrayOfLines = outputLog.trim().split("\n");
  const lastLine = outputAsArrayOfLines[outputAsArrayOfLines.length - 1];
  const restLines = outputAsArrayOfLines.splice(0, outputAsArrayOfLines.length - 1);
  return [lastLine, restLines.join("\n")];
}