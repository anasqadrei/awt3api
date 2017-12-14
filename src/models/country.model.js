import mongoose from 'mongoose'

// Indexes:
// db.countries.ensureIndex( { "_id": 1 } )

// Schema
const schema = new mongoose.Schema({
  _id: {
    type: Number
  },
  alpha2code: {
    type: String,
    trim: true,
    uppercase: true
  },
  alpha3code: {
    type: String,
    trim: true,
    uppercase: true
  },
  nameEN: {
    type: String,
    trim: true
  },
  nameAR: {
    type: String,
    trim: true
  }
})

export default mongoose.model('Country', schema)
