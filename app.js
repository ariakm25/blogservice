const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var users_route = require('./routes/user.route');
var post_route = require('./routes/post.route');

app.use('/users', users_route);
app.use('/post', post_route);

app.get('/', function(req, res){
    request('https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=133739', function (error, response, body) {
    if (!error) {
    var jadwal = JSON.parse(body)
    var jadwals = []; 
    for(var i = 0; i < jadwal.events.length; i++){
        jadwals.push({
            match: jadwal.events[i].strEvent,
            day: jadwal.events[i].dateEvent
        });
    }
    res.json({
        message: 'success',
        code: 200,
        BarcelonaNextMatch: jadwals
    },200)
  }
})
});

app.listen(PORT, console.log("Server run at " + PORT));