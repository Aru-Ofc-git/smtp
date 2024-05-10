require("dotenv").config();
const express = require("express");
const app = express();
var PORT = process.env.PORT || 3000;

const smtp = require("./Routes/smtp.route.js");
app.use(smtp);

app.use((req,res)=>{
res.send("Welcome to SMTP Server. Made By ARU")

});


app.listen(PORT,(req,res)=>{
  console.log("Server Is Alive");
})
