import { logger, MockDatabase, MockDatabaseObject } from '../util';
import * as faker from 'faker/locale/de';

interface MockUser extends MockDatabaseObject {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
}

interface MockBackendData {
  users: MockUser[];
}

export class Database extends MockDatabase<MockBackendData>{

  protected init() {
    this.db = {
      users: Database.createUsers()
    }
  }

  private static createUsers(count = 10): MockUser[] {
    const users = [];

    for (let i = 0; i < count; i++) {
      const user: MockUser = {
        _id: i,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumberFormat(2),
        age: faker.random.number(99)
      };
      users.push(user);
    }

    logger.info(`Generated ${users.length} users.`)

    return users;
  }
}
