const express = require("express");
//命名傳統為app
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
//serving a static file
app.use(express.static("public"));
//node.js http server
//HTTP(Hyper Text Transfer Protocol) Requests
//Get Request獲得資訊 Post Request送出資訊
//Routing in express
//respond 只能送出一行
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// routing for query
app.post("/formHandling", (req, res) => {
  console.log(req.body);
  let { signupUsername, userEmail } = req.body;
  res.send(
    `Thanks for posting.Your Account is ${signupUsername}, and Email is ${userEmail}`
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
