import slugify from 'slugify';

export const slugify_faculty = (node) => {
  return "f-" + slugify(node.shortTitle||"", {
    remove: '.'
  })
};
