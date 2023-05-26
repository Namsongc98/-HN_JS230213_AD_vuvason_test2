const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "task_keeper",
});

connect.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("kết nối thành công");
  }
});

server.get("/api/v1/taskkeeper", (req, res) => {
  const querystring = "SELECT * FROM task_keeper.new_table;";

  connect.query(querystring, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "thất bại",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "thành công",
        data: result,
      });
    }
  });
});

server.delete("/api/v1/taskkeeper/:id", (req, res) => {
  const { id } = req.params;

  const querystring = `delete from task_keeper.new_table where id =${id} `;

  connect.query(querystring, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "thất bại",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "thành công",
        data: result,
      });
    }
  });
});

server.post("/api/v1/taskkeeper", (req, res) => {
  const { conten, duedate, status, assignned } = req.body;

  const newTitle = [conten, duedate, status, assignned];

  const querystring =
    "insert into task_keeper.new_table (conten, duedate, status, assignned) value (?,?,?,?);";

  connect.query(querystring, newTitle, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "thất bại",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "thành công",
        data: result,
      });
    }
  });
});


server.put("/api/v1/taskkeeper/id", (req, res) => {
  const { id } = req.params;

  const { conten, duedate, status, assignned } = req.body;

  const newTitle = [conten, duedate, status, assignned];

  const querystring = `UPDATE task_keeper.new_table SET conten =' ${conten}',duedate = '${duedate}', status = '${status}' ,assignned='${assignned}' WHERE id=${id};`;

  connect.query(querystring, newTitle, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "thất bại",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "thành công",
        data: result,
      });
    }
  });
});

server.get("/", (req, res) => {
  res.send("hello wordl");
});

server.listen(3333, () => {
  console.log("http://localhost:3333");
});
