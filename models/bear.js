const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BearSchema = new Schema({
  name: String
})

export default mongoose.model('Bear', BearSchema);
