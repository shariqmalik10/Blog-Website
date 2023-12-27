import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var title = "";
var content = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//take user to the home page 
app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
})

//redirect user to the blog creation page 
app.get("/blog-form", (req,res) => {
    res.render(__dirname + "/views/partials/blog/blog-form.ejs");
})

//once the user enters the blog details redirect to main page with the new blog 
app.post("/submit-form", (req, res) => {
    title = req.body["title"];
    content = req.body["content"];

    res.render("index.ejs", {title: title, content: content});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  