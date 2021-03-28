import fs from "fs";
require("dotenv").config();
const nodemailer = require("nodemailer");

const sendProjectTable = async () => {
  const path: string = "./src/db/getProjectTable/project_table.csv";
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const info = await transporter.sendMail({
    from: `"Gaspard Robot 🤖" <${process.env.EMAIL_ADDRESS}>`,
    to:
      "gaspardboserup@gmail.com, loriotgustave@gmail.com, eloriot@hotmail.com",
    subject: "Project_data file ✨ ♻️",
    text:
      "Dear Gustave, please find your project_data file attached to this email",
    attachments: [
      {
        filename: "project_data.csv",
        path: path,
      },
    ],
  });

  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("");
    console.log("Project_table file deleted");
  });
  console.log("");
  console.log("Message sent:", info.messageId, "🚀");
  return;
};

export { sendProjectTable };
