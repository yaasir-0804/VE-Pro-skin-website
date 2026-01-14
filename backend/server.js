
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/api/lead", async (req, res) => {
  const { name, email, phone, product } = req.body;

  try {
    await transporter.sendMail({
      from: "VE Pro Skin <process.env.EMAIL_USER>",
      to: "syaasir2004@gmail.com",
      subject: "New VE Pro Skin Campaign Lead",
      html: `
        <h2>New Customer Interest</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Interested in:</b> ${product}</p>
      `
    });

    res.json({
      success: true,
      message: "✨ Thanks for joining VE Pro Skin!\n\nUse code SKIN25NOW to get 25% OFF when we launch.\nGlowing skin is worth the wait 💖"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});

app.listen(10000, () => {
  console.log("VE Pro Skin backend running");
});
