module.exports = ({ message, statusCode, data } = {}) => {
  const err = new Error(message);
  if (data) err.data = data;
  if (statusCode) err.statusCode = statusCode;
  return err;
}
