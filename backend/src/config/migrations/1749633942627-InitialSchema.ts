import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1749633942627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "tb_decks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_tb_decks" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "tb_cards" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "front" character varying NOT NULL,
                "back" character varying NOT NULL,
                "deckId" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_tb_cards" PRIMARY KEY ("id"),
                CONSTRAINT "FK_tb_cards_decks" FOREIGN KEY ("deckId") REFERENCES "tb_decks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_cards"`);
    await queryRunner.query(`DROP TABLE "tb_decks"`);
  }
}
