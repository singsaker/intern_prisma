ALTER TABLE beboer MODIFY fodselsdato datetime not null;

UPDATE beboer
SET fodselsdato = "1000-01-01 00:00:00"
WHERE fodselsdato = 0;

ALTER TABLE beboer_verv
ADD CONSTRAINT PK_beboer_verv PRIMARY KEY (beboer_id, verv_id);

ALTER TABLE beboer_verv
ADD FOREIGN KEY (beboer_id) REFERENCES beboer(id);

ALTER TABLE beboer_verv
ADD FOREIGN KEY (verv_id) REFERENCES verv(id);

ALTER TABLE krysseliste
ADD FOREIGN KEY (beboer_id) REFERENCES beboer(id);

ALTER TABLE kryss
ADD FOREIGN KEY (beboer_id) REFERENCES beboer(id);

ALTER TABLE kryss
ADD FOREIGN KEY (drikke_id) REFERENCES drikke(id);

ALTER TABLE vin MODIFY typeId int unsigned;

ALTER TABLE vin ADD foreign key (typeId) references vintype(id);

UPDATE vin SET slettet = 0 WHERE slettet IS NULL;

ALTER TABLE vin MODIFY slettet tinyint NOT NULL default 0;

ALTER TABLE beboer
ADD FOREIGN KEY (bruker_id) REFERENCES bruker(id);

ALTER TABLE beboer
ADD UNIQUE
INDEX `bruker_id_UNIQUE`
(`bruker_id` ASC) VISIBLE;

ALTER TABLE beboer
ADD FOREIGN KEY (skole_id) REFERENCES skole(id);

ALTER TABLE beboer
ADD FOREIGN KEY (studie_id) REFERENCES studie(id);

ALTER TABLE beboer 
CHANGE COLUMN `rolle_id` `rolle_id` INT UNSIGNED NULL DEFAULT NULL;

ALTER TABLE beboer
ADD FOREIGN KEY (rolle_id) REFERENCES rolle(id);

ALTER TABLE prefs
DROP COLUMN vinpinboo;

UPDATE prefs SET vinpin = null WHERE vinpin = "";

ALTER TABLE prefs 
CHANGE COLUMN `vinpin` `vinpin` INT UNSIGNED NULL DEFAULT NULL ;

UPDATE prefs SET pinkode = null WHERE pinkode = "";

ALTER TABLE prefs
CHANGE COLUMN `pinkode` `pinkode` BIGINT UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `vinpin` `vinpin` BIGINT UNSIGNED NULL DEFAULT NULL ;

ALTER TABLE prefs
CHANGE COLUMN `resepp` `resepp` TINYINT
(1) NOT NULL DEFAULT '1' ,
CHANGE COLUMN `vinkjeller` `vinkjeller` TINYINT
(1) NOT NULL DEFAULT '1' ,
CHANGE COLUMN `pinboo` `pinboo` TINYINT
(1) NOT NULL DEFAULT '0' ;

ALTER TABLE `intern3`.`epost_pref`
ADD UNIQUE INDEX `beboer_id_UNIQUE`
(`beboer_id` ASC);

CREATE TABLE `intern3`.`kunngjoring`
(
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tittel` VARCHAR
(45) NOT NULL,
  `tekst` TEXT NULL,
  `publisert` DATETIME NOT NULL DEFAULT NOW
(),
  `beboer_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY
(`id`),
  UNIQUE INDEX `id_UNIQUE`
(`id` ASC) 
  VISIBLE);


-- Fra her:
ALTER TABLE kunngjoring
ADD FOREIGN KEY (beboer_id) REFERENCES beboer(id);

ALTER TABLE `intern3`.`drikke`
ADD COLUMN `produktnr` INT UNSIGNED NULL AFTER `kommentar`,
ADD UNIQUE INDEX `produktnr_UNIQUE`
(`produktnr` ASC) VISIBLE;
;

ALTER TABLE arbeid
ADD FOREIGN KEY (bruker_id) REFERENCES bruker(id);

ALTER TABLE `intern3`.`arbeid` 
CHANGE COLUMN `godkjent_bruker_id` `godkjent_bruker_id` INT UNSIGNED NULL ;

UPDATE arbeid SET godkjent_bruker_id = null WHERE godkjent_bruker_id = 0;

ALTER TABLE arbeid
ADD FOREIGN KEY (godkjent_bruker_id) REFERENCES bruker(id);

ALTER TABLE `intern3`.`arbeid` 
CHANGE COLUMN `tid_godkjent` `tid_godkjent` DATETIME NULL ;

UPDATE arbeid SET tid_godkjent = null WHERE tid_godkjent = 0;

ALTER TABLE krysseliste ADD FOREIGN KEY(drikke_id) REFERENCES drikke(id);

ALTER TABLE `intern3`.`arbeid` 
CHANGE COLUMN `godkjent` `godkjent` TINYINT
(2) NOT NULL DEFAULT '0' ;

ALTER TABLE `intern3`.`vakt` 
CHANGE COLUMN `bruker_id` `bruker_id` INT UNSIGNED NULL ,
CHANGE COLUMN `autogenerert` `autogenerert` TINYINT
(1) NOT NULL DEFAULT '1' ;

UPDATE vakt SET bruker_id = null WHERE bruker_id = 0;

ALTER TABLE vakt ADD FOREIGN KEY (bruker_id) REFERENCES bruker(id);

ALTER TABLE `intern3`.`vakt` 
CHANGE COLUMN `vakttype` `vakttype` TINYINT
(4) NOT NULL ;

Alter Table storhybel_rekkefolge ADD PRIMARY KEY(storhybel_id, velger_id);

ALTER TABLE storhybel_rekkefolge
ADD FOREIGN KEY (storhybel_id) REFERENCES storhybel(id);

ALTER TABLE `intern3`.`storhybel_velger` 
CHANGE COLUMN `beboer_id` `beboer_id` INT UNSIGNED NOT NULL ;

ALTER TABLE storhybel_velger
ADD FOREIGN KEY (beboer_id) REFERENCES beboer(id);

ALTER TABLE `intern3`.`storhybel_velger`
ADD PRIMARY KEY
(`velger_id`, `storhybel_id`);

ALTER TABLE storhybel_velger
ADD FOREIGN KEY (storhybel_id) REFERENCES storhybel(id);

ALTER TABLE `intern3`.`storhybel_velger`
DROP PRIMARY KEY,
ADD PRIMARY KEY
(`velger_id`);

ALTER TABLE `intern3`.`storhybel_fordeling`
ADD PRIMARY KEY
(`storhybel_id`, `velger_id`);

ALTER TABLE `intern3`.`storhybel_fordeling` 
CHANGE COLUMN `gammel_rom_id` `gammel_rom_id` INT UNSIGNED NULL DEFAULT NULL ,
CHANGE COLUMN `ny_rom_id` `ny_rom_id` INT UNSIGNED NULL DEFAULT NULL;

ALTER TABLE storhybel_fordeling
ADD FOREIGN KEY (gammel_rom_id) REFERENCES rom(id);

ALTER TABLE storhybel_fordeling
ADD FOREIGN KEY (ny_rom_id) REFERENCES rom(id);

ALTER TABLE rom
ADD FOREIGN KEY (romtype_id) REFERENCES romtype(id);

ALTER TABLE `intern3`.`storhybel_rom`
ADD PRIMARY KEY
(`storhybel_id`, `rom_id`);

ALTER TABLE `intern3`.`storhybel_rom` 
CHANGE COLUMN `storhybel_id` `storhybel_id` INT UNSIGNED NOT NULL ,
CHANGE COLUMN `rom_id` `rom_id` INT UNSIGNED NOT NULL ;

ALTER TABLE storhybel_rom
ADD FOREIGN KEY (rom_id) REFERENCES rom(id);

ALTER TABLE `intern3`.`storhybel_rom` 
CHANGE COLUMN `storhybel_id` `storhybel_id` INT NOT NULL ;

ALTER TABLE storhybel_rom
ADD FOREIGN KEY (storhybel_id) REFERENCES storhybel(id);

ALTER TABLE storhybel_fordeling
ADD FOREIGN KEY (storhybel_id) REFERENCES storhybel(id);

ALTER TABLE storhybel_fordeling
ADD FOREIGN KEY (velger_id) REFERENCES storhybel_velger(velger_id);

ALTER TABLE storhybel_rekkefolge
ADD FOREIGN KEY (velger_id) REFERENCES storhybel_velger(velger_id);

ALTER TABLE vaktantall
ADD CONSTRAINT bruker_semester UNIQUE(bruker_id, semester);

ALTER TABLE `intern3`.`vaktantall` 
CHANGE COLUMN `bruker_id` `bruker_id` INT UNSIGNED NOT NULL ;

ALTER TABLE vaktantall
ADD FOREIGN KEY (bruker_id) REFERENCES bruker(id);

DELETE FROM vakt WHERE vaktbytte_id = "";

ALTER TABLE `intern3`.`vakt` 
CHANGE COLUMN `vaktbytte_id` `vaktbytte_id` INT UNSIGNED NULL DEFAULT NULL ;

UPDATE vakt SET vaktbytte_id = null WHERE vaktbytte_id = 0;

ALTER TABLE vakt
ADD FOREIGN KEY (vaktbytte_id)
REFERENCES vaktbytte(id);

ALTER TABLE vaktbytte
DROP COLUMN vakt_id;

ALTER TABLE `intern3`.`vakt`
ADD UNIQUE INDEX `vaktbytte_id_UNIQUE`
(`vaktbytte_id` ASC) VISIBLE;

-- 12.02.2021

ALTER TABLE rom
ADD FOREIGN KEY (romtype_id) REFERENCES romtype(id);

ALTER TABLE `intern3`.`beboer`
ADD COLUMN `rom_id` INT UNSIGNED NULL DEFAULT NULL AFTER `perm`,
ADD UNIQUE INDEX `rom_id_UNIQUE`
(`rom_id` ASC) VISIBLE;

ALTER TABLE `intern3`.`beboer`
ADD CONSTRAINT `beboer_rom`
  FOREIGN KEY
(`rom_id`)
  REFERENCES `intern3`.`rom`
(`id`)
  ON
DELETE NO ACTION
  ON
UPDATE NO ACTION;

ALTER TABLE `intern3`.`storhybel_rekkefolge`
ADD UNIQUE INDEX `velger_id_UNIQUE`
(`velger_id` ASC) VISIBLE;

ALTER TABLE `intern3`.`storhybel_fordeling`
ADD UNIQUE INDEX `velger_id_UNIQUE`
(`velger_id` ASC) VISIBLE;

ALTER TABLE `intern3`.`storhybel_rekkefolge`
DROP FOREIGN KEY `storhybel_rekkefolge_ibfk_2`;
ALTER TABLE `intern3`.`storhybel_rekkefolge`
DROP INDEX `velger_id_UNIQUE` ;

ALTER TABLE `intern3`.`storhybel_fordeling`
DROP FOREIGN KEY `storhybel_fordeling_ibfk_4`;
ALTER TABLE `intern3`.`storhybel_fordeling`
DROP INDEX `velger_id_UNIQUE` ;


ALTER TABLE `intern3`.`storhybel_velger` 
CHANGE COLUMN `velger_id` `velger_id` INT NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `velger_id_UNIQUE`
(`velger_id` ASC) VISIBLE;

ALTER TABLE storhybel_fordeling
ADD FOREIGN KEY (velger_id) REFERENCES storhybel_velger(velger_id);

ALTER TABLE storhybel_rekkefolge
ADD FOREIGN KEY (velger_id) REFERENCES storhybel_velger(velger_id);