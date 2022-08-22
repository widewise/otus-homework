import { GraphQLObjectType } from 'graphql';
import { productQueries } from "./product";
import { cartQueries } from "./cart";
import { orderQueries } from "./order";

export const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ...productQueries,
        ...cartQueries,
        ...orderQueries,
    }),
})