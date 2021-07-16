const path = require('path');
const express = require("express");
const mongoose = require("mongoose");


// Start the app
const PORT = 5005;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// Configure mongoose

mongoose.connect(
    'mongodb://192.168.0.88:27017/YouTubeComments',
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to DB'));

const CommentSchema = mongoose.Schema({
    user:String,
    message: String,
    likes: Number,
    editable: Boolean,
    replies: [{
        user: String,
        message: String,
        likes: Number
    }]
});

const CommentsModel = mongoose.model('Comments', CommentSchema);

// Enter a single comment

// const newComment = new CommentsModel({
//     user: 'Random Dude',
//     message: 'This is so cool',
//     likes: 5,
//     editable: false,
//     replies: [
//         {
//             user: 'Rage Dave',
//             message: 'I completely disagree',
//             likes: 23
//         },
//         {
//             user: 'Peanut Squash',
//             message: 'I want some squash',
//             likes: 3
//         }
//     ]
// }).save()

// Adding multiple entries

// const commentsToInsert = [
//     {
//         user: 'Thanos',
//         message: 'Looks like I\'ll have to do it myself',
//         likes: 0,
//         editable: false,
//         replies: [
//             {
//                 user: 'Iron Man',
//                 message: 'I\'m Iron man, bitch',
//                 likes: 50
//             },
//             {
//                 user: 'Dr. Strange',
//                 message: 'One shot!',
//                 likes: 450
//             }
//         ]
//     },
//     {
//         user: 'Black Panther',
//         message: 'Holy Wakanda!!',
//         likes: 4400,
//         editable: false,
//         replies: []
//     },
//     {
//         user: 'Wanda',
//         message: 'Don\'t kill Vision!!',
//         likes: 450,
//         editable: false,
//         replies: []
//     }
// ]

// CommentsModel.insertMany(commentsToInsert, (err, data) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log(`Successfully added (${data})`);
//     }
// })

// Create the routes

// Get documents from the collection 
app.post('/get-data', (req, res) => {
    CommentsModel.find({}, (err, data) => {
        if(err){
            console.log(err)
        } else {
            res.send(data);
        }
    }).limit(req.body.limitNum)
})

// Add a new comment
app.post('/new-comment', (req, res) => {
    let messageData = req.body.messageData;
    const newMessage = new CommentsModel({ 
        user: 'Super User',
        message: messageData,
        likes: 0,
        replies: []
    }).save();
    // Send back empty data so we can use promise
    res.send('');
})

// Intersection Observer wants more data
// Only load the comments needed on scroll
app.post('/get-more-data', (req, res) => {
    let commentIncrement = req.body.commentIncrement;
    CommentsModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    }).skip(commentIncrement).limit(10)
})


// New comment from sub comment
app.post('/new-sub-comment',(req, res) => {
    let {messageData, messageId} = req.body;
    // Create new subData based on Data POSTED
    const newSubMessage = {
        user: 'Super User',
        message: messageData,
        likes: 0, 
        editable: true
    }
    CommentsModel.updateOne(
        {
            _id: messageId}, 
            {$push: {replies:newSubMessage}}, 
            (err, data) => {
                if(err){
                    console.log(err);
                } else {
                    // Send back empty data so we can use promise
                    res.send(''); 
                }
    })
})

// User wants to update comment
app.post('/update-comment', (req,res) => {
    let commentId = req.body.commentId;
    CommentsModel.findOne({_id: commentId}, (err, data) => {
        if(!err) res.send(data);
    })
})

// Delete a comment
app.post('/delete-comment', (req, res) => {
    let {messageId} = req.body;
    CommentsModel.deleteOne({_id:messageId}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            // Send back empty data so we can use promise
            res.send('');
        }
    })
})

// delete-sub-comment
app.post('/delete-sub-comment', (req, res) => {
    let {messageId, subId} = req.body;
    CommentsModel.updateOne(
        {_id:messageId},
        {$pull:{replies:{_id:subId}}},
        (err, data) => {
            if (err) console.log(err);
            // Send back empty data so we can use promise
            res.send('');
        }
    ) 
    
})

// Toggle message likes
app.post('/update-like', (req, res)  => {
    let {messageId, likes} = req.body;
    CommentsModel.updateOne({_id: messageId}, {likes: likes}, (err, data) => {
        if (err) console.log(err);
        res.send('');
    })
})

// Toggle sub-message likes
app.post('/update-sub-like', (req, res)  => {
    let {messageId, likes, subId} = req.body;
    CommentsModel.updateOne({_id: messageId, "replies._id":subId}, {$set: {"replies.$.likes": likes}}, (err, data) => {
        if (err) console.log(err);
        res.send('');
    })
})

// Include static files for the APP
app.use(express.static(path.join(__dirname, '/build')));
 
// any other requests for the API get passed onto our APP
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
    console.log(__dirname); 
})


app.listen(PORT || process.env.PORT, () => console.log('Server started on port 5005'));

