import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var title = "";
var content = "";

//creating a object array to store all the blogs created 
function BlogEntry (title, content) {
    this.content = content;
    this.title = title;
}

//using an alternative approach: creating an array of objects 
var blogEntries = []

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//take user to the home page 
app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", {blogEntries: blogEntries});
})

//redirect user to the blog creation page 
app.get("/blog-form", (req,res) => {
    res.render(__dirname + "/views/partials/blog/blog-form.ejs");
})

//once the user enters the blog details redirect to main page with the new blog 
app.post("/submit-form", (req, res) => {
    title = req.body["title"];
    content = req.body["content"];

    //add the new entry to the array 
    blogEntries.push({"title": title, "content": content});
    res.redirect('/');

    //reset the values
    title = "";
    content = "";
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  