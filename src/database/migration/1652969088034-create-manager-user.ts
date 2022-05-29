import { MigrationInterface, QueryRunner } from 'typeorm'
import { User } from '../entities/user.entity'
import argon2 from 'argon2'
import { UserTypeID } from '../../constant/UserType.constant'

export class createManagerUser1652969088034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await argon2.hash('12345678')
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: 1,
          email: 'manager@gmail.com',
          firstName: 'manager',
          lastName: 'manager',
          hashedPassword: hashedPassword,
          userTypeId: UserTypeID.MANAGER
        },
        {
          id: 2,
          email: 'manager1@gmail.com',
          firstName: 'manager1',
          lastName: 'manager1',
          hashedPassword: hashedPassword,
          userTypeId: UserTypeID.MANAGER
        }
      ])
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id IN(:array)', { array: [1, 2] })
      .execute()
  }
}
