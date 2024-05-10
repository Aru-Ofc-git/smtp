const express = require("express");
const Router = express.Router();
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
Router.use(bodyParser.urlencoded({ extended: false }))
var gmail = process.env.GMAIL;
var pass = process.env.Password
// parse application/json
Router.use(bodyParser.json())

Router.post("/sentEmail/:email/:subject/",async (req,res)=>{
  var queryKey = Object.keys(req.body);
  var queryValue = Object.values(req.body);
  
  var email = req.params.email;
  var subject = req.params.subject;
  let htmlValue = "";
  for (let i = 0; i < queryKey.length; i++) {
    htmlValue += `<tr style="border: 1px solid #b2b2b2;">
                    <td style="background-color: #f2f2f2;padding: 6px;width: 200px;">${queryKey[i]}</td>
                    <td style="background-color: #fff;padding: 6px;width: 240px;">${queryValue[i]}</td>
                </tr>`;
  }
  var htmlRes = `
  <div style="width:600px; font-family: Helvetica, Arial, sans-serif;">
    <div style="padding: 10px; color: rgba(255, 255, 255, 0.75); background-color:#e6e6e6;">
        <div
            style="background-color: #fff; color:#444; padding:20px 40px; font-weight: 400; font-size:15px; text-align:justify;">

            <h3 style="font-weight: 400;">Dear User,<h3><br>
            <h3 style="font-weight: 500; letter-spacing: 0.9px;">Your Form Data</h3>
            <table style="color:#444;">
${htmlValue}
            </table>
                        <center>
                <a href="https://facebook.com/1R13A14"  style="text-decoration:none">
                <div style="width:60%;">
                        <p style="background-color:rgb(242, 18, 44); color:#fff; padding:15px;letter-spacing:1.5px;">
                           Follow Me On Facebook  </p>
                </div></a>
            </center>
        </div>
    </div>
</div>
  `
  let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: gmail,
                pass: pass,
            }
        });
         let sendingData = {
          	from: '"Email From Client": <aru.ofc@yahoo.com>',
            to: email, 
            subject: subject,
           	html: htmlRes,
        };
        await transporter.sendMail(sendingData,(err)=>{
            if(err){
              //res.send("err")
              res.sendFile(path.join(__dirname, "../Public/error/error.html"));
            }
            else{
              res.sendFile(path.join(__dirname, "../Public/success/success.html"));
            }
            
})}) 








module.exports = Router;
