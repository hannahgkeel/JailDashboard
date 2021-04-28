#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
//const ExcelJS = require("exceljs");
const postgres = require("postgres");
//const { getJsDateFromExcel } = require("excel-date-to-js");
const XLSX = require("xlsx");

const sql = postgres();

const arguments = yargs(hideBin(process.argv)).argv;
const MAP_FILE = "excelColumnValues.json";

function checkEntry(id, charge, fel_misd, race, sex, bond_type, status) {
  let map = openColumnMappingFile(MAP_FILE);
  map = checkValue(map, MAP_FILE, "charge", `${id}charge${charge}`, charge);
  map = checkValue(map, MAP_FILE, "fel_misd", `${id}fel_misd${fel_misd}`, fel_misd);
  map = checkValue(map, MAP_FILE, "race", `${id}race${race}`, race);
  map = checkValue(map, MAP_FILE, "sex", `${id}sex${sex}`, sex);
  map = checkValue(map, MAP_FILE, "bond_type", `${id}bond_type${bond_type}`, bond_type);
  map = checkValue(map, MAP_FILE, "status", `${id}status${status}`, status);
  return map;
}

function checkValue(columnMap, mapFile, column, key, value) {
  if (columnMap.has(key)) {
    return columnMap;
  }

  console.log(`What is the value of ${value} in column ${column}?`);
  console.log(`Possible options include:`);
  columnMap.forEach((k, v) => {
    if (k.includes(column)) {
      console.log(`${v}`);
    }
  });
  console.log(`Note: Possible options were shown if any are available`);
  console.log(`Enter value of ${value}? Note: hit enter if you want the value to be Other`);
  let mappedValue = prompt("");
  if (mappedValue === "") {
    mappedValue = "Other";
  }
  columnMap.set(key, mappedValue.trim());
  fs.writeFileSync(mapFile, JSON.stringify(Object.fromEntries(columnMap)));
  return columnMap;
}

function openColumnMappingFile(mapFile) {
  const rawData = fs.readFileSync(mapFile);
  const jsonData = JSON.parse(rawData);
  const columnMap = new Map(Object.entries(jsonData));
  return columnMap;
}

async function resetDatabase() {
  await sql`DROP TABLE IF EXISTS county CASCADE;`;
  await sql`DROP TABLE IF EXISTS county_names CASCADE;`;
  await sql`CREATE TABLE county (id serial primary key, county_id integer, sex text, race text, dob date, name_id text, book_id text, book_date date, docket_id text, status text, release_date date, bond_type text, bond_amount integer, charge text, felony_misdemeanor text, createdat date, updatedat date, filename text);`;
  await sql`CREATE TABLE county_names (county_id serial primary key, name text, updatedat date);`;
}

async function deleteDataFromFileName(filename) {
  const [beforeCount] = await sql`SELECT count(*) FROM county;`;
  console.log(
    `Number of rows in table before deleting: ${beforeCount.count}`
  );
  await sql`DELETE FROM county WHERE filename=${filename}`;
  const [afterCount] = await sql`SELECT count(*) FROM county;`;
  console.log(
    `Number of rows in table after deleting: ${afterCount.count}`
  );
}

async function uploadFile(filename) {
  if (!fs.existsSync(filename)) {
    console.log(`File ${filename} does not exist.`);
    return;
  }

  console.log("Enter the name of the county:");
  console.log(
    "Note: First letter of each word must be capitalized and the rest must be lowercase"
  );
  console.log("Example: Wake, Orange, New Hanover");
  const countyName = prompt("");
  let [
    countyId,
  ] = await sql`SELECT county_id FROM county_names WHERE name=${countyName};`;
  if (countyId === undefined) {
    await sql`INSERT INTO county_names (name, updatedat) VALUES (${countyName}, ${new Date()});`;
    [
      countyId,
    ] = await sql`SELECT county_id FROM county_names WHERE name=${countyName};`;
  }
  const county_id = countyId.county_id;

  console.log("What is the date of this data?");
  console.log("Example: If this data is through Dec 2019, input 12/31/2019");
  console.log("Note: Please enter numerical values only such as 12 for December");
  console.log("What is the month?");
  const uploadMonth = prompt("");
  console.log("What is the day?");
  const uploadDay = prompt("");
  console.log("What is the year?");
  const uploadYear = prompt("");
  const upload_date = new Date();
  const updated_date = new Date();
  upload_date.setFullYear(parseInt(uploadYear), parseInt(uploadMonth), parseInt(uploadDay));
  const data = XLSX.readFile(filename, { cellDates: true });
  const json_data = XLSX.utils.sheet_to_json(data.Sheets[data.SheetNames[0]]);
  if (json_data[0].charge === undefined || json_data[0].fel_misd === undefined || json_data[0].race === undefined || json_data[0].sex === undefined || json_data[0].dob === undefined || json_data[0].name_id === undefined || json_data[0].book_id === undefined || json_data[0].book_date === undefined || json_data[0].release_date === undefined || json_data[0].docket_id === undefined || json_data[0].bond_type === undefined || json_data[0].status === undefined || json_data[0].bond_amount === undefined) {
    console.log(`Column names in file: ${filename} are not properly set. Please refer back to the documentation.`);
    return;
  }
  for (let i = 0; i < json_data.length; i++) {
    const entry = json_data[i];
    const countyData = checkEntry(county_id, entry.charge.trim(), entry.fel_misd.trim(), entry.race.trim(), entry.sex.trim(), entry.bond_type.trim(), entry.status.trim());
    const charge = countyData.get(`${county_id}charge` + entry.charge.trim());
    const fel_misd = countyData.get(
      `${county_id}fel_misd` + entry.fel_misd.trim()
    );
    const race = countyData.get(`${county_id}race` + entry.race.trim());
    const sex = countyData.get(`${county_id}sex` + entry.sex.trim());
    const dob = entry.dob; // getJsDateFromExcel(entry.dob).toISOString();
    const name_id = entry.name_id;
    const book_id = entry.book_id;
    const book_date = entry.book_date; // getJsDateFromExcel(entry.bookdate).toISOString();
    const release_date = entry.release_date; // getJsDateFromExcel(entry.releastime).toISOString();
    const docket_id = entry.docket_id;
    const bond_type = countyData.get(
      `${county_id}bond_type` + entry.bond_type.trim()
    );
    const status = countyData.get(`${county_id}status` + entry.status.trim());
    const bond_amount = entry.bond_amount;
    await sql`INSERT INTO county (county_id, race, sex, dob, name_id, book_id, book_date, docket_id, status, release_date, bond_type, bond_amount, charge, felony_misdemeanor, createdat, updatedat, filename) VALUES (${county_id}, ${race}, ${sex}, ${dob}, ${name_id}, ${book_id}, ${book_date}, ${docket_id}, ${status}, ${release_date}, ${bond_type}, ${bond_amount}, ${charge}, ${fel_misd}, ${upload_date}, ${updated_date}, ${filename});`;
  }
  await sql`UPDATE county_names SET updatedat=${updated_date} WHERE county_id=${county_id};`;
}

if (arguments.resetDatabase) {
  console.log(
    "Are you sure you want to reset the database?" +
      "\nWarning: this will delete all tables from the database and all data within them." +
      "\nThis action cannot be undone!" +
      "\nType yes or no:"
  );
  const answer = prompt("");
  if (answer === "yes") {
    resetDatabase().then(() => console.log("Database has been reset"));
  } else if (answer === "no") {
    console.log("Database was not reset");
  } else {
    console.log("Incorrect input. Database not reset.");
  }
} else if (arguments.removeFile) {
  console.log(
    `Are you sure you want to delete County entries from file: ${arguments.removeFile}` +
      "\nWarning: this action cannot be undone." +
      "\nType yes or no:"
  );
  const answer = prompt("");
  if (answer === "yes") {
    deleteDataFromFileName(arguments.removeFile).then(() =>
      console.log(`Data from ${arguments.removeFile} was successfully deleted.`)
    );
  } else {
    console.log("Entries were not deleted");
  }
} else if (arguments.removeDate) {
  
}

if (arguments.uploadFile) {
  uploadFile(arguments.uploadFile).then(() =>
    console.log(`File ${arguments.uploadFile} has been uploaded.`)
  );
}

process.on("SIGINT", () => {
  sql.end().then(() => console.log("\nDone"));
});
