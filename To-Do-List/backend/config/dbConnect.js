const { mongoose } = require("mongoose");
mongoose.set("strictQuery", true);
const dbConnect = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            "db name: ",
            res.connection.name,
            "\nhost: ",
            res.connection.host,
            "\nport: ",
            res.connection.port
        );
    } catch (err) {
        console.log("db connection failed :: ", err);
    }
};
module.exports = dbConnect;
