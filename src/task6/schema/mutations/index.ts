import { GraphQLObjectType } from 'graphql';
import { userMutations } from "./user";
import { cartMutations } from "./cart";
import { orderMutations } from "./order";

export const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        ...userMutations,
        ...cartMutations,
        ...orderMutations,
    }),
});
