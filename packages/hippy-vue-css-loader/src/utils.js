const NATIVE_WIN32_PATH = /^[A-Z]:[/\\]|^\\\\/i;

function sort(a, b) {
  return a.index - b.index;
}

function getImportCode(imports) {
  let code = '';

  for (const item of imports) {
    const { importName, url } = item;

    code += `var ${importName} = require(${url});\n`;
  }

  return code ? `// Imports\n ${code}` : '';
}

function shouldUseImportPlugin(options) {
  if (options.modules.exportOnlyLocals) {
    return false;
  }

  if (typeof options.import === 'boolean') {
    return options.import;
  }

  return true;
}

function shouldUseURLPlugin(options) {
  if (options.modules.exportOnlyLocals) {
    return false;
  }

  if (typeof options.url === 'boolean') {
    return options.url;
  }

  return true;
}

function isUrlRequestable(url) {
  // Protocol-relative URLs
  if (/^\/\//.test(url)) {
    return false;
  }

  // `file:` protocol
  if (/^file:/i.test(url)) {
    return true;
  }

  // Absolute URLs
  if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !NATIVE_WIN32_PATH.test(url)) {
    return false;
  }

  // `#` URLs
  if (/^#/.test(url)) {
    return false;
  }

  return true;
}

export {
  sort,
  getImportCode,
  shouldUseImportPlugin,
  shouldUseURLPlugin,
  isUrlRequestable,
};
