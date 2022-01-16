const getRandomArrayIndex = require('./getRandomArrayIndex')
const charSet = 'abcdefghijklmnopqrstuvwzyx1234567890'

module.exports = (stringLength) => {
  let string = ''
  for (let i = 0; i < (stringLength ?? 10); i++) {
    string += charSet[getRandomArrayIndex(charSet.length)]
  }
  return string
}
