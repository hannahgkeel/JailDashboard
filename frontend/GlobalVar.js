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

export default colorscheme;
