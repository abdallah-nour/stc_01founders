const fetch = require("cross-fetch");
const { REQUEST_STATUS, SUBMISSION_URL, LANGUAGES_MAP } = require("../data/HE_API");
const doAsync = require("./doAsync");
const error = require("./error");

const getFetchConfig = (codeLanguage, code) => {
  const data = {
    lang: LANGUAGES_MAP[codeLanguage],
    source: code,
    callback: process.env.HACKEREARTH_CALLBACK
  };
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "client-secret": process.env.HACKEREARTH_CLIENT_SECRETID
    }
  };
  return config;
}
/**
 * 
 * @param {"PYTHON" | "JS" | "GO"} codeLanguage 
 * @param {string} code 
 */
const executeCodeByAPI = async (codeLanguage, code) => {
  const config = getFetchConfig(codeLanguage, code);
  const [err, res] = await doAsync(fetch)(SUBMISSION_URL, config);
  const result = await res?.json();
  const requestStatus = result?.request_status?.code;
  if (err || !res.ok || requestStatus === REQUEST_STATUS.FAILED)
    throw error({ message: "Failed to execute code", statusCode: 400 });

  return result;
}

module.exports = executeCodeByAPI;
