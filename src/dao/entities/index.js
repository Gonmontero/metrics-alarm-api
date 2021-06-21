const mongoose = require('mongoose')
const { DB } = require('../../config/environments')
const config = DB

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(`Error on connecting to ${config.MONGODB_URL}`, err));

module.exports = {
    AlertEntity: require('./alert')    
}