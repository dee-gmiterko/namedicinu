import slugify from 'slugify';

export const slugifyFaculty = (node) => {
  return "f-" + slugify(node.shortTitle||"", {
    remove: '.'
  })
};

export const fixNbsp = (html) => {
  return html.replace(/&nbsp;/g, "\u00A0");
}

// czech and slovak languages use those instead..
export const fixQuotes = (html) => {
  return html.replace(/\s"(.*?)[”"]/g, '„$1“');
}

export const fixAll = (html) => fixQuotes(fixNbsp(html))
