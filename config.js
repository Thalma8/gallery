var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: process.env.MONGODB_URI,
    development: 'mongodb+srv://thalma:thalma123@tmassignment.wtcyjzk.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://thalma:thalma123@tmassignment.wtcyjzk.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;
