module.exports = (asyncFunc) => async (...args) => {
  try {
    let data = await asyncFunc(...args);
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}
