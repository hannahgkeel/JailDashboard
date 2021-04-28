const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

const columnMappingFile = "excelColumnValues.json";

function openColumnMappingFile(mapFile) {
    const rawData = fs.readFileSync(mapFile);
    const jsonData = JSON.parse(rawData);
    const columnMap = new Map(Object.entries(jsonData));
    return columnMap;
}

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

let m = openColumnMappingFile(columnMappingFile);
console.log(m);