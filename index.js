const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

const MongoClient = require('mongodb').MongoClient;
const mongoURL =
  'mongodb://heroku_user_22:test2211@ds019846.mlab.com:19846/heroku_9jsc792b';

// all of our routes will be prefixed with /api

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

const DB_NAME = 'heroku_9jsc792b';

const connectDB = (callback) => {
  return MongoClient.connect(mongoURL, { useNewUrlParser: true }, callback);
}

router.get('/movies', (request, response) => {
  connectDB((err, client) => {
    if (err) throw err;
    const db = client.db(DB_NAME);
    db
      .collection('movies')
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        response.json(result);
        client.close();
      });
  });
});

router.post('/sign', (request, response) => {
  let sign = request.body.sign;

  connectDB((err, client) => {
    if (err) throw err;
    const db = client.db(DB_NAME);
    db.collection('signs').findOne({ name: sign }, (err, result) => {
      if (err) throw err;
      response.json(result);
      client.close();
    });
  });
});

router.get('/birthday-horoscope', (request, response) => {
  connectDB((err, client) => {
    if (err) throw err;
    const db = client.db(DB_NAME);
    db
      .collection('birthday-horoscope-today')
      .findOne({}, (err, result) => {
        if (err) throw err;
        response.json(result);
        client.close();
      });
  });
});

router.get('/app-version', (request, response) => {
  connectDB((err, client) => {
    if (err) throw err;
    const db = client.db(DB_NAME);
    db.collection('app-version').findOne({}, (err, result) => {
      if (err) throw err;
      response.json(result);
      client.close();
    });
  });
});
