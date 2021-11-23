const express = require('express');
const app = express()
const mongoose = require('mongoose')
const User = require('./model/user')

app.set('view engine','ejs')

// database connection
mongoose.connect('mongodb+srv://Prisha:Prisha123@login.nnyqa.mongodb.net/facebookLogin?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected")
})

app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/login',(req,res)=>{
    res.render('login')
});

app.get('/profile',(req,res)=>{
    res.render('profile',{user: user})
});

// post method
app.post('/',(req,res)=>{
    req.user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }).save((err, user)=>{
        if(err){
            console.log(err)
            return;
        }
        console.log(user)
        res.redirect('/login')
    })
})

app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(email=="" || password == ""){
        res.send({message: "Inputs Required"})
        return false;
    }
    User.findOne({email: email},(err, foundResults)=>{
        if(err){
            console.log(err)
        }else{
            if(foundResults.password === password){
                res.render('profile',{user: foundResults})
            }else{
                res.send({message: "Incorrect Email or password"})
            }
        }
    })
})

app.listen(3008)
