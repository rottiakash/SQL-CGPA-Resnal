export {};

const csv = require("csv-parser");
const fs = require("fs");
const results: any[] = [];
interface Student {
  name: string;
  usn: number;
  section: string;
}

let prod = true;
var mysql = require("mysql");
type Students = Array<Student>;
const dataPromise = new Promise((resolve) => {
  let data: Array<Student>;
  fs.createReadStream("6.csv")
    .pipe(csv({ headers: false }))
    .on("data", (row: any) => {
      results.push(row);
    })
    .on("end", () => {
      console.log(results);
      data = results.map(
        (x) => ({ name: x["0"], usn: x["1"], section: x["2"] } as Student)
      );
      resolve(data);
    });
});

const dbPromise = new Promise((resolve) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
  });

  con.connect(function (err: any) {
    if (err) throw err;
    console.log("Connected!");
    resolve(con);
  });
});

async function main() {
  const con: any = await dbPromise;
  const data: any = await dataPromise;
  if (prod) {
    data.map((d: Student) =>
      con.query(
        `insert into gpa.Students (Name,USN,Section) values('${d.name}','${d.usn}','${d.section}')`,
        function (err: any, result: any) {
          if (err) throw err;
          console.log("1 record inserted");
        }
      )
    );
  }
}

main();
