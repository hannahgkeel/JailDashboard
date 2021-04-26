if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { json } = require("express");
const express = require("express");
const path = require("path");
const postgres = require("postgres");
//const { Sequelize, Model, DataTypes } = require("sequelize");

const app = express();
const port = process.env.PORT || 5000;

const sql = postgres("postgres://ngfyxxvxxvhybi:f176cdb723210f7cad0d3e4c947b55ac7fff3fcc6119a182dbef680fc5f3fb72@ec2-50-16-108-41.compute-1.amazonaws.com:5432/d837qqohdbshgn", {
  ssl: {
    rejectUnauthorized: false
  }
});

/*
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
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((e) => console.error("Unable to connect to the database:", e));

  
const CountyName = sequelize.define("CountyName", {
  county_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const County = sequelize.define("county", {
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
}, { freezeTableName: true });

sequelize.sync().then(() => console.log("Database synced successfully."));
*/
app.use(express.static(path.join(__dirname, "dist")));

app.get("/county/:countyId([0-9]{1,3})", (req, res) => {
  /*
  County.findAll({
    where: {
      county_id: req.params.countyId,
    },
  }).then((entries) => res.json(entries));
  */
  sql`SELECT * FROM county WHERE county_id=${req.params.countyId}`.then((entries) => {
    delete entries.count;
    delete entries.command;
    res.json(entries);
  });
});

app.get("/pretrial/county/:countyId([0-9]{1,3})", (req, res) => {
  /*
  County.findAll({
    where: {
      county_id: req.params.countyId,
      status: "Pretrial",
    },
  }).then((entries) => res.json(entries));
  */
  sql`SELECT * FROM county WHERE county_id=${req.params.countyId} AND status=Pretrial`.then((entries) => {
    delete entries.count;
    delete entries.command;
    res.json(entries);
  });
});

app.get("/county_names", (req, res) => {
  //CountyName.findAll().then((entries) => res.json(entries));
});

// This route must be listed last otherwise react router breaks
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

console.log(`Listening on :${port}`);
app.listen(port);
