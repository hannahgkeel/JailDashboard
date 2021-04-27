#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const ExcelJS = require("exceljs");
const postgres = require("postgres");

const sql = postgres({ idle_timeout: 10 });

const arguments = yargs(hideBin(process.argv)).argv;

function checkValue(columnMap, mapFile, column, key, value) {
    if (columnMap.has(key)) {
        return columnMap;
    }

    console.log(`What is the value of ${value}?`);
    console.log(`Possible options include:`);
    columnMap.forEach((k, v) => {
        if (k.includes(column)) {
            console.log(`${v}`);
        }
    });
    console.log(`Note: Possible options were shown if any are available`);
    console.log(`Enter value of ${value}?`);
    const mappedValue = prompt("");
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
    console.log(`Number of rows in table before deleting: ${await sql`SELECT count(*) FROM county;`}`);
    await sql`DELETE FROM county WHERE filename=${filename}`;
    console.log(`Number of rows in table after deleting: ${await sql`SELECT count(*) FROM county;`}`);
}

async function uploadFile(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`File ${filename} does not exist.`);
        return;
    }

    console.log("Enter the name of the county:");
    console.log("Note: First letter of each word must be capitalized and the rest must be lowercase");
    console.log("Example: Wake, Orange, New Hanover");
    const countyName = prompt("");
    const [countyId] = await sql`SELECT county_id FROM county_names WHERE name=${countyName};`;
    if (countyId === undefined) {
        console.log("County has no entries in database yet")
    }
    console.log(countyId);
}

if (arguments.resetDatabase) {
    console.log("Are you sure you want to reset the database?"
    + "\nWarning: this will delete all tables from the database and all data within them."
    + "\nThis action cannot be undone!"
    + "\nType yes or no:");
    const answer = prompt("");
    if (answer === "yes") {
        resetDatabase().then(() => console.log("Database has been reset"));
    } else if (answer === "no") {
        console.log("Database was not reset");
    } else {
        console.log("Incorrect input. Database not reset.");
    }
} else if (arguments.removeFile) {
        console.log(`Are you sure you want to delete County entries from file: ${removeFile}`
        + "\nWarning: this action cannot be undone."
        + "\nType yes or no:");
        const answer = prompt("");
        if (answer === "yes") {
            deleteDataFromFileName.then(() => console.log(`Data from ${removeFile} was successfully deleted.`));
        } else {
            console.log("Entries were not deleted");
        }
} else if (arguments.removeDate) {

}

if (arguments.uploadFile) {
    uploadFile(arguments.uploadFile).then(() => console.log(`File ${arguments.uploadFile} has been uploaded.`));
}

process.on("SIGINT", () => { sql.end().then(() => console.log("\nDone")) });