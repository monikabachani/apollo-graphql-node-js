const { default: mongoose } = require("mongoose");
const { Post } = require("../models/post");
const { User } = require("../models/user");

const postGetResolver = {
    Query: {
        getPostbyId: async (_,args) =>{
            const data = await Post.aggregate([
				{
					$match: {
						_id:new mongoose.Types.ObjectId(args.id),
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "userId",
						foreignField: "_id",
						as: "user",
					},
				}
			]);
            if(data.length <= 0){
                return {
                    status:false,
                    message:"Data not found",
                }
            }
            return {
                status:true,
                message:"success",
                title:data[0]
            }
        }
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

module.exports = postGetResolver;
