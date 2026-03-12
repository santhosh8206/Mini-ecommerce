const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then((con) => {
        // Removed debug log
    })
};
module.exports = connectDatabase;