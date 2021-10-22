import slugify from 'slugify';

export const slugifyFaculty = (node) => {
  return "f-" + slugify(node.shortTitle||"", {
    remove: '.'
  })
};

export const slugifyDocumentTitle = (title) => {
  return slugify(title||"", {
    remove: '.'
  }).toLowerCase();
}

export const fixPrepositions = (html) => {
  return html.replace(/((^|\W)(s|z|v|k|so|zo|vo)) (\w+)/gi, "$1&nbsp;$4");
}

export const fixNbsp = (html) => {
  return html.replace(/&nbsp;/g, "\u00A0");
}

// czech and slovak languages use those instead..
export const fixQuotes = (html) => {
  return html.replace(/\s"(.*?)[”"]/g, '„$1“');
}

export const fixAll = (html) => fixQuotes(fixNbsp(fixPrepositions(html)))

export const replaceParams = (html, params) => {
  if (params) {
    Object.keys(params).forEach(key => {
      var regexp = new RegExp('\\{'+key+'\\}', 'gi');
      html = html.replace(regexp, params[key]);
    });
  }
  return html;
}

export const isCode = (value) => {
  return value.match(/^[A-Z0-9]{8,}$/g)
}
