// Color scheme for charts
export const colorscheme = [
  "#016c59",
  "#3690c0",
  "#a6bddb",
  "#014636",
  "#ece2f0",
  "#02818a",
  "#67a9cf",
  "#d0d1e6",
  "#fff7fb",
];

/**
 * Calculates age based on the detainees date of birth.
 * @param {String} dobString - ISO-8601 date
 * @returns {Number} An age
 */
export function calculateAge(dobString) {
  let idx = dobString.indexOf("T");
  let date = new Date(dobString.substring(0, idx));
  let ageDif = Date.now() - date.getTime();
  let ageDate = new Date(ageDif);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Calculates length of stay for a detainee
 * @param {*} book_date - ISO-8601 date
 * @param {*} release_date - ISO-8601 date
 * @returns {Number} Length of stay in days
 */
export function calcLenOfStay(book_date, release_date) {
  // This assumes that a unreleased detainee has a release date of 'NOT_RELEASED'.
  if (release_date === "NOT_RELEASED") release_date = Date.now();

  let bd = new Date(book_date.substring(0, book_date.indexOf("T")));
  let rd = new Date(release_date.substring(0, release_date.indexOf("T")));
  let milliseconds = rd.getTime() - bd.getTime();

  return Math.ceil(milliseconds / (1000 * 60 * 60 * 24));
}