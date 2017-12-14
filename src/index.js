import koa from 'koa'; // koa@2
import koaRouter from 'koa-router'; // koa-router@next
import koaBody from 'koa-bodyparser'; // koa-bodyparser@next
import koaCors from 'kcors';
import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa';

import awtGraphQLSchema from './schema';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const app = new koa();
const router = new koaRouter();

const DB_URL = process.env.MONGOHQ_URL;
const PORT = process.env.PORT;


// koaBody is needed just for POST.
app.use(koaBody());

//secure it
//https://github.com/koajs/cors
app.use(koaCors());

//
router.post('/graphql', graphqlKoa({schema: awtGraphQLSchema}));
router.get('/graphql', graphqlKoa({schema: awtGraphQLSchema}));

//dev only?
router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}));

//
app.use(router.routes());
app.use(router.allowedMethods());

// //db
// function connectDatabase(uri) {
//   return new Promise((resolve, reject) => {
//     mongoose.connection
//     .on('error', error => reject(error))
//     .on('close', () => console.log('Database connection closed.'))
//     .once('open', () => resolve(mongoose.connections[0]));
//
//     mongoose.connect(uri, {useMongoClient: true});
//   });
// }

(async() => {
  try {
    const options = {
      useMongoClient: true,
      native_parser: true,
      poolSize: 50,
      keepAlive: 1,
      connectTimeoutMS: 30000,
      reconnectTries: 30,
      reconnectInterval: 5000,
    }

    // what to do if connection was intrupted?
    var db = mongoose.connection;
    db.on('disconnected', function() {
      console.log('disconnected!');
    });
    db.on('reconnected', function() {
      console.log('reconnected');
    });
    db.on('connected', function() {
      console.log('connected');
    });
    db.once('open', function() {
      console.log('connection open');
    });
    db.on('error', function() {
      console.log('error');
    });

    // const info = await connectDatabase('mongodb://anas:anas1234@localhost:27017/awtphase2')
    // const info = await connectDatabase(DB_URL)
    // const info = await mongoose.connect('mongodb://anas:anas1234@localhost:27017/awtphase2', options)
    const info = await mongoose.connect(DB_URL, options)

    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);

    await app.listen(PORT);
    console.log(`Server started on port ${PORT}`);

  } catch (error) {
    console.error('Unable to connect to database');
    console.log(error);
  }

})();
