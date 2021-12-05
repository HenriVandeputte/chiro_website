const createError = require('http-errors');
const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const dotenv = require('dotenv')
dotenv.config()


const mongodbURI = "mongodb+srv://Chiro:Website123@cluster0.mwav5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



//Import the mongoose module
const mongoose = require('mongoose');


//Set up default mongoose connection

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(()=>{
        console.log("MongoDB connected");
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const store= new MongoDBSession({
    uri: process.env.DB_CONNECT,
    collection: "mySessions",
})

const groepenRouter = require('./routes/groepen');
const fotosRouter = require('./routes/fotos');
const leidingRouter = require('./routes/leiding');
const contacterenRouter = require('./routes/contacteren');
const inschrijfRouter = require('./routes/inschrijven');
const dataRouter = require('./controllers/dataController');

const app = express();

const UserModel = require('./models/User')
const res = require("express");
//cookies sessions
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({extended:true}));

app.use(logger('dev')); 
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res) =>{
    console.log("De sessie cookie is: "+req.session.id);
    res.render('homepage.pug');
});
app.get("/login", (req,res) => {
    res.render('login.pug');
});
app.post("/login", async (req,res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email});

    if(!user){
        return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.redirect('/login');
    }
    req.session.isAuth = true;
    res.redirect('/data');
});
app.get("/register", (req,res) => {
    res.render('register.pug');
});
app.post("/register", async (req,res) => {
    const {username, email, password, secretCode} = req.body;

    let user = await UserModel.findOne({email});

    if(user){
        return res.redirect('/register');
    }

    const hashedPsw = await bcrypt.hash(password,12);

    user = new UserModel({
        username: username,
        email: email,
        password: hashedPsw,
    });

    if(secretCode=="IkBeloofLeidingTeZijn") {
        await user.save();
        res.redirect('/login');
    } else {
        res.redirect('/register')
    }



});
app.use('/groepen', groepenRouter);
app.use('/fotos', fotosRouter);
app.use('/leiding', leidingRouter);
app.use('/contacteren', contacterenRouter);
app.use('/inschrijven', inschrijfRouter);
app.use('/data', dataRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
