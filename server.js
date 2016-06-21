var express = require('express');
var app=express();
var fs=require('fs');
var url=require('url');
var port=process.env.PORT;
var moment=require('moment');
var port=process.env.PORT||8080;


app.get('/*',function(req,res){
    var pathname=url.parse(req.url).pathname;
    pathname=pathname.substring(1,pathname.length);
    if(pathname==""){       //if no argument, go to index page
        fs.createReadStream("public/index.html").pipe(res);
    }
    else{
        pathname=pathname.split("%20").join(" ");       //just make sure the space do not confuse moment
        var date,valid;
        if(parseInt(pathname)) {
            date=new Date(parseInt(pathname))
            valid=true;
        }
        else {
            //all format stuff! idk which format u want so i just choose the one u use
            date=moment(pathname,"MMM D, YYYY",true) || moment(pathname,"MMM DD, YYYY",true);
            valid=moment(pathname,"MMM D, YYYY",true).isValid()|| moment(pathname,"MMM DD, YYYY",true).isValid();
        }
        
        if(valid)
        res.json({
            "natural" : date.toString(),
            "unix"  : Date.parse(date.toString())
        });
        else
        res.json({
            "natural" : null,
            "unix"  : null
        });
    }
});

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
