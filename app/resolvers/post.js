const { Post } = require("../models/post");
const { User } = require("../models/user");

const postResolver = {
    Query: {
        getAllPosts: async () => await Post.find({}).exec()
    },
    Mutation: {
        createPost: async (_, args) => {
            try {
                let { userId } = args;
                const user = await User.findById(userId);
                if (!user) {
                    return {
                        status: false,
                        message: "User Id not found",
                    }
                }
                let response = await Post.create({
                    content: args.content,
                    title: args.title,
                    userId: user._id
                });
                return {
                    status: true,
                    message: "Post created succesfully",
                    Post: response
                };
            } catch (e) {
                return e.message;
            }
        }
    }
};

module.exports = postResolver;
