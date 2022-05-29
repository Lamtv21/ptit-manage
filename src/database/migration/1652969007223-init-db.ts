import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1652969007223 implements MigrationInterface {
    name = 'initDb1652969007223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP(6), "id" SERIAL NOT NULL, "title" character varying(500) NOT NULL, "titleNoAccent" character varying(500) NOT NULL, "content" text NOT NULL, "imgUrl" character varying(200) NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_sex_enum" AS ENUM('male', 'female', 'other', 'unknown')`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP(6), "id" SERIAL NOT NULL, "firstName" character varying(20) NOT NULL, "lastName" character varying(20) NOT NULL, "phoneNumber" character varying(10), "sex" "public"."user_sex_enum" NOT NULL DEFAULT 'unknown', "age" integer, "address" character varying, "hashedPassword" character varying(300) NOT NULL, "refreshToken" character varying(500), "email" character varying NOT NULL, "user_type_id" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_role_enum" AS ENUM('manager', 'admin', 'student')`);
        await queryRunner.query(`CREATE TABLE "user_type" ("createdAt" TIMESTAMP(6) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP(6), "id" SERIAL NOT NULL, "role" "public"."user_type_role_enum" NOT NULL DEFAULT 'student', "desc" character varying NOT NULL, CONSTRAINT "PK_1f9c6d05869e094dee8fa7d392a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_7a806f5e14fced276888eab1a3e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ec4e80af79f6f17170f6c30b7a9" FOREIGN KEY ("user_type_id") REFERENCES "user_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ec4e80af79f6f17170f6c30b7a9"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_7a806f5e14fced276888eab1a3e"`);
        await queryRunner.query(`DROP TABLE "user_type"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_role_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_sex_enum"`);
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
