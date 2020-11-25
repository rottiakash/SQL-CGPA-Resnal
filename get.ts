export {};
let prod = true;
var mysql = require("mysql");

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
  const db: any = await dbPromise;
  let data: any = await new Promise((resolve) =>
    db.query(
      `select Students.Name,Students.USN,Students.Section,one.GPA,two.GPA,three.GPA,four.GPA,five.GPA,six.GPA 
    from gpa.Students left OUTER join gpa.one on Students.USN = one.USN 
    left OUTER join gpa.two on Students.USN = two.USN 
    left OUTER join gpa.three on Students.USN = three.USN 
    left OUTER join gpa.four on Students.USN = four.USN 
    left OUTER join gpa.five on Students.USN = five.USN 
    left OUTER join gpa.six on Students.USN = six.USN`,
      (err: any, result: any, fields: any) => resolve(result)
    )
  );
  console.log(data);
  data = data.map((x: { Name: any; USN: any; Section: any; GPA: any }) => ({
    Name: x.Name,
    USN: x.USN,
    Section: x.Section,
    GPA: x.GPA,
  }));
}

main();
