const mongoose = require("mongoose");

const DB = process.env.DATABASE;
// mongoose
//   .connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("database conncted"))
//   .catch((err) => console.log(err));

mongoose
  .connect(DB)
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log(err));
