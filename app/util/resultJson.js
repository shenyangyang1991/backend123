module.exports = function (success, data, message) {
  return {
    success,
    data,
    message,
    status: success ? 200 : 500
  };
}