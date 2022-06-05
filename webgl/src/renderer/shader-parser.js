exports.shaderParser = (source) => {
  let ignorePattern = /^\s*\#/;
  let variablePattern =
    /^\s*(in|out|uniform)\s+(int|float|[bi]?vec\d+|[bi]?mat\d+|sampler2D)\s+([a-zA-Z0-9_]+(\[\d+\])?)/;
  let arrayPattern = /([a-zA-Z0-9_]+)\[(\d+)\]/;
  let commentPattern = /^\s*\/\/.*/;

  function processLine(line, meta) {
    let res = variablePattern.exec(line);
    if (res != null) {
      let [, qualifier, dataType, name] = res;

      arrayCheck = arrayPattern.exec(name);
      let isArray = arrayCheck !== null;

      let arraySize = null;
      if (isArray) {
        [, name, arraySize] = arrayCheck;
      }
      meta[name] = { qualifier, dataType, isArray, arraySize, location: null };
    }
  }

  if (!source) throw new Error("Invalid input[source].");

  let meta = {};
  let lines = source.split(";");

  for (i in lines) {
    let line = lines[i].trim();
    let skip =
      ignorePattern.exec(line) !== null || commentPattern.exec(line) !== null;

    if (skip) {
      let array = line.split("\n");
      line = array[1];
    }

    processLine(line, meta);
  }

  return meta;
};
