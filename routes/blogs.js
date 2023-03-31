
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { validateBlogs } = require("../validation/blogs");
const router = express.Router();
//mongo call
const { db } = require("../mongo");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const blogs = await db()
    .collection("sample_blogs")
    .find()
    .toArray();

  res.json({ success: true, blogs: blogs });
});


// new assignment 
router.get("/all", async function (req, res, next){
  const blogs = await db()
    .collection('sample_blogs')
    .find()
    .toArray(function(err, result){
    if(err){
      res.status(400).send('error fetching blogs')
    }else{
      res.json(result)
    }
    })
  
    res.json({
    success:true,
    blogs: blogs,
    })
  
  });
router.get("/get-one", async function (req, res, next){
  const blogs = await db()
    .collection('sample_blogs')
    .find()
    .limit(3)
    .toArray(function(err, result){
    if(err){
      res.status(400).send('error fetching blogs')
    }else{
      res.json(result)
    }
    })
  
    res.json({
    success:true,
    blogs: blogs,
    })
  
  });


router.get("/get-one/:id", async (req, res, next)=>{
  const blogPosts = await db()
  .collection("sample_blogs")
  .findOne({
    id: req.params.id  
  })
  
  res.json({
    success: true,
    singleBlog: blogPosts
  })
})


router.post("/create-one", async function (req, res, next) {

  const id =  uuidv4();
  const text = req.body.text;
  const title = req.body.title;
  const author = req.body.author;
  const categories = req.body.categories;
  const createdAt = new Date();
  const lastModified = new Date();

  const newBlog ={
    id,
    text,
    title,
    author,
    categories,
    createdAt,
    lastModified,
  }

  const addBlog = await db()
          .collection('sample_blogs')
          .insertOne(newBlog, function (err, _result) {
            if (err) {
              res.status(400)
                  .send(`Error adding blog!`);
           } else {
              console.log('1 document added');
              res.status(204).send();
          }
        })

  res.json({
    success: true,
    blogs: newBlog
  });
});

//Stretch Goals
router.get("/get-multi", async function (req, res, next){
  const blogs = await db()
  .collection("sample_blogs")
  .find()
  .sort()
  .limit(3)
  .toArray(function(err, result){
    if(err){
      res.status(400).send('error fetching blogs')
    }else{
      res.json(result)
    }
    })



  res.json({
    success: true,
    blogs: blogs
  })
})

