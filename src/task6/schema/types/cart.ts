import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} from 'graphql';
import {
    GraphQLDate
} from '../scalars/date';
import {UserType} from "./user";
import {ProductType} from "./product";

const CartStatusType = new GraphQLEnumType({
    name: 'CartStatusType',
    values: {
        Created: { value: 0 },
        Ordered: { value: 1 },
    }
});

export const CartType = new GraphQLObjectType({
    name: 'CartType',
    description: 'Shopping cart',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        user: {
            type: new GraphQLNonNull(UserType),
        },
        items: {
            type: new GraphQLList(CartItemType),
        },
        status: {
            type: new GraphQLNonNull(CartStatusType),
        },
        dateCreate: {
            type: new GraphQLNonNull(GraphQLDate),
        },
    }),
});


export const CartItemType = new GraphQLObjectType({
    name: 'CartItemType',
    description: 'Shopping cart item',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        product: {
            type: new GraphQLNonNull(ProductType),
        },
        count: {
            type: new GraphQLNonNull(GraphQLInt),
        },
    }),
});

export const CreateCartInputType = new GraphQLInputObjectType({
    name: 'CreateCartInputType',
    description: 'Create cart payload definition',
    fields: () => ({
        userId: {
            type: new GraphQLNonNull(GraphQLID),
        },
    }),
});

export const AddProductInputType = new GraphQLInputObjectType({
    name: 'AddProductInputType',
    description: 'Add product to cart payload definition',
    fields: () => ({
        cartId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        productId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        count: {
            type: GraphQLInt,
        },
    }),
});

export const RemoveProductInputType = new GraphQLInputObjectType({
    name: 'RemoveProductInputType',
    description: 'Remove product from cart payload definition',
    fields: () => ({
        cartId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        productId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        count: {
            type: GraphQLInt,
        },
    }),
});

export const ClearInputType = new GraphQLInputObjectType({
    name: 'ClearInputType',
    description: 'Remove all items from cart payload definition',
    fields: () => ({
        cartId: {
            type: new GraphQLNonNull(GraphQLID),
        },
    }),
});