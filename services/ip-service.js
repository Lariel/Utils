const ipExtractor = (req) => {
    console.log('request: ',req)
    
    return 'request: ',JSON.stringify(req, getCircularReplacer())
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
