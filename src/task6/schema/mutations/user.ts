import { GraphQLNonNull } from "graphql";
import {
    UserCreateInputType,
    UserType,
} from "../types/user";
import faker from "faker";

export const userMutations = {
    createUser: {
        type: UserType,
        args: {
            input: {
                type: new GraphQLNonNull(UserCreateInputType),
            },
        },
        resolve: async (rootValue, { input }) => {
            if (!input.login) {
                throw new Error('Login is required');
            }
            const result = await new Promise((resolve) => {
                setTimeout(() =>
                    resolve(Object.assign(input, {
                        id: faker.datatype.uuid(),
                    })), 100);
            });
            return result;
        },
    },
};