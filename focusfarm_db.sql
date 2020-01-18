-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 06, 2019 at 10:12 PM
-- Server version: 5.7.24
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

--
-- Database: `focusfarm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

USE `d030e0c0`;

CREATE TABLE `list` (
  `listID` int(11) NOT NULL,
  `listTitle` varchar(1000) NOT NULL,
  `dateCreated` date NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`listID`, `listTitle`, `dateCreated`, `userID`) VALUES
(49, 'This is my new list', '2019-12-06', 17),
(51, 'This is another list', '2019-12-06', 19),
(52, 'This is my list item', '2019-12-06', 20);

-- --------------------------------------------------------

--
-- Table structure for table `list_item`
--

CREATE TABLE `list_item` (
  `itemID` int(11) NOT NULL,
  `itemText` varchar(1000) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT '"No text"',
  `isComplete` tinyint(1) NOT NULL DEFAULT '0',
  `dueDate` date DEFAULT NULL,
  `listID` int(11) NOT NULL,
  `dateCreated` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `list_item`
--

INSERT INTO `list_item` (`itemID`, `itemText`, `isComplete`, `dueDate`, `listID`, `dateCreated`) VALUES
(61, 'This is my list item', 0, NULL, 49, '2019-12-06'),
(67, 'Let&#39;s edit them all', 1, NULL, 51, '2019-12-06'),
(68, 'These are mine let&#39;s do it', 0, NULL, 52, '2019-12-06');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `email`, `first_name`, `last_name`, `password`) VALUES
(12, 'thisismyname@gmail.com', 'Joe', 'Appleseed', '$2y$10$CUwAeNv.EAn57B7iyGxDFOy3CZUmrQy2NXjFBH9KK0jZurisk/xSu'),
(13, 'ronald@gmail.com', 'Ronald', 'Mac', '$2y$10$dBwqX4ZNiUip1DpvSH9sFezE8mBHglLWUtpgAdW7.G6OZ3X7.MOo2'),
(14, 'hello@gmail.com', 'Nick', 'Dahl', '$2y$10$n0cRuF1dZzMq.qdshKlnteFW/i4EeJMjUqjzV1.86xN11fjrJ44oq'),
(15, 'dahl@gmail.com', 'Nicholas', 'Dahl', '$2y$10$ueuL3oAkBsIULANTYviWmOBcj.NupufC8WosqkIvb.J8g6ZKBW8g.'),
(16, 'tricks@gmail.com', 'Nick', 'Dahl', '$2y$10$oAywbeWTTXVKgeztRUXLU.42h6wNVLrDYFDy0WD.VnZO59skRhJZC'),
(17, 'wonder@gmail.com', 'Nick', 'Dahl', '$2y$10$69rLjFpHIh3cPyZnH/kMGeYwxYL4OqmS1JynrWeABJxYNhzxV2FDu'),
(18, 'tester@gmail.com', 'Jimmy', 'Doe', '$2y$10$lu//.DpX7jv0aceE8TPKvOKSeryU8SCR.L9MIVuPC/lYW.v5PkA2e'),
(19, 'nick@gmail.com', 'Nick', 'Dahl', '$2y$10$teGt1vPPUfHARmfHZ.CWWu90cS7yZc3UVyMf/q3lVdkdv3yBX5ijS'),
(20, 'againagain@gmail.com', 'Nick', 'Dahl', '$2y$10$9TK3pXx2gamfewzkxcuAROOAOweXBHCkqhJ/DEA6RvBiOjfF9QLtW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `list`
--
ALTER TABLE `list`
  ADD PRIMARY KEY (`listID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `list_item`
--
ALTER TABLE `list_item`
  ADD PRIMARY KEY (`itemID`),
  ADD KEY `listID` (`listID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `list`
--
ALTER TABLE `list`
  MODIFY `listID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `list_item`
--
ALTER TABLE `list_item`
  MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `list_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE;

--
-- Constraints for table `list_item`
--
ALTER TABLE `list_item`
  ADD CONSTRAINT `list_item_ibfk_1` FOREIGN KEY (`listID`) REFERENCES `list` (`listID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
