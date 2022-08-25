import { GraphQLNonNull } from "graphql";
import {
    OrderType,
    SubmitCartInputType,
    ChangeOrderStatusInputType,
    DeliverOrderInputType,
} from "../types/order";
import faker from "faker";

export const orderMutations = {
    submitCart: {
        type: OrderType,
        args: {
            input: {
                type: new GraphQLNonNull(SubmitCartInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if (!input.cartId) {
                throw new Error('Cart is required');
            }
            if (!input.address) {
                throw new Error('Address is required');
            }
            const result = await new Promise((resolve) => {
                const userId = faker.datatype.uuid();
                const cartItemId = faker.datatype.uuid();
                const productId = faker.datatype.uuid();

                setTimeout(() => {
                    resolve({
                        id: faker.datatype.uuid(),
                        cart: {
                            id: input.cartId,
                            user: {
                                id: userId,
                                login: `user ${userId}`,
                                password: '',
                            },
                            items: [
                                {
                                    id: cartItemId,
                                    product: {
                                        id: productId,
                                        name: `product ${productId}`,
                                        description:  `product ${productId} description`,
                                        category: 'CPU',
                                        cost: faker.datatype.number({
                                            'min': 1,
                                            'max': 1000
                                        })
                                    },
                                    count: faker.datatype.number({
                                        'min': 1,
                                        'max': 10
                                    })
                                }
                            ],
                            status: 1,
                            dateCreate: faker.date.past()
                        },
                        status: 0,
                        address: input.address,
                        dateCreate: new Date(),
                    })}, 100);
            });
            return result;
        },
    },
    changeOrderStatus: {
        type: OrderType,
        args: {
            input: {
                type: new GraphQLNonNull(ChangeOrderStatusInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if (!input.orderId) {
                throw new Error('Order identifier is required');
            }
            if (!input.status) {
                throw new Error('Status is required');
            }
            const result = await new Promise((resolve) => {
                const userId = faker.datatype.uuid();
                const cartItemId = faker.datatype.uuid();
                const productId = faker.datatype.uuid();

                setTimeout(() => {
                    resolve({
                        id: faker.datatype.uuid(),
                        cart: {
                            id: faker.datatype.uuid(),
                            user: {
                                id: userId,
                                login: `user ${userId}`,
                                password: '',
                            },
                            items: [
                                {
                                    id: cartItemId,
                                    product: {
                                        id: productId,
                                        name: `product ${productId}`,
                                        description:  `product ${productId} description`,
                                        category: 'CPU',
                                        cost: faker.datatype.number({
                                            'min': 1,
                                            'max': 1000
                                        })
                                    },
                                    count: faker.datatype.number({
                                        'min': 1,
                                        'max': 10
                                    })
                                }
                            ],
                            status: 1,
                            dateCreate: faker.date.past()
                        },
                        status: input.status,
                        address: faker.address.city(),
                        dateCreate: faker.date.past(),
                    })}, 100);
            });
            return result;
        },
    },
    deliverOrder: {
        type: OrderType,
        args: {
            input: {
                type: new GraphQLNonNull(DeliverOrderInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if (!input.orderId) {
                throw new Error('Order identifier is required');
            }
            const result = await new Promise((resolve) => {
                const userId = faker.datatype.uuid();
                const cartItemId = faker.datatype.uuid();
                const productId = faker.datatype.uuid();

                setTimeout(() => {
                    resolve({
                        id: faker.datatype.uuid(),
                        cart: {
                            id: input.cartId,
                            user: {
                                id: userId,
                                login: `user ${userId}`,
                                password: '',
                            },
                            items: [
                                {
                                    id: cartItemId,
                                    product: {
                                        id: productId,
                                        name: `product ${productId}`,
                                        description:  `product ${productId} description`,
                                        category: 'CPU',
                                        cost: faker.datatype.number({
                                            'min': 1,
                                            'max': 1000
                                        })
                                    },
                                    count: faker.datatype.number({
                                        'min': 1,
                                        'max': 10
                                    })
                                }
                            ],
                            status: 1,
                            dateCreate: faker.date.past()
                        },
                        status: 2,
                        address: faker.address.city(),
                        dateCreate: faker.date.past(),
                        dateDelivered: new Date(),
                    })}, 100);
            });
            return result;
        },
    },
};