import { testConn } from "../../../test-utils/testConn"
import { Connection } from "typeorm";
import { testGraphQl } from "../../../test-utils/gCall";
import faker from 'faker';
import { User } from "../../../entity/User";
import { redis } from "../../../redis";

let conn: Connection;

beforeAll(async () => {
    conn = await testConn();
    if (redis.status == "end") {
        await redis.connect();
    }
})

afterAll(async () => {
    redis.disconnect();
    await conn.close();
})

describe('Me', () => {
    it('get user', async () => {
        const dbUser = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save();

        const response = await testGraphQl({
            source: meQuery,
            uid: dbUser.id
        });
        expect(response).toMatchObject({
            data: {
                me: {
                    id: String(dbUser.id),
                    firstName: dbUser.firstName,
                    lastName: dbUser.lastName,
                    email: dbUser.email
                }
            }
        })

    })

    it('user not logged in - return undefined', async () => {
        const response = await testGraphQl({
            source: meQuery
        });
        expect(response.data!.me).toBeFalsy()

    })
})

const meQuery = `
    query {
        me {
            id
            firstName
            lastName
            name
            email
        }
    }
`;