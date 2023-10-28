const slugify = (text) => {
  return text
    ? `${text}`
        .toLowerCase()
        .trim()
        .replace(/[é,è,ê]/g, 'e')
        .replace(/[à]/g, 'a')
        .replace(/[î]/g, 'i')
        .split(' ')
        .join('-')
    : '';
};

export {slugify};