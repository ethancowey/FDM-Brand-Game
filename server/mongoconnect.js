const mongoose = require('mongoose')
const uriQuestions = "mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority";
const UserAccount = require('./user')
const Question = require('./questions')
const Score = require('./scores')
//make new user will use req.get
const UserAccounts = new UserAccount({
    _id: new mongoose.Types.ObjectId(),
    firstname: 'hi',
    lastname: 'gtt',
    username: 'test5',
    password: 'test5',
    email: 'test5'
});
const Questions = new Question({
    _id: new mongoose.Types.ObjectId(),
    stream: 'Software Testing',
    term: 'test scenario',
    meaning: 'a short definition of what is going to be specifically validated as part of a test',
});
const Scores = new Score({
    _id: new mongoose.Types.ObjectId(),
    game: 'Match',
    username: 'EthanTest',
    score: 1.48,
});
mongoose.connect(uriQuestions, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log(`connection to database established`)
    //Inserts user made above
    UserAccounts.save().then(result =>{
        console.log(result)
    }).catch(err => console.log(err));
    //Finds user by Id
    UserAccount.findById('5fd365bbde92c85fe460ec97').exec()//find by Id
        .then(doc=>{console.log(doc)})//Send data to frontg end in then block in json form
        .catch(err => console.log(err));
    UserAccount.find().exec()//find all eg leaderboard for scores schema
        .then(doc=>{console.log(doc)})//Send data to frontg end in then block in json form
        .catch(err => console.log(err));
    UserAccount.update({_id: '5fd365bbde92c85fe460ec97'},{$set:{firstname : 'EthanUpdated'}}).exec()//Updates a value eg a new score
        .then(doc=>{console.log(doc)})
        .catch(err => console.log(err));
    //Inserts question made above
    Questions.save().then(result =>{
        console.log(result)
    }).catch(err => console.log(err));
    //Insert Score made above
    Scores.save().then(result =>{
        console.log(result)
    }).catch(err => console.log(err));
    }).catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
})
