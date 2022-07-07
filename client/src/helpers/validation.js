const allowOnlyNumber = (text) => {
  return text.match(/^[\d]+$/);
};

const escapeCharacters = (text) => {
  // eslint-disable-next-line no-useless-escape
  return text.match(/^[\\\/|{}()`~<>"'^&*%$#!@+=;:.,]+$/);
};

const isEmptyText = (text) => {
  return text.length < 1;
};

export { allowOnlyNumber, escapeCharacters, isEmptyText };
