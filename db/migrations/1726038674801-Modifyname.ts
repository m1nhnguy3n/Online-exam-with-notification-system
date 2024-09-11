import { MigrationInterface, QueryRunner } from "typeorm";

export class Modifyname1726038674801 implements MigrationInterface {
    name = 'Modifyname1726038674801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_entity" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying, "street" character varying, CONSTRAINT "UQ_8d789d5ea589eca5eb919cedd1e" UNIQUE ("email"), CONSTRAINT "PK_687443f2a51af49b5472e2c5ddc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "students_classes" DROP COLUMN "studentID"`);
        await queryRunner.query(`ALTER TABLE "students_classes" DROP CONSTRAINT "FK_fb930452b0c3fb3b90606b0a552"`);
        await queryRunner.query(`ALTER TABLE "students_classes" ALTER COLUMN "studentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students_classes" ADD CONSTRAINT "FK_fb930452b0c3fb3b90606b0a552" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students_classes" DROP CONSTRAINT "FK_fb930452b0c3fb3b90606b0a552"`);
        await queryRunner.query(`ALTER TABLE "students_classes" ALTER COLUMN "studentId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students_classes" ADD CONSTRAINT "FK_fb930452b0c3fb3b90606b0a552" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_classes" ADD "studentID" uuid NOT NULL`);
        await queryRunner.query(`DROP TABLE "token_entity"`);
    }

}
