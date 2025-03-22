import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/typeorm';
import { faker } from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export const seedData = async (manager: EntityManager): Promise<void> => {
  async function seedUser() {
    const user = new UserEntity();
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.phoneNumber = faker.phone.number();
    user.password = 'Duc123456@gmail';
    user.apiKey = uuid4();
    try {
      await manager.getRepository(UserEntity).save(user);
      console.log('test runner12', user);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  await seedUser();
};
