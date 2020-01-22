const app = require('express')();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');

const PORT = 3000;

mongoose.connect(
  'mongodb://mongo:27017/express-mongo',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log('Error:' + err));
dbConnection.once('open', () => console.log('Connected to database'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server listen on port ${PORT}`);
});