-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 29 juin 2023 à 12:14
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jobhistory`
--

-- --------------------------------------------------------

--
-- Structure de la table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `company`
--

INSERT INTO `company` (`company_id`, `company_name`) VALUES
(1, 'Samsung'),
(2, 'LG'),
(3, 'Chanel'),
(4, 'SNCF');

-- --------------------------------------------------------

--
-- Structure de la table `history`
--

DROP TABLE IF EXISTS `history`;
CREATE TABLE IF NOT EXISTS `history` (
  `person_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `job_title` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  KEY `fk_person_id` (`person_id`),
  KEY `fk_company_id` (`company_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `history`
--

INSERT INTO `history` (`person_id`, `company_id`, `job_title`, `start_date`, `end_date`) VALUES
(1, 1, 'Manager', '2021-02-17', NULL),
(2, 1, 'Sales', '2018-04-21', '2018-04-28'),
(2, 2, 'Manager', '2018-04-29', NULL),
(3, 1, 'Toilet Cleaner', '2016-03-09', '2017-04-19'),
(3, 3, 'Door Opener', '2017-04-20', '2019-02-02'),
(3, 4, 'Manager', '2019-02-03', NULL),
(4, 3, 'Dev', '2019-02-03', '2019-06-09');

-- --------------------------------------------------------

--
-- Structure de la table `person`
--

DROP TABLE IF EXISTS `person`;
CREATE TABLE IF NOT EXISTS `person` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `datebirth` date NOT NULL,
  `adress` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  PRIMARY KEY (`person_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `person`
--

INSERT INTO `person` (`person_id`, `name`, `firstname`, `datebirth`, `adress`, `email`, `phone`) VALUES
(1, 'MARTIN', 'Antoine', '2000-06-28', '10 av du Toulouse 34000 Montpellier', 'a.m@gmail.com', '0612345678'),
(2, 'DUBOIS', 'Richard', '2001-06-25', '31 av du Nimes 34000 Montpellier', 'r.d@gmail.com', '0633445566'),
(3, 'PETIT', 'Thomas', '2002-05-17', '10 av du Nantes 34000 Montpellier', 't.p@gmail.com', '0655667788'),
(4, 'JEAN', 'Marc', '2003-07-01', '15 av du Paris 34000 Montpellier', 'm.j@gmail.com', '0633554488');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
