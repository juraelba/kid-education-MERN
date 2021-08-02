require('dotenv').config();
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

module.exports = {
    // url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=kid`
    url: 'mongodb://127.0.0.1/kid'
    // url: 'mongodb://mongo:27017/kid'
}