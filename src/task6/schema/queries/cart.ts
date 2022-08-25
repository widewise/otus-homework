import {
    GraphQLID,
    GraphQLNonNull,
} from 'graphql';
import faker from 'faker';
import { CartType } from '../types/cart';

export const cartQueries = {
    cart: {
        type: CartType,
        args: {
            userId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (_, {userId}): Promise<any> => {
            const cart = await new Promise(resolve =>
                setTimeout(() => {
                    const cartItemId = faker.datatype.uuid();
                    const productId = faker.datatype.uuid();
                    resolve({
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
                        status: 0,
                        dateCreate: faker.date.past()
                    })}, 100),
            );
            return cart;
        },
    }
};