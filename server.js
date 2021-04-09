const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

const testperson = {
  firstname: "XXXX",
  lastname: "XXXX",
  middlename:	"XXXX",
  race:	"W",
  sex: "M",
  dob: "8/20/90",
  name_id: "278068",
  book_id: "61882",
  book_date: "10/1/19 3:35 AM",
  docketno: "00CR000000",
  jdstatus: "PRET",
  releasetime: "10/1/19 2:45 PM",
  relreason: "MDB",
  bondtype: "DOM",
  bondamt: "0",
  agency: "CHPD",
  docket_id: "904283"
}

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/county", (req, res) => {
  res.json(JSON.stringify(testperson));
});

console.log(`Listening on :${port}`);
app.listen(port);