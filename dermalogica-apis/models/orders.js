import mongoose from "mongoose";
const OrdersSchema = new mongoose.Schema(
    {
        SalaonName: {
        type: String,
        required: true,
      },
      DeliveryAddress: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
      Name: {
        type: String,
        required: true,
      },
      Email:{
        type: String,
        required: true,
      },
      MobileNumber:{
        type: Number,
        required: true,
      },
      Totalorderamount:{
        type: Number,
        required: true,
      },
      Orderid:{
        type: Number,
        unique: true,
      },
      products:{
        type: Array,
        required: true,
      }
    
    },
    { timestamps: true }
  );
  
  OrdersSchema.pre("save", async function (next) {
    try {
      if (!this.Orderid) {
        let uniqueOrderId = await generateUniqueProductId();
        while (await Order.findOne({ Orderid: uniqueOrderId })) {
          uniqueOrderId = await generateUniqueProductId();
        }
        this.Orderid = uniqueOrderId;
      }
      next();
    } catch (error) {
      next(error);
    }
  });
  
  async function generateUniqueProductId() {
    return Math.floor(Math.random() * 1000000);
  }
  const Order = mongoose.model("order", OrdersSchema);
  
  export default Order;