const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    slug:{
        type: String,
        required: false

    },

    snippet:{
        type: String,
        required: true
    },

    blog: {
        type: String,
        required: true
    },
    
    author: {
        name: String,
        id:{type: Schema.Types.ObjectId, ref: 'User',}
    }

}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;