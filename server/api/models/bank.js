const mongoose = require('mongoose');

//Bsnk model based on the data from the DB.
const bankSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  Bank_Code: String,
  Bank_Name:String,
  Branch_Code: String,
  Branch_Name:String,
  Branch_Address:String,
  City:String,
  Zip_Code:String,
  POB: String,
  Free_Tel:String,
  Fax:String,
  Free_Telephone:String,
  Handicap_Access:String,
  day_closed:String,
  Branch_Type:String,
  Date_Open:String,
  Date_Closed:String,
  Merge_Bank:String,
  Merge_Branch:String,
  X_Coordinate:Number,
  Y_Coordinate: Number

});

module.exports = mongoose.model('Bank', bankSchema);