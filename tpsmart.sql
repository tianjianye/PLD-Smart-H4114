-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： localhost:3306
-- 生成日期： 2019-05-03 07:36:24
-- 服务器版本： 5.7.24
-- PHP 版本： 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `tpsmart`
--

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `Email` varchar(50) NOT NULL,
  `Sex` char(5) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `Age` int(100) UNSIGNED NOT NULL,
  `Address` varchar(50) NOT NULL,
  `Pwd` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `account`
--

INSERT INTO `account` (`Email`, `Sex`, `LastName`, `FirstName`, `Age`, `Address`, `Pwd`) VALUES
('b.b@insa-lyon.fr', 'F', 'b', 'b', 14, 'b', 'b'),
('a.a@insa-lyon.fr', 'H', 'a', 'a', 12, 'a', 'a'),
('a.b@insa-lyon.fr', 'H', 'ARA', 'ARA', 24, 'ARA', 'ARA'),
('tianjian.ye@insa-lyon.fr', 'H', 'YE', 'Tianjian', 24, '20 AVENUE ALBERT EINSTEIN', 'abc');

-- --------------------------------------------------------

--
-- 表的结构 `participant`
--

DROP TABLE IF EXISTS `participant`;
CREATE TABLE IF NOT EXISTS `participant` (
  `id_participant` int(255) NOT NULL AUTO_INCREMENT,
  `id_user` int(255) NOT NULL,
  `id_rassemblement` int(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`id_participant`),
  UNIQUE KEY `id_user` (`id_user`),
  UNIQUE KEY `id_rassemblement` (`id_rassemblement`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `rassemblement`
--

DROP TABLE IF EXISTS `rassemblement`;
CREATE TABLE IF NOT EXISTS `rassemblement` (
  `id_rassemblement` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  PRIMARY KEY (`id_rassemblement`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `testjson`
--

DROP TABLE IF EXISTS `testjson`;
CREATE TABLE IF NOT EXISTS `testjson` (
  `file` json NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id_user`, `email`, `pseudo`, `password`) VALUES
(1, 'tianjian.ye@insa-lyon.fr', 'abc', 'abc');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
