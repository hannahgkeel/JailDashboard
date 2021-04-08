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

const countyData = {

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

  //RACE
  "0raceA": "Asian",
  "0raceB": "Black",
  "0raceH": "Hispanic",
  "0raceO": "Other",
  "0raceU": "Unknown",
  "0raceW": "White",

  //SEX
  "0sexM": "Male",
  "0sex": "Female",

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

  //CHARGE
  //ALL other values in the charge column should map to "Other" 
  "0arr_chrgGS 15A-1345-F": "Probation violation",
  "0arr_chrgGS 15A-1345": "Probation violation",

  //FELONY/MISDEMEANOR
  "0fel_misdF": "Felony",
  "0fel_misdM": "Misdemeanor"

  //Missing:
  //name_id, book_id, docket_id (which should all be ints)
  //dob, bookdate, releasetime (which should all be dates)

}

sequelize.authenticate().then(() => console.log('Connection has been established successfully.')).catch(e => console.error('Unable to connect to the database:', e));

const County = sequelize.define("County", {
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
  release_reason: {
    type: DataTypes.STRING,
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
  agency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  charge: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  charge_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  felony_misdemeanor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

County.sync()
  .then(() => console.log("Success"))
  .catch((e) => console.log(`${e}`));
