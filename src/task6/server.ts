import express from 'express';
import { graphqlHTTP } from "express-graphql";
import schema from './schema';
import { AddressInfo } from "net";

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const server = app.listen(3000, () => {
    const address : AddressInfo = server.address() as AddressInfo;
    console.log(`Express listen server with address: ${address.port}`);
});