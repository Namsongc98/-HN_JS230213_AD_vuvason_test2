const express = require("express");
const server = express();


const bodyParser = require("body-parser");

const connectMysql = require("mysql");

const validaterTitle = require("./mildware");

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

const connect = connectMysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "note_keeper",
});

connect.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("kết nối thành công");
  }
});

server.get("/api/v1/notekeeper", (req, res) => {
  const querystring = "SELECT * FROM note_keeper.notekeeper;";
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

server.delete("/api/v1/notekeeper/:id", (req, res) => {
  const { id } = req.params;

  const querystring = `delete from note_keeper.notekeeper where id =${id} `;

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

server.post("/api/v1/notekeeper", validaterTitle, (req, res) => {
  const { title } = req.body;

  const newTitle = [title];

  const querystring = "insert into note_keeper.notekeeper (title) value (?);";

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
  res.send("heloo cuộc đời");
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
