function isUuid (input) {
  const uuidRegex = /^[0-9a-f]{8}\b-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-\b[0-9a-f]{12}$/

  return typeof input === 'string'
  && uuidRegex.test(input)
}

module.exports = { isUuid }
