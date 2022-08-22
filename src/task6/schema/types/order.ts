import {
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLID, GraphQLInputObjectType,
} from 'graphql';
import {
    GraphQLDate
} from '../scalars/date';
import {CartType} from "./cart";

const OrderStatusType = new GraphQLEnumType({
    name: 'OrderStatusType',
    values: {
        Created: { value: 0 },
        InProgress: { value: 1 },
        Delivered: { value: 2 },
    }
});

export const OrderType = new GraphQLObjectType({
    name: 'OrderType',
    description: 'Orders',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        cart: {
            type: new GraphQLNonNull(CartType),
        },
        status: {
            type: new GraphQLNonNull(OrderStatusType),
        },
        address: {
            type: new GraphQLNonNull(GraphQLString),
        },
        dateCreate: {
            type: new GraphQLNonNull(GraphQLDate),
        },
        dateDelivered: {
            type: GraphQLDate,
        },
    }),
});

export const SubmitCartInputType = new GraphQLInputObjectType({
    name: 'SubmitCartInputType',
    description: 'Submit cart payload definition',
    fields: () => ({
        cartId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        address: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
});

export const ChangeOrderStatusInputType = new GraphQLInputObjectType({
    name: 'ChangeOrderStatusInputType',
    description: 'Change order status payload definition',
    fields: () => ({
        orderId: {
            type: new GraphQLNonNull(GraphQLID),
        },
        status: {
            type: new GraphQLNonNull(OrderStatusType),
        },
    }),
});

export const DeliverOrderInputType = new GraphQLInputObjectType({
    name: 'DeliverOrderInputType',
    description: 'Deliver order payload definition',
    fields: () => ({
        orderId: {
            type: new GraphQLNonNull(GraphQLID),
        },
    }),
});