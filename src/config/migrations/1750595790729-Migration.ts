import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750595790729 implements MigrationInterface {
  name = 'Migration1750595790729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_cards" DROP CONSTRAINT "PK_6dea528d0de1b4ea34bcff34200"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_cards" RENAME COLUMN "deckId" TO "deck_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_cards" ADD CONSTRAINT "PK_6dea528d0de1b4ea34bcff34200" FOREIGN KEY ("deck_id") REFERENCES "tb_decks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_cards" DROP CONSTRAINT "PK_6dea528d0de1b4ea34bcff34200"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_cards" RENAME COLUMN "deck_id" TO "deckId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_cards" ADD CONSTRAINT "PK_6dea528d0de1b4ea34bcff34200" FOREIGN KEY ("deckId") REFERENCES "tb_decks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
