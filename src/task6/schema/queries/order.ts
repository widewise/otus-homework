import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import faker from 'faker';
import {
    OrderType,
} from '../types/order';

export const orderQueries = {
    orders: {
        type: new GraphQLList(OrderType),
        args: {
            userId: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: async (_, {userId}): Promise<any> => {
            const orders = await new Promise(resolve => {
                    const user = {
                        id: userId,
                        login: `user ${userId}`,
                        password: '',
                    };

                    setTimeout(() =>
                        resolve(new Array(10).fill(undefined).map(() => {
                            const id = faker.datatype.uuid();
                            const cartItemId = faker.datatype.uuid();
                            const productId = faker.datatype.uuid();

                            return {
                                id: id,
                                cart: {
                                    id: faker.datatype.uuid(),
                                    user: user,
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
                                address: faker.address.city(),
                                dateCreate: faker.date.past()
                            }
                        })), 100);
                }
            );
            return orders;
        },
    },
};