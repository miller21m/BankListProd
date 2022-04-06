const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mmiller:'+ process.env.MONGO_ATLAS_PW +'@cluster0.yw246.mongodb.net/Bank?retryWrites=true&w=majority',{

  useNewUrlParser: true, 
  
  useUnifiedTopology: true 
  
  }, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
  });