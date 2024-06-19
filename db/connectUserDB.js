let mongoose = require('mongoose')

let connectDatabase = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDatabase;