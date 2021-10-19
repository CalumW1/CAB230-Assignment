var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();


/* get offences page */
router.get('/offences', function(req, res, next) {
  //select pretty from web_computing.offences
  req.db.from('web_computing.offence_columns').select('pretty')
  .then((rows) => {
    // if successful then return success message
    res.json({"Error" : false, "Message" : "Success", "offences": rows})
  })
  .catch((err) => {
    // else if error return problem with sql query
    console.log(err);
    res.json({"Error" : true, "Message": "Error in sql query"})
  })
});

/* search offences page */
router.get('/search/:offence', function(req, res, next){
  req.db.from('web_computing.offences').select('web_computing.offences.area', 'web_computing.areas.lat', 'web_computing.areas.lng')
  .count(req.params.offence)
  .leftJoin('web_computing.areas', 'web_computing.offences.area', '=', 'web_computing.areas.area')
  .where(req.params.offence, '>=', 1).groupBy('area')
  .then((rows) => {
    res.json({"Error": false, "Message" : "Success", "area, lat, lng and offences ": rows})
  })
  .catch((err) =>{
    console.log(err)
    res.json({"Error" : true, "Message" : "Error in sql query"})
  })
});


/*  Hashing for password  */  
const saltrounds = 10;


/* register page */
 router.post("/register", (req, res, next) => {
   /* variable for unsalted password */
   unsaltedpassword = req.query.password;
   /*  variable for salted password */
   saltedpassword = bcrypt.hashSync(unsaltedpassword, saltrounds);
   req.db('web_computing.users').insert({email: req.query.email, password: saltedpassword})
     .then(function() {
       res.status(201).json({ message: "new account has been registered" });
     })
     .catch((err) =>{
       console.log(err);
       res.status(400).json({message: "registration has failed"});
     })
});


/* Login  */
router.post("/login", (req, res, next) => {
  req.db('web_computing.users').select('password').where({email: req.query.email})
    .then(function(user){
      if(!user){
        res.json("error with finding password")
      } else {
        bcrypt.compare(req.query.password, user[0].password.toString(), function(err, result){
          //test password input
          console.log(req.query.password);
          // test password inside of database
          console.log(user[0].password.toString());
          if(result === true){
            res.send("login successful")
          } else {
            res.send('login unsuccessful');
          }
        })
      }
    })
});


module.exports = router;
