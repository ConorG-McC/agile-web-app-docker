-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 21, 2023 at 01:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skill_audit`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `job_role_id` int(11) NOT NULL,
  `system_role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `username`, `password`, `first_name`, `last_name`, `job_role_id`, `system_role_id`) VALUES
(25, 'Conor', 'PASSWORD', 'Conor', 'Giffen', 2, 1),
(49, 'Chris', 'PASSWORD', 'Chris', 'Gallagher', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `employee_skill`
--

CREATE TABLE `employee_skill` (
  `employee_skill_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `employee_skill_level_id` int(11) NOT NULL,
  `employee_skill_expiry` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_skill`
--

INSERT INTO `employee_skill` (`employee_skill_id`, `employee_id`, `skill_id`, `employee_skill_level_id`, `employee_skill_expiry`) VALUES
(34, 49, 34, 1, '0000-00-00'),
(37, 25, 34, 1, '2023-09-30'),
(39, 25, 46, 1, '2023-09-30');

-- --------------------------------------------------------

--
-- Table structure for table `employee_skill_level`
--

CREATE TABLE `employee_skill_level` (
  `employee_skill_level_id` int(11) NOT NULL,
  `employee_skill_level_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_skill_level`
--

INSERT INTO `employee_skill_level` (`employee_skill_level_id`, `employee_skill_level_name`) VALUES
(1, 'Basic'),
(2, 'Expert');

-- --------------------------------------------------------

--
-- Table structure for table `job_role`
--

CREATE TABLE `job_role` (
  `job_role_id` int(11) NOT NULL,
  `job_role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_role`
--

INSERT INTO `job_role` (`job_role_id`, `job_role_name`) VALUES
(1, 'Junior Developer'),
(2, 'Senior Developer'),
(8, 'Apprentice');

-- --------------------------------------------------------

--
-- Table structure for table `manager_staff`
--

CREATE TABLE `manager_staff` (
  `manager_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager_staff`
--

INSERT INTO `manager_staff` (`manager_id`, `staff_id`) VALUES
(25, 49);

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `skill_id` int(11) NOT NULL,
  `skill_name` varchar(255) DEFAULT NULL,
  `skill_category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`skill_id`, `skill_name`, `skill_category_id`) VALUES
(34, 'Javascript', 1),
(46, 'MYSQL', 2);

-- --------------------------------------------------------

--
-- Table structure for table `skill_category`
--

CREATE TABLE `skill_category` (
  `skill_category_id` int(11) NOT NULL,
  `skill_category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill_category`
--

INSERT INTO `skill_category` (`skill_category_id`, `skill_category_name`) VALUES
(1, 'Programming'),
(2, 'Databases');

-- --------------------------------------------------------

--
-- Table structure for table `system_role`
--

CREATE TABLE `system_role` (
  `system_role_id` int(11) NOT NULL,
  `system_role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_role`
--

INSERT INTO `system_role` (`system_role_id`, `system_role_name`) VALUES
(1, 'Manager'),
(2, 'Staff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `job_role_id` (`job_role_id`),
  ADD KEY `system_role_id` (`system_role_id`);

--
-- Indexes for table `employee_skill`
--
ALTER TABLE `employee_skill`
  ADD PRIMARY KEY (`employee_skill_id`),
  ADD KEY `staff_id` (`employee_id`),
  ADD KEY `skill_id` (`skill_id`),
  ADD KEY `staff_skill_level_id` (`employee_skill_level_id`);

--
-- Indexes for table `employee_skill_level`
--
ALTER TABLE `employee_skill_level`
  ADD PRIMARY KEY (`employee_skill_level_id`);

--
-- Indexes for table `job_role`
--
ALTER TABLE `job_role`
  ADD PRIMARY KEY (`job_role_id`);

--
-- Indexes for table `manager_staff`
--
ALTER TABLE `manager_staff`
  ADD KEY `manager_id` (`manager_id`,`staff_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`skill_id`),
  ADD KEY `skill_category_id` (`skill_category_id`);

--
-- Indexes for table `skill_category`
--
ALTER TABLE `skill_category`
  ADD PRIMARY KEY (`skill_category_id`);

--
-- Indexes for table `system_role`
--
ALTER TABLE `system_role`
  ADD PRIMARY KEY (`system_role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `employee_skill`
--
ALTER TABLE `employee_skill`
  MODIFY `employee_skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `employee_skill_level`
--
ALTER TABLE `employee_skill_level`
  MODIFY `employee_skill_level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `job_role`
--
ALTER TABLE `job_role`
  MODIFY `job_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `skill_category`
--
ALTER TABLE `skill_category`
  MODIFY `skill_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `system_role`
--
ALTER TABLE `system_role`
  MODIFY `system_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`job_role_id`) REFERENCES `job_role` (`job_role_id`),
  ADD CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`system_role_id`) REFERENCES `system_role` (`system_role_id`);

--
-- Constraints for table `employee_skill`
--
ALTER TABLE `employee_skill`
  ADD CONSTRAINT `employee_skill_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `employee_skill_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`),
  ADD CONSTRAINT `employee_skill_ibfk_3` FOREIGN KEY (`employee_skill_level_id`) REFERENCES `employee_skill_level` (`employee_skill_level_id`),
  ADD CONSTRAINT `fk_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`),
  ADD CONSTRAINT `fk_staff_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `manager_staff`
--
ALTER TABLE `manager_staff`
  ADD CONSTRAINT `manager_staff_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `manager_staff_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `employee` (`employee_id`);

--
-- Constraints for table `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `fk_skill_category_id` FOREIGN KEY (`skill_category_id`) REFERENCES `skill_category` (`skill_category_id`),
  ADD CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`skill_category_id`) REFERENCES `skill_category` (`skill_category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
