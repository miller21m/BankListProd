const express = require('express');
const router = new express.Router();
const Bank = require('../models/bank');
const mongoose = require('mongoose');


//Suport the ability to create a new bank record and add to the DB.

// router.post('/newBank', (req,res,next)=>{
//   const bank = new Bank({
//     _id: new mongoose.Types.ObjectId(),
//     Bank_Name:req.body.bankName
//   });

//   bank.save()
//   .then((result)=>{
//     res.status(200).json({
//       message:'Bank created'
//     })
//   })
//   .catch((err)=>{
//     console.log(err);
//     res.status(500).json({error:err});
//   })
// });


//Getting the list (Not used in the app).
router.get('/', (req,res,next)=>{
  Bank.find({})
  .then((result)=>{
    return res.status(200).json({
      result
    })
  })
  .catch((err)=>{
    return res.status(500).json({
      message:'No data was found'
    })
  })
});



//Get list of banks and passing the users coords from the ui using the params.
router.get('/calcDist/:lat/:long', (req,res,next)=>{
  var myLat = req.params.lat;
  var myLong = req.params.long;


  //Get all the bank 
  Bank.find({})
  .then((result)=>{

    //save in "branches" only the branches that have X_Coordinate && Y_Coordinate (soome of the data in db wasnt full)
    branches = result.filter(branch => branch.X_Coordinate != null || branch.Y_Coordinate != null || branch.Y_Coordinate != undefined || branch.X_Coordinate != undefined).map(branch =>{

      //Some of the provided data in the DB wasnt correct (The coords was swapd in this case Im swapping back the coords based on the country coords)
      if(branch.X_Coordinate > 33.5 || branch.Y_Coordinate < 34){
        temp = branch.X_Coordinate;
        branch.X_Coordinate =  branch.Y_Coordinate;
        branch.Y_Coordinate = temp;
      }

      var R = 6371; //R is earth’s radius  km
	    var dLat = (branch.X_Coordinate-myLat) * Math.PI / 180;
	    var dLon = (branch.Y_Coordinate-myLong) * Math.PI / 180;
	    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(myLat * Math.PI / 180 ) * Math.cos(myLong * Math.PI / 180 ) * Math.sin(dLon/2) * Math.sin(dLon/2);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	    var d = R * c;


      var date = new Date();
      var day = date.getDay(); //Getting the day index Sunday is 0 and Saturday is 6
      var is_closed = false;

      //Check if the branche colsed/open today value, eache day is represnted by this index of the array 
      const days = ["יום א","יום ב","יום ג","יום ד","יום ה","יום ו","יום ש"];

      if(branch.day_closed == days[day]){
        is_closed = true;
      }

      return {...branch._doc, distance : Number(d.toFixed(2)), is_closed: is_closed}
    })



    //Sort all banks in ascending order by distanc
    branches.sort((a,b)=>{
      return a.distance - b.distance;
    })

    return res.status(200).json({
      branches
    })
  })
  .catch(error=>{
    return res.status(500).json({
      message:'Error to load data',
      Error: error
    })
  })
});


module.exports = router;