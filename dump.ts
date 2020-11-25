const csv = require("csv-parser");
const fs = require("fs");
const results: any[] = [];
interface Student {
  usn: string;
  gpa: number;
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
      data = results.map((x) => ({ usn: x["1"], gpa: x["103"] } as Student));
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
        `insert into gpa.six values('${d.usn}','${d.gpa}')`,
        function (err: any, result: any) {
          if (err) throw err;
          console.log("1 record inserted");
        }
      )
    );
  }
}

main();
export {};
