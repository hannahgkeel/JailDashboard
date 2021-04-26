const ExcelJS = require("exceljs");
const postgres = require("postgres");

const sql = postgres("postgres://ngfyxxvxxvhybi:f176cdb723210f7cad0d3e4c947b55ac7fff3fcc6119a182dbef680fc5f3fb72@ec2-50-16-108-41.compute-1.amazonaws.com:5432/d837qqohdbshgn");

const countyData = new Map(
    Object.entries({
      //STATUS
      "0jdstatusPRET": "Pretrial",
      /*
       * So this means "0" + "jdstatus" + "PRET"
       * "0" will be the index of the county in our County name table
       * "jdstatus" is the column title
       * "PRET" was the original value in the column
       * "PRET" will now be mapped to "Pre-Trial"
       * Repeat as necessary for each column where the value doesn't match other county tables
       */
      "0jdstatusFEDE": "Federal",
      "0jdstatusSENT": "Sentenced",
  
      "1STATUSPRETRIAL": "Pretrial",
      "1STATUSSENTENCED": "Sentenced",
      "1STATUSFEDERAL": "Federal",
      // what is appealsupcrt?
  
      //RACE
      "0raceB": "Black",
      "0raceW": "White",
  
      "1RACEB": "Black",
      "1RACEW": "White",
  
      //SEX
      "0sexM": "Male",
      "0sexF": "Female",
  
      "1SEXM": "Male",
      "1SEXF": "Female",
  
      //BOND TYPE
      "0bondtypeCASH": "Cash",
      "0bondtypeDOM": "Domestic",
      "0bondtypeINCL": "Included",
      "0bondtypeNOBD": "No bond",
      "0bondtypeOTHR": "Other",
      "0bondtypeRLSA": "Release to sober adult",
      "0bondtypeRWSO": "Release when sober",
      "0bondtypeSEC": "Secured",
      "0bondtypeSERV": "Serving",
      "0bondtypeWRPR": "Written promise",
  
      "1BOND_TYPECASH": "Cash",
      "1BOND_TYPENO_BOND": "No bond",
      "1BOND_TYPEOTHER": "Other",
      "1BOND_TYPESECURED": "Secured",
      "1BOND_TYPEUNSECURED": "Unsecured",
      "1BOND_TYPEWRITTEN_PROMISE": "Written promise",
  
      //CHARGE
      //ALL other values in the charge column should map to "Other"
      "0arr_chrgGS 15A-1345-F": "Probation violation",
      "0arr_chrgGS 15A-1345": "Probation violation",
  
      "1CHARGE15A-1345": "Probation violation",
  
      //FELONY/MISDEMEANOR
      "0fel_misdF": "Felony",
      "0fel_misdM": "Misdemeanor",
  
      "1FEL_MISDF": "Felony",
      "1FEL_MISDM": "Misdemeanor",
      // do we want to include more of the values?
  
      //Missing:
      //name_id, book_id, docket_id (which should all be ints)
      //dob, bookdate, releasetime (which should all be dates)
  
      //Missing:
      //name_id, book_id, docket_id (which should all be ints)
      //dob, bookdate, releasetime (which should all be dates)
    })
);
//sql`DROP TABLE IF EXISTS county;`.then(() => console.log("dropped"));
sql`CREATE TABLE IF NOT EXISTS county (county_id integer, sex text, race text, dob date, name_id text, book_id text, book_date date, docket_id text, status text, release_date date, bond_type text, bond_amount money, charge text, felony_misdemeanor text, upload_date date);`.then(() => console.log("created"));

const XLSX = require("xlsx");
//const { getJsDateFromExcel } = require("excel-date-to-js");
const data = XLSX.readFile("data.xlsx", { cellDates: true });
const json_data = XLSX.utils.sheet_to_json(data.Sheets[data.SheetNames[0]]);

for (let i = 0; i < json_data.length; i++) {
  let entry = json_data[i];
  let e_arg_charg = countyData.get("0arr_chrg" + entry.arr_chrg)
    ? countyData.get("0arr_chrg" + entry.arr_chrg)
    : "Other";
  let e_fel_misd = countyData.get("0fel_misd" + entry.fel_misd)
    ? countyData.get("0fel_misd" + entry.fel_misd)
    : "Other";
  let e_race = countyData.get("0race" + entry.race.trim()) ? countyData.get("0race" + entry.race.trim()) : "Other";
  let e_sex = countyData.get("0sex" + entry.sex.trim());
  let e_dob = entry.dob; // getJsDateFromExcel(entry.dob).toISOString();
  let e_name_id = entry.name_id;
  let e_book_id = entry.book_id;
  let e_bookdate = entry.bookdate; // getJsDateFromExcel(entry.bookdate).toISOString();
  let e_releasedate = entry.releastime; // getJsDateFromExcel(entry.releastime).toISOString();
  let e_docket_id = entry.docket_id;
  let e_bondtype = countyData.get("0bondtype" + entry.bondtype)
    ? countyData.get("0bondtype" + entry.bondtype)
    : "Other";
  let e_jdstatus = countyData.get("0jdstatus" + entry.jdstatus)
    ? countyData.get("0jdstatus" + entry.jdstatus)
    : "Other";
  let e_bondamount = entry.bondamt;
  let upload_date = new Date();
  //console.log(`${e_arg_charg}, ${e_fel_misd}, ${e_race}, ${e_sex}, ${e_dob}, ${e_name_id}, ${e_book_id}, ${e_bookdate}, ${e_releasedate}, ${e_docket_id}, ${e_bondtype}, ${e_jdstatus}, ${e_bondamount}`)
  sql`INSERT INTO county (county_id, sex, race, dob, name_id, book_id, book_date, docket_id, status, release_date, bond_type, bond_amount, charge, felony_misdemeanor, upload_date) VALUES (0, ${e_race}, ${e_sex}, ${e_dob}, ${e_name_id}, ${e_book_id}, ${e_bookdate}, ${e_docket_id}, ${e_jdstatus}, ${e_releasedate}, ${e_bondtype}, ${e_bondamount}, ${e_arg_charg}, ${e_fel_misd}, ${upload_date});`.then();
}

async function get() {
  let json = await sql`SELECT * FROM county LIMIT 10`;
  delete json.count;
  delete json.command;
  console.log(json);
}

get().then(() => console.log("Done"));
//console.log("Done");