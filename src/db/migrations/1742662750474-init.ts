import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742662750474 implements MigrationInterface {
    name = 'Init1742662750474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`twoFASecret\` text NULL, \`twoFactorEnabled\` tinyint NOT NULL DEFAULT 0, \`apiKey\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`info-product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`productId\` int NULL, UNIQUE INDEX \`REL_d65c9703b30456a459bbd5e07e\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_category\` (\`categoryId\` int NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_559e1bc4d01ef1e56d75117ab9\` (\`categoryId\`), INDEX \`IDX_a32cf3cfd513cd9feb72c64f86\` (\`productsId\`), PRIMARY KEY (\`categoryId\`, \`productsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`info-product\` ADD CONSTRAINT \`FK_d65c9703b30456a459bbd5e07ec\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_559e1bc4d01ef1e56d75117ab9c\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_a32cf3cfd513cd9feb72c64f864\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_a32cf3cfd513cd9feb72c64f864\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_559e1bc4d01ef1e56d75117ab9c\``);
        await queryRunner.query(`ALTER TABLE \`info-product\` DROP FOREIGN KEY \`FK_d65c9703b30456a459bbd5e07ec\``);
        await queryRunner.query(`DROP INDEX \`IDX_a32cf3cfd513cd9feb72c64f86\` ON \`product_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_559e1bc4d01ef1e56d75117ab9\` ON \`product_category\``);
        await queryRunner.query(`DROP TABLE \`product_category\``);
        await queryRunner.query(`DROP INDEX \`REL_d65c9703b30456a459bbd5e07e\` ON \`info-product\``);
        await queryRunner.query(`DROP TABLE \`info-product\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
