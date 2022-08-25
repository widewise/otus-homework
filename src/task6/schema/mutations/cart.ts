import { GraphQLNonNull } from "graphql";
import {
    CreateCartInputType,
    AddProductInputType,
    RemoveProductInputType,
    ClearInputType,
    CartType,
    CartItemType,
} from "../types/cart";
import faker from "faker";

export const cartMutations = {
    createCart: {
        type: CartType,
        args: {
            input: {
                type: new GraphQLNonNull(CreateCartInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if (!input.userId) {
                throw new Error('User is required');
            }
            const result = await new Promise((resolve) => {
                setTimeout(() =>
                    resolve(Object.assign(input, {
                        id: faker.datatype.uuid(),
                        user: {
                            id: input.userId,
                            login: `user ${input.userId}`,
                            password: '',
                        },
                        items: [],
                        status: 0,
                        dateCreate: new Date()
                    })), 100);
            });
            return result;
        },
    },
    addProductToCart: {
        type: CartItemType,
        args: {
            input: {
                type: new GraphQLNonNull(AddProductInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if (!input.cartId) {
                throw new Error('Cart is required');
            }
            if (!input.productId) {
                throw new Error('Product is required');
            }
            const result = await new Promise((resolve) => {
                setTimeout(() =>
                    resolve({
                        id: faker.datatype.uuid(),
                        product: {
                            id: input.productId,
                            name: `product ${input.productId}`,
                            description:  `product ${input.productId} description`,
                            category: 'CPU',
                            cost: faker.datatype.number({
                                'min': 1,
                                'max': 10
                            })
                        },
                        count: input.count ?? 1
                    }), 100);
            });
            return result;
        },
    },
    removeProductFromCart: {
        type: CartItemType,
        args: {
            input: {
                type: new GraphQLNonNull(RemoveProductInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if (!input.cartId) {
                throw new Error('Cart is required');
            }
            if (!input.productId) {
                throw new Error('Product is required');
            }
            const result = await new Promise((resolve) => {
                setTimeout(() =>
                    resolve({
                        id: faker.datatype.uuid(),
                        product: {
                            id: input.productId,
                            name: `product ${input.productId}`,
                            description:  `product ${input.productId} description`,
                            category: 'CPU',
                            cost: faker.datatype.number({
                                'min': 1,
                                'max': 1000
                            })
                        },
                        count: 1
                    }), 100);
            });
            return result;
        },
    },
    clearCart: {
        type: CartType,
        args: {
            input: {
                type: new GraphQLNonNull(ClearInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if (!input.cartId) {
                throw new Error('Cart is required');
            }
            const result = await new Promise((resolve) => {
                setTimeout(() => {
                    const userId = faker.datatype.uuid();
                    resolve({
                        id: input.cartId,
                        user: {
                            id: userId,
                            login: `user ${userId}`,
                            password: '',
                        },
                        items: [],
                        status: 0,
                        dateCreate: new Date()
                    })
                }, 100);
            });
            return result;
        },
    },
};