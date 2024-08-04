import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    product_id: {
      type: Number,
      unique: true,
    },
    handle: {
      type: String,
      unique: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ProductSchema.pre("save", async function (next) {
  try {
    this.handle = generateProductHandle(this.title);
    console.log("thisPawan" , this)
    if (!this.product_id) {
      let uniqueProductId = await generateUniqueProductId();
      while (await Product.findOne({ product_id: uniqueProductId })) {
        uniqueProductId = await generateUniqueProductId();
      }
      this.product_id = uniqueProductId;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Product = mongoose.model("product", ProductSchema);

async function generateUniqueProductId() {
  return Math.floor(Math.random() * 1000000);
}
function generateProductHandle(title) {
    return slugify(title, { lower: true });
  }
export default Product;
