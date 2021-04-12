const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  database: process.env.APP_DB,
  username: process.env.APP_USER,
  password: process.env.APP_PW,
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  dialect: "postgres",
  ssl: { rejectUnauthorized: false },
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
const countyData = new Map(Object.entries({

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
  "0jdstatusBOP": "Bureau of prisons",
  "0jdstatusDSMD": "Dismissed",
  "0jdstatusFEDE": "Federal",
  "0jdstatusINTX": "Intoxicated",
  "0jdstatusNLA": "No longer active",
  "0jdstatusSENT": "Sentenced",
  "0jdstatusTSVD": "Time served",
  "0jdstatusWKED": "Weekender",
  "0jdstatusWRIT": "Writ",

  "1STATUSPRETRIAL": "Pretrial",
  "1STATUSDISMISSED": "Dismissed",
  "1STATUSSENTENCED": "Sentenced",
  "1STATUSTIMESERVED": "Time served",
  "1STATUSPROBATION": "Probation",
  "1STATUSGUILTY": "Guilty",
  "1STATUSCONSOLIDATED": "Consolidated",
  "1STATUSFEDERAL": "Federal",
  "1STATUS24HRHOLD": "24 Hour Hold",
  // what is appealsupcrt?

  //RACE
  "0raceA": "Asian",
  "0raceB": "Black",
  "0raceH": "Hispanic",
  "0raceO": "Other",
  "0raceU": "Unknown",
  "0raceW": "White",

  "1RACEA": "Asian",
  "1RACEB": "Black",
  "1RACEH": "Hispanic",
  "1RACEO": "Other",
  "1RACEU": "Unknown",
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

}));

sequelize.authenticate().then(() => console.log('Connection has been established successfully.')).catch(e => console.error('Unable to connect to the database:', e));
const County = sequelize.define("County", {
  county_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  race: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  name_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  docket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bond_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bond_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  charge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  felony_misdemeanor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const CountyName = sequelize.define("CountyName", {
  county_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

(async () => {
  await sequelize.sync();
  const row = await CountyName.create({
    county_id: 0,
    name: "Orange",
  })
  console.log(row.toJSON());
})();

// const XLSX = require("xlsx");
// const data = XLSX.readFile("data.xlsx", { cellDates: true });
// const json_data = XLSX.utils.sheet_to_json(data.Sheets[data.SheetNames[0]]);

// //console.log(new Date(json_data[45].releastime.setHours(json_data[45].releastime.getHours() - 4)));
// function loadData() {
//   for (let i = 0; i < json_data.length; i++) {
//     let entry = json_data[i];
//     // Orange county
//     let e_arg_charg = (countyData.get("0arr_chrg" + entry.arr_chrg) ? countyData.get("0arr_chrg" + entry.arr_chrg) : "Other");
//     let e_fel_misd = (countyData.get("0fel_misd" + entry.fel_misd) ? countyData.get("0fel_misd" + entry.fel_misd) : "Other");
//     let e_race = countyData.get("0race" + entry.race.trim());
//     let e_sex = countyData.get("0sex" + entry.sex.trim())
//     let e_dob = entry.dob;
//     let e_name_id = entry.name_id;
//     let e_book_id = entry.book_id;
//     let e_bookdate = new Date(entry.bookdate.setHours(entry.bookdate.getHours() - 4));
//     let e_releasedate = new Date(entry.releastime.setHours(entry.releastime.getHours() - 4));
//     let e_docket_id = entry.docket_id;
//     let e_bondtype = (countyData.get("0bondtype" + entry.bondtype) ? countyData.get("0bondtype" + entry.bondtype) : "Other");
//     let e_jdstatus = (countyData.get("0jdstatus" + entry.jdstatus) ? countyData.get("0jdstatus" + entry.jdstatus) : "Other");
//     let e_bondamount = entry.bondamt;
//     // Forsynth county
//     /*
//     let e_arg_charg = (countyData.get("1CHARGE" + entry.CHARGE) ? countyData.get("1CHARGE" + entry.CHARGE) : "Other");
//     let e_fel_misd = (countyData.get("1FEL_MISD" + entry.FEL_MISD) ? countyData.get("1FEL_MISD" + entry.FEL_MISD) : "Other");
//     let e_race = countyData.get("1RACE" + entry.RACE.trim());
//     let e_sex = countyData.get("1SEX" + entry.SEX.trim())
//     let e_dob = entry.DOB;
//     let e_name_id = entry.NAME_ID;
//     let e_book_id = entry.BOOK_ID;
//     let e_bookdate = new Date(entry["BOOK.DATE"]);
//     let e_releasedate = new Date(entry.RELEASE_DATE);
//     let e_docket_id = entry.docket_id;
//     let e_bondtype = (countyData.get("1BOND_TYPE" + entry.BOND_TYPE) ? countyData.get("1BOND_TYPE" + entry.BOND_TYPE) : "Other");
//     let e_jdstatus = (countyData.get("1STATUS" + entry.STATUS) ? countyData.get("1STATUS" + entry.STATUS) : "Other");
//     let e_bondamount = entry["BOND($)"];
//     */
//     //console.log(`${e_arg_charg}, ${e_fel_misd}, ${e_race}, ${e_sex}, ${e_dob}, ${e_name_id}, ${e_book_id}, ${e_bookdate}, ${e_releasedate}, ${e_docket_id}, ${e_bondtype}, ${e_jdstatus}, ${e_bondamount}`)
//     (async () => {
//       await sequelize.sync({ alter: true });
//       const row = await County.create({ county_id: 0, race: e_race, sex: e_sex, dob: e_dob, name_id: e_name_id, book_id: e_book_id, book_date: e_bookdate, docket_id: e_docket_id, status: e_jdstatus, release_date: e_releasedate, bond_type: e_bondtype, bond_amount: e_bondamount, charge: e_arg_charg, felony_misdemeanor: e_fel_misd });
//       console.log(row.toJSON());
//     })();
//     //const row = await County.create({ county_id: 0, race: e_race, sex: e_sex, dob: e_dob, name_id: e_name_id, book_id: e_book_id, book_date: e_bookdate, docket_id: e_docket_id, status: e_jdstatus, release_date: e_releasedate, bond_type: e_bondtype, bond_amount: e_bondamount, charge: e_arg_charg, felony_misdemeanor: e_fel_misd }).catch((err) => console.log(err));
//   }
// }
// loadData();
// // console.log(`${(countyData.get("0arr_chrg" + entry.arr_chrg) ? countyData.get("0arr_chrg" + entry.arr_chrg) : "Other")}, ${(countyData.get("0fel_misd" + entry.fel_misd) ? countyData.get("0fel_misd" + entry.fel_misd) : "Other")}, ${countyData.get("0race" + entry.race.trim())}, ${countyData.get("0sex" + entry.sex.trim())}, ${entry.dob}, ${entry.name_id}, ${entry.book_id}, ${new Date(entry.bookdate.setHours(entry.bookdate.getHours() - 4))}, ${new Date(entry.releastime.setHours(entry.releastime.getHours() - 4))}, ${entry.docket_id}, ${(countyData.get("0bondtype" + entry.bondtype) ? countyData.get("0bondtype" + entry.bondtype) : "Other")}, ${(countyData.get("0jdstatus" + entry.jdstatus) ? countyData.get("0jdstatus" + entry.jdstatus) : "Other")}`)
