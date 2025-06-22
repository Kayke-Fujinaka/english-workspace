import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReviewFieldsToCards1750600000000 implements MigrationInterface {
  name = 'AddReviewFieldsToCards1750600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "tb_cards" 
      ADD COLUMN "review_count" INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN "correct_streak" INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN "total_errors" INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN "consecutive_errors" INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN "current_stage" INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN "next_review_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "tb_cards" 
      DROP COLUMN "review_count",
      DROP COLUMN "correct_streak",
      DROP COLUMN "total_errors",
      DROP COLUMN "consecutive_errors",
      DROP COLUMN "current_stage",
      DROP COLUMN "next_review_at";
    `);
  }
}
