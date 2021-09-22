const mongo = require('mongoose')

const signupSchema = new mongo.Schema({

    firstname:{
        type: String,
        required: true,
        },

    lastname:{
            type: String,
            required: true,
            },
    mobile:{
                type: Number,
                required: true,
                unique: true,
                },
    email:{
                type: String,
                required: true,
                unique: true,
                },

    user:{
                type: String,
                required: true,
                unique: true,
             },            
    pass:{
                type: String,
                required: true,
                unique: true,
                },
    cpass:{
                type: String,
                required: true,
                unique: true,
            },
})

const Register = new mongo.model("Register", signupSchema )

module.exports = Register
