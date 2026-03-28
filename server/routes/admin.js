const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const adminLayout = '../views/layouts/admin';

router.get("/admin", async (req, res) => {
  try {
    
   // const data = await Post.find().exec();
    const locals = {
      title: 'Admin',
      description: "Admin Dashboard for NodeJs Blogs",
    };
    res.render("admin/index", {
      locals,
      layout: adminLayout
    });
  } catch (err) {
    console.error("Error fetching post:", err);
  }
});
module.exports = router;