const express = require('express');
const router = express.Router();
const Post = require('../Models/Blog');

const authMiddleware = require('../Middleware/authMiddleware')
const roleMiddleware = require('../Middleware/roleMiddleware')

router.get('/getpost', authMiddleware, async (req, res) => {
   try {
        const posts = await Post.find().sort({ timeStamp: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching posts", error: err.message });
    }
});

router.post('/createpost', authMiddleware, roleMiddleware(), async (req, res) => {
    try{
        roleMiddleware();
        const {title, content, author} = req.body;
        const post = new Post({
            title,
            content,
            author,
            authId : req.user.id
        });

        await post.save();
        res.status(201).json({ message: "Post Created"});
    }catch(err){
        res.status(400).json({message: "Error creating the post"});
    }
});

router.put('/updatepost/:id', authMiddleware, roleMiddleware(), async(req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, timeStamp: Date.now() },
        { new: true }
        );
        res.status(200).json({ message: "Post updated", post: updatedPost });
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
});

router.delete('/deletepost/:id', authMiddleware, roleMiddleware(), async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});
router.get("/getpostdata/:id",authMiddleware,async(req,res)=>{
    try{
        const { id } = req.params;
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json({message: "Error fetching post data", error: err.message});
    }
})

router.get("/getuserpost", authMiddleware,roleMiddleware(), async (req, res) => {
  try {
    const userId = req.user.id; 
    const posts = await Post.find({ authId: userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user posts", error: err.message });
  }
});


module.exports = router;