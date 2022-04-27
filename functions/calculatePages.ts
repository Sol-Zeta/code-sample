export const calculatePages = (items: number, itemsPerPage: number): number =>
  items && itemsPerPage
    ? items % itemsPerPage === 0
      ? items / itemsPerPage - 1
      : Math.floor(items / itemsPerPage)
    : 0;
