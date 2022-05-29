import { MigrationInterface, QueryRunner } from 'typeorm'
import { RoleType, UserType } from '../entities/usertype.entity'

export class createUserType1652969042854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(UserType)
      .values([
        {
          id: 1,
          role: RoleType.MANAGER,
          desc: 'Is manager, manage all student and admin'
        },
        {
          id: 2,
          role: RoleType.ADMIN,
          desc: 'Is admin, manage all student'
        },
        {
          id: 3,
          role: RoleType.STUDENT,
          desc: 'Is student'
        }
      ])
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(UserType)
      .where('id IN(:array)', { array: [1, 2, 3] })
      .execute()
  }
}
