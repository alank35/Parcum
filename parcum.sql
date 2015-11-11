SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `parksome` ;
CREATE SCHEMA IF NOT EXISTS `parksome` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `parksome` ;

-- -----------------------------------------------------
-- Table `parksome`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`location` ;

CREATE TABLE IF NOT EXISTS `parksome`.`location` (
  `location_id` INT NOT NULL,
  `civic_address_1` VARCHAR(45) NULL,
  `civic_address_2` VARCHAR(45) NULL,
  `civic_address_3` VARCHAR(45) NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  `altitude` DOUBLE NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parksome`.`garage_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`garage_types` ;

CREATE TABLE IF NOT EXISTS `parksome`.`garage_types` (
  `garage_type_id` INT NOT NULL AUTO_INCREMENT,
  `garage_type` VARCHAR(45) NULL COMMENT 'Indoor, Outdoor, Street etc.\n',
  `private` TINYINT(1) NULL,
  `paid` TINYINT(1) NULL,
  PRIMARY KEY (`garage_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parksome`.`garage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`garage` ;

CREATE TABLE IF NOT EXISTS `parksome`.`garage` (
  `garage_id` INT NOT NULL,
  `garage_name` VARCHAR(255) NULL,
  `location_id` INT NULL,
  `garage_type_id` INT NULL,
  PRIMARY KEY (`garage_id`),
  INDEX `fk_garage_1_idx` (`location_id` ASC),
  INDEX `fk_garage_2_idx` (`garage_type_id` ASC),
  CONSTRAINT `fk_garage_1`
    FOREIGN KEY (`location_id`)
    REFERENCES `parksome`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_garage_2`
    FOREIGN KEY (`garage_type_id`)
    REFERENCES `parksome`.`garage_types` (`garage_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parksome`.`garage_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`garage_status` ;

CREATE TABLE IF NOT EXISTS `parksome`.`garage_status` (
  `total_slots` INT NULL,
  `available_slots` VARCHAR(45) NULL,
  `garage_id` INT NOT NULL,
  INDEX `fk_garage_status_1_idx` (`garage_id` ASC),
  CONSTRAINT `fk_garage_status_1`
    FOREIGN KEY (`garage_id`)
    REFERENCES `parksome`.`garage` (`garage_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parksome`.`rates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`rates` ;

CREATE TABLE IF NOT EXISTS `parksome`.`rates` (
  `rate_type_id` INT NULL,
  `rate_id` INT NOT NULL,
  PRIMARY KEY (`rate_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parksome`.`rate_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`rate_types` ;

CREATE TABLE IF NOT EXISTS `parksome`.`rate_types` (
  `rate_type_id` INT NOT NULL,
  `rate_type_desc` VARCHAR(50) NULL,
  PRIMARY KEY (`rate_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parksome`.`payment_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`payment_types` ;

CREATE TABLE IF NOT EXISTS `parksome`.`payment_types` (
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parksome`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`users` ;

CREATE TABLE IF NOT EXISTS `parksome`.`users` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`user_id`));


-- -----------------------------------------------------
-- Table `parksome`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`roles` ;

CREATE TABLE IF NOT EXISTS `parksome`.`roles` (
  `role_id` INT NOT NULL,
  `role_name` VARCHAR(45) NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `parksome`.`garage_admins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `parksome`.`garage_admins` ;

CREATE TABLE IF NOT EXISTS `parksome`.`garage_admins` (
  `garage_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `fk_garage_admins_1_idx` (`garage_id` ASC),
  INDEX `fk_garage_admins_2_idx` (`user_id` ASC),
  CONSTRAINT `fk_garage_admins_1`
    FOREIGN KEY (`garage_id`)
    REFERENCES `parksome`.`garage` (`garage_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_garage_admins_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `parksome`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
