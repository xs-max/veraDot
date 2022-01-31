const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const app = require('./app');

const DB = 'mongodb+srv://codemax:IZGTRNNwGGU80L1G@cluster0.dtoim.mongodb.net/veradot?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
.then(con => {
     console.log('Db connection successful!');
 }).catch(err => console.log(err.message));

 const port = 8000 || process.env.PORT;
 const server = app.listen(port, () => {
    console.log(`App running on port ${port}`)
 });