import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLEnumType,
} from 'graphql';

const ProductCategoryType = new GraphQLEnumType({
    name: 'ProductCategoryType',
    values: {
        Motherboard: { value: "Motherboard" },
        CPU: { value: "CPU" },
        GPU: { value: "GPU" },
        Memory: { value: "Memory" },
        Storage: { value: "Storage" },
    }
});

export const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    description: 'Product information',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
        category: {
            type: new GraphQLNonNull(ProductCategoryType),
        },
        cost: {
            type: new GraphQLNonNull(GraphQLInt),
        },
    }),
});