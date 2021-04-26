import slugify from 'slugify';

export const slugify_faculty = (node) => {
  return "f-" + slugify(node.shortTitle||"", {
    remove: '.'
  })
};

export const fixNbsp = (title) => {
  return title.replace(/&nbsp;/g, "\u00A0");
}
