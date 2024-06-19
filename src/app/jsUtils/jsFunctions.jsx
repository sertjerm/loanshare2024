export const formatterNumber = (value) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const parserNumber = (value) => {
  return value.replace(/\$\s?|(,*)/g, "");
};
