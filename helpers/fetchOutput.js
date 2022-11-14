const { default: fetch } = require("cross-fetch");

module.exports = async (url = "") => {
  const res = await fetch(url);
  if (!res.ok) throw res.statusText;
  const text = await res.text();
  return text;
}