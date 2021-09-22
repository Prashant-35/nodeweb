/* Connection  */

const mongo = require("mongoose")
mongo.connect("mongodb://localhost:27017/signup",{
useNewUrlParser:true,
useUnifiedTopology:true,
})
.then( () => console.log("connection is Sucessfull....."))
.catch ((err) => console.log(err))

