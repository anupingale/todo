const { KEY_SEPERATOR, KEY_VALUE_SEPERATOR } = require('./constant.js');

const parseUserInput = userDetails => {
  const args = {};
  const splitKeyValue = pair => pair.split(KEY_VALUE_SEPERATOR);
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  userDetails.split(KEY_SEPERATOR).map(splitKeyValue).forEach(assignKeyValueToArgs);
  return args;
};

const isEqual = (value1, value2) => value1 == value2;

module.exports = {
  parseUserInput,
  isEqual
}