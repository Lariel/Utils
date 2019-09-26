const ipExtractor = (req) => {
  const reqObj = JSON.parse(JSON.stringify(req, getCircularReplacer()))
    return reqObj.headers['x-forwarded-for'] ? (
      reqObj.headers['x-forwarded-for']
    ):(
      '127.0.0.1'
    )
}

//from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }

module.exports = {
    ipExtractor
}
