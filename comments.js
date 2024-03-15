// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var util = require('util');
var router = express.Router();
var comments = require('./comments.json');

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set port
app.set('port', (process.env.PORT || 3000));

// Set static directory
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

// Add comment
app.post('/api/comments', function(req, res) {
  var comment = {
    id: Date.now()
    };  
    comment = Object.assign(comment, req.body);
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.json(comments);
}
);