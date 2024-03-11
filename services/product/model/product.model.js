const { default: mongoose, model } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: {type: Number},
    title: {type: String},
    price: {type: String}
});

ProductSchema.pre("save", async function(next) {
    try {
        const count = await this.constructor.countDocuments();
        this.id = count + 1;
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
};
