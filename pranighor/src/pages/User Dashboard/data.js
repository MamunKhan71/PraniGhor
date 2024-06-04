// ESM
import { faker } from '@faker-js/faker';

export function createRandomUser() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        age: faker.datatype.number(40),

    };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
    count: 30,
});