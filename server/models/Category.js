const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

mongoose.model('Category', CategorySchema);