import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://frank:testing123@cluster0.fhuv1.mongodb.net/sample_analytics?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.connected) await client.connect();
  req.dbClient = client;
  req.db = client.db('cashable');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;