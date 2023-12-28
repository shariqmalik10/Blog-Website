import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var title = "";
var content = "";

var index = 0;

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
    blogEntries.push({"index": index,"title": title, "content": content});
    index = index + 1;
    res.redirect('/');

    //reset the values
    title = "";
    content = "";
})

//edit function 
app.post("/edit-blog-form", (req, res) => {
    const blogIndex = req.body.blogIndex;
    const blogData = blogEntries[blogIndex];

    console.log(blogData);
    res.render(__dirname + "/views/partials/blog/update-blog.ejs", {blogData: blogData})

})

app.post("/update-blog", (req, res) => {
    const updatedTitle = req.body["title"];
    const updatedContent = req.body["content"];
    const blogIndex = req.body["blogIndex"];

    blogEntries[blogIndex].title = updatedTitle;
    blogEntries[blogIndex].content = updatedContent;
    res.redirect("/");
})

//delete blog entry 

app.post("/delete-blog", (req, res) => {
    const blogIndex = req.body.blogIndex;
    blogEntries.splice(blogIndex, 1);

    res.redirect("/");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  