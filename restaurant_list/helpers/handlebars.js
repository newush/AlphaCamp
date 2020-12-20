module.exports = {
  ifeq: function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
}
//reference: https://stackoverflow.com/questions/41423727/handlebars-registerhelper-serverside-with-expressjs