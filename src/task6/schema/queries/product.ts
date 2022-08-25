import {
    GraphQLList,
} from 'graphql';
import faker from 'faker';
import {
    ProductType,
} from '../types/product';

export const productQueries = {
    products: {
        type: new GraphQLList(ProductType),
        resolve: async () => {
            const products = await new Promise(resolve =>
                setTimeout(() =>
                    resolve(new Array(10).fill(undefined).map(() => {
                        const id = faker.datatype.uuid();
                        return {
                        id: id,
                        name: `product ${id}`,
                        description:  `product ${id} description`,
                        category: 'CPU',
                        cost: faker.datatype.number({
                            'min': 1,
                            'max': 1000
                        })
                    }})), 100),
            );
            return products;
        },
    },
};