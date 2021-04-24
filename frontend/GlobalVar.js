const colorscheme = [
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

export function calculateAge(dobString) {
  let idx = dobString.indexOf("T");
  let date = new Date(dobString.substring(0, idx));
  let ageDif = Date.now() - date.getTime();
  let ageDate = new Date(ageDif);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function calcLenOfStay(book_date, release_date) {
  // This assumes that a unreleased detainee has a release date of 'NOT_RELEASED'.
  if (release_date === "NOT_RELEASED") release_date = Date.now();

  let bd = new Date(book_date.substring(0, book_date.indexOf("T")));
  let rd = new Date(release_date.substring(0, release_date.indexOf("T")));
  let milliseconds = rd.getTime() - bd.getTime();

  return Math.ceil(milliseconds / (1000 * 60 * 60 * 24));
}

export default colorscheme;
