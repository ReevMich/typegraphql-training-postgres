import { testConn } from "../../../test-utils/testConn"
import { Connection } from "typeorm";
import { testGraphQl } from "../../../test-utils/gCall";
import faker from 'faker';
import { User } from "../../../entity/User";

let conn: Connection;

beforeAll(async () => {
    conn = await testConn();
})

afterAll(async () => {
    await conn.close();
})

describe('Register', () => {
    it('create user and validate in database', async () => {
        const registerData = {
            data: {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
        }

        const response = await testGraphQl({
            source: registerMutation,
            variableValues: registerData
        });

        const parsedResponse = parseRegisterResponse(response);
        expect(parsedResponse).toMatchObject({
            firstName: registerData.data.firstName,
            lastName: registerData.data.lastName,
            email: registerData.data.email
        })

        const dbUser = await User.findOne({where: {email: parsedResponse.email}});
        expect(dbUser).toBeDefined();
        expect(dbUser!.firstName).toEqual(registerData.data.firstName);
        expect(dbUser!.lastName).toEqual(registerData.data.lastName);
        expect(dbUser!.email).toEqual(registerData.data.email);
        expect(dbUser!.confirmedEmail).toBeFalsy();


    })
})

const parseRegisterResponse = (response: any) => {
    const data = response['data']['register'];
    if (!data) return response;
    return {
        ...data
    }
}

const registerMutation = `
    mutation register($data: RegisterInput!) {
        register(data: $data) {
            id,
            email,
            name,
            firstName,
            lastName,
        }
    }
`;