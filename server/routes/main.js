const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blogs",
      description: "A NodeJs Blog App built with Express and MongoDB",
    };
    let perPage = 2;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments().exec();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      currentPage: page,      
      nextpage: hasNextPage ? nextPage : null,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug }).exec();
    const locals = {
      title: data.title,
      description: data.body.substring(0, 100) + "...",
    };
    res.render("post", {
      locals,
      post: data,
    });
  } catch (err) {
    console.error("Error fetching post:", err);
  }
});


// function insertPostData(){
//     Post.insertMany([
//         {
//             title: 'First Post',
//             body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//         },
//         {
//             title: 'Second Post',
//             body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//         },
//         {
//             title: 'Third Post',
//             body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
//         }
//     ]).then(function(){
//         console.log('Data inserted')  // Success
//     }).catch(function(error){
//         console.log(error)      // Failure
//     });
// }
// insertPostData();

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
