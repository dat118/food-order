-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 24, 2022 at 02:42 PM
-- Server version: 5.7.34-log
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_example`
--

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `description`, `price`) VALUES
(1, 'burger', 'delicious', 12.5),
(2, 'pizza', 'delicious', 12.5),
(3, 'cola', 'drink', 1),
(4, 'taco', 'Mexican specialty', 2.99),
(5, 'fanta', 'drink', 0.99),
(6, 'noodle', 'fast food', 3.99),
(7, 'banh mi', 'Vietnamese speciality', 2.99),
(8, 'pho', 'Vietnamese speciality', 2.99),
(9, 'jajangmyeon', 'Korean specialty', 2.99);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `city`, `postal`, `street`, `user_id`) VALUES
(64, 'chinh', 'hnoi', '10000', 'test street', NULL),
(65, 'vu', 'hanoi', '10000', 'test street', 21),
(66, 'admin', 'test city', '10000', 'test street', 21),
(67, 'Nguyễn Tiến Danh', 'Bac Ninh', '11111', 'Cau Nga Van Duong', 22);

-- --------------------------------------------------------

--
-- Table structure for table `order_food`
--

CREATE TABLE `order_food` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_food`
--

INSERT INTO `order_food` (`id`, `order_id`, `food_id`, `amount`) VALUES
(1, 1, 1, 3),
(2, 1, 2, 2),
(3, 1, 1, NULL),
(4, 1, 1, NULL),
(5, 38, 1, NULL),
(6, 38, 1, NULL),
(7, 38, 1, NULL),
(8, 38, 1, NULL),
(9, 38, 1, 2),
(10, 38, 1, 2),
(11, 39, 1, 2),
(12, 39, 1, 2),
(13, 40, 1, 2),
(14, 40, 2, 2),
(15, 41, 0, 2),
(16, 42, 1, 1),
(17, 42, 0, 1),
(18, 42, 2, 1),
(19, 43, 0, 1),
(20, 43, 1, 1),
(21, 43, 2, 1),
(22, 44, 0, 2),
(23, 44, 1, 2),
(24, 44, 2, 1),
(25, 45, 0, 2),
(26, 45, 1, 1),
(27, 46, 1, 2),
(28, 46, 2, 1),
(29, 47, 1, 1),
(30, 47, 2, 1),
(31, 48, 1, 2),
(32, 48, 2, 1),
(33, 49, 1, 2),
(34, 50, 1, 1),
(35, 51, 2, 1),
(36, 52, 1, 1),
(37, 53, 1, 1),
(38, 54, 1, 2),
(39, 54, 2, 1),
(40, 55, 1, 2),
(41, 56, 1, 1),
(42, 56, 2, 3),
(43, 57, 1, 4),
(44, 58, 1, 2),
(45, 59, 2, 4),
(46, 59, 1, 1),
(47, 60, 1, 2),
(48, 60, 2, 1),
(49, 61, 1, 1),
(50, 61, 2, 1),
(51, 62, 1, 1),
(52, 62, 2, 1),
(53, 63, 1, 2),
(54, 63, 2, 1),
(55, 63, 3, 1),
(56, 64, 1, 2),
(57, 64, 2, 2),
(58, 64, 3, 1),
(59, 64, 1, 3),
(60, 64, 3, 1),
(61, 64, 2, 1),
(62, 64, 5, 1),
(63, 65, 3, 2),
(64, 65, 4, 1),
(65, 65, 9, 1),
(66, 65, 8, 1),
(67, 66, 1, 1),
(68, 66, 9, 1),
(69, 66, 8, 2),
(70, 67, 1, 1),
(71, 67, 2, 2),
(72, 67, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstparent_id` int(11) DEFAULT NULL,
  `secondparent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id`, `firstname`, `lastname`, `firstparent_id`, `secondparent_id`) VALUES
(1, 'Krasimir', 'Hristozov', NULL, NULL),
(2, 'Maria', 'Hristozova', NULL, NULL),
(3, 'Masha', 'Hristozova', 1, 2),
(4, 'Jane', 'Smith', NULL, NULL),
(5, 'John', 'Smith', NULL, NULL),
(6, 'Richard', 'Smith', 4, 5),
(7, 'Donna', 'Smith', 4, 5),
(8, 'Josh', 'Harrelson', NULL, NULL),
(9, 'Anna', 'Harrelson', 7, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(19, 'dat@gmail.com', '$2y$10$5bNXU77Rqg/IuIx.8RpGiOznOyNWVmtAZopl.bZYl1Ui7vkaLOKKW'),
(20, 'dat123@gmail.com', '$2y$10$5zgU/Oxp9j31oZmYEk9g/ezuPGM1VYeQF60dUqp12pSdnHD4Ocgta'),
(21, 'vu.nt@gmail.com', '$2y$10$CrlQlu792ArDZ7ysOfdB0e9wJTOi/C61kZ9EPFrVwxm33TWzTQjc6'),
(22, 'dat123987@gmail.com', '$2y$10$eo3WNGVJQqc60zwioKjMX.m0nmBzadjOZYkeSH1Ee1nuQbU8/JAhK'),
(23, 'vu@gmail.com', '$2y$10$YnT.wVfUpPcEzkDzBTUnKujJYMT9aSuDnnJ.MsdthkwchIfKevDZK'),
(24, 'vu.nt4332@gmail.com', '$2y$10$Pt40ST4yRJulwgJm3VC5y.5hNN7nO0aWo8cL10ZEbpf3IpUtsQIMK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_food`
--
ALTER TABLE `order_food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`),
  ADD KEY `firstparent_id` (`firstparent_id`),
  ADD KEY `secondparent_id` (`secondparent_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `order_food`
--
ALTER TABLE `order_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`firstparent_id`) REFERENCES `person` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `person_ibfk_2` FOREIGN KEY (`secondparent_id`) REFERENCES `person` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
