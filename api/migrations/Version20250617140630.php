<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250617140630 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE group_session (id SERIAL NOT NULL, creator_id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, started_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, ended_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_564481D861220EA6 ON group_session (creator_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN group_session.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN group_session.started_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN group_session.ended_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE group_session_member (id SERIAL NOT NULL, group_session_id INT NOT NULL, user_id INT NOT NULL, status VARCHAR(20) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_87023953B6F28D6D ON group_session_member (group_session_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_87023953A76ED395 ON group_session_member (user_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN group_session_member.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN group_session_member.updated_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_session ADD CONSTRAINT FK_564481D861220EA6 FOREIGN KEY (creator_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_session_member ADD CONSTRAINT FK_87023953B6F28D6D FOREIGN KEY (group_session_id) REFERENCES group_session (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_session_member ADD CONSTRAINT FK_87023953A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pomodoro_session ADD group_session_id INT DEFAULT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pomodoro_session ADD CONSTRAINT FK_6FFF4BB2B6F28D6D FOREIGN KEY (group_session_id) REFERENCES group_session (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_6FFF4BB2B6F28D6D ON pomodoro_session (group_session_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pomodoro_session DROP CONSTRAINT FK_6FFF4BB2B6F28D6D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_session DROP CONSTRAINT FK_564481D861220EA6
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_session_member DROP CONSTRAINT FK_87023953B6F28D6D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE group_session_member DROP CONSTRAINT FK_87023953A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE group_session
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE group_session_member
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX UNIQ_6FFF4BB2B6F28D6D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE pomodoro_session DROP group_session_id
        SQL);
    }
}
