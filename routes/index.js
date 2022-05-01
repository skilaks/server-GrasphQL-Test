var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Welcome to Skillas-server');
  res.send(req.body);
  console.log(req.body)
});
router.post('/',(req,res,next)=>{

  console.log(req.body)
  var name = req.body.name;
  res.send("hello "+name)
})
module.exports = router;
