var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');


app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var counter=0;
var urls={};
var ids={};

app.post('/new', function(req, res){
    var url = req.body.url;
    console.log(url);
    if(url in urls){
        res.json({'id':urls[url]});
    }
    else{
        urls[url]=counter++;
        ids[counter-1]=url;
        res.json({'id':urls[url]});
    }
});

app.use('/:id', getURL);

function getURL(req, res){
    //console.log(req);
    return res.json({'url':ids[req.params.id]});
};

app.use('/', serveIndex);

function serveIndex(req, res){
    res.sendFile(path.join(__dirname+'/static/index.html'));
}

app.listen(3000);