// node express
const express = require('express');
const app = express();

// GraphQL
const { graphqlHTTP } = require('express-graphql');
const schema = require('./model/schema')
const resolvers = require('./functions/resolver');

// MongoDB
const mongoose = require('mongoose') // import the mongoose drivers

//This route will be used as an endpoint to interact with Graphql,
//All queries will go through this route.
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true // tests
}));

// connect to our MongoDB server.
const uri = "mongodb+srv://rtalon:cDnwffF2VdWAZEgi@cluster0.sink0.mongodb.net/nexum?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    app.listen(5000) // setup server to run on port 5000
    console.log(" Server OK!");
}).catch(err => {
    console.log(err)
})
