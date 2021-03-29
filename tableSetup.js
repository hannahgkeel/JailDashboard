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
    rejectUnauthorized: false
  }
});

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
