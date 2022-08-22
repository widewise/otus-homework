import {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInputObjectType,
} from 'graphql';

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'User information',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        login: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: GraphQLString,
        },
    }),
});

export const UserCreateInputType = new GraphQLInputObjectType({
    name: 'UserCreateInputType',
    description: 'User create payload definition',
    fields: () => ({
        login: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: GraphQLString,
        },
    }),
});