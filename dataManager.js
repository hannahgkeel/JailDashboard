#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const ExcelJS = require("exceljs");
const postgres = require("postgres");

const sql = postgres();

const arguments = yargs(hideBin(process.argv)).argv;

if (arguments.resetDatabase) {
    console.log("Are you sure you want to reset the database?"
    + "\nWarning: this will delete all tables from the database and all data within them."
    + "\nThis action cannot be undone!"
    + "\nType yes or no:");
    const answer = prompt("");
    if (answer === "yes") {
        console.log("Database has been reset");
    } else if (answer === "no") {
        console.log("Database was not reset");
    } else {
        console.log("Incorrect input. Database not reset.");
    }
} else if (arguments.remove) {
    if (fs.existsSync(arguments.remove)) {
        console.log("File exists");
    } else {
        console.log("File does not exist");
    }
}

if (arguments.uploadFile) {
    console.log(`You are uploading file: ${uploadFile}`);
    if (!fs.existsSync(arguments.uploadFile)) {
        console.log(`File ${arguments.uploadFile} does not exist.`);
    }
}