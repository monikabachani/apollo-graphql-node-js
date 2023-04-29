const { Post } = require("../models/post");
const { User } = require("../models/user");

const userGetResolver = {
    Query: {
        fetchUserbyId: async (_, args) => await User.findById(args.id)
    },
    Mutation: {
        deleteUser: async (_, args) => {
            try {
                let user = await User.findById(args.id);
                if (!user) {
                    return {
                        status: false,
                        message: "User Id not found",
                    }
                }
                let response = await User.deleteOne({ "_id": args.id });
                await Post.deleteMany({ "userId": args.id });
                if (!response) {
                    return {
                        status: false,
                        message: "error"
                    };
                }
                return {
                    status: true,
                    message: "success"
                };
            } catch (e) {
                return e.message;
            }
        }
    }
};

module.exports = userGetResolver;
