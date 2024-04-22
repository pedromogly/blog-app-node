const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

//Configs
    //Sessão
    app.use(session({
        secret: 'qualquermerda',
        resave: true,
        saveUninitialized: true
    }))
    //flash
    app.use(flash())
    //middleware
        app.use((req,res,next)=>{
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })
        
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    app.use('/public',express.static(path.join(__dirname,"public")))

    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb+srv://kaalootracks:ph97233313@cluster0.v7vmc8j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/blog-node")
    .then(()=>{console.log('DB Ligado')})
    .catch((err)=>{console.log(`DB Não conectado: ${err}`)})

//Rotas
    app.get('/', (req,res)=>{
        res.send('rota principal')
    })

    app.use('/admin', admin);


//Servidor ligado
const PORT = 7171
app.listen(PORT,()=>{
    console.log('ON')
})

