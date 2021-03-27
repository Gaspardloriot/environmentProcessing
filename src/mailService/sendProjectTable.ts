const nodemailer = require("nodemailer");

const sendProjectTable = async () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    port: 587,
    secure: false,
    auth: {
      user: "gasp121@hotmail.com",
      pass: "Gaspardloriot1",
    },
  });

  const info = await transporter.sendMail({
    from: '"Gaspard Robot 🤖" <gasp121@hotmail.com>',
    to:
      "gaspardboserup@gmail.com, loriotgustave@gmail.com, eloriot@hotmail.com",
    subject: "Project_data file ✨ ♻️",
    text:
      "Dear Gustave, please find your project_data file attached to this email",
    attachments: [
      {
        filename: "project_data.csv",
        path: "./src/db/getProjectTable/project_table.csv",
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
};

export { sendProjectTable };
