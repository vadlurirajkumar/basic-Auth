const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://practise:practise@practise.npgeivk.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`db connected`);
  })
  .catch((err) => {
    console.log(err);
  });
