var express=require("express");
var app=express();


app.use('/',express.static(__dirname+"/public"));

app.listen(process.env.PORT,function(){
  console.log("app listening on port "+process.env.PORT);
});