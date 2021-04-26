const postgres = require("postgres");

const sql = postgres("postgres://ngfyxxvxxvhybi:f176cdb723210f7cad0d3e4c947b55ac7fff3fcc6119a182dbef680fc5f3fb72@ec2-50-16-108-41.compute-1.amazonaws.com:5432/d837qqohdbshgn", {
  ssl: {
    rejectUnauthorized: false
  }
});
//const sql = postgres();
let newDate = new Date();
sql`CREATE TABLE county_names (county_id integer, name text, updatedat date);`.then(() => {
    sql`INSERT INTO county_names (county_id, name, updatedat) VALUES (0, 'Orange', ${newDate});`.then(() => {
        sql`INSERT INTO county_names (county_id, name, updatedat) VALUES (1, 'Forsyth', ${newDate});`.then(() => console.log("added"));
    })
});