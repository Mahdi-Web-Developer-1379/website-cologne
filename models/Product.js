import mongoose from "mongoose";
import CommentModel from "./Comment";
import WishlistModel from "./Wishlist";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    weigth: {
        type: Number,
        required: true
    },
    suitableFor: {
        type: String,
        required: true
    },
    smell: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String]
    },

    comments: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Comment"
        }]
    },
    image: {
        type: String,
        required: true
    }

})


// schema.pre("findOneAndDelete", async function (next) {
//     const productId = this.getQuery()["_id"];
//     await CommentModel.deleteMany({ productID: productId });
//     await WishlistModel.deleteMany({ product: productId });

//     next();
// });

schema.post("findOneAndDelete", async function (doc) {
    if (doc) {
      const productId = doc._id;
      await CommentModel.deleteMany({ productID: productId });
      await WishlistModel.deleteMany({ product: productId });
    }
  });



const model = mongoose.models.Product || mongoose.model("Product", schema)

export default model