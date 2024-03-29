const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('../routes/api');
const path = require('path');
const appRoot = require('app-root-path');
const config = require('../config');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb://ALEX:doorbell1@ds147975.mlab.com:47975/graphql-tutorial', { useNewUrlParser: true });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// qooco
app.use(bodyParser.json());

// Set our api routes
// app.use('/api', api);


app.use(express.static(path.join(appRoot.path, 'dist')));

if (!config.ios_apps_dir.startsWith(appRoot.path)) {
	app.use("/data/ios/files/", express.static(config.ios_apps_dir));
}

if (!config.android_apps_dir.startsWith(appRoot.path)) {
	app.use("/data/android/files/", express.static(config.android_apps_dir));
}

app.use("/data/ios/", express.static(path.resolve(appRoot.path, "./data/ios/")));
app.use("/data/android/", express.static(path.resolve(appRoot.path, "./data/android/")));
//

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
