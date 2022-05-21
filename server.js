const http = require("http");
const fs = require("fs");

function sendHtml(path, res, statusCode = 200) {
  res.writeHead(statusCode, { "Content-Type": "text/html" });
  fs.readFile(path, (err, content) => {
    if (err) throw err;
    else res.end(content);
  });
}

function sendJson(res) {
  const list = [
    { name: "abebe", age: 99 },
    { name: "kebede", age: 88 },
    { name: "chala", age: 77 },
    { name: "abebe", age: 99 },
    { name: "kebede", age: 88 },
    { name: "chala", age: 77 },
  ];
  res.writeHead(202, { "Content-Type": "application/json" });
  const theJson = JSON.stringify(list);
  res.end(theJson);
}

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      sendHtml("./public/index.html", res);
      break;

    case "/about":
      sendHtml("./public/about.html", res);
      break;

    case "/api/people":
      sendJson();
      break;

    default:
      sendHtml("./public/404.html", res, 404);
  }
});

server.listen(3000, () => console.log("i am listening"));
