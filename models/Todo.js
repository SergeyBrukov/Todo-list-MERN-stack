const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  important: { type: Boolean },
  succsess: { type: Boolean },
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model('Todo', schema);
