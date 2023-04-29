const { default: mongoose } = require("mongoose");
const { Post } = require("../models/post");
const { User } = require("../models/user");

const userResolver = {
    Query: {
        getUsers: async () => {
            const data = await User.aggregate([
                {
                    $lookup: {
                        from: "posts",
                        localField: "_id",
                        foreignField: "userId",
                        as: "posts",
                    },
                }
            ]);
            if (data.length <= 0) {
                return {
                    status: false,
                    message: "Data not found"
                }
            }
            return {
                status: true,
                message: "success",
                user: data
            }
        }
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await User.create(args);
                return response;
            } catch (e) {
                return e.message;
            }
        }
    }
};

module.exports = userResolver;
