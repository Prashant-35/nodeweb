const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 8080 // port creation on own server formate : for host ||forlocalhost

//importing the connection........
require('./db/conn')
const Register = require('./db/signup')
const { json, urlencoded } = require('express')



// public static path for static Website 
const static = path.join(__dirname, "../public")
const template = path.join(__dirname, "../templates/views")
const partials = path.join(__dirname, "../templates/partials")

app.use(express.json())

app.set('view engine', 'hbs')
app.set('views', template)
hbs.registerPartials(partials)

app.use(express.static(static))
app.use(express.urlencoded({extended:false}))




//routing
app.get("/", (req, res) => {

    res.render("index")
})

app.get("/about", (req, res) => {

    res.render("about")
})

app.get("/contact", (req, res) => {

    res.render("contact")
})

app.get("/sign-up", (req, res) => {

    res.render("sign-up")
})
//create a new user or inserting the data after pressing submit button in database....
app.post("/sign-up", async(req, res) => {
try {
    const pass = req.body.pass
    const cpass = req.body.cpass
    if (pass == cpass) {
        const registerData = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            email: req.body.email,
            user: req.body.user,
            pass: req.body.pass,
            cpass: req.body.cpass,
        })
        const registered = await registerData.save()
        res.status(201).send("Thankyou For Registration We Have Send Activation Link on Registered Email Id")

    } else {
        res.send("password do not match")
    }
} catch (error) {
    res.status(400).send(error)
}
   
})//end of insertion......

app.get("/sign-in", (req, res) => {

    res.render("sign-in")
})


//Login Detail Check
app.post("/sign-in", async (req, res) => {

    try {
        const email = req.body.email
        const pass = req.body.pass
        
        const userid = await Register.findOne({email:email})
        if (userid.pass==pass) {
            res.status(201).render("dshboard")
        } else {
            
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})


//server creating
app.listen(port, ()  => {

    console.log('Server is runing at port 8080')
})
