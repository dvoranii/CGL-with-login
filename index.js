import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

dotenv.config();

const sendGridApi = process.env.SENDGRID_API_KEY;
const firebaseApi = process.env.FIREBASE_KEY;
sgMail.setApiKey(sendGridApi);

const firebaseConfig = {
  apiKey: `${firebaseApi}`,
  authDomain: "cgl-forms.firebaseapp.com",
  databaseURL: "https://cgl-forms-default-rtdb.firebaseio.com",
  projectId: "cgl-forms",
  storageBucket: "cgl-forms.appspot.com",
  messagingSenderId: "1008506608692",
  appId: "1:1008506608692:web:47818afefcc2935608be61",
};
const fb = initializeApp(firebaseConfig);
let db = getFirestore(fb);
var contactRef = collection(db, "contact");
var quotesRef = collection(db, "quotes");

const app = express();
const port = 8000;

app.use(express.static("views"));
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let msg = {
  to: "ildidvorani@gmail.com",
  from: "ildidvorani@gmail.com",
  subject: "Sending with SendGrid",
  text: "and easy to do anywhere, even with Node.js",
  html: "",
};

async function addDocument_AutoID(ref, email, fullName, phone) {
  const docRef = await addDoc(ref, {
    email: email,
    fullName: fullName,
    phone: phone,
  });
}

// Quote request
app.get("/quote-request", (req, res) => {
  res.sendFile(path.join(__dirname, "views/quote-request", "index.html"));
});

app.get("/admin-login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/admin-login", "index.html"));
});

app.post("/quote-request", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  console.log(`Name: ${name} Email: ${email}`);
  res.sendFile(path.join(__dirname, "views/thank-you", "index.html"));

  msg.html = `<h1>Contact Form Submission</h1>
    <p>${name}</p>
    <p>${email}</p>`;

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/contact-on", "index.html"));
});

// getting info from contact form
app.post("/contact-on", (req, res) => {
  const { fullName, email, phone } = req.body;
  addDocument_AutoID(contactRef, email, fullName, phone);
  console.log("Added to firebase");

  msg.html = `<h1>Contact Form Submission</h1>
  <p>${fullName}</p>
  <p>${email}</p>
  <p>${phone}</p>
  `;

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((err) => {
      console.error(err);
    });

  res.end();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
