const mongoose = require("mongoose");

const connectDB = () => 
mongoose
.connect("mongodb+srv://iamevans:horcrux@cluster0.rczoqnd.mongodb.net/", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    })
    .then(() => console.log("DB connected"))
    .catch(console.error)

module.exports = connectDB;