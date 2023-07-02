-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 22, 2021 at 04:30 AM
-- Server version: 5.7.33-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lashDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `ll_admin_fee`
--

CREATE TABLE `ll_admin_fee` (
  `id` int(11) NOT NULL,
  `retail_fee` decimal(16,2) NOT NULL DEFAULT '0.00',
  `subscription_fee` decimal(16,2) NOT NULL DEFAULT '0.00',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_admin_fee`
--

INSERT INTO `ll_admin_fee` (`id`, `retail_fee`, `subscription_fee`, `update_date`, `create_create`) VALUES
(1, '5.00', '99.00', '2021-01-22 06:43:07', '2021-01-22 06:43:07');

-- --------------------------------------------------------

--
-- Table structure for table `ll_channel_followers`
--

CREATE TABLE `ll_channel_followers` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `follow_by_id` varchar(256) NOT NULL,
  `status` enum('1','2') NOT NULL DEFAULT '1',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_channel_followers`
--

INSERT INTO `ll_channel_followers` (`id`, `user_id`, `follow_by_id`, `status`, `update_date`, `create_date`) VALUES
(1, '9c3d78a6-ad30-47ab-b70e-021786f36896', 'd1b5cf55-ccbd-4c44-9b84-70983bb21d92', '1', '2021-01-27 17:04:25', '2021-01-23 12:49:56'),
(2, '9c3d78a6-ad30-47ab-b70e-021786f36896', '4ae1f2f0-7d5a-4789-ba2b-e9c4b49125b5', '1', '2021-01-23 12:51:30', '2021-01-23 12:51:30'),
(3, '12ed30cd-32ad-4b7e-9939-30691faba594', 'c760cc78-7771-4b89-8cd4-0df9a5cfbe14', '1', '2021-01-25 07:55:36', '2021-01-25 06:49:27'),
(13, '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', '98ba7036-f1d8-467e-8272-30af8293cfac', '2', '2021-02-02 08:13:22', '2021-02-01 08:19:27'),
(14, 'df4a4808-6869-490c-b46d-1ae07faae372', 'df4a4808-6869-490c-b46d-1ae07faae372', '2', '2021-03-03 18:26:43', '2021-02-11 10:19:11');

-- --------------------------------------------------------

--
-- Table structure for table `ll_country`
--

CREATE TABLE `ll_country` (
  `countryId` int(10) UNSIGNED NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `grupo` varchar(10) DEFAULT NULL,
  `latitude` varchar(50) NOT NULL,
  `longitude` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ll_country`
--

INSERT INTO `ll_country` (`countryId`, `code`, `name`, `active`, `grupo`, `latitude`, `longitude`) VALUES
(1, 'ad', 'andorra', 1, NULL, '42.546245', '1.601554'),
(2, 'ae', 'united arab emirates', 1, NULL, '23.424076', '53.847818'),
(3, 'af', 'afghanistan', 1, NULL, '33.93911', '67.709953'),
(4, 'ag', 'antigua and barbuda', 1, NULL, '', ''),
(5, 'ai', 'anguilla', 1, NULL, '18.220554', '-63.068615'),
(6, 'al', 'albania', 1, NULL, '41.153332', '20.168331'),
(7, 'am', 'armenia', 1, NULL, '', ''),
(9, 'ao', 'angola', 1, NULL, '-11.202692', '17.873887'),
(10, 'ar', 'argentina', 1, NULL, '', ''),
(11, 'at', 'austria', 1, 'UE', '', ''),
(12, 'au', 'australia', 1, NULL, '-25.274398', '133.775136'),
(13, 'aw', 'aruba', 1, NULL, '', ''),
(14, 'az', 'azerbaijan', 1, NULL, '', ''),
(15, 'ba', 'bosnia and herzegovina', 1, NULL, '', ''),
(16, 'bb', 'barbados', 1, NULL, '', ''),
(17, 'bd', 'bangladesh', 1, NULL, '23.684994', '90.356331'),
(18, 'be', 'belgium', 1, 'UE', '', ''),
(19, 'bf', 'burkina faso', 1, NULL, '', ''),
(20, 'bg', 'bulgaria', 1, 'UE', '42.733883', '25.48583'),
(21, 'bh', 'bahrain', 1, NULL, '', ''),
(22, 'bi', 'burundi', 1, NULL, '', ''),
(23, 'bj', 'benin', 1, NULL, '', ''),
(24, 'bm', 'bermuda', 1, NULL, '', ''),
(25, 'bn', 'brunei darussalam', 1, NULL, '', ''),
(26, 'bo', 'bolivia', 1, NULL, '', ''),
(27, 'br', 'brazil', 1, NULL, '-14.235004', '-51.92528'),
(28, 'bs', 'bahamas', 1, NULL, '', ''),
(29, 'bt', 'bhutan', 1, NULL, '', ''),
(30, 'bw', 'botswana', 1, NULL, '', ''),
(31, 'by', 'belarus', 1, NULL, '', ''),
(32, 'bz', 'belize', 1, NULL, '', ''),
(33, 'ca', 'canada', 1, NULL, '', ''),
(34, 'cc', 'cocos (keeling) islands', 1, NULL, '', ''),
(35, 'cd', 'congo, the democratic republic of the', 1, NULL, '', ''),
(36, 'cf', 'central african republic', 1, NULL, '', ''),
(37, 'cg', 'congo', 1, NULL, '', ''),
(38, 'ch', 'switzerland', 1, NULL, '-26.522503', '31.465866'),
(39, 'ci', 'cote d\'ivoire', 1, NULL, '', ''),
(40, 'ck', 'cook islands', 1, NULL, '', ''),
(41, 'cl', 'chile', 1, NULL, '', ''),
(42, 'cm', 'cameroon', 1, NULL, '7.369722', '12.354722'),
(43, 'cn', 'china', 1, NULL, '', ''),
(44, 'co', 'colombia', 1, NULL, '4.570868', '-74.297333'),
(45, 'cr', 'costa rica', 1, NULL, '', ''),
(46, 'cu', 'cuba', 1, NULL, '', ''),
(47, 'cv', 'cape verde', 1, NULL, '', ''),
(48, 'cx', 'christmas island', 1, NULL, '', ''),
(49, 'cy', 'cyprus', 1, 'UE', '', ''),
(50, 'cz', 'czech republic', 1, 'UE', '', ''),
(51, 'de', 'germany', 1, 'UE', '', ''),
(52, 'dj', 'djibouti', 1, NULL, '', ''),
(53, 'dk', 'denmark', 1, 'UE', '', ''),
(54, 'dm', 'dominica', 1, NULL, '', ''),
(55, 'do', 'dominican republic', 1, NULL, '', ''),
(56, 'dz', 'algeria', 1, NULL, '', ''),
(57, 'ec', 'ecuador', 1, NULL, '', ''),
(58, 'ee', 'estonia', 1, 'UE', '', ''),
(59, 'eg', 'egypt', 1, NULL, '', ''),
(60, 'eh', 'western sahara', 1, NULL, '', ''),
(61, 'er', 'eritrea', 1, NULL, '', ''),
(62, 'es', 'spain', 1, 'UE', '40.463667', '-3.74922'),
(63, 'et', 'ethiopia', 1, NULL, '', ''),
(64, 'fi', 'finland', 1, 'UE', '', ''),
(65, 'fj', 'fiji', 1, NULL, '', ''),
(66, 'fk', 'falkland islands (malvinas)', 1, NULL, '', ''),
(67, 'fm', 'micronesia, federated states of', 1, NULL, '', ''),
(68, 'fo', 'faroe islands', 1, NULL, '', ''),
(69, 'fr', 'france', 1, 'UE', '46.227638', '2.213749'),
(70, 'ga', 'gabon', 1, NULL, '', ''),
(71, 'gb', 'united kingdom', 1, 'UE', '55.378051', '-3.435973'),
(72, 'gd', 'grenada', 1, NULL, '', ''),
(73, 'ge', 'georgia', 1, NULL, '', ''),
(74, 'gf', 'french guiana', 1, NULL, '', ''),
(75, 'gg', 'guernsey', 1, NULL, '', ''),
(76, 'gh', 'ghana', 1, NULL, '7.946527', '-1.023194'),
(77, 'gi', 'gibraltar', 1, NULL, '', ''),
(78, 'gl', 'greenland', 1, NULL, '', ''),
(79, 'gm', 'gambia', 1, NULL, '', ''),
(80, 'gn', 'guinea', 1, NULL, '', ''),
(81, 'gp', 'guadeloupe', 1, NULL, '', ''),
(82, 'gq', 'equatorial guinea', 1, NULL, '', ''),
(83, 'gr', 'greece', 1, 'UE', '', ''),
(84, 'gs', 'south georgia and the south sandwich islands', 1, NULL, '', ''),
(85, 'gt', 'guatemala', 1, NULL, '', ''),
(86, 'gw', 'guinea-bissau', 1, NULL, '', ''),
(87, 'gy', 'guyana', 1, NULL, '', ''),
(88, 'hk', 'hong kong', 1, NULL, '', ''),
(89, 'hn', 'honduras', 1, NULL, '', ''),
(90, 'hr', 'croatia', 1, 'UE', '', ''),
(91, 'ht', 'haiti', 1, NULL, '', ''),
(92, 'hu', 'hungary', 1, 'UE', '', ''),
(93, 'id', 'indonesia', 1, NULL, '-0.789275', '113.921327'),
(94, 'ie', 'ireland', 1, 'UE', '', ''),
(95, 'il', 'israel', 1, NULL, '', ''),
(96, 'im', 'isle of man', 1, NULL, '', ''),
(97, 'in', 'india', 1, NULL, '20.593684', '78.96288'),
(98, 'iq', 'iraq', 1, NULL, '', ''),
(99, 'ir', 'iran, islamic republic of', 1, NULL, '', ''),
(100, 'is', 'iceland', 1, NULL, '', ''),
(101, 'it', 'italy', 1, 'UE', '41.87194', '12.56738'),
(102, 'je', 'jersey', 1, NULL, '', ''),
(103, 'jm', 'jamaica', 1, NULL, '', ''),
(104, 'jo', 'jordan', 1, NULL, '', ''),
(105, 'jp', 'japan', 1, NULL, '36.204824', '138.252924'),
(106, 'ke', 'kenya', 1, NULL, '-0.023559', '37.906193'),
(107, 'kg', 'kyrgyzstan', 1, NULL, '', ''),
(108, 'kh', 'cambodia', 1, NULL, '', ''),
(109, 'ki', 'kiribati', 1, NULL, '', ''),
(110, 'km', 'comoros', 1, NULL, '', ''),
(111, 'kn', 'saint kitts and nevis', 1, NULL, '', ''),
(112, 'kp', 'korea, democratic people\'s republic of', 1, NULL, '', ''),
(113, 'kr', 'korea, republic of', 1, NULL, '', ''),
(114, 'kw', 'kuwait', 1, NULL, '', ''),
(115, 'ky', 'cayman islands', 1, NULL, '', ''),
(116, 'kz', 'kazakhstan', 1, NULL, '', ''),
(117, 'la', 'lao people\'s democratic republic', 1, NULL, '', ''),
(118, 'lb', 'lebanon', 1, NULL, '', ''),
(119, 'lc', 'saint lucia', 1, NULL, '', ''),
(120, 'li', 'liechtenstein', 1, NULL, '', ''),
(121, 'lk', 'sri lanka', 1, NULL, '7.873054', '80.771797'),
(122, 'lr', 'liberia', 1, NULL, '', ''),
(123, 'ls', 'lesotho', 1, NULL, '', ''),
(124, 'lt', 'lithuania', 1, 'UE', '', ''),
(125, 'lu', 'luxembourg', 1, 'UE', '', ''),
(126, 'lv', 'latvia', 1, 'UE', '', ''),
(127, 'ly', 'libyan arab jamahiriya', 1, NULL, '', ''),
(128, 'ma', 'morocco', 1, NULL, '', ''),
(129, 'mc', 'monaco', 1, NULL, '', ''),
(130, 'md', 'moldova, republic of', 1, NULL, '', ''),
(131, 'me', 'montenegro', 1, NULL, '', ''),
(132, 'mg', 'madagascar', 1, NULL, '', ''),
(133, 'mh', 'marshall islands', 1, NULL, '', ''),
(134, 'mk', 'macedonia', 1, NULL, '', ''),
(135, 'ml', 'mali', 1, NULL, '', ''),
(136, 'mm', 'myanmar', 1, NULL, '', ''),
(137, 'mn', 'mongolia', 1, NULL, '', ''),
(138, 'mo', 'macao', 1, NULL, '', ''),
(139, 'mp', 'northern mariana islands', 1, NULL, '', ''),
(140, 'mq', 'martinique', 1, NULL, '', ''),
(141, 'mr', 'mauritania', 1, NULL, '', ''),
(142, 'ms', 'montserrat', 1, NULL, '', ''),
(143, 'mt', 'malta', 1, 'UE', '', ''),
(144, 'mu', 'mauritius', 1, NULL, '-20.348404', '57.552152'),
(145, 'mv', 'maldives', 1, NULL, '', ''),
(146, 'mw', 'malawi', 1, NULL, '-13.254308', '34.301525'),
(147, 'mx', 'mexico', 1, NULL, '23.634501', '-102.552784'),
(148, 'my', 'malaysia', 1, NULL, '', ''),
(149, 'mz', 'mozambique', 1, NULL, '', ''),
(150, 'na', 'namibia', 1, NULL, '', ''),
(151, 'nc', 'new caledonia', 1, NULL, '', ''),
(152, 'ne', 'niger', 1, NULL, '', ''),
(153, 'nf', 'norfolk island', 1, NULL, '', ''),
(154, 'ng', 'nigeria', 1, NULL, '9.081999', '8.675277'),
(155, 'ni', 'nicaragua', 1, NULL, '', ''),
(156, 'nl', 'netherlands', 1, 'UE', '', ''),
(157, 'no', 'norway', 1, NULL, '', ''),
(158, 'np', 'nepal', 1, NULL, '', ''),
(159, 'nr', 'nauru', 1, NULL, '', ''),
(160, 'nu', 'niue', 1, NULL, '', ''),
(161, 'nz', 'new zealand', 1, NULL, '', ''),
(162, 'om', 'oman', 1, NULL, '', ''),
(163, 'pa', 'panama', 1, NULL, '', ''),
(164, 'pe', 'peru', 1, NULL, '', ''),
(165, 'pf', 'french polynesia', 1, NULL, '', ''),
(166, 'pg', 'papua new guinea', 1, NULL, '', ''),
(167, 'ph', 'philippines', 1, NULL, '12.879721', '121.774017'),
(168, 'pk', 'pakistan', 1, NULL, '30.375321', '69.345116'),
(169, 'pl', 'poland', 1, 'UE', '', ''),
(170, 'pm', 'saint pierre and miquelon', 1, NULL, '', ''),
(171, 'pn', 'pitcairn', 1, NULL, '', ''),
(172, 'ps', 'palestinian territory', 1, NULL, '', ''),
(173, 'pt', 'portugal', 1, 'UE', '39.399872', '-8.224454'),
(174, 'pw', 'palau', 1, NULL, '', ''),
(175, 'py', 'paraguay', 1, NULL, '', ''),
(176, 'qa', 'qatar', 1, NULL, '', ''),
(177, 're', 'reunion', 1, NULL, '', ''),
(178, 'ro', 'romania', 1, 'UE', '', ''),
(179, 'rs', 'serbia', 1, NULL, '', ''),
(180, 'ru', 'russian federation', 1, NULL, '61.52401', '105.318756'),
(181, 'rw', 'rwanda', 1, NULL, '', ''),
(182, 'sa', 'saudi arabia', 1, NULL, '', ''),
(183, 'sb', 'solomon islands', 1, NULL, '', ''),
(184, 'sc', 'seychelles', 1, NULL, '', ''),
(185, 'sd', 'sudan', 1, NULL, '12.862807', '30.217636'),
(186, 'se', 'sweden', 1, 'UE', '60.128161', '18.643501'),
(187, 'sg', 'singapore', 1, NULL, '', ''),
(188, 'sh', 'saint helena', 1, NULL, '', ''),
(189, 'si', 'slovenia', 1, 'UE', '', ''),
(190, 'sj', 'svalbard and jan mayen', 1, NULL, '', ''),
(191, 'sk', 'slovakia', 1, 'UE', '', ''),
(192, 'sl', 'sierra leone', 1, NULL, '', ''),
(193, 'sm', 'san marino', 1, NULL, '', ''),
(194, 'sn', 'senegal', 1, NULL, '', ''),
(195, 'so', 'somalia', 1, NULL, '5.152149', '46.199616'),
(196, 'sr', 'suriname', 1, NULL, '', ''),
(197, 'st', 'sao tome and principe', 1, NULL, '', ''),
(198, 'sv', 'el salvador', 1, NULL, '', ''),
(199, 'sy', 'syrian arab republic', 1, NULL, '34.802075', '38.996815'),
(200, 'sz', 'swaziland', 1, NULL, '-26.522503', '31.465866'),
(201, 'tc', 'turks and caicos islands', 1, NULL, '', ''),
(202, 'td', 'chad', 1, NULL, '', ''),
(203, 'tf', 'french southern territories', 1, NULL, '', ''),
(204, 'tg', 'togo', 1, NULL, '8.619543', '0.824782'),
(205, 'th', 'thailand', 1, NULL, '15.870032', '100.992541'),
(206, 'tj', 'tajikistan', 1, NULL, '38.861034', '71.276093'),
(207, 'tk', 'tokelau', 1, NULL, '', ''),
(208, 'tm', 'turkmenistan', 1, NULL, '38.969719', '59.556278'),
(209, 'tn', 'tunisia', 1, NULL, '', ''),
(210, 'to', 'tonga', 1, NULL, '', ''),
(211, 'tr', 'turkey', 1, NULL, '38.963745', '35.243322'),
(212, 'tt', 'trinidad and tobago', 1, NULL, '', ''),
(213, 'tv', 'tuvalu', 1, NULL, '-7.109535', '177.64933'),
(214, 'tw', 'taiwan', 1, NULL, '23.69781', '120.960515'),
(215, 'tz', 'tanzania, united republic of', 1, NULL, '-6.369028', '34.888822'),
(216, 'ua', 'ukraine', 1, NULL, '48.379433', '31.16558'),
(217, 'ug', 'uganda', 1, NULL, '1.373333', '32.290275'),
(218, 'us', 'united states', 0, NULL, '37.09024', '-95.712891'),
(219, 'uy', 'uruguay', 1, NULL, '-32.522779', '-55.765835'),
(220, 'uz', 'uzbekistan', 1, NULL, '41.377491', '64.585262'),
(221, 'vc', 'saint vincent and the grenadines', 1, NULL, '', ''),
(222, 've', 'venezuela', 1, NULL, '6.42375', '-66.58973'),
(223, 'vg', 'virgin islands, british', 1, NULL, '18.420695', '-64.639968'),
(224, 'vi', 'virgin islands, u.s.', 1, NULL, '18.335765', '-64.896335'),
(225, 'vn', 'vietnam', 1, NULL, '14.058324', '108.277199'),
(226, 'vu', 'vanuatu', 1, NULL, '-15.376706', '166.959158'),
(227, 'wf', 'wallis and futuna', 1, NULL, '', ''),
(228, 'ws', 'samoa', 1, NULL, '', ''),
(229, 'ye', 'yemen', 1, NULL, '15.552727', '48.516388'),
(230, 'yt', 'mayotte', 1, NULL, '', ''),
(231, 'za', 'south africa', 1, NULL, '-30.559482', '22.937506'),
(232, 'zm', 'zambia', 1, NULL, '-13.133897', '27.849332'),
(234, 'zw', 'zimbabwe', 1, NULL, '-19.015438', '29.154857'),
(235, 'sx', 'sint maarten', 1, NULL, '', ''),
(237, 'ane', 'Anegada ', 1, NULL, '', ''),
(238, 'vg', 'Tortola', 1, NULL, '', ''),
(239, 'stmt', 'Saint-Martin', 1, NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `ll_forgot_password`
--

CREATE TABLE `ll_forgot_password` (
  `id` varchar(256) NOT NULL,
  `user_id` varchar(256) DEFAULT NULL,
  `password_selector` int(2) DEFAULT '0',
  `forgotten_password_code` varchar(256) DEFAULT NULL,
  `forgotten_password_time` varchar(256) DEFAULT NULL,
  `forgotten_password` varchar(256) DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `crdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_forgot_password`
--

INSERT INTO `ll_forgot_password` (`id`, `user_id`, `password_selector`, `forgotten_password_code`, `forgotten_password_time`, `forgotten_password`, `update_date`, `crdate`) VALUES
('0acafd0d-e9d4-4640-b3a2-9c58e12adcd0', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_3dd3802a-5242-4b74-8d36-1072a3dcee8c', '1612162579357', NULL, '2021-02-01 06:56:41', '2021-02-01 06:56:19'),
('0d6c952d-b3f7-435b-8c16-9764b67cef83', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_a4b6b024-75a9-4ab0-8fe5-bfe1e892d343', '1612162165478', NULL, '2021-02-01 06:52:08', '2021-02-01 06:49:25'),
('0e7b75ca-705f-442f-8e4e-b6095022bbcf', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_753c69c6-9554-46fb-b75e-da677d2aa1c1', '1612161920780', NULL, '2021-02-01 06:46:25', '2021-02-01 06:45:20'),
('10929c76-622f-4e2f-a16e-95c90678c902', 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 1, 'F_c4c16b60-4463-47ce-8d0c-d56cf0ded1db', '1612512461334', NULL, '2021-02-05 08:13:36', '2021-02-05 08:07:41'),
('1bc821a1-7a1f-4ff3-84e9-b4412e1679d9', 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 1, 'F_9bbd0e5e-090b-4d3d-8059-a1610d1a42f9', '1612512374659', NULL, '2021-02-05 08:06:14', '2021-02-05 08:06:14'),
('1efd89b9-60d4-4a68-bbe6-d66dcc0bac78', 'd816e819-b152-4b39-81cf-33a6e0df667c', 1, 'F_c1b5ac0a-fa8e-4677-914b-ebbcc077d778', '1608711962435', NULL, '2021-02-08 10:31:03', '2020-12-23 08:26:02'),
('3a3c3d33-e82c-4f80-897d-6d37e0dcb130', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_7a6f8965-4e02-44e5-820f-ab4e7a1b8523', '1612163188558', NULL, '2021-02-01 07:08:37', '2021-02-01 07:06:28'),
('3c3c27e7-eca1-44fe-bc1d-4ffb86bc3b36', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_c225097b-c905-464d-9be6-a1a1e8d3d8e9', '1612160601697', NULL, '2021-02-01 06:41:54', '2021-02-01 06:23:21'),
('3d3c3d84-e0d8-44a2-8389-86cbc03344ad', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_6b0b9460-c891-4220-84f7-69d7072d2cf1', '1612163399235', NULL, '2021-02-02 05:53:53', '2021-02-01 07:09:59'),
('3dc0764c-0d0b-4411-8113-6bda10b89aec', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_840fd61f-3444-4dca-a378-9cd49ec203ed', '1612161985942', NULL, '2021-02-01 06:49:25', '2021-02-01 06:46:25'),
('46317db3-6eaa-4ce7-8378-b476a7fb1194', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_e7b739cc-8dd4-44f4-8bf2-4808b00f245f', '1612162435690', NULL, '2021-02-01 06:55:40', '2021-02-01 06:53:55'),
('516a0e02-4bfd-4c72-bbef-ee550a77ac82', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_58e40e49-7adb-449d-be1e-8f04ab336084', '1612162328565', NULL, '2021-02-01 06:53:55', '2021-02-01 06:52:08'),
('69068ecd-c475-4aae-88ba-501b6f4b40db', '7f38832f-9cb4-444e-8bf7-cebc69324931', 0, 'F_c2439795-b3c5-4844-9d20-be1e6a1798d8', '1614855553442', NULL, '2021-03-04 10:59:13', '2021-03-04 10:59:13'),
('71ede2a2-e6cc-436c-8d38-89a0b4e6ba4d', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_de7fa481-c701-460e-b46e-41e9ee7f43c8', '1612245233283', NULL, '2021-02-02 05:57:39', '2021-02-02 05:53:53'),
('8123570a-62ec-49dd-ad2a-5262233fd94e', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_f322a482-25aa-44ec-bc7c-a51a1e9fbbf1', '1612162601234', NULL, '2021-02-01 07:02:38', '2021-02-01 06:56:41'),
('893ebeda-1359-4739-ab26-750d50f35065', '03aee3e1-f299-4415-b839-520622f8d6f1', 1, 'F_0fefd12b-aae7-42a1-ba73-e2f9e30ed741', '1612443405797', NULL, '2021-02-04 13:08:08', '2021-02-04 12:56:45'),
('9a392b2a-4ea1-44aa-b508-b786d2713565', 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 1, 'F_96dd7b1a-2324-4e88-a171-148f7f9370d3', '1612535370019', '$2b$10$C6sV31Gh4DFHYcJB2XNGe.tt7ea.G/RhjXHzS7.cApIV3ckZklPkW', '2021-02-05 14:30:26', '2021-02-05 14:29:30'),
('a0392b87-59e2-4c56-af7b-b549e991a07f', 'd816e819-b152-4b39-81cf-33a6e0df667c', 1, 'F_38c171a1-ac47-4f39-b0dd-1887aff5fc95', '1608711690698', NULL, '2020-12-23 08:21:30', '2020-12-23 08:21:30'),
('a08670dc-0d05-4acf-8e49-c0e79f6890cd', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_7b5705fa-6a12-43bc-a892-c465a252fc08', '1612162540378', NULL, '2021-02-01 06:56:19', '2021-02-01 06:55:40'),
('b478cc10-925c-4d61-9996-cf220f5b3272', 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 1, 'F_42a0bc3e-0880-4793-ba06-dffc2b744aa0', '1612512816800', NULL, '2021-02-05 08:13:36', '2021-02-05 08:13:36'),
('b7bf6bb7-becf-4095-b7cc-d772716b38ca', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_8074eb5d-d00b-4a21-b3ae-53e6953c7258', '1612245459340', NULL, '2021-02-02 06:01:53', '2021-02-02 05:57:39'),
('bd433897-2f39-4bc0-a6a0-7ab1c01e39cc', '9dc9cd45-3e82-4a89-a863-5abd256f026c', 0, 'F_33a24375-fd9e-47ca-9646-27807a0548f6', '1612444123140', NULL, '2021-02-04 13:08:43', '2021-02-04 13:08:43'),
('c426e605-8b3e-447e-a87c-9a86fc707dd4', 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 1, 'F_b7674abb-fef7-4f30-b1f9-3bd3fc5dfcf8', '1612513186125', '$2b$10$pKu8A9pFoKoZr9TJOsZycev4IwwSSX6x7UsNladVQTQJkxFf5oJWy', '2021-02-05 08:20:42', '2021-02-05 08:19:46'),
('c9ea2566-ffe6-4b36-949b-104c37ca1ab0', 'df4a4808-6869-490c-b46d-1ae07faae372', 0, 'F_f5a0f396-d7be-4b40-a047-d1dfa323f8c1', '1612245713102', NULL, '2021-02-02 06:01:53', '2021-02-02 06:01:53'),
('cac969cf-fd05-4217-98c2-d4fec226f596', '03aee3e1-f299-4415-b839-520622f8d6f1', 0, 'F_86e81903-e2dc-419f-8a97-d35dc9d77e23', '1612444088266', NULL, '2021-02-04 13:08:08', '2021-02-04 13:08:08'),
('d16a763a-5fb2-406c-802e-b9f101bdf697', '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', 0, 'F_e37e82c3-8bb8-48f3-a9df-da46a82c33d8', '1612031521225', NULL, '2021-01-30 18:32:01', '2021-01-30 18:32:01'),
('d8be50ce-62bd-4999-a5d2-d8c602a6b0ba', 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 1, 'F_d057fc6e-d228-4e60-b142-5c1f4d5d6491', '1612512176766', NULL, '2021-02-05 08:02:56', '2021-02-05 08:02:56'),
('da2228a5-6390-4ba1-ba91-59a117e2fd63', 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 1, 'F_01cd3dc0-fc01-493c-b2ee-537d732c4f40', '1612508061954', NULL, '2021-02-05 07:38:00', '2021-02-05 06:54:21'),
('e0e00245-df36-43cf-b293-74e0039a124e', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_e0879b01-b7c7-4f96-ab83-a818ce1f20a1', '1612162958544', NULL, '2021-02-01 07:06:28', '2021-02-01 07:02:38'),
('ed8162f1-d435-446a-abfe-533a2f9a4cf0', '03aee3e1-f299-4415-b839-520622f8d6f1', 1, 'F_0aa3ba3a-a84a-48f8-a1ca-2adec190165a', '1612442439483', NULL, '2021-02-04 12:56:45', '2021-02-04 12:40:39'),
('efe93f6e-1b71-4e94-9265-023e38248344', 'd816e819-b152-4b39-81cf-33a6e0df667c', 0, 'F_6c0f651b-91ff-4d09-9fd5-ee4cad1bc283', '1612780263532', NULL, '2021-02-08 10:31:03', '2021-02-08 10:31:03'),
('f04702b3-e2c8-4dc2-94d6-5820387c5da7', 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 1, 'F_299360f0-f36f-447c-a922-63db09072d01', '1612510680993', NULL, '2021-02-05 07:38:00', '2021-02-05 07:38:00'),
('f4d7de55-08d2-4773-bd94-d57d81231d5e', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_5a3a6b41-ec3c-4324-96f6-1e832c6ef6b4', '1612163317019', NULL, '2021-02-01 07:09:59', '2021-02-01 07:08:37'),
('f7ef34b7-30d7-4c57-8a3a-b384d3af151f', 'df4a4808-6869-490c-b46d-1ae07faae372', 1, 'F_3233541c-f97b-4618-95e1-113b58f7d447', '1612161714094', NULL, '2021-02-01 06:45:20', '2021-02-01 06:41:54');

-- --------------------------------------------------------

--
-- Table structure for table `ll_mail_template`
--

CREATE TABLE `ll_mail_template` (
  `id` int(11) NOT NULL,
  `template_name` varchar(256) DEFAULT NULL,
  `template_subject` varchar(256) DEFAULT NULL,
  `template_body` longtext,
  `template_status` enum('0','1') NOT NULL DEFAULT '1',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `crdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_mail_template`
--

INSERT INTO `ll_mail_template` (`id`, `template_name`, `template_subject`, `template_body`, `template_status`, `update_date`, `crdate`) VALUES
(1, 'Registration Confirmation Mail Template', 'Registration Confirmation Mail', '<html><head><meta charset=\"UTF-8\"><meta content=\"width=device-width, initial-scale=1\" name=\"viewport\"><meta name=\"x-apple-disable-message-reformatting\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><title></title><style>#outlook a{padding:0}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}.es-button{mso-style-priority:100!important;text-decoration:none!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.es-desk-hidden{display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all}s{text-decoration:line-through}html,body{width:100%;font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table{mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0}table td,html,body,.es-wrapper{padding:0;margin:0}.es-content,.es-header,.es-footer{table-layout:fixed!important;width:100%}img{display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}table tr{border-collapse:collapse}p,hr{margin:0}h1,h2,h3,h4,h5{margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif}p,ul li,ol li,a{-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly}.es-left{float:left}.es-right{float:right}.es-p5{padding:5px}.es-p5t{padding-top:5px}.es-p5b{padding-bottom:5px}.es-p5l{padding-left:5px}.es-p5r{padding-right:5px}.es-p10{padding:10px}.es-p10t{padding-top:10px}.es-p10b{padding-bottom:10px}.es-p10l{padding-left:10px}.es-p10r{padding-right:10px}.es-p15{padding:15px}.es-p15t{padding-top:15px}.es-p15b{padding-bottom:15px}.es-p15l{padding-left:15px}.es-p15r{padding-right:15px}.es-p20{padding:20px}.es-p20t{padding-top:20px}.es-p20b{padding-bottom:20px}.es-p20l{padding-left:20px}.es-p20r{padding-right:20px}.es-p25{padding:25px}.es-p25t{padding-top:25px}.es-p25b{padding-bottom:25px}.es-p25l{padding-left:25px}.es-p25r{padding-right:25px}.es-p30{padding:30px}.es-p30t{padding-top:30px}.es-p30b{padding-bottom:30px}.es-p30l{padding-left:30px}.es-p30r{padding-right:30px}.es-p35{padding:35px}.es-p35t{padding-top:35px}.es-p35b{padding-bottom:35px}.es-p35l{padding-left:35px}.es-p35r{padding-right:35px}.es-p40{padding:40px}.es-p40t{padding-top:40px}.es-p40b{padding-bottom:40px}.es-p40l{padding-left:40px}.es-p40r{padding-right:40px}.es-menu td{border:0}.es-menu td a img{display:inline-block!important}a{font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif;font-size:18px;text-decoration:underline}h1{font-size:48px;font-style:normal;font-weight:400;color:#111}h1 a{font-size:48px}h2{font-size:24px;font-style:normal;font-weight:400;color:#111}h2 a{font-size:24px}h3{font-size:20px;font-style:normal;font-weight:400;color:#111}h3 a{font-size:20px}p,ul li,ol li{font-size:18px;font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif;line-height:150%}ul li,ol li{margin-bottom:15px}.es-menu td a{text-decoration:none;display:block}.es-wrapper{width:100%;height:100%;background-repeat:repeat;background-position:center top}.es-wrapper-color{background-color:#f4f4f4}.es-content-body{background-color:#fff}.es-content-body p,.es-content-body ul li,.es-content-body ol li{color:#666}.es-content-body a{color:#e4282f}.es-header{background-color:#dadada;background-repeat:repeat;background-position:center top}.es-header-body{background-color:transparent}.es-header-body p,.es-header-body ul li,.es-header-body ol li{color:#666;font-size:14px}.es-header-body a{color:#111;font-size:14px}.es-footer{background-color:transparent;background-repeat:repeat;background-position:center top}.es-footer-body{background-color:transparent}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li{color:#666;font-size:14px}.es-footer-body a{color:#111;font-size:14px}.es-infoblock,.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li{line-height:120%;font-size:12px;color:#ccc}.es-infoblock a{font-size:12px;color:#ccc}.es-button-border{border-style:solid;border-color:#e4282f;background:1px;border-width:1px;display:inline-block;border-radius:2px;width:auto}@media only screen and (max-width: 600px) {p,ul li,ol li,a{font-size:16px!important;line-height:150%!important}h1{font-size:30px!important;text-align:center;line-height:120%!important}h2{font-size:26px!important;text-align:center;line-height:120%!important}h3{font-size:20px!important;text-align:center;line-height:120%!important}h1 a{font-size:30px!important}h2 a{font-size:26px!important}h3 a{font-size:20px!important}.es-menu td a{font-size:16px!important}.es-header-body p,.es-header-body ul li,.es-header-body ol li,.es-header-body a{font-size:16px!important}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li,.es-footer-body a{font-size:16px!important}.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li,.es-infoblock a{font-size:12px!important}[class=\"gmail-fix\"]{display:none!important}.es-m-txt-c,.es-m-txt-c h1,.es-m-txt-c h2,.es-m-txt-c h3{text-align:center!important}.es-m-txt-r,.es-m-txt-r h1,.es-m-txt-r h2,.es-m-txt-r h3{text-align:right!important}.es-m-txt-l,.es-m-txt-l h1,.es-m-txt-l h2,.es-m-txt-l h3{text-align:left!important}.es-m-txt-r img,.es-m-txt-c img,.es-m-txt-l img{display:inline!important}.es-button-border{display:block!important}.es-btn-fw{border-width:10px 0!important;text-align:center!important}.es-adaptive table,.es-btn-fw,.es-btn-fw-brdr,.es-left,.es-right{width:100%!important}.es-content table,.es-header table,.es-footer table,.es-content,.es-footer,.es-header{width:100%!important;max-width:600px!important}.es-adapt-td{display:block!important;width:100%!important}.adapt-img{width:100%!important;height:auto!important}.es-m-p0{padding:0!important}.es-m-p0r{padding-right:0!important}.es-m-p0l{padding-left:0!important}.es-m-p0t{padding-top:0!important}.es-m-p0b{padding-bottom:0!important}.es-m-p20b{padding-bottom:20px!important}.es-mobile-hidden,.es-hidden{display:none!important}tr.es-desk-hidden,td.es-desk-hidden,table.es-desk-hidden{width:auto!important;overflow:visible!important;float:none!important;max-height:inherit!important;line-height:inherit!important}tr.es-desk-hidden{display:table-row!important}table.es-desk-hidden{display:table!important}td.es-desk-menu-hidden{display:table-cell!important}.es-menu td{width:1%!important}table.es-table-not-adapt,.esd-block-html table{width:auto!important}table.es-social{display:inline-block!important}table.es-social td{display:inline-block!important}a.es-button,button.es-button{font-size:20px!important;display:block!important;border-width:15px 25px!important}}.es-p-default{padding:20px 30px 0}.es-p-all-default{padding:0}a.es-button,button.es-button{border-style:solid;border-color:#e4282f;border-width:15px 25px;display:inline-block;background:#e4282f;border-radius:2px;font-size:20px;font-family:helvetica,\'helvetica neue\',arial,verdana,sans-serif;font-weight:400;font-style:normal;line-height:120%;color:#fff;text-decoration:none;width:auto;text-align:center}</style></head><body> <div class=\"es-wrapper-color\"><table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr class=\"gmail-fix\" height=\"0\"><td><table width=\"600\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\"><tbody><tr><td cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"line-height: 1px; min-width: 600px;\" height=\"0\"><img src=\"https://esputnik.com/repository/applications/images/blank.gif\" style=\"display: block; max-height: 0px; min-height: 0px; min-width: 600px; width: 600px;\" alt=\"\" width=\"600\" height=\"1\"></td> </tr></tbody></table></td></tr><tr><td class=\"esd-email-paddings\" valign=\"top\"><table class=\"es-header\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody><tr><td class=\"esd-stripe\" esd-custom-block-id=\"6339\" align=\"center\"><table class=\"es-header-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody><tr><td class=\"esd-structure es-p20t es-p10b es-p10r es-p10l\" align=\"left\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody><tr><td class=\"esd-container-frame\" width=\"580\" valign=\"top\" align=\"center\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td class=\"esd-block-image es-p25t es-p25b es-p10r es-p10l\" align=\"center\" style=\"font-size:0\"><a href=\"\" target=\"_blank\"><img src=\"https://fori.kindlebit.com/assets/images/logo.png\" alt=\"\" style=\"display: block;\" width=\"\"></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody> </table><table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody><tr><td class=\"esd-stripe\" style=\"background-color: #dadada;\" esd-custom-block-id=\"6340\" bgcolor=\"#e4282f\" align=\"center\"><table class=\"es-content-body\" style=\"background-color: transparent;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody> <tr><td class=\"esd-structure\" align=\"left\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td class=\"esd-container-frame\" width=\"600\" valign=\"top\" align=\"center\"><table style=\"background-color: #ffffff; border-radius: 4px; border-collapse: separate;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\"><tbody><tr><td class=\"esd-block-text es-p35t es-p5b es-p30r es-p30l\" align=\"center\"> <h1>Welcome!</h1></td></tr><tr><td class=\"esd-block-spacer es-p5t es-p5b es-p20r es-p20l\" bgcolor=\"#ffffff\" align=\"center\" style=\"font-size:0\"> <table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody><tr><td style=\"border-bottom: 1px solid #ffffff; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;\"></td></tr></tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" align=\"center\"> <table class=\"es-content-body\" style=\"background-color: transparent;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"600\" valign=\"top\" align=\"center\"> <table style=\"border-radius: 4px; border-collapse: separate; background-color: #ffffff;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\"> <tbody> <tr> <td class=\"esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l\" bgcolor=\"#ffffff\" align=\"left\"> <p>We\'re excited to have you get started. First, you need to confirm your account. Just press the button below.</p> </td> </tr> <tr> <td class=\"esd-block-button es-p35t es-p35b es-p10r es-p10l\" align=\"center\"><span class=\"es-button-border\"><a href=\"https://fori.kindlebit.com/confirmation/[activation_code]\" class=\"es-button\" target=\"_blank\" style=\"border-width: 15px 30px;\"> Confirm Account</a></span></td> </tr> <tr> <td class=\"esd-block-text es-p20t es-p30r es-p30l es-m-txt-l\" align=\"left\"> <p>If that doesn\'t work, copy and paste the following link in your browser:</p> </td> </tr> <tr> <td class=\"esd-block-text es-p20t es-p30r es-p30l es-m-txt-l\" align=\"left\"><a target=\"_blank\" href=\"https://fori.kindlebit.com/confirmation/[activation_code]\">https://fori.kindlebit.com/confirmation/[activation_code]</a></td> </tr> <tr> <td class=\"esd-block-text es-p20t es-p30r es-p30l es-m-txt-l\" align=\"left\"> <p>If you have any questions, just reply to this email—we\'re always happy to help out.</p> </td> </tr> <tr> <td class=\"esd-block-text es-p20t es-p40b es-p30r es-p30l es-m-txt-l\" align=\"left\"> <p>Cheers,</p> <p>The FORI Team</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" align=\"center\"> <table class=\"es-content-body\" style=\"background-color: transparent;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"600\" valign=\"top\" align=\"center\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-block-spacer es-p10t es-p20b es-p20r es-p20l\" align=\"center\" style=\"font-size:0\"> <table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"> <tbody> <tr> <td style=\"border-bottom: 1px solid #f4f4f4; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;\"></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" esd-custom-block-id=\"6341\" align=\"center\"> <table class=\"es-content-body\" style=\"background-color: transparent;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"600\" valign=\"top\" align=\"center\"> <table style=\"background-color: #dadada; border-radius: 4px; border-collapse: separate;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#dadada\"> <tbody> <tr> <td class=\"esd-block-text es-p30t es-p30r es-p30l\" align=\"center\"> <h3 style=\"color: #111111;\">Need more help?</h3> </td> </tr> <tr> <td class=\"esd-block-text es-p30b es-p30r es-p30l\" esdev-links-color=\"#e4282f\" align=\"center\"><a target=\"_blank\" href=\"https://fori.kindlebit.com\" style=\"color: #e4282f;\">We’re here, ready to talk</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-footer\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" esd-custom-block-id=\"6342\" align=\"center\"> <table class=\"es-footer-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure es-p30t es-p30b es-p30r es-p30l\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"540\" valign=\"top\" align=\"center\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-block-text\" align=\"left\"> <p><strong><a target=\"_blank\" href=\"https://fori.kindlebit.com\">Dashboard</a> - <a target=\"_blank\" href=\"https://fori.kindlebit.com\">Billing</a> - <a target=\"_blank\" href=\"https://fori.kindlebit.com\">Help</a></strong></p> </td> </tr> <tr> <td align=\"left\" class=\"esd-block-text es-p25t\"> <p>You received this email because you just signed up for a new account. If it looks weird, <strong><a class=\"view\" target=\"_blank\" href=\"https://fori.kindlebit.com\">view it in your browser</a></strong>.</p> </td> </tr> <tr> <td align=\"left\" class=\"esd-block-text es-p25t\"> <p>If these emails get annoying, please feel free to&nbsp;<strong><a target=\"_blank\" class=\"unsubscribe\" href=\"https://fori.kindlebit.com\">unsubscribe</a></strong>.</p> </td> </tr> <tr> <td class=\"esd-block-text es-p25t\" align=\"left\"> <p>FORI - 1234 Main Street - Anywhere, MA - 56789</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody></table></td></tr></tbody></table></div></body></html>', '1', '2021-02-02 05:22:23', '2019-05-09 10:34:17'),
(2, 'Reset Password mail Template', 'Reset Password', '<html><head><meta charset=\"UTF-8\"><meta content=\"width=device-width, initial-scale=1\" name=\"viewport\"><meta name=\"x-apple-disable-message-reformatting\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><title></title><style>#outlook a{padding:0}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}.es-button{mso-style-priority:100!important;text-decoration:none!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.es-desk-hidden{display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all}s{text-decoration:line-through}html,body{width:100%;font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table{mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0}table td,html,body,.es-wrapper{padding:0;margin:0}.es-content,.es-header,.es-footer{table-layout:fixed!important;width:100%}img{display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}table tr{border-collapse:collapse}p,hr{margin:0}h1,h2,h3,h4,h5{margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif}p,ul li,ol li,a{-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly}.es-left{float:left}.es-right{float:right}.es-p5{padding:5px}.es-p5t{padding-top:5px}.es-p5b{padding-bottom:5px}.es-p5l{padding-left:5px}.es-p5r{padding-right:5px}.es-p10{padding:10px}.es-p10t{padding-top:10px}.es-p10b{padding-bottom:10px}.es-p10l{padding-left:10px}.es-p10r{padding-right:10px}.es-p15{padding:15px}.es-p15t{padding-top:15px}.es-p15b{padding-bottom:15px}.es-p15l{padding-left:15px}.es-p15r{padding-right:15px}.es-p20{padding:20px}.es-p20t{padding-top:20px}.es-p20b{padding-bottom:20px}.es-p20l{padding-left:20px}.es-p20r{padding-right:20px}.es-p25{padding:25px}.es-p25t{padding-top:25px}.es-p25b{padding-bottom:25px}.es-p25l{padding-left:25px}.es-p25r{padding-right:25px}.es-p30{padding:30px}.es-p30t{padding-top:30px}.es-p30b{padding-bottom:30px}.es-p30l{padding-left:30px}.es-p30r{padding-right:30px}.es-p35{padding:35px}.es-p35t{padding-top:35px}.es-p35b{padding-bottom:35px}.es-p35l{padding-left:35px}.es-p35r{padding-right:35px}.es-p40{padding:40px}.es-p40t{padding-top:40px}.es-p40b{padding-bottom:40px}.es-p40l{padding-left:40px}.es-p40r{padding-right:40px}.es-menu td{border:0}.es-menu td a img{display:inline-block!important}a{font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif;font-size:18px;text-decoration:underline}h1{font-size:48px;font-style:normal;font-weight:400;color:#111}h1 a{font-size:48px}h2{font-size:24px;font-style:normal;font-weight:400;color:#111}h2 a{font-size:24px}h3{font-size:20px;font-style:normal;font-weight:400;color:#111}h3 a{font-size:20px}p,ul li,ol li{font-size:18px;font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif;line-height:150%}ul li,ol li{margin-bottom:15px}.es-menu td a{text-decoration:none;display:block}.es-wrapper{width:100%;height:100%;background-repeat:repeat;background-position:center top}.es-wrapper-color{background-color:#f4f4f4}.es-content-body{background-color:#fff}.es-content-body p,.es-content-body ul li,.es-content-body ol li{color:#666}.es-content-body a{color:#e4282f}.es-header{background-color:#dadada;background-repeat:repeat;background-position:center top}.es-header-body{background-color:transparent}.es-header-body p,.es-header-body ul li,.es-header-body ol li{color:#666;font-size:14px}.es-header-body a{color:#111;font-size:14px}.es-footer{background-color:transparent;background-repeat:repeat;background-position:center top}.es-footer-body{background-color:transparent}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li{color:#666;font-size:14px}.es-footer-body a{color:#111;font-size:14px}.es-infoblock,.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li{line-height:120%;font-size:12px;color:#ccc}.es-infoblock a{font-size:12px;color:#ccc}.es-button-border{border-style:solid;border-color:#e4282f;background:1px;border-width:1px;display:inline-block;border-radius:2px;width:auto}@media only screen and (max-width: 600px) {p,ul li,ol li,a{font-size:16px!important;line-height:150%!important}h1{font-size:30px!important;text-align:center;line-height:120%!important}h2{font-size:26px!important;text-align:center;line-height:120%!important}h3{font-size:20px!important;text-align:center;line-height:120%!important}h1 a{font-size:30px!important}h2 a{font-size:26px!important}h3 a{font-size:20px!important}.es-menu td a{font-size:16px!important}.es-header-body p,.es-header-body ul li,.es-header-body ol li,.es-header-body a{font-size:16px!important}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li,.es-footer-body a{font-size:16px!important}.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li,.es-infoblock a{font-size:12px!important}[class=\"gmail-fix\"]{display:none!important}.es-m-txt-c,.es-m-txt-c h1,.es-m-txt-c h2,.es-m-txt-c h3{text-align:center!important}.es-m-txt-r,.es-m-txt-r h1,.es-m-txt-r h2,.es-m-txt-r h3{text-align:right!important}.es-m-txt-l,.es-m-txt-l h1,.es-m-txt-l h2,.es-m-txt-l h3{text-align:left!important}.es-m-txt-r img,.es-m-txt-c img,.es-m-txt-l img{display:inline!important}.es-button-border{display:block!important}.es-btn-fw{border-width:10px 0!important;text-align:center!important}.es-adaptive table,.es-btn-fw,.es-btn-fw-brdr,.es-left,.es-right{width:100%!important}.es-content table,.es-header table,.es-footer table,.es-content,.es-footer,.es-header{width:100%!important;max-width:600px!important}.es-adapt-td{display:block!important;width:100%!important}.adapt-img{width:100%!important;height:auto!important}.es-m-p0{padding:0!important}.es-m-p0r{padding-right:0!important}.es-m-p0l{padding-left:0!important}.es-m-p0t{padding-top:0!important}.es-m-p0b{padding-bottom:0!important}.es-m-p20b{padding-bottom:20px!important}.es-mobile-hidden,.es-hidden{display:none!important}tr.es-desk-hidden,td.es-desk-hidden,table.es-desk-hidden{width:auto!important;overflow:visible!important;float:none!important;max-height:inherit!important;line-height:inherit!important}tr.es-desk-hidden{display:table-row!important}table.es-desk-hidden{display:table!important}td.es-desk-menu-hidden{display:table-cell!important}.es-menu td{width:1%!important}table.es-table-not-adapt,.esd-block-html table{width:auto!important}table.es-social{display:inline-block!important}table.es-social td{display:inline-block!important}a.es-button,button.es-button{font-size:20px!important;display:block!important;border-width:15px 25px!important}}.es-p-default{padding:20px 30px 0}.es-p-all-default{padding:0}a.es-button,button.es-button{border-style:solid;border-color:#e4282f;border-width:15px 25px;display:inline-block;background:#e4282f;border-radius:2px;font-size:20px;font-family:helvetica,\'helvetica neue\',arial,verdana,sans-serif;font-weight:400;font-style:normal;line-height:120%;color:#fff;text-decoration:none;width:auto;text-align:center}</style></head><body> <div class=\"es-wrapper-color\"><table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr class=\"gmail-fix\" height=\"0\"><td><table width=\"600\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\"><tbody><tr><td cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"line-height: 1px; min-width: 600px;\" height=\"0\"><img src=\"https://esputnik.com/repository/applications/images/blank.gif\" style=\"display: block; max-height: 0px; min-height: 0px; min-width: 600px; width: 600px;\" alt=\"\" width=\"600\" height=\"1\"></td> </tr></tbody></table></td></tr><tr><td class=\"esd-email-paddings\" valign=\"top\"><table class=\"es-header\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody><tr><td class=\"esd-stripe\" esd-custom-block-id=\"6339\" align=\"center\"><table class=\"es-header-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody><tr><td class=\"esd-structure es-p20t es-p10b es-p10r es-p10l\" align=\"left\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody><tr><td class=\"esd-container-frame\" width=\"580\" valign=\"top\" align=\"center\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td class=\"esd-block-image es-p25t es-p25b es-p10r es-p10l\" align=\"center\" style=\"font-size:0\"><a href=\"https://fori.kindlebit.com\" target=\"_blank\"><img src=\"https://fori.kindlebit.com/assets/images/logo.png\" alt=\"\" style=\"display: block;\" width=\"\"></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody> </table><table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody><tr><td class=\"esd-stripe\" style=\"background-color: #dadada;\" esd-custom-block-id=\"6340\" bgcolor=\"#e4282f\" align=\"center\"><table class=\"es-content-body\" style=\"background-color: transparent;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"><tbody> <tr><td class=\"esd-structure\" align=\"left\"><table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td class=\"esd-container-frame\" width=\"600\" valign=\"top\" align=\"center\"><table style=\"background-color: #ffffff; border-radius: 4px; border-collapse: separate;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\"><tbody><tr><td class=\"esd-block-text es-p35t es-p5b es-p30r es-p30l\" align=\"center\"> <h1>Hello [username]!</h1></td></tr><tr><td class=\"esd-block-spacer es-p5t es-p5b es-p20r es-p20l\" bgcolor=\"#ffffff\" align=\"center\" style=\"font-size:0\"> <table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody><tr><td style=\"border-bottom: 1px solid #ffffff; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;\"></td></tr></tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" align=\"center\"> <table class=\"es-content-body\" style=\"background-color: transparent;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"600\" valign=\"top\" align=\"center\"> <table style=\"border-radius: 4px; border-collapse: separate; background-color: #ffffff;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\"> <tbody> <tr> <td class=\"esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l\" bgcolor=\"#ffffff\" align=\"left\"> <p>Somebody (hopefully you) requested a new password for the Fori account . No changes have been made to your account yet.</p> </td> </tr> <tr> <td class=\"esd-block-button es-p35t es-p35b es-p10r es-p10l\" align=\"center\"><span class=\"es-button-border\"><a href=\"https://fori.kindlebit.com/reset-password/[forgotten_password_code]\" class=\"es-button\" target=\"_blank\" style=\"border-width: 15px 30px;\"> Change Password</a></span></td> </tr> <tr> <td class=\"esd-block-text es-p20t es-p30r es-p30l es-m-txt-l\" align=\"left\"> <p>If that doesn\'t work, copy and paste the following link in your browser:</p> </td> </tr> <tr> <td class=\"esd-block-text es-p20t es-p30r es-p30l es-m-txt-l\" align=\"left\"><a target=\"_blank\" href=\"https://fori.kindlebit.com/reset-password/[forgotten_password_code]\">https://fori.kindlebit.com/reset-password/[forgotten_password_code]</a></td> </tr> <tr> <td class=\"esd-block-text es-p20t es-p30r es-p30l es-m-txt-l\" align=\"left\"> <p>If you have any questions, just reply to this email—we\'re always happy to help out.</p> </td> </tr> <tr> <td class=\"esd-block-text es-p20t es-p40b es-p30r es-p30l es-m-txt-l\" align=\"left\"> <p>Cheers,</p> <p>The FORI Team</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" align=\"center\"> <table class=\"es-content-body\" style=\"background-color: transparent;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"600\" valign=\"top\" align=\"center\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-block-spacer es-p10t es-p20b es-p20r es-p20l\" align=\"center\" style=\"font-size:0\"> <table width=\"100%\" height=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"> <tbody> <tr> <td style=\"border-bottom: 1px solid #f4f4f4; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%; height: 1px; width: 100%; margin: 0px;\"></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" esd-custom-block-id=\"6341\" align=\"center\"> <table class=\"es-content-body\" style=\"background-color: transparent;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"600\" valign=\"top\" align=\"center\"> <table style=\"background-color: #dadada; border-radius: 4px; border-collapse: separate;\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#dadada\"> <tbody> <tr> <td class=\"esd-block-text es-p30t es-p30r es-p30l\" align=\"center\"> <h3 style=\"color: #111111;\">Need more help?</h3> </td> </tr> <tr> <td class=\"esd-block-text es-p30b es-p30r es-p30l\" esdev-links-color=\"#e4282f\" align=\"center\"><a target=\"_blank\" href=\"https://fori.kindlebit.com\" style=\"color: #e4282f;\">We’re here, ready to talk</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-footer\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" esd-custom-block-id=\"6342\" align=\"center\"> <table class=\"es-footer-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure es-p30t es-p30b es-p30r es-p30l\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"540\" valign=\"top\" align=\"center\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-block-text\" align=\"left\"> <p><strong><a target=\"_blank\" href=\"https://fori.kindlebit.com\">Dashboard</a> - <a target=\"_blank\" href=\"https://fori.kindlebit.com\">Help</a></strong></p> </td> </tr> <tr> <td align=\"left\" class=\"esd-block-text es-p25t\"> <p>You received this email because you request for reset password. If it looks weird, <strong><a class=\"view\" target=\"_blank\" href=\"https://fori.kindlebit.com\">view it in your browser</a></strong>.</p> </td> </tr> <tr> <td align=\"left\" class=\"esd-block-text es-p25t\"> <p>If these emails get annoying, please feel free to&nbsp;<strong><a target=\"_blank\" class=\"unsubscribe\" href=\"https://fori.kindlebit.com\">unsubscribe</a></strong>.</p> </td> </tr> <tr> <td class=\"esd-block-text es-p25t\" align=\"left\"> <p>FORI - 1234 Main Street - Anywhere, MA - 56789</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody></table></td></tr></tbody></table></div></body></html>', '1', '2021-03-04 12:08:49', '2019-05-09 10:38:23'),
(3, 'Follower notification for new broadcast', '[seller_name]:New broadcast ', '<table style=\"width:600px; margin:auto; font-family: \" open=\"\" sans\",=\"\" sans-serif;=\"\" padding:0;=\"\" border:0px;=\"\" table-layout:=\"\" fixed;\"=\"\" width=\"600px\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\"><tbody><tr><td class=\"center\" valign=\"top\" align=\"center\"><center><table style=\"width:100%; table-layout:fixed;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"height:35px; line-height:35px;\"> &nbsp;</td></tr></tbody></table><table style=\"width:100%; table-layout:fixed; background:#f3f3f3; border: solid 1px #cccccc;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#f3f3f3\"><tbody><tr><td><table style=\"width:100%;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"border: none; margin:0px; padding:0px; background: #fff;\"><table style=\"width:100%; background: #fff; text-align: center; margin:auto;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr style=\"height:100px; line-height:100px; padding: 0; margin: 0; width:100%;\"><td colspan=\"3\" style=\"width:100%;\">&nbsp;</td></tr><tr style=\"height:30px; line-height:30px; padding: 0; margin: 0; width:100%;\"><td colspan=\"3\" style=\"width:100%;\"><a href=\"\"><img src=\"https://fori.kindlebit.com/assets/images/logo.png\"></a></td></tr><tr style=\"height:30px; line-height:30px; padding: 0; margin: 0; width:100%;\"><td colspan=\"3\" style=\"width:100%;\">&nbsp;</td></tr><tr style=\"width:100%;\"><td colspan=\"3\" style=\"width:100%;\" class=\"\"><p style=\"margin: 0; padding: 0; color: #c02026; font-size: 16px; letter-spacing: 1px;\">[channel_name]</p></td></tr><tr style=\"height:80px; line-height:80px; padding: 0; margin: 0; width:100%;\"><td colspan=\"3\">&nbsp;</td></tr></tbody></table></td></tr><tr><td style=\"border: none; margin:0px; padding:0px;\"><table style=\"width:100%; background: #fff; text-align: center;\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"width:30px;\" width=\"30\"></td><td style=\"width:540px;\" width=\"540\"><table><tbody><tr style=\"height:40px; line-height:40px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr><tr style=\"padding: 0; margin: 0; text-align:left; font-size: 14px; line-height: 22px; color: #989898;\"><td class=\"\"><p style=\"margin: 0; padding: 0;\">Hello [username],</p><p style=\"margin: 0; padding: 0;\">Thank you for choosing <a href=\"\" style=\"color:#989898; text-decoration:none;\"><span></span></a><a class=\"e-rte-anchor\" _ngcontent-c5=\"\" href=\"https://fori.kindlebit.com/\" title=\"FORI\">https://fori.kindlebit.com</a></p><p style=\"margin: 0; padding: 0;\">Please click the link below to reset password</p></td></tr><tr style=\"height:10px; line-height:10px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr><tr style=\"padding: 0; margin: 0; text-align:left; font-size: 14px; line-height: 22px; color: #989898;\"><td class=\"\"><p style=\"margin: 0; padding: 0;\"><a href=\"https://fori.kindlebit.com/stream/[channel_id]\" style=\"display: table; height: 40px; line-height: 40px; background: #c02026; color: #fff; text-decoration: none; font-size: 13px; letter-spacing: 1px; text-align:center; min-height: 40px; min-width: 160px; padding: 10px;\" title=\"\">Watch Now</a></p></td></tr><tr style=\"height:30px; line-height:30px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr><tr style=\"padding: 0; margin: 0; text-align:left; font-size: 14px; line-height: 22px; color: #989898;\"><td class=\"\"><p>If the above link can not click. Please copy the link to the browser\'s address bar to open it.If you have not made this operation, may be someone else mistakenly, please ignore this message.</p><p><a href=\"https://fori.kindlebit.com\" style=\"color: #3f73c1; text-decoration: underline; font-size: 15px; letter-spacing: 0.5px; font-weight: bold;\" title=\"\">https://fori.kindlebit.com/</a></p></td></tr><tr style=\"height:20px; line-height:20px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr><tr style=\"padding: 0; margin: 0; text-align:left; font-size: 11px; line-height: 16px; color: #989898;\"><td><p style=\"margin: 0; padding: 0;\">FORI Team</p><p style=\"margin: 0; padding: 0;\">Automated message.please do not reply</p></td></tr><tr style=\"height:35px; line-height:35px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr></tbody></table></td><td style=\"width:30px;\" width=\"30\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table>', '1', '2021-02-01 07:11:56', '2019-05-09 10:38:23'),
(4, 'common', '[subject]', '<table style=\"width:600px; margin:auto; font-family: \" open=\"\" sans\",=\"\" sans-serif;=\"\" padding:0;=\"\" border:0px;=\"\" table-layout:=\"\" fixed;\"=\"\" width=\"600px\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\"><tbody><tr><td class=\"center\" valign=\"top\" align=\"center\"><center><table style=\"width:100%; table-layout:fixed;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"height:35px; line-height:35px;\"> &nbsp;</td></tr></tbody></table><table style=\"width:100%; table-layout:fixed; background:#f3f3f3; border: solid 1px #cccccc;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#f3f3f3\"><tbody><tr><td><table style=\"width:100%;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"border: none; margin:0px; padding:0px; background: #fff;\"><table style=\"width:100%; background: #fff; text-align: center; margin:auto;\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr style=\"height:100px; line-height:100px; padding: 0; margin: 0; width:100%;\"><td colspan=\"3\" style=\"width:100%;\">&nbsp;</td></tr><tr style=\"height:30px; line-height:30px; padding: 0; margin: 0; width:100%;\"><td colspan=\"3\" style=\"width:100%;\"><a href=\"\"><img src=\"https://fori.kindlebit.com/assets/images/logo.png\"></a></td></tr><tr style=\"height:30px; line-height:30px; padding: 0; margin: 0; width:100%;\"><td colspan=\"3\" style=\"width:100%;\">&nbsp;</td></tr><tr style=\"width:100%;\"><td colspan=\"3\" style=\"width:100%;\" class=\"\"><p style=\"margin: 0; padding: 0; color: #c02026; font-size: 16px; letter-spacing: 1px;\">[subject]</p></td></tr><tr style=\"height:80px; line-height:80px; padding: 0; margin: 0; width:100%;\"><td colspan=\"3\">&nbsp;</td></tr></tbody></table></td></tr><tr><td style=\"border: none; margin:0px; padding:0px;\"><table style=\"width:100%; background: #fff; text-align: center;\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"width:30px;\" width=\"30\"></td><td style=\"width:540px;\" width=\"540\"><table><tbody><tr style=\"height:40px; line-height:40px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr><tr style=\"padding: 0; margin: 0; text-align:left; font-size: 14px; line-height: 22px; color: #989898;\"><td class=\"\"><p style=\"margin: 0; padding: 0;\">Hello [username],</p><p style=\"margin: 0; padding: 0;\">[message]</p></td></tr><tr style=\"height:10px; line-height:10px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr><tr style=\"padding: 0; margin: 0; text-align:left; font-size: 14px; line-height: 22px; color: #989898;\"><td class=\"\"></td></tr><tr style=\"height:30px; line-height:30px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr><tr style=\"padding: 0; margin: 0; text-align:left; font-size: 14px; line-height: 22px; color: #989898;\"><td class=\"\"><p>If the above link can not click. Please copy the link to the browser\'s address bar to open it.If you have not made this operation, may be someone else mistakenly, please ignore this message.</p><p><a href=\"https://fori.kindlebit.com\" style=\"color: #3f73c1; text-decoration: underline; font-size: 15px; letter-spacing: 0.5px; font-weight: bold;\" title=\"\">https://fori.kindlebit.com/</a></p></td></tr><tr style=\"height:20px; line-height:20px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr><tr style=\"padding: 0; margin: 0; text-align:left; font-size: 11px; line-height: 16px; color: #989898;\"><td><p style=\"margin: 0; padding: 0;\">FORI Team</p><p style=\"margin: 0; padding: 0;\">Automated message.please do not reply</p></td></tr><tr style=\"height:35px; line-height:35px; padding: 0; margin: 0;\"><td>&nbsp;</td></tr></tbody></table></td><td style=\"width:30px;\" width=\"30\"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></center></td></tr></tbody></table>', '1', '2021-02-01 07:11:56', '2019-05-09 10:38:23');
INSERT INTO `ll_mail_template` (`id`, `template_name`, `template_subject`, `template_body`, `template_status`, `update_date`, `crdate`) VALUES
(5, 'New Follower', 'New Follower ', '<html><head> <meta charset=\"UTF-8\"> <meta content=\"width=device-width, initial-scale=1\" name=\"viewport\"> <meta name=\"x-apple-disable-message-reformatting\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <title></title><style>#outlook a{padding:0}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}.es-button{mso-style-priority:100!important;text-decoration:none!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.es-desk-hidden{display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all}s{text-decoration:line-through}html,body{width:100%;font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table{mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0}table td,html,body,.es-wrapper{padding:0;margin:0}.es-content,.es-header,.es-footer{table-layout:fixed!important;width:100%}img{display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}table tr{border-collapse:collapse}p,hr{margin:0}h1,h2,h3,h4,h5{margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif}p,ul li,ol li,a{-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly}.es-left{float:left}.es-right{float:right}.es-p5{padding:5px}.es-p5t{padding-top:5px}.es-p5b{padding-bottom:5px}.es-p5l{padding-left:5px}.es-p5r{padding-right:5px}.es-p10{padding:10px}.es-p10t{padding-top:10px}.es-p10b{padding-bottom:10px}.es-p10l{padding-left:10px}.es-p10r{padding-right:10px}.es-p15{padding:15px}.es-p15t{padding-top:15px}.es-p15b{padding-bottom:15px}.es-p15l{padding-left:15px}.es-p15r{padding-right:15px}.es-p20{padding:20px}.es-p20t{padding-top:20px}.es-p20b{padding-bottom:20px}.es-p20l{padding-left:20px}.es-p20r{padding-right:20px}.es-p25{padding:25px}.es-p25t{padding-top:25px}.es-p25b{padding-bottom:25px}.es-p25l{padding-left:25px}.es-p25r{padding-right:25px}.es-p30{padding:30px}.es-p30t{padding-top:30px}.es-p30b{padding-bottom:30px}.es-p30l{padding-left:30px}.es-p30r{padding-right:30px}.es-p35{padding:35px}.es-p35t{padding-top:35px}.es-p35b{padding-bottom:35px}.es-p35l{padding-left:35px}.es-p35r{padding-right:35px}.es-p40{padding:40px}.es-p40t{padding-top:40px}.es-p40b{padding-bottom:40px}.es-p40l{padding-left:40px}.es-p40r{padding-right:40px}.es-menu td{border:0}.es-menu td a img{display:inline-block!important}a{font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif;font-size:16px;text-decoration:none}h1{font-size:36px;font-style:normal;font-weight:700;color:#333}h1 a{font-size:36px}h2{font-size:30px;font-style:normal;font-weight:700;color:#333}h2 a{font-size:30px}h3{font-size:18px;font-style:normal;font-weight:400;color:#333}h3 a{font-size:18px}p,ul li,ol li{font-size:16px;font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif;line-height:150%}ul li,ol li{margin-bottom:15px}.es-menu td a{text-decoration:none;display:block}.es-wrapper{width:100%;height:100%;background-repeat:repeat;background-position:center top}.es-wrapper-color{background-color:#eee}.es-content-body{background-color:#fff}.es-content-body p,.es-content-body ul li,.es-content-body ol li{color:#333}.es-content-body a{color:#ed8e20}.es-header{background-color:transparent;background-repeat:repeat;background-position:center top}.es-header-body{background-color:#044767}.es-header-body p,.es-header-body ul li,.es-header-body ol li{color:#fff;font-size:14px}.es-header-body a{color:#fff;font-size:14px}.es-footer{background-color:transparent;background-repeat:repeat;background-position:center top}.es-footer-body{background-color:#fff}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li{color:#333;font-size:14px}.es-footer-body a{color:#333;font-size:14px}.es-infoblock,.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li{line-height:120%;font-size:12px;color:#ccc}.es-infoblock a{font-size:12px;color:#ccc}.es-button-border{border-style:solid;border-color:transparent;background:#66b3b7;border-width:0;display:inline-block;border-radius:5px;width:auto}@media only screen and (max-width: 600px) {p,ul li,ol li,a{font-size:16px!important;line-height:150%!important}h1{font-size:32px!important;text-align:center;line-height:120%!important}h2{font-size:26px!important;text-align:center;line-height:120%!important}h3{font-size:20px!important;text-align:center;line-height:120%!important}h1 a{font-size:32px!important}h2 a{font-size:26px!important}h3 a{font-size:20px!important}.es-menu td a{font-size:16px!important}.es-header-body p,.es-header-body ul li,.es-header-body ol li,.es-header-body a{font-size:16px!important}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li,.es-footer-body a{font-size:16px!important}.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li,.es-infoblock a{font-size:12px!important}[class=\"gmail-fix\"]{display:none!important}.es-m-txt-c,.es-m-txt-c h1,.es-m-txt-c h2,.es-m-txt-c h3{text-align:center!important}.es-m-txt-r,.es-m-txt-r h1,.es-m-txt-r h2,.es-m-txt-r h3{text-align:right!important}.es-m-txt-l,.es-m-txt-l h1,.es-m-txt-l h2,.es-m-txt-l h3{text-align:left!important}.es-m-txt-r img,.es-m-txt-c img,.es-m-txt-l img{display:inline!important}.es-button-border{display:inline-block!important}.es-btn-fw{border-width:10px 0!important;text-align:center!important}.es-adaptive table,.es-btn-fw,.es-btn-fw-brdr,.es-left,.es-right{width:100%!important}.es-content table,.es-header table,.es-footer table,.es-content,.es-footer,.es-header{width:100%!important;max-width:600px!important}.es-adapt-td{display:block!important;width:100%!important}.adapt-img{width:100%!important;height:auto!important}.es-m-p0{padding:0!important}.es-m-p0r{padding-right:0!important}.es-m-p0l{padding-left:0!important}.es-m-p0t{padding-top:0!important}.es-m-p0b{padding-bottom:0!important}.es-m-p20b{padding-bottom:20px!important}.es-mobile-hidden,.es-hidden{display:none!important}tr.es-desk-hidden,td.es-desk-hidden,table.es-desk-hidden{width:auto!important;overflow:visible!important;float:none!important;max-height:inherit!important;line-height:inherit!important}tr.es-desk-hidden{display:table-row!important}table.es-desk-hidden{display:table!important}td.es-desk-menu-hidden{display:table-cell!important}.es-menu td{width:1%!important}table.es-table-not-adapt,.esd-block-html table{width:auto!important}table.es-social{display:inline-block!important}table.es-social td{display:inline-block!important}a.es-button,button.es-button{font-size:16px!important;display:inline-block!important;border-width:15px 30px!important}}.es-p-default{padding:20px 35px 0}.es-p-all-default{padding:0}a.es-button,button.es-button{border-style:solid;border-color:#c02026;border-width:15px 30px;display:inline-block;background:#c02026;border-radius:5px;font-size:18px;font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif;font-weight:400;font-style:normal;line-height:120%;color:#fff;text-decoration:none;width:auto;text-align:center}</style></head><body> <div class=\"es-wrapper-color\"> <table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-email-paddings\" valign=\"top\"> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" align=\"center\"> <table class=\"es-content-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure es-p40t es-p35r es-p35l\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"530\" valign=\"top\" align=\"center\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-block-image es-p25b es-p35r es-p35l\" align=\"center\" style=\"font-size: 0;\"> <a target=\"_blank\" href=\"https://fori.kindlebit.com\"> <img src=\"https://fori.kindlebit.com/assets/images/logo.png\" alt=\"\" style=\"display: block;\" width=\"\"> </a> </td> </tr> <tr> <td class=\"esd-block-text es-p10b\" align=\"center\"> <img src=\"./congrats.png\" alt=\"\" width=\"500px\"> <h2 style=\"color: #e4282f; padding: 30px 0 0;\">[usesrname], You\'ve got a New Follower.</h2> </td> </tr> <tr> <td class=\"esd-block-text es-p15t es-p20b\" align=\"left\"> <p style=\"font-size: 16px; color: #777777;\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium iste ipsa numquam odio dolores, nam.</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-footer\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" esd-custom-block-id=\"7684\" align=\"center\"> <table class=\"es-footer-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure es-p35t es-p40b es-p35r es-p35l\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"530\" valign=\"top\" align=\"center\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td esdev-links-color=\"#777777\" align=\"left\" class=\"esd-block-text es-m-txt-c es-p5b\"> <p style=\"color: #777777;\"> If you didn\'t create an account using this email address, please ignore this email or&nbsp; <u><a href=\"https://fori.kindlebit.com\" target=\"_blank\" style=\"color: #777777;\" class=\"unsubscribe\">unsubscribe</a></u>. </p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> </body></html>', '1', '2021-02-01 07:11:56', '2019-05-09 10:38:23'),
(6, 'New Order', 'New order : [order_id]', '<html><head> <meta charset=\"UTF-8\"> <meta content=\"width=device-width, initial-scale=1\" name=\"viewport\"> <meta name=\"x-apple-disable-message-reformatting\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <title></title><style>#outlook a{padding:0}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}.es-button{mso-style-priority:100!important;text-decoration:none!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.es-desk-hidden{display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all}s{text-decoration:line-through}html,body{width:100%;font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table{mso-table-lspace:0;mso-table-rspace:0;border-collapse:collapse;border-spacing:0}table td,html,body,.es-wrapper{padding:0;margin:0}.es-content,.es-header,.es-footer{table-layout:fixed!important;width:100%}img{display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}table tr{border-collapse:collapse}p,hr{margin:0}h1,h2,h3,h4,h5{margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif}p,ul li,ol li,a{-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly}.es-left{float:left}.es-right{float:right}.es-p5{padding:5px}.es-p5t{padding-top:5px}.es-p5b{padding-bottom:5px}.es-p5l{padding-left:5px}.es-p5r{padding-right:5px}.es-p10{padding:10px}.es-p10t{padding-top:10px}.es-p10b{padding-bottom:10px}.es-p10l{padding-left:10px}.es-p10r{padding-right:10px}.es-p15{padding:15px}.es-p15t{padding-top:15px}.es-p15b{padding-bottom:15px}.es-p15l{padding-left:15px}.es-p15r{padding-right:15px}.es-p20{padding:20px}.es-p20t{padding-top:20px}.es-p20b{padding-bottom:20px}.es-p20l{padding-left:20px}.es-p20r{padding-right:20px}.es-p25{padding:25px}.es-p25t{padding-top:25px}.es-p25b{padding-bottom:25px}.es-p25l{padding-left:25px}.es-p25r{padding-right:25px}.es-p30{padding:30px}.es-p30t{padding-top:30px}.es-p30b{padding-bottom:30px}.es-p30l{padding-left:30px}.es-p30r{padding-right:30px}.es-p35{padding:35px}.es-p35t{padding-top:35px}.es-p35b{padding-bottom:35px}.es-p35l{padding-left:35px}.es-p35r{padding-right:35px}.es-p40{padding:40px}.es-p40t{padding-top:40px}.es-p40b{padding-bottom:40px}.es-p40l{padding-left:40px}.es-p40r{padding-right:40px}.es-menu td{border:0}.es-menu td a img{display:inline-block!important}a{font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif;font-size:16px;text-decoration:none}h1{font-size:36px;font-style:normal;font-weight:700;color:#333}h1 a{font-size:36px}h2{font-size:30px;font-style:normal;font-weight:700;color:#333}h2 a{font-size:30px}h3{font-size:18px;font-style:normal;font-weight:400;color:#333}h3 a{font-size:18px}p,ul li,ol li{font-size:16px;font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif;line-height:150%}ul li,ol li{margin-bottom:15px}.es-menu td a{text-decoration:none;display:block}.es-wrapper{width:100%;height:100%;background-repeat:repeat;background-position:center top}.es-wrapper-color{background-color:#eee}.es-content-body{background-color:#fff}.es-content-body p,.es-content-body ul li,.es-content-body ol li{color:#333}.es-content-body a{color:#ed8e20}.es-header{background-color:transparent;background-repeat:repeat;background-position:center top}.es-header-body{background-color:#044767}.es-header-body p,.es-header-body ul li,.es-header-body ol li{color:#fff;font-size:14px}.es-header-body a{color:#fff;font-size:14px}.es-footer{background-color:transparent;background-repeat:repeat;background-position:center top}.es-footer-body{background-color:#fff}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li{color:#333;font-size:14px}.es-footer-body a{color:#333;font-size:14px}.es-infoblock,.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li{line-height:120%;font-size:12px;color:#ccc}.es-infoblock a{font-size:12px;color:#ccc}.es-button-border{border-style:solid;border-color:transparent;background:#66b3b7;border-width:0;display:inline-block;border-radius:5px;width:auto}@media only screen and (max-width: 600px) {p,ul li,ol li,a{font-size:16px!important;line-height:150%!important}h1{font-size:32px!important;text-align:center;line-height:120%!important}h2{font-size:26px!important;text-align:center;line-height:120%!important}h3{font-size:20px!important;text-align:center;line-height:120%!important}h1 a{font-size:32px!important}h2 a{font-size:26px!important}h3 a{font-size:20px!important}.es-menu td a{font-size:16px!important}.es-header-body p,.es-header-body ul li,.es-header-body ol li,.es-header-body a{font-size:16px!important}.es-footer-body p,.es-footer-body ul li,.es-footer-body ol li,.es-footer-body a{font-size:16px!important}.es-infoblock p,.es-infoblock ul li,.es-infoblock ol li,.es-infoblock a{font-size:12px!important}[class=\"gmail-fix\"]{display:none!important}.es-m-txt-c,.es-m-txt-c h1,.es-m-txt-c h2,.es-m-txt-c h3{text-align:center!important}.es-m-txt-r,.es-m-txt-r h1,.es-m-txt-r h2,.es-m-txt-r h3{text-align:right!important}.es-m-txt-l,.es-m-txt-l h1,.es-m-txt-l h2,.es-m-txt-l h3{text-align:left!important}.es-m-txt-r img,.es-m-txt-c img,.es-m-txt-l img{display:inline!important}.es-button-border{display:inline-block!important}.es-btn-fw{border-width:10px 0!important;text-align:center!important}.es-adaptive table,.es-btn-fw,.es-btn-fw-brdr,.es-left,.es-right{width:100%!important}.es-content table,.es-header table,.es-footer table,.es-content,.es-footer,.es-header{width:100%!important;max-width:600px!important}.es-adapt-td{display:block!important;width:100%!important}.adapt-img{width:100%!important;height:auto!important}.es-m-p0{padding:0!important}.es-m-p0r{padding-right:0!important}.es-m-p0l{padding-left:0!important}.es-m-p0t{padding-top:0!important}.es-m-p0b{padding-bottom:0!important}.es-m-p20b{padding-bottom:20px!important}.es-mobile-hidden,.es-hidden{display:none!important}tr.es-desk-hidden,td.es-desk-hidden,table.es-desk-hidden{width:auto!important;overflow:visible!important;float:none!important;max-height:inherit!important;line-height:inherit!important}tr.es-desk-hidden{display:table-row!important}table.es-desk-hidden{display:table!important}td.es-desk-menu-hidden{display:table-cell!important}.es-menu td{width:1%!important}table.es-table-not-adapt,.esd-block-html table{width:auto!important}table.es-social{display:inline-block!important}table.es-social td{display:inline-block!important}a.es-button,button.es-button{font-size:16px!important;display:inline-block!important;border-width:15px 30px!important}}.es-p-default{padding:20px 35px 0}.es-p-all-default{padding:0}a.es-button,button.es-button{border-style:solid;border-color:#c02026;border-width:15px 30px;display:inline-block;background:#c02026;border-radius:5px;font-size:18px;font-family:\'open sans\',\'helvetica neue\',helvetica,arial,sans-serif;font-weight:400;font-style:normal;line-height:120%;color:#fff;text-decoration:none;width:auto;text-align:center}</style></head><body> <div class=\"es-wrapper-color\"> <table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-email-paddings\" valign=\"top\"> <table class=\"es-content\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" align=\"center\"> <table class=\"es-content-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure es-p40t es-p35r es-p35l\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"530\" valign=\"top\" align=\"center\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-block-image es-p25t es-p25b es-p35r es-p35l\" align=\"center\" style=\"font-size: 0;\"> <a target=\"_blank\" href=\"https://fori.kindlebit.com\"> <img src=\"https://fori.kindlebit.com/assets/images/logo.png\" alt=\"\" style=\"display: block;\" width=\"\"> </a> </td> </tr> <tr> <td class=\"esd-block-text es-p10b\" align=\"center\"> <svg style=\"height: 55px;margin: 20px 0 0;\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fal\" data-icon=\"check-circle\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"svg-inline--fa fa-check-circle fa-w-16 fa-9x\"><path fill=\"#2fc340\" d=\"M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z\" class=\"\"></path></svg> <h2 style=\"color: #2fc340;\">Thank You For Your Order!</h2> </td> </tr> <tr> <td class=\"esd-block-text es-p15t es-p20b\" align=\"left\"> <p style=\"font-size: 16px; color: #777777;\">Your Order details below:</p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>[products] <table cellpadding=\"0\" cellspacing=\"0\" class=\"es-footer\" align=\"center\"> <tbody> <tr> <td class=\"esd-stripe\" esd-custom-block-id=\"7684\" align=\"center\"> <table class=\"es-footer-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\"> <tbody> <tr> <td class=\"esd-structure es-p35t es-p40b es-p35r es-p35l\" align=\"left\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-container-frame\" width=\"530\" valign=\"top\" align=\"center\"> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"> <tbody> <tr> <td class=\"esd-block-image es-p15b\" align=\"center\" style=\"font-size: 0;\"> <a target=\"_blank\"> <img src=\"https://fori.kindlebit.com/assets/images/logo.png\" alt=\"\" style=\"display: block;\" title=\"\" width=\"150\"> </a> </td> </tr> <tr> <td class=\"esd-block-text es-p35b\" align=\"center\"> <p><strong>675 Massachusetts Avenue </strong></p> <p><strong>Cambridge, MA 02139</strong></p> </td> </tr> <tr> <td esdev-links-color=\"#777777\" align=\"left\" class=\"esd-block-text es-m-txt-c es-p5b\"> <p style=\"color: #777777;\"> If you didn\'t create an account using this email address, please ignore this email or&nbsp; <u><a href=\"https://fori.kindlebit.com\" target=\"_blank\" style=\"color: #777777;\" class=\"unsubscribe\">unsubscribe</a></u>. </p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> </body></html>', '1', '2021-02-02 07:24:01', '2019-05-09 10:38:23');

-- --------------------------------------------------------

--
-- Table structure for table `ll_orders`
--

CREATE TABLE `ll_orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(256) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `broadcast_id` varchar(256) DEFAULT NULL,
  `total_items` int(11) NOT NULL,
  `sub_total_amount` decimal(16,2) NOT NULL DEFAULT '0.00',
  `total_amount` decimal(16,2) NOT NULL DEFAULT '0.00',
  `currency` varchar(20) DEFAULT NULL,
  `status` enum('new','unpaid','paid','checkout','canceled','failed','expired') NOT NULL DEFAULT 'new',
  `payment_type` varchar(100) DEFAULT NULL,
  `payment_txn` varchar(256) DEFAULT NULL,
  `billing_address` int(11) DEFAULT NULL,
  `shipping_address` int(11) DEFAULT NULL,
  `shipping_fee` text,
  `coupon_code` varchar(50) DEFAULT NULL,
  `coupon_discount` text,
  `note` text,
  `store_pickup` tinyint(1) DEFAULT NULL,
  `pickup_address` text,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_orders`
--

INSERT INTO `ll_orders` (`id`, `order_id`, `user_id`, `broadcast_id`, `total_items`, `sub_total_amount`, `total_amount`, `currency`, `status`, `payment_type`, `payment_txn`, `billing_address`, `shipping_address`, `shipping_fee`, `coupon_code`, `coupon_discount`, `note`, `store_pickup`, `pickup_address`, `update_date`, `create_date`) VALUES
(40, 'e6ecae3a-ae8d-431d-9c61-af854e8bf0cb', '8c994b5c-f38f-4019-a422-2b7b067905d9', '80', 2, '680.00', '680.00', 'AUD', 'paid', NULL, NULL, 15, 15, NULL, '', NULL, '', NULL, NULL, '2021-02-12 12:29:08', '2021-02-12 12:29:07'),
(41, '7a4a54f9-88dd-40e7-b1e8-97e960737aaa', '67417bbd-cc3b-44cf-9cf2-3cfc1700d963', '81', 1, '400.00', '400.00', 'AUD', 'paid', NULL, NULL, 17, 17, NULL, '', NULL, '', NULL, NULL, '2021-02-12 12:37:03', '2021-02-12 12:37:02'),
(42, 'e210c1f4-dcb5-4f11-82da-34b5976c10bb', 'df4a4808-6869-490c-b46d-1ae07faae372', '82', 1, '600.00', '600.00', 'AUD', 'paid', NULL, NULL, 10, 10, NULL, '', NULL, '', NULL, NULL, '2021-02-17 09:36:51', '2021-02-17 09:36:50'),
(43, 'd882c7d7-521c-4ae1-9637-17b4f1bb7bfe', 'df4a4808-6869-490c-b46d-1ae07faae372', '82', 1, '200.00', '200.00', 'AUD', 'new', NULL, NULL, 10, 10, NULL, '', NULL, '', NULL, NULL, '2021-02-17 09:45:52', '2021-02-17 09:45:52'),
(44, '4ad95802-47fe-400c-aa41-2ebeec3770ce', 'df4a4808-6869-490c-b46d-1ae07faae372', '82', 1, '200.00', '200.00', 'AUD', 'new', NULL, NULL, 26, 26, NULL, '', NULL, '', NULL, NULL, '2021-02-19 07:22:25', '2021-02-19 07:22:25'),
(45, '1b8ebbd9-16c2-478b-a437-8f80bb0e38ee', 'df4a4808-6869-490c-b46d-1ae07faae372', '85', 2, '280.00', '280.00', 'AUD', 'new', NULL, NULL, NULL, NULL, NULL, '', NULL, '', 1, NULL, '2021-02-19 13:04:35', '2021-02-19 13:04:35'),
(46, '265684fe-92f1-48fb-9464-e335ed45e91f', 'df4a4808-6869-490c-b46d-1ae07faae372', '85', 1, '200.00', '200.00', 'AUD', 'new', NULL, NULL, NULL, NULL, NULL, '', NULL, '', 1, NULL, '2021-02-19 13:06:23', '2021-02-19 13:06:23'),
(47, '195dd09a-a8f5-4f21-add1-14381cf39ef8', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '200.00', '200.00', 'AUD', 'new', NULL, NULL, NULL, NULL, NULL, '', NULL, '', 1, NULL, '2021-02-19 13:12:08', '2021-02-19 13:12:08'),
(48, '661f84f0-d73b-4351-9749-8dc27c696c71', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '40.00', 'AUD', 'new', NULL, NULL, NULL, NULL, NULL, '', NULL, '', 1, NULL, '2021-02-22 07:54:05', '2021-02-22 07:54:05'),
(49, '1748081f-fba0-4302-858f-ac91724518d0', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '40.00', 'AUD', 'new', NULL, NULL, NULL, NULL, '6', '', '0', '', 1, NULL, '2021-02-22 07:54:33', '2021-02-22 07:54:33'),
(50, '18d7031d-9fa7-46c1-b80a-61f34e9c78de', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '40.00', 'AUD', 'new', NULL, NULL, NULL, NULL, '6', '', '0', '', 1, NULL, '2021-02-22 07:56:39', '2021-02-22 07:56:39'),
(51, '75c95a60-e968-4a60-b15e-f71cf1f3e86e', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '40.00', 'AUD', 'new', NULL, NULL, NULL, NULL, '6', '', '0', '', NULL, NULL, '2021-02-22 07:58:38', '2021-02-22 07:58:38'),
(52, '775999cd-67d4-4e4a-b733-ee289eb3cd34', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '40.00', 'AUD', 'new', NULL, NULL, NULL, NULL, '6', '', '0', '', NULL, NULL, '2021-02-22 08:02:12', '2021-02-22 08:02:12'),
(53, '270ff915-ef89-4aa5-8ffc-acfe49b8152e', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '40.00', 'AUD', 'paid', NULL, NULL, 20, 20, '6', '', '0', '', NULL, NULL, '2021-02-22 08:08:31', '2021-02-22 08:08:30'),
(54, '74b5b781-5673-407e-849e-e1a1602c7ec0', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '37.60', 'AUD', 'paid', NULL, NULL, 28, 28, '6', '', '0', '', NULL, NULL, '2021-02-22 09:43:09', '2021-02-22 09:43:08'),
(55, 'e5694e29-d4b3-48a2-9bd0-ed6325aa5f71', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '37.60', 'AUD', 'paid', NULL, NULL, 20, 20, '6', '', '0', '', NULL, NULL, '2021-02-22 09:44:00', '2021-02-22 09:43:59'),
(56, 'f17a96f8-b815-4151-8c6a-134a02117c61', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '40.00', '37.60', 'AUD', 'paid', NULL, NULL, 20, 20, '6', '', '0', '', 1, NULL, '2021-02-22 09:44:19', '2021-02-22 09:44:18'),
(57, '4d9c7898-c18f-4e40-86cd-c36a68c3375f', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 3, '440.00', '413.60', 'AUD', 'paid', NULL, NULL, 28, 28, '6', '', '0', '', NULL, NULL, '2021-02-26 07:15:25', '2021-02-26 07:15:24'),
(58, 'e9ed1054-1103-4d7b-b5e7-834489fca754', 'baa526f0-3e05-4e93-9d6e-172692c4e1bf', '86', 1, '200.00', '200.00', 'AUD', 'new', NULL, NULL, NULL, NULL, '5', '', '0', '', NULL, NULL, '2021-03-01 10:56:12', '2021-03-01 10:56:12'),
(59, 'd1724101-9f10-48bf-9415-5c45e6c68fd0', 'baa526f0-3e05-4e93-9d6e-172692c4e1bf', '86', 1, '200.00', '188.00', 'AUD', 'new', NULL, NULL, NULL, NULL, '6', '', '0', '', NULL, NULL, '2021-03-01 14:03:38', '2021-03-01 14:03:38'),
(60, 'b5b763b1-9cff-44e4-81b2-3eaa93811cfc', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '400.00', '400.00', 'AUD', 'paid', NULL, NULL, 28, 28, '5', '', '0', '', NULL, NULL, '2021-03-02 07:25:44', '2021-03-02 07:25:43'),
(61, '1ecc0bff-eecb-4cb7-adfb-ffea05af13d0', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '200.00', '190.00', 'AUD', 'paid', NULL, NULL, 28, 28, '5', '', '0', '', NULL, NULL, '2021-03-02 07:27:40', '2021-03-02 07:27:39'),
(62, 'a1c4113f-3cf1-4217-ac18-0805ba5f8c73', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 4, '1140.00', '1185.60', 'AUD', 'paid', NULL, NULL, 13, 13, '4', '', '0', '', NULL, NULL, '2021-03-04 19:09:27', '2021-03-04 19:09:26'),
(63, '32bca03f-8f2c-4262-8909-78e4ae46f7f4', 'df4a4808-6869-490c-b46d-1ae07faae372', '86', 1, '500.00', '520.00', 'AUD', 'paid', NULL, NULL, 28, 28, '4', '', '0', '', NULL, NULL, '2021-03-04 19:13:02', '2021-03-04 19:13:01'),
(64, '538f91e5-cf2d-44b9-b278-2c67944e0cd8', 'df4a4808-6869-490c-b46d-1ae07faae372', '91', 3, '236.00', '245.44', 'AUD', 'paid', NULL, NULL, 13, 13, '4', '', '0', '', NULL, NULL, '2021-03-05 03:26:26', '2021-03-05 03:26:26'),
(65, 'cf4b1501-f0ff-4298-a838-4f7ff8630c3d', 'e5cd6071-4182-4fd0-b189-c99533f5ac22', '92', 2, '100.00', '110.00', 'USD', 'paid', NULL, NULL, 29, 29, '10', '', '0', '', NULL, NULL, '2021-03-05 06:12:09', '2021-03-05 06:12:08'),
(66, '4e8f7292-30b2-432f-a193-d407effe7a77', 'df4a4808-6869-490c-b46d-1ae07faae372', '111', 2, '255.00', '265.20', 'AUD', 'paid', NULL, NULL, 28, 28, '4', '', '0', '', NULL, NULL, '2021-03-19 11:46:39', '2021-03-19 11:46:38'),
(67, 'bc9a4a2f-f416-4847-9438-005dc32335d2', 'df4a4808-6869-490c-b46d-1ae07faae372', '111', 2, '255.00', '265.20', 'AUD', 'paid', NULL, NULL, 28, 28, '4', '', '0', '', NULL, NULL, '2021-03-19 11:51:32', '2021-03-19 11:51:31'),
(68, 'c90d91ab-714e-4fff-8345-c6e503db955e', 'df4a4808-6869-490c-b46d-1ae07faae372', '111', 2, '255.00', '265.20', 'AUD', 'paid', NULL, NULL, 28, 28, '4', '', '0', '', NULL, NULL, '2021-03-19 11:58:22', '2021-03-19 11:58:21'),
(69, 'c5bb688f-e0fc-436a-9ca6-2741426d8ebe', 'df4a4808-6869-490c-b46d-1ae07faae372', '111', 2, '255.00', '265.20', 'AUD', 'paid', NULL, NULL, 28, 28, '4', '', '0', '', NULL, NULL, '2021-03-19 13:16:09', '2021-03-19 13:16:09');

-- --------------------------------------------------------

--
-- Table structure for table `ll_order_items`
--

CREATE TABLE `ll_order_items` (
  `id` int(11) NOT NULL,
  `order_id` varchar(256) NOT NULL,
  `product_id` varchar(256) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `off_air_price` decimal(16,2) NOT NULL DEFAULT '0.00',
  `on_air_price` decimal(16,2) NOT NULL DEFAULT '0.00',
  `sku` varchar(256) DEFAULT NULL,
  `variant_id` varchar(256) DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_order_items`
--

INSERT INTO `ll_order_items` (`id`, `order_id`, `product_id`, `product_quantity`, `off_air_price`, `on_air_price`, `sku`, `variant_id`, `update_date`, `create_date`) VALUES
(45, 'e6ecae3a-ae8d-431d-9c61-af854e8bf0cb', '5866280812696', 2, '0.00', '230.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-02-12 12:29:07', '2021-02-12 12:29:07'),
(46, 'e6ecae3a-ae8d-431d-9c61-af854e8bf0cb', '5866269933720', 1, '0.00', '220.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-12 12:29:07', '2021-02-12 12:29:07'),
(47, '7a4a54f9-88dd-40e7-b1e8-97e960737aaa', '5325955203224', 2, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/37511017824408', '2021-02-12 12:37:02', '2021-02-12 12:37:02'),
(48, 'e210c1f4-dcb5-4f11-82da-34b5976c10bb', '5866280812696', 3, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-02-17 09:36:50', '2021-02-17 09:36:50'),
(49, 'd882c7d7-521c-4ae1-9637-17b4f1bb7bfe', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-02-17 09:45:52', '2021-02-17 09:45:52'),
(50, '4ad95802-47fe-400c-aa41-2ebeec3770ce', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-02-19 07:22:25', '2021-02-19 07:22:25'),
(51, '1b8ebbd9-16c2-478b-a437-8f80bb0e38ee', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36548795564184', '2021-02-19 13:04:35', '2021-02-19 13:04:35'),
(52, '1b8ebbd9-16c2-478b-a437-8f80bb0e38ee', '5866269933720', 2, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-19 13:04:35', '2021-02-19 13:04:35'),
(53, '265684fe-92f1-48fb-9464-e335ed45e91f', '5325955203224', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/37511017824408', '2021-02-19 13:06:23', '2021-02-19 13:06:23'),
(54, '195dd09a-a8f5-4f21-add1-14381cf39ef8', '5325955203224', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/37511017824408', '2021-02-19 13:12:08', '2021-02-19 13:12:08'),
(55, '661f84f0-d73b-4351-9749-8dc27c696c71', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 07:54:05', '2021-02-22 07:54:05'),
(56, '1748081f-fba0-4302-858f-ac91724518d0', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 07:54:33', '2021-02-22 07:54:33'),
(57, '18d7031d-9fa7-46c1-b80a-61f34e9c78de', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 07:56:39', '2021-02-22 07:56:39'),
(58, '75c95a60-e968-4a60-b15e-f71cf1f3e86e', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 07:58:38', '2021-02-22 07:58:38'),
(59, '775999cd-67d4-4e4a-b733-ee289eb3cd34', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 08:02:12', '2021-02-22 08:02:12'),
(60, '270ff915-ef89-4aa5-8ffc-acfe49b8152e', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 08:08:30', '2021-02-22 08:08:30'),
(61, '74b5b781-5673-407e-849e-e1a1602c7ec0', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 09:43:08', '2021-02-22 09:43:08'),
(62, 'e5694e29-d4b3-48a2-9bd0-ed6325aa5f71', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 09:43:59', '2021-02-22 09:43:59'),
(63, 'f17a96f8-b815-4151-8c6a-134a02117c61', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-22 09:44:18', '2021-02-22 09:44:18'),
(64, '4d9c7898-c18f-4e40-86cd-c36a68c3375f', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36548795564184', '2021-02-26 07:15:24', '2021-02-26 07:15:24'),
(65, '4d9c7898-c18f-4e40-86cd-c36a68c3375f', '5325955203224', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/37511017824408', '2021-02-26 07:15:24', '2021-02-26 07:15:24'),
(66, '4d9c7898-c18f-4e40-86cd-c36a68c3375f', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-02-26 07:15:24', '2021-02-26 07:15:24'),
(67, 'e9ed1054-1103-4d7b-b5e7-834489fca754', '5325955203224', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/37511017824408', '2021-03-01 10:56:12', '2021-03-01 10:56:12'),
(68, 'b5b763b1-9cff-44e4-81b2-3eaa93811cfc', '5325955203224', 2, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/37511017824408', '2021-03-02 07:25:43', '2021-03-02 07:25:43'),
(69, '1ecc0bff-eecb-4cb7-adfb-ffea05af13d0', '5325955203224', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/37511017824408', '2021-03-02 07:27:39', '2021-03-02 07:27:39'),
(70, 'a1c4113f-3cf1-4217-ac18-0805ba5f8c73', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-03-04 19:09:26', '2021-03-04 19:09:26'),
(71, 'a1c4113f-3cf1-4217-ac18-0805ba5f8c73', '6087166623896', 3, '0.00', '100.00', NULL, 'gid://shopify/ProductVariant/37408471351448', '2021-03-04 19:09:26', '2021-03-04 19:09:26'),
(72, 'a1c4113f-3cf1-4217-ac18-0805ba5f8c73', '5325955203224', 3, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/37511017824408', '2021-03-04 19:09:26', '2021-03-04 19:09:26'),
(73, 'a1c4113f-3cf1-4217-ac18-0805ba5f8c73', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-03-04 19:09:26', '2021-03-04 19:09:26'),
(74, '32bca03f-8f2c-4262-8909-78e4ae46f7f4', '6087166623896', 5, '0.00', '100.00', NULL, 'gid://shopify/ProductVariant/37408471384216', '2021-03-04 19:13:01', '2021-03-04 19:13:01'),
(75, '538f91e5-cf2d-44b9-b278-2c67944e0cd8', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-03-05 03:26:26', '2021-03-05 03:26:26'),
(76, '538f91e5-cf2d-44b9-b278-2c67944e0cd8', '5866276749464', 1, '0.00', '55.00', NULL, 'gid://shopify/ProductVariant/36677184848024', '2021-03-05 03:26:26', '2021-03-05 03:26:26'),
(77, '538f91e5-cf2d-44b9-b278-2c67944e0cd8', '5866269933720', 1, '0.00', '40.00', NULL, 'gid://shopify/ProductVariant/36677164990616', '2021-03-05 03:26:26', '2021-03-05 03:26:26'),
(78, 'cf4b1501-f0ff-4298-a838-4f7ff8630c3d', '6565966020759', 1, '80.00', '70.00', NULL, 'gid://shopify/ProductVariant/39385741230231', '2021-03-05 06:12:08', '2021-03-05 06:12:08'),
(79, 'cf4b1501-f0ff-4298-a838-4f7ff8630c3d', '6565929123991', 1, '40.00', '30.00', NULL, 'gid://shopify/ProductVariant/39385490849943', '2021-03-05 06:12:08', '2021-03-05 06:12:08'),
(80, '4e8f7292-30b2-432f-a193-d407effe7a77', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-03-19 11:46:38', '2021-03-19 11:46:38'),
(81, '4e8f7292-30b2-432f-a193-d407effe7a77', '5866276749464', 1, '0.00', '55.00', NULL, 'gid://shopify/ProductVariant/36677184848024', '2021-03-19 11:46:38', '2021-03-19 11:46:38'),
(82, 'bc9a4a2f-f416-4847-9438-005dc32335d2', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-03-19 11:51:31', '2021-03-19 11:51:31'),
(83, 'bc9a4a2f-f416-4847-9438-005dc32335d2', '5866276749464', 1, '0.00', '55.00', NULL, 'gid://shopify/ProductVariant/36677184848024', '2021-03-19 11:51:31', '2021-03-19 11:51:31'),
(84, 'c90d91ab-714e-4fff-8345-c6e503db955e', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-03-19 11:58:21', '2021-03-19 11:58:21'),
(85, 'c90d91ab-714e-4fff-8345-c6e503db955e', '5866276749464', 1, '0.00', '55.00', NULL, 'gid://shopify/ProductVariant/36677184848024', '2021-03-19 11:58:21', '2021-03-19 11:58:21'),
(86, 'c5bb688f-e0fc-436a-9ca6-2741426d8ebe', '5866280812696', 1, '0.00', '200.00', NULL, 'gid://shopify/ProductVariant/36677190746264', '2021-03-19 13:16:09', '2021-03-19 13:16:09'),
(87, 'c5bb688f-e0fc-436a-9ca6-2741426d8ebe', '5866276749464', 1, '0.00', '55.00', NULL, 'gid://shopify/ProductVariant/36677184848024', '2021-03-19 13:16:09', '2021-03-19 13:16:09');

-- --------------------------------------------------------

--
-- Table structure for table `ll_payment_details`
--

CREATE TABLE `ll_payment_details` (
  `id` int(11) NOT NULL,
  `order_id` varchar(256) DEFAULT NULL,
  `user_id` varchar(256) NOT NULL,
  `payment_gateway` varchar(256) DEFAULT NULL,
  `payment_type` varchar(256) DEFAULT NULL,
  `amount_received` decimal(16,2) NOT NULL DEFAULT '0.00',
  `txn` varchar(256) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `card_type` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `mode` tinyint(1) DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_payment_details`
--

INSERT INTO `ll_payment_details` (`id`, `order_id`, `user_id`, `payment_gateway`, `payment_type`, `amount_received`, `txn`, `email`, `card_type`, `country`, `mode`, `update_date`, `create_date`) VALUES
(29, 'e6ecae3a-ae8d-431d-9c61-af854e8bf0cb', '8c994b5c-f38f-4019-a422-2b7b067905d9', 'stripe', 'ONLINE', '680.00', 'tok_1IK0lhEDrtv7HRRIL941jpaG', NULL, 'Visa', 'GB', 0, '2021-02-12 12:29:08', '2021-02-12 12:29:08'),
(30, '7a4a54f9-88dd-40e7-b1e8-97e960737aaa', '67417bbd-cc3b-44cf-9cf2-3cfc1700d963', 'stripe', 'ONLINE', '400.00', 'tok_1IK0tLEDrtv7HRRIHQRsKPyw', NULL, 'Visa', 'GB', 0, '2021-02-12 12:37:03', '2021-02-12 12:37:03'),
(31, 'e210c1f4-dcb5-4f11-82da-34b5976c10bb', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '600.00', 'tok_1ILmSj257HK7ESRoHEgkI03f', NULL, 'Visa', 'GB', 0, '2021-02-17 09:36:51', '2021-02-17 09:36:51'),
(32, '270ff915-ef89-4aa5-8ffc-acfe49b8152e', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '37.60', 'tok_1INZSyEDrtv7HRRIzMF3JgE4', NULL, 'Visa', 'GB', 0, '2021-02-22 08:08:31', '2021-02-22 08:08:31'),
(33, '74b5b781-5673-407e-849e-e1a1602c7ec0', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '37.60', 'tok_1INawZEDrtv7HRRIr0I2e6Fh', NULL, 'Visa', 'GB', 0, '2021-02-22 09:43:09', '2021-02-22 09:43:09'),
(34, 'e5694e29-d4b3-48a2-9bd0-ed6325aa5f71', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '37.60', 'tok_1INaxOEDrtv7HRRIVWmUhF9H', NULL, 'Visa', 'GB', 0, '2021-02-22 09:44:00', '2021-02-22 09:44:00'),
(35, 'f17a96f8-b815-4151-8c6a-134a02117c61', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '37.60', 'tok_1INaxhEDrtv7HRRIQdlmTN1x', NULL, 'Visa', 'GB', 0, '2021-02-22 09:44:19', '2021-02-22 09:44:19'),
(36, '4d9c7898-c18f-4e40-86cd-c36a68c3375f', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '413.60', 'tok_1IP0XmEDrtv7HRRIBYRaTZJe', NULL, 'Visa', 'US', 0, '2021-02-26 07:15:25', '2021-02-26 07:15:25'),
(37, 'b5b763b1-9cff-44e4-81b2-3eaa93811cfc', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '400.00', 'tok_1IQSbyEDrtv7HRRIGZZEmZ48', NULL, 'Visa', 'US', 0, '2021-03-02 07:25:44', '2021-03-02 07:25:44'),
(38, '1ecc0bff-eecb-4cb7-adfb-ffea05af13d0', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '190.00', 'tok_1IQSdnEDrtv7HRRI30nGToi6', NULL, 'Visa', 'US', 0, '2021-03-02 07:27:40', '2021-03-02 07:27:40'),
(39, 'a1c4113f-3cf1-4217-ac18-0805ba5f8c73', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '1185.60', 'tok_1IRMY5EDrtv7HRRIfed9G9kH', NULL, 'Visa', 'US', 0, '2021-03-04 19:09:27', '2021-03-04 19:09:27'),
(40, '32bca03f-8f2c-4262-8909-78e4ae46f7f4', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '520.00', 'tok_1IRMbXEDrtv7HRRIDUGHjcpd', NULL, 'Visa', 'US', 0, '2021-03-04 19:13:02', '2021-03-04 19:13:02'),
(41, '538f91e5-cf2d-44b9-b278-2c67944e0cd8', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '245.44', 'tok_1IRUJ3EDrtv7HRRIjA16F9TJ', NULL, 'Visa', 'US', 0, '2021-03-05 03:26:26', '2021-03-05 03:26:26'),
(42, 'cf4b1501-f0ff-4298-a838-4f7ff8630c3d', 'e5cd6071-4182-4fd0-b189-c99533f5ac22', 'stripe', 'ONLINE', '110.00', 'tok_1IRWtP257HK7ESRoOPjZfzwh', NULL, 'Visa', 'US', 0, '2021-03-05 06:12:09', '2021-03-05 06:12:09'),
(43, 'c90d91ab-714e-4fff-8345-c6e503db955e', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '265.20', NULL, NULL, NULL, NULL, NULL, '2021-03-19 11:58:22', '2021-03-19 11:58:22'),
(44, 'c5bb688f-e0fc-436a-9ca6-2741426d8ebe', 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', 'ONLINE', '265.20', NULL, NULL, NULL, NULL, NULL, '2021-03-19 13:16:09', '2021-03-19 13:16:09');

-- --------------------------------------------------------

--
-- Table structure for table `ll_payment_gateway`
--

CREATE TABLE `ll_payment_gateway` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `payment_gateway` varchar(256) DEFAULT NULL,
  `account_name` varchar(256) DEFAULT NULL,
  `account_number` varchar(256) DEFAULT NULL,
  `sort_code` varchar(256) DEFAULT NULL,
  `ifsc_code` varchar(50) DEFAULT NULL,
  `card_type` varchar(100) DEFAULT NULL,
  `card_number` varchar(100) DEFAULT NULL,
  `exp_date` varchar(20) DEFAULT NULL,
  `cvc` int(6) DEFAULT NULL,
  `stripe_id` varchar(256) DEFAULT NULL,
  `public_key` varchar(512) DEFAULT NULL,
  `private_key` varchar(512) DEFAULT NULL,
  `status` enum('1','2','3') DEFAULT '1' COMMENT '1= active, 2 =deactive 3=deleted',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_payment_gateway`
--

INSERT INTO `ll_payment_gateway` (`id`, `user_id`, `payment_gateway`, `account_name`, `account_number`, `sort_code`, `ifsc_code`, `card_type`, `card_number`, `exp_date`, `cvc`, `stripe_id`, `public_key`, `private_key`, `status`, `update_date`, `create_date`) VALUES
(1, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 'stripe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '6a66e8930f3661f148a01a4edf084833347ec574ea4f90ad67d408025edfecac1b00ae47393975b681cb32b1a091724e34ee72a50e2d41fd3b985cace1fd021c99e221f2902a771614fb67a698f6f71785131700af119e3e4ae4a8a9ee75c354268842c8ccfae3456aea48adf8ec669559f58bc114d65db639bea6bcc154e70f', '', '1', '2021-02-12 08:06:20', '2021-02-12 08:06:20'),
(2, 'df4a4808-6869-490c-b46d-1ae07faae372', 'stripe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '3172c84f3e9dba08394d2e47863cd6271172cc9bab32b288cb382989bba2f28130954d49e94393e701176dffbc9d821c9861aad5fe43ee0a79711381191b4bdeaa755daed073f59a5f534388e9d4ef5f3641f771646f718d3bf65f7b2cd6d863092267276b705ea3e57f6adf6ef2ca99239656daba80fc12cba3db70825f902a4295b559baf3646891bdd76d317620ccce46dc24294c71bb43ca5f552549cc708301bb0200ed343abf0aa690c0bc67247561de69e0fd85d04adba1f5173252987c4b49b24eb7eacdc3677c', '', '1', '2021-03-19 11:02:21', '2021-02-12 09:15:19'),
(3, '8c994b5c-f38f-4019-a422-2b7b067905d9', 'stripe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '06b969350fb1783fecb109534d5b44203a73d0c411e619332bb261a3421f155cd1f8baa7caf757f0d6e240a35763b38ebe834f79b7625eccd8ff609ffd724048152a8a7a89e76328559c4da8c472e1a9a281e3b895ae6d15153b9612db1462ef631fefa9199e9aac6a5e5da358d64a1858a1fc4096c4532ec78d25e4aedda9b0', '', '1', '2021-02-12 12:17:10', '2021-02-12 12:17:10'),
(7, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', 'stripe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '954cb997ab8cbc5e99dbb4d42b86df1004ea55320631eeb5c8508bf42623f4b1a6a08ab5dafe650d54354dde7d90c0a28b01e3f5cd82f09f33d8cbb36ed6e68247df71df3eedd79c799b4ef2bf1005902adf03c286061d1496bd62323560fb9da481acf890456d071bc686e78025a2ea9b2a72655f160c3122d82a028517bd4b', 'ee1375f8a4d3b8bbee2d0b4eea0b8f9ab66278c70b0ae9c0d239b0a686d9471d8b920b071e7dc3270db789eb01301c20df27bc9c4032f4d0e0153bc5b7ccfff4e8fff038bcf29cab479ff63cfc41326e156d6226cd46cf802d4794d82f0d46fbbc2b18ce34c291d747c88c22d20cb1e4347353cc7d9d3e5499f8cbe1456a17a8', '1', '2021-03-05 05:29:54', '2021-03-05 05:29:54');

-- --------------------------------------------------------

--
-- Table structure for table `ll_products`
--

CREATE TABLE `ll_products` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `channel_id` int(11) DEFAULT NULL,
  `product_id` varchar(256) NOT NULL,
  `product_title` varchar(256) DEFAULT NULL,
  `product_description` longtext,
  `product_sku` varchar(256) DEFAULT NULL,
  `max_price` decimal(16,2) NOT NULL DEFAULT '0.00',
  `min_price` decimal(16,2) NOT NULL DEFAULT '0.00',
  `product_price` decimal(16,2) NOT NULL DEFAULT '0.00',
  `on_air_price` decimal(16,2) NOT NULL DEFAULT '0.00',
  `off_air_price` decimal(16,2) NOT NULL DEFAULT '0.00',
  `product_retail_price` decimal(16,2) DEFAULT '0.00',
  `discount_peronair` decimal(16,2) NOT NULL DEFAULT '0.00',
  `discount_peroffair` decimal(16,2) NOT NULL DEFAULT '0.00',
  `product_category` varchar(256) DEFAULT NULL,
  `product_sub_category` varchar(256) DEFAULT NULL,
  `product_type` enum('shopify','manual') NOT NULL DEFAULT 'manual',
  `product_stock` int(11) DEFAULT NULL,
  `limit_per_order` int(11) DEFAULT NULL,
  `variant` int(11) NOT NULL DEFAULT '0' COMMENT '0= no variant, 1 =variant',
  `currencyCode` varchar(50) DEFAULT NULL,
  `channelTag` text,
  `product_status` enum('1','2','3') NOT NULL DEFAULT '1' COMMENT '1=active,2=deactive,3=out of stock',
  `is_delete` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0= active, 1 =deleted',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_products`
--

INSERT INTO `ll_products` (`id`, `user_id`, `channel_id`, `product_id`, `product_title`, `product_description`, `product_sku`, `max_price`, `min_price`, `product_price`, `on_air_price`, `off_air_price`, `product_retail_price`, `discount_peronair`, `discount_peroffair`, `product_category`, `product_sub_category`, `product_type`, `product_stock`, `limit_per_order`, `variant`, `currencyCode`, `channelTag`, `product_status`, `is_delete`, `update_date`, `create_date`) VALUES
(202, 'df4a4808-6869-490c-b46d-1ae07faae372', NULL, 'gid://shopify/Product/5866280812696', 'Abundance & Prosperity', 'testing', NULL, '3495.00', '3495.00', '0.00', '200.00', '0.00', '34.95', '0.00', '0.00', '', NULL, 'shopify', 50, NULL, 1, 'AUD', 'ashok', '1', '0', '2021-03-05 10:05:47', '2021-02-17 08:23:50'),
(203, 'df4a4808-6869-490c-b46d-1ae07faae372', NULL, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', NULL, NULL, '5995.00', '5995.00', '0.00', '0.00', '0.00', '59.95', '0.00', '0.00', '', NULL, 'shopify', NULL, NULL, 1, 'AUD', NULL, '1', '0', '2021-03-05 10:05:47', '2021-02-17 08:23:50'),
(206, 'df4a4808-6869-490c-b46d-1ae07faae372', NULL, 'gid://shopify/Product/5866269933720', 'Good Vibes', 'testing', NULL, '3495.00', '3495.00', '0.00', '40.00', '0.00', '34.95', '0.00', '0.00', '', NULL, 'shopify', 50, NULL, 1, 'AUD', ',kindlebit,table,test,fori', '1', '0', '2021-03-05 10:05:47', '2021-02-17 09:25:35'),
(207, 'df4a4808-6869-490c-b46d-1ae07faae372', NULL, 'gid://shopify/Product/5325955203224', 'Vetiver & Patchouli', 'testing', NULL, '5995.00', '5995.00', '0.00', '200.00', '0.00', '59.95', '0.00', '0.00', 'Natural Coconut & Soy Candle', NULL, 'shopify', 54, NULL, 1, 'AUD', ',shilpa,new,test', '1', '0', '2021-03-05 10:05:47', '2021-02-17 09:25:35'),
(208, 'df4a4808-6869-490c-b46d-1ae07faae372', NULL, 'gid://shopify/Product/5866276749464', 'Balance + Serenity', 'testing', NULL, '3495.00', '3495.00', '0.00', '55.00', '0.00', '34.95', '0.00', '0.00', '', NULL, 'shopify', 54, NULL, 1, 'AUD', '', '1', '0', '2021-03-05 10:05:47', '2021-03-03 07:29:32'),
(209, 'df4a4808-6869-490c-b46d-1ae07faae372', NULL, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'testing', NULL, '1999.00', '1999.00', '0.00', '100.00', '0.00', '19.99', '0.00', '0.00', '', NULL, 'shopify', 100, NULL, 4, 'AUD', '', '1', '0', '2021-03-05 10:05:47', '2021-03-03 08:11:05'),
(216, 'df4a4808-6869-490c-b46d-1ae07faae372', NULL, 'gid://shopify/Product/5707091509400', 'Bergamot & Lime', '<h2 style=\"font-style:italic\"><strong>Bergamot and Lime</strong></h2>\n\n<p>Bright lime zest joins fresh lemon and bergamot over hints of cilantro and coriander.</p>\n\n<p>Notes in perfumery are descriptors of scents that can be sensed upon the application of&nbsp;a fragrance.&nbsp; Notes are separated into three classes:&nbsp; top/head notes, middle/heart notes, and base notes which denote groups of scents that can sensed with the respect to the time after the application of a fragrance.&nbsp; These notes are created carefully with knowledge of the evaporation process and the intended use of the fragrance.</p>\n\n<p><img alt=\"\" src=\"https://cdn.shopify.com/s/files/1/0407/7119/0936/files/image5_240x240.jpg?v=1601428997\" /></p>\n\n<p><strong>Top notes</strong>: Bergamot, Lemon, Lime<br />\n<strong>Mid notes</strong>: Bergamot, Herbal<br />\n<strong>Base notes</strong>: Herbal</p>\n', NULL, '5995.00', '5995.00', '59.95', '0.00', '0.00', '59.95', '0.00', '0.00', '', NULL, 'shopify', 54, NULL, 1, 'AUD', '', '1', '0', '2021-03-17 13:32:42', '2021-03-04 18:40:48'),
(217, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', NULL, 'gid://shopify/Product/6565966020759', 'Cocktail Glass', '<meta content=\"text/html; charset=utf-8\" http-equiv=\"content-type\">\n<p data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">Pineapples... pineapples everywhere! Here\'s a must have for the summer. Our plated stainless steel cocktail glass is available in 3 colors. </span>The unit price is for one item.</p>\n<p data-mce-fragment=\"1\">Dish washer safe and easy to clean.<br data-mce-fragment=\"1\">Capacity: 500 ml</p>\n<p data-mce-fragment=\"1\"><strong data-mce-fragment=\"1\">Estimated Delivery Time</strong><br data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">US: 12-20 business days</span><br data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">Canada: 16-26 business days</span></p>', NULL, '2900.00', '2900.00', '29.00', '70.00', '80.00', '29.00', '0.00', '0.00', '', NULL, 'shopify', 100, NULL, 3, 'USD', 'Glass,Cocktail', '1', '0', '2021-03-05 10:05:47', '2021-03-05 05:11:36'),
(218, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', NULL, 'gid://shopify/Product/6565929123991', 'Eames House Bird', '<meta content=\"text/html; charset=utf-8\" http-equiv=\"content-type\">\n<p data-mce-fragment=\"1\">An artefact of American folk art, the Eames House Bird has become a popular decorative item over the years. Embellish your home with this design classic that has originally stood in the centre of the famous Eames house.</p>\n<p data-mce-fragment=\"1\">Available in different colors.<br data-mce-fragment=\"1\">*<em data-mce-fragment=\"1\">The white bird has also white legs.</em></p>\n<p data-mce-fragment=\"1\"><strong data-mce-fragment=\"1\">Size:</strong> 9 cm high, 28 cm deep and 27 cm wide</p>\n<p data-mce-fragment=\"1\"><strong data-mce-fragment=\"1\">Estimated Delivery Time</strong><br data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">US: 19-39 business days</span><br data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">Canada: 15-30 business days</span></p>', NULL, '9000.00', '9000.00', '90.00', '30.00', '40.00', '90.00', '0.00', '0.00', '', NULL, 'shopify', 50, NULL, 5, 'USD', 'bird,decor,homedecor', '1', '0', '2021-03-05 10:05:47', '2021-03-05 05:11:55'),
(219, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', NULL, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', '<meta content=\"text/html; charset=utf-8\" http-equiv=\"content-type\"><meta content=\"text/html; charset=utf-8\" http-equiv=\"content-type\">\n<p class=\"p1\" data-mce-fragment=\"1\">An elegant accent to your room\'s decor, the Axle lamp is crafted to have a modern minimalist feel. Use<span data-mce-fragment=\"1\"> </span><a href=\"https://onixxdesign.com/collections/light-bulbs\" title=\"Vintage incandescent Edison light bulb\" data-mce-fragment=\"1\" data-mce-href=\"https://onixxdesign.com/collections/light-bulbs\">Onixx vintage bulbs</a> to complete the look, or use any light bulbs under 75 Watts. The arms can be placed in different angles, but it is recommended to position the two shorter ones so as to balance with the longer one (as shown). Made from solid brass. Not UL/ULC certified.</p>\n<p class=\"p1\" data-mce-fragment=\"1\"> </p>\n<p class=\"p1\" data-mce-fragment=\"1\"><strong data-mce-fragment=\"1\">Details</strong></p>\n<ul class=\"ul1\" data-mce-fragment=\"1\">\n<li data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">This lamp is not recommended for use over 75 Watts</span></li>\n<li data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">All mounting hardware is included</span></li>\n<li data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">Light bulbs are not included</span></li>\n<li data-mce-fragment=\"1\"><span data-mce-fragment=\"1\">Every lamp we make is custom built in our studio and may take up to 3 weeks plus shipping.</span></li>\n</ul>\n<p class=\"p1\" data-mce-fragment=\"1\"><strong data-mce-fragment=\"1\"><br data-mce-fragment=\"1\">Dimensions</strong></p>\n<ul class=\"ul1\" data-mce-fragment=\"1\">\n<li class=\"li1\" data-mce-fragment=\"1\">Canopy diameter: 5 1/4”</li>\n<li class=\"li1\" data-mce-fragment=\"1\">Lamp length: 14 1/2”</li>\n<li class=\"li1\" data-mce-fragment=\"1\">Three arms: 18 1/2”, 13”, 6 1/2”</li>\n</ul>\n<p class=\"p1\" data-mce-fragment=\"1\"><strong data-mce-fragment=\"1\"><br data-mce-fragment=\"1\">Estimated Delivery Time </strong></p>\n<ul data-mce-fragment=\"1\">\n<li data-mce-fragment=\"1\">US: 12-20 business days</li>\n<li data-mce-fragment=\"1\">Canada: 12-20 business days</li>\n</ul>\n<p data-mce-fragment=\"1\"> </p>\n<p class=\"p1\" data-mce-fragment=\"1\">IMPORTANT: If you ship to the United States, we cannot guarantee that you will or will not be charged any customs taxes or duties. Any customs or import duties are charged once the parcel reaches its destination country. These charges must be paid by the recipient of the parcel. This applies only to US orders.</p>\n<br>', NULL, '34900.00', '34900.00', '349.00', '0.00', '0.00', '349.00', '0.00', '0.00', '', NULL, 'shopify', NULL, NULL, 1, 'USD', NULL, '1', '1', '2021-03-05 10:05:47', '2021-03-05 05:12:29');

-- --------------------------------------------------------

--
-- Table structure for table `ll_products_category`
--

CREATE TABLE `ll_products_category` (
  `id` int(11) NOT NULL,
  `category_title` varchar(256) NOT NULL,
  `category_name` varchar(256) NOT NULL,
  `category_image` varchar(256) DEFAULT NULL,
  `category_status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1=active,2-inactive',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ll_products_images`
--

CREATE TABLE `ll_products_images` (
  `id` int(11) NOT NULL,
  `product_id` varchar(256) NOT NULL,
  `image_alt` varchar(256) NOT NULL,
  `image_url` varchar(256) NOT NULL,
  `is_cover_img` enum('1','2') NOT NULL DEFAULT '1',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_products_images`
--

INSERT INTO `ll_products_images` (`id`, `product_id`, `image_alt`, `image_url`, `is_cover_img`, `update_date`, `create_date`) VALUES
(331, 'gid://shopify/Product/5866280812696', 'Abundance & Prosperity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_56.png?v=1606789521', '1', '2021-02-12 12:11:27', '2021-02-12 12:11:27'),
(332, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-02-12 12:11:27', '2021-02-12 12:11:27'),
(333, 'gid://shopify/Product/5866269933720', 'Good Vibes', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_63.png?v=1606861680', '1', '2021-02-12 12:11:41', '2021-02-12 12:11:41'),
(334, 'gid://shopify/Product/5866269933720', 'Good Vibes', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_63.png?v=1606861680', '1', '2021-02-12 12:33:15', '2021-02-12 12:33:15'),
(335, 'gid://shopify/Product/5325955203224', 'Vetiver & Patchouli', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/12.png?v=1606342412', '1', '2021-02-12 12:33:19', '2021-02-12 12:33:19'),
(336, 'gid://shopify/Product/5325955203224', 'Vetiver & Patchouli', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/12.png?v=1606342412', '1', '2021-02-17 07:50:13', '2021-02-17 07:50:13'),
(337, 'gid://shopify/Product/5866269933720', 'Good Vibes', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_63.png?v=1606861680', '1', '2021-02-17 07:50:13', '2021-02-17 07:50:13'),
(338, 'gid://shopify/Product/5325955203224', 'Vetiver & Patchouli', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/12.png?v=1606342412', '1', '2021-02-17 07:50:21', '2021-02-17 07:50:21'),
(339, 'gid://shopify/Product/5866269933720', 'Good Vibes', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_63.png?v=1606861680', '1', '2021-02-17 07:50:24', '2021-02-17 07:50:24'),
(340, 'gid://shopify/Product/5866280812696', 'Abundance & Prosperity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_56.png?v=1606789521', '1', '2021-02-17 07:50:54', '2021-02-17 07:50:54'),
(341, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-02-17 07:50:54', '2021-02-17 07:50:54'),
(342, 'gid://shopify/Product/5866280812696', 'Abundance & Prosperity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_56.png?v=1606789521', '1', '2021-02-17 08:23:50', '2021-02-17 08:23:50'),
(343, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-02-17 08:23:50', '2021-02-17 08:23:50'),
(344, 'gid://shopify/Product/5866280812696', 'Abundance & Prosperity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_56.png?v=1606789521', '1', '2021-02-17 09:25:24', '2021-02-17 09:25:24'),
(345, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-02-17 09:25:24', '2021-02-17 09:25:24'),
(346, 'gid://shopify/Product/5866269933720', 'Good Vibes', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_63.png?v=1606861680', '1', '2021-02-17 09:25:35', '2021-02-17 09:25:35'),
(347, 'gid://shopify/Product/5325955203224', 'Vetiver & Patchouli', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/12.png?v=1606342412', '1', '2021-02-17 09:25:35', '2021-02-17 09:25:35'),
(348, 'gid://shopify/Product/5866276749464', 'Balance + Serenity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_57.png?v=1606789726', '1', '2021-03-03 07:29:32', '2021-03-03 07:29:32'),
(349, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/14.png?v=1606342018', '1', '2021-03-03 08:11:05', '2021-03-03 08:11:05'),
(350, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/13.png?v=1606342015', '1', '2021-03-03 08:11:05', '2021-03-03 08:11:05'),
(351, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/16.png?v=1606342012', '1', '2021-03-03 08:11:05', '2021-03-03 08:11:05'),
(352, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/15.png?v=1606342009', '1', '2021-03-03 08:11:05', '2021-03-03 08:11:05'),
(368, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 12:24:01', '2021-03-04 12:24:01'),
(369, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 12:27:01', '2021-03-04 12:27:01'),
(370, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 13:11:17', '2021-03-04 13:11:17'),
(371, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 13:32:09', '2021-03-04 13:32:09'),
(372, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 13:32:19', '2021-03-04 13:32:19'),
(373, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 13:33:32', '2021-03-04 13:33:32'),
(374, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 13:34:35', '2021-03-04 13:34:35'),
(375, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 13:45:40', '2021-03-04 13:45:40'),
(376, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 13:47:35', '2021-03-04 13:47:35'),
(377, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 14:28:54', '2021-03-04 14:28:54'),
(378, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-04 14:29:00', '2021-03-04 14:29:00'),
(379, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/14.png?v=1606342018', '1', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(380, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/13.png?v=1606342015', '1', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(381, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/16.png?v=1606342012', '1', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(382, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/15.png?v=1606342009', '1', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(383, 'gid://shopify/Product/5866276749464', 'Balance + Serenity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_57.png?v=1606789726', '1', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(384, 'gid://shopify/Product/5707091509400', 'Bergamot & Lime', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_61.png?v=1606860320', '1', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(385, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/14.png?v=1606342018', '1', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(386, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/13.png?v=1606342015', '1', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(387, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/16.png?v=1606342012', '1', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(388, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/15.png?v=1606342009', '1', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(389, 'gid://shopify/Product/5866276749464', 'Balance + Serenity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_57.png?v=1606789726', '1', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(390, 'gid://shopify/Product/5707091509400', 'Bergamot & Lime', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_61.png?v=1606860320', '1', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(391, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/14.png?v=1606342018', '1', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(392, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/13.png?v=1606342015', '1', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(393, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/16.png?v=1606342012', '1', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(394, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/15.png?v=1606342009', '1', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(395, 'gid://shopify/Product/5866276749464', 'Balance + Serenity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_57.png?v=1606789726', '1', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(396, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/14.png?v=1606342018', '1', '2021-03-04 18:41:09', '2021-03-04 18:41:09'),
(397, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/13.png?v=1606342015', '1', '2021-03-04 18:41:09', '2021-03-04 18:41:09'),
(398, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/16.png?v=1606342012', '1', '2021-03-04 18:41:09', '2021-03-04 18:41:09'),
(399, 'gid://shopify/Product/6087166623896', 'Bear Car Diffusers', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/15.png?v=1606342009', '1', '2021-03-04 18:41:09', '2021-03-04 18:41:09'),
(400, 'gid://shopify/Product/5866280812696', 'Abundance & Prosperity', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_56.png?v=1606789521', '1', '2021-03-05 03:09:12', '2021-03-05 03:09:12'),
(401, 'gid://shopify/Product/5835130634392', 'Lavender and Eucalyptus', 'https://cdn.shopify.com/s/files/1/0407/7119/0936/products/Untitleddesign_62_7ac7c178-8e6f-4957-9ba0-1993761b19b5.png?v=1606860307', '1', '2021-03-05 03:09:12', '2021-03-05 03:09:12'),
(402, 'gid://shopify/Product/6565966020759', 'Cocktail Glass', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/product-image-732826330_1024x1024_f4f4a265-7675-4dca-92e6-7cfff715d4a1.jpg?v=1614769799', '1', '2021-03-05 05:11:36', '2021-03-05 05:11:36'),
(403, 'gid://shopify/Product/6565966020759', 'Cocktail Glass', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Onixx-cocktail-glass-rosegold_1024x1024_46ac17f9-37ea-4059-8898-f74b0b28b68b.jpg?v=1614769798', '1', '2021-03-05 05:11:36', '2021-03-05 05:11:36'),
(404, 'gid://shopify/Product/6565966020759', 'Cocktail Glass', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Onixx-cocktail-glass-gold_1024x1024_b56a78bc-30d9-44ea-a31b-212f80a4fdff.jpg?v=1614769798', '1', '2021-03-05 05:11:36', '2021-03-05 05:11:36'),
(405, 'gid://shopify/Product/6565966020759', 'Cocktail Glass', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Onixx-cocktail-glass-coverimage_grande_ae78cc7e-a7f5-4d94-85c1-433601d80e02.jpg?v=1614769798', '1', '2021-03-05 05:11:36', '2021-03-05 05:11:36'),
(406, 'gid://shopify/Product/6565966020759', 'Cocktail Glass', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Onixx-cocktail-glass-silver_1024x1024_acfbe218-f8fe-48c8-a549-d40403b713b8.jpg?v=1614769798', '1', '2021-03-05 05:11:36', '2021-03-05 05:11:36'),
(407, 'gid://shopify/Product/6565929123991', 'Eames House Bird', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/eames-house-bird-green_1024x1024_58e8b451-f1c7-4c04-a37b-b5c42f416c3d.jpg?v=1614769092', '1', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(408, 'gid://shopify/Product/6565929123991', 'Eames House Bird', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/eames-house-bird-blue_1024x1024_8c691602-7afd-4ed5-95c5-b2dd5ed96d07.jpg?v=1614769092', '1', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(409, 'gid://shopify/Product/6565929123991', 'Eames House Bird', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/eames-house-bird-black_1024x1024_9c578c00-1364-43ee-b761-72f76bcb91e7.jpg?v=1614769092', '1', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(410, 'gid://shopify/Product/6565929123991', 'Eames House Bird', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/eames-house-bird-white_1024x1024_0723d3ad-f1f4-4994-918a-66321c0c3114.jpg?v=1614769092', '1', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(411, 'gid://shopify/Product/6565929123991', 'Eames House Bird', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/eames-house-bird-red_300x300_b2aae5a4-5056-466a-a49f-ebb88f244c62.jpg?v=1614769091', '1', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(412, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/gray-medium_1024x1024_131fbd91-c566-480b-b7b5-e128852e510e.jpg?v=1614770924', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(413, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/gray-large_1024x1024_24d1edd0-2f3d-442c-96d8-30e0dc914ff4.jpg?v=1614770924', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(414, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/black-small_1024x1024_72ba86cf-08df-4944-bf28-01192205ec9f.jpg?v=1614770924', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(415, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/black-medium_1024x1024_63f45909-7dc8-42fa-86af-2db6e28d85fa.jpg?v=1614770924', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(416, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/black-large_1024x1024_26890448-9961-426f-87b1-666d870097ac.jpg?v=1614770924', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(417, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Trio-CeilingLamp-Unfinished-Black_3_1024x1024_370eb17e-fdde-4b2f-9515-8184579159a3.jpg?v=1614768728', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(418, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Trio-CeilingLamp-Unfinished-Black_2_1024x1024_13e2165c-2376-4c45-af98-04ff357139f5.jpg?v=1614768728', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(419, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Trio-CeilingLamp-Unfinished-Black_1_1024x1024_1e85470a-88a3-42a1-85bb-e32f24ed73cb.jpg?v=1614768728', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(420, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Trio-CeilingLamp-Unfinished-Brass_3_1024x1024_d862c670-7362-4f63-9771-530d24d26873.jpg?v=1614768727', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(421, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Axle-ceiling-lamp_300x300_0e400975-1b54-4898-94c8-d46d1b3552d8.jpg?v=1614768727', '1', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(422, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/gray-medium_1024x1024_131fbd91-c566-480b-b7b5-e128852e510e.jpg?v=1614770924', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(423, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/gray-large_1024x1024_24d1edd0-2f3d-442c-96d8-30e0dc914ff4.jpg?v=1614770924', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(424, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/black-small_1024x1024_72ba86cf-08df-4944-bf28-01192205ec9f.jpg?v=1614770924', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(425, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/black-medium_1024x1024_63f45909-7dc8-42fa-86af-2db6e28d85fa.jpg?v=1614770924', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(426, 'gid://shopify/Product/6566020284567', 'Cone - Pendant Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/black-large_1024x1024_26890448-9961-426f-87b1-666d870097ac.jpg?v=1614770924', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(427, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Trio-CeilingLamp-Unfinished-Black_3_1024x1024_370eb17e-fdde-4b2f-9515-8184579159a3.jpg?v=1614768728', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(428, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Trio-CeilingLamp-Unfinished-Black_2_1024x1024_13e2165c-2376-4c45-af98-04ff357139f5.jpg?v=1614768728', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(429, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Trio-CeilingLamp-Unfinished-Black_1_1024x1024_1e85470a-88a3-42a1-85bb-e32f24ed73cb.jpg?v=1614768728', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(430, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Trio-CeilingLamp-Unfinished-Brass_3_1024x1024_d862c670-7362-4f63-9771-530d24d26873.jpg?v=1614768727', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(431, 'gid://shopify/Product/6565916835991', 'Axle - Ceiling Lamp', 'https://cdn.shopify.com/s/files/1/0550/2756/4695/products/Axle-ceiling-lamp_300x300_0e400975-1b54-4898-94c8-d46d1b3552d8.jpg?v=1614768727', '1', '2021-03-05 05:13:10', '2021-03-05 05:13:10');

-- --------------------------------------------------------

--
-- Table structure for table `ll_products_shipping_address`
--

CREATE TABLE `ll_products_shipping_address` (
  `id` int(11) NOT NULL,
  `product_id` varchar(256) DEFAULT NULL,
  `address_1` varchar(256) DEFAULT NULL,
  `address_2` varchar(256) DEFAULT NULL,
  `city` varchar(256) DEFAULT NULL,
  `state` varchar(256) DEFAULT NULL,
  `country` varchar(256) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ll_products_streaming_content`
--

CREATE TABLE `ll_products_streaming_content` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` text,
  `banner_image` varchar(256) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `is_delete` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0= active, 1 =deleted',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_products_streaming_content`
--

INSERT INTO `ll_products_streaming_content` (`id`, `user_id`, `title`, `description`, `banner_image`, `status`, `is_delete`, `update_date`, `create_date`) VALUES
(59, '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', '5050  sale', 'live on son, hurry to buy', 'upload/1612031035137_form-logo.png', 1, '0', '2021-01-30 18:23:55', '2021-01-30 18:23:29'),
(60, '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', 'demo 20 off', 'demo off 20', 'upload/1612167710648_Untitled.png', 1, '1', '2021-02-01 08:24:59', '2021-02-01 08:21:38'),
(61, '4365e606-4950-49d5-81d8-8d06f8d1af45', 'demostreaming', 'demo 3 test', 'upload/1612186267896_logo.png', 1, '0', '2021-02-01 14:08:02', '2021-02-01 13:31:00'),
(62, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 'test1233', 'dfsdfsdf', 'upload/1612259554257_download.png', 1, '0', '2021-02-02 09:52:34', '2021-02-02 09:52:27'),
(63, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', '1223234', 'dsfsdf', 'upload/1612259600024_download.png', 1, '0', '2021-02-02 09:53:20', '2021-02-02 09:53:13'),
(64, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 'dfgdfgdfgd', 'retert', 'upload/1612259692977_download.png', 1, '0', '2021-02-02 09:54:52', '2021-02-02 09:54:46'),
(65, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 'tryrt', 'rtyrt', 'upload/1612259965357_Vision-Care-SG-–-A-nutritional-additive-that-will-help-you-achieve-a-balanced-diet-and-provide-efficient-daily-eye-care.png', 1, '0', '2021-02-02 09:59:25', '2021-02-02 09:59:08'),
(66, 'df4a4808-6869-490c-b46d-1ae07faae372', 'dfgdf', 'rwer', 'upload/1612267391660_download.png', 1, '1', '2021-02-03 07:54:25', '2021-02-02 12:03:05'),
(67, 'df4a4808-6869-490c-b46d-1ae07faae372', 'test', 'sdfsad', NULL, 1, '1', '2021-02-02 12:31:18', '2021-02-02 12:06:43'),
(68, 'df4a4808-6869-490c-b46d-1ae07faae372', 'demo', 'fdgd', NULL, 1, '1', '2021-02-02 12:31:17', '2021-02-02 12:24:22'),
(69, 'df4a4808-6869-490c-b46d-1ae07faae372', 'dfgdfg', 'dfgdfgdf', NULL, 1, '1', '2021-02-02 12:31:16', '2021-02-02 12:28:04'),
(70, 'df4a4808-6869-490c-b46d-1ae07faae372', 'SDFSDF', 'SDFDF', NULL, 1, '1', '2021-02-02 12:31:15', '2021-02-02 12:30:26'),
(71, 'df4a4808-6869-490c-b46d-1ae07faae372', 'mkl', 'gfhfh', 'upload/1612333946805_download.png', 1, '1', '2021-02-03 07:53:44', '2021-02-03 06:29:32'),
(72, 'df4a4808-6869-490c-b46d-1ae07faae372', 'test brodcast', 'testing', 'upload/1612347997616_banner.jpg', 1, '0', '2021-02-03 10:26:37', '2021-02-03 10:26:27'),
(73, 'df4a4808-6869-490c-b46d-1ae07faae372', 'fsdgsdfg', 'sdfgsd', NULL, 1, '1', '2021-02-04 08:23:39', '2021-02-03 11:02:13'),
(74, 'df4a4808-6869-490c-b46d-1ae07faae372', 'SDfasdf', 'sdfsdf', 'upload/1612350436588_Vision-Care-SG-–-A-nutritional-additive-that-will-help-you-achieve-a-balanced-diet-and-provide-efficient-daily-eye-care.png', 1, '0', '2021-02-03 11:07:16', '2021-02-03 11:07:06'),
(75, 'df4a4808-6869-490c-b46d-1ae07faae372', 'Broadcasttest', 'demo test', 'upload/1612501185779_channel (3).png', 1, '0', '2021-02-05 04:59:45', '2021-02-05 04:59:34'),
(76, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 'abcd', 'test', 'upload/1612524826864_channel (3).png', 1, '0', '2021-02-05 11:33:46', '2021-02-05 11:33:32'),
(77, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 'teststream', 'demo test', 'upload/1612535670609_Het_helal_diamond_painting.jpg', 1, '0', '2021-02-05 14:34:30', '2021-02-05 14:34:17'),
(78, 'df4a4808-6869-490c-b46d-1ae07faae372', 'dsfsad', 'fsadfasdf', 'upload/1612767495403_Specials Mobile Banner.jpg', 1, '0', '2021-02-08 06:58:15', '2021-02-08 06:58:01'),
(79, 'df4a4808-6869-490c-b46d-1ae07faae372', 'Broadcast Kbs', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra vestibulum justo, at vehicula ipsum molestie sed. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec pellentesque lacus ut augue sagittis tristique. Sed purus sem, blandit imperdiet elementum eget, molestie eu dolor. Fusce tempor nec felis sit amet lobortis. Nam semper porta neque, sed placerat quam pharetra ac. Quisque et tristique elit. In turpis nisl, rhoncus sit amet pretium vitae, tristique vitae nibh. Morbi a blandit ligula.', 'upload/1612777293910_download.png', 1, '0', '2021-02-11 10:29:44', '2021-02-08 09:41:26'),
(80, '8c994b5c-f38f-4019-a422-2b7b067905d9', 'newtestBroadast', 'This is the dummy text for the testing. Lash\nNew Text', 'upload/1613132044561_istockphoto-1130065303-612x612.jpg', 1, '0', '2021-02-12 12:15:26', '2021-02-12 12:13:51'),
(81, '67417bbd-cc3b-44cf-9cf2-3cfc1700d963', 'newmarchantaccount', 'This is the test description of dumy test', 'upload/1613133274162_istockphoto-1130065303-612x612.jpg', 1, '0', '2021-02-12 12:34:34', '2021-02-12 12:34:25'),
(82, 'df4a4808-6869-490c-b46d-1ae07faae372', 'sdfgsdfg', 'dfgh', 'upload/1613550311797_Welcome-to-FORI-.png', 1, '0', '2021-02-17 08:25:11', '2021-02-17 08:24:58'),
(83, 'df4a4808-6869-490c-b46d-1ae07faae372', 'Testnew', 'testing description', 'upload/1613728701760_1 (5).png', 1, '1', '2021-03-04 18:33:37', '2021-02-19 09:58:05'),
(84, 'df4a4808-6869-490c-b46d-1ae07faae372', 'dfsgsdf', 'sdfgdfg', 'upload/1613733034805_Vision-Care-SG-–-A-nutritional-additive-that-will-help-you-achieve-a-balanced-diet-and-provide-efficient-daily-eye-care.png', 1, '0', '2021-02-19 11:10:34', '2021-02-19 11:10:22'),
(85, 'df4a4808-6869-490c-b46d-1ae07faae372', 'New One', 'tes dummy', 'upload/1613739427417_1 (5).png', 1, '0', '2021-03-04 12:41:17', '2021-02-19 12:56:56'),
(86, 'df4a4808-6869-490c-b46d-1ae07faae372', 'Coming Soon Broadcast Channel', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mauris quam, euismod condimentum maximus eget, ullamcorper eget lorem. Mauris finibus elementum justo, non consectetur dolor aliquam sit amet. Phasellus nec nisl hendrerit purus porta porttitor. Nulla scelerisque sapien magna.', 'upload/1614757779191_f2.jpg', 1, '0', '2021-03-03 07:49:39', '2021-02-19 13:09:11'),
(88, 'df4a4808-6869-490c-b46d-1ae07faae372', 'dfs', 'fserw', NULL, 1, '1', '2021-03-04 19:39:54', '2021-03-04 19:29:44'),
(89, 'df4a4808-6869-490c-b46d-1ae07faae372', '65', '567ghj', 'upload/1614886469790_channel (2).png', 1, '1', '2021-03-05 03:05:04', '2021-03-04 19:34:10'),
(90, 'df4a4808-6869-490c-b46d-1ae07faae372', 'test one', 'test one', 'upload/1614886821987_channel (1).png', 1, '1', '2021-03-05 03:30:15', '2021-03-04 19:40:10'),
(91, 'df4a4808-6869-490c-b46d-1ae07faae372', 'Broad', 'test', 'upload/1614913977619_Vision-Care-SG-–-A-nutritional-additive-that-will-help-you-achieve-a-balanced-diet-and-provide-efficient-daily-eye-care.png', 1, '1', '2021-03-05 03:28:07', '2021-03-05 03:12:23'),
(92, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', 'FORI Demo Broadcast', 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book test', 'upload/1614922253129_STORE IMG.jpg', 1, '0', '2021-03-05 05:40:18', '2021-03-05 05:30:45'),
(93, 'df4a4808-6869-490c-b46d-1ae07faae372', 'kl', 'jkl', 'upload/1615450203404_channel (2).png', 1, '0', '2021-03-11 08:10:03', '2021-03-11 08:09:48'),
(94, 'df4a4808-6869-490c-b46d-1ae07faae372', 'jkhjk', 'jkhj', NULL, 1, '1', '2021-03-17 13:27:24', '2021-03-11 08:12:13'),
(95, 'df4a4808-6869-490c-b46d-1ae07faae372', 'fghfg', 'fghfgh', NULL, 1, '1', '2021-03-17 13:27:23', '2021-03-11 11:18:23'),
(96, 'df4a4808-6869-490c-b46d-1ae07faae372', '56', '56', NULL, 1, '1', '2021-03-17 13:27:20', '2021-03-11 11:26:24'),
(97, 'df4a4808-6869-490c-b46d-1ae07faae372', 'hgj', 'jkhkljh', NULL, 1, '1', '2021-03-17 13:27:15', '2021-03-11 11:36:13'),
(98, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cvb', 'vcbvb', NULL, 1, '1', '2021-03-17 13:27:17', '2021-03-11 11:38:12'),
(99, 'df4a4808-6869-490c-b46d-1ae07faae372', 'fghdfgsdf', 'dfgdfg', NULL, 1, '1', '2021-03-17 13:27:12', '2021-03-11 11:43:11'),
(100, 'df4a4808-6869-490c-b46d-1ae07faae372', 'fgdfg', 'fgdfgdfg', NULL, 1, '1', '2021-03-17 13:27:10', '2021-03-11 11:46:19'),
(101, 'df4a4808-6869-490c-b46d-1ae07faae372', 'rterte', 'rterte', NULL, 1, '1', '2021-03-17 13:27:07', '2021-03-11 11:51:32'),
(102, 'df4a4808-6869-490c-b46d-1ae07faae372', 'hhhhhhhhhhhhhhhhhhh', 'dfgdg', NULL, 1, '1', '2021-03-17 13:27:19', '2021-03-11 12:09:54'),
(103, 'df4a4808-6869-490c-b46d-1ae07faae372', 'fbgdfgggggg', 'dfgdfgdf', NULL, 1, '1', '2021-03-17 13:27:04', '2021-03-11 12:12:36'),
(104, 'df4a4808-6869-490c-b46d-1ae07faae372', 'gfh', 'fghfg', NULL, 1, '1', '2021-03-17 13:27:09', '2021-03-11 12:17:41'),
(105, 'df4a4808-6869-490c-b46d-1ae07faae372', 'ggggggggggggg', 'dfsdf', NULL, 1, '1', '2021-03-17 13:27:03', '2021-03-11 12:28:46'),
(106, 'df4a4808-6869-490c-b46d-1ae07faae372', 'bnfgh', 'gfhfgh', 'upload/1615466083104_bannerImage.png', 1, '0', '2021-03-11 12:34:43', '2021-03-11 12:34:19'),
(107, 'df4a4808-6869-490c-b46d-1ae07faae372', '564564', 'fjhf', 'upload/1615987598168_bannerImage.png', 1, '0', '2021-03-17 13:26:38', '2021-03-11 12:40:05'),
(108, 'df4a4808-6869-490c-b46d-1ae07faae372', 'testing broadcast new channel', 'description', 'upload/1615469327675_bannerImage.png', 1, '0', '2021-03-11 13:28:47', '2021-03-11 13:05:45'),
(109, 'df4a4808-6869-490c-b46d-1ae07faae372', 'tesh', 'fddlkdlk', NULL, 1, '1', '2021-03-17 13:26:52', '2021-03-12 06:42:32'),
(110, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cghjfdghdfhg', 'fghd', 'upload/1615556385561_bannerImage.png', 1, '1', '2021-03-17 13:27:29', '2021-03-12 13:39:32'),
(111, 'df4a4808-6869-490c-b46d-1ae07faae372', 'testdemo Broadcast', 'demo description', 'upload/1615987851101_bannerImage.png', 1, '0', '2021-03-17 13:30:51', '2021-03-17 13:28:49');

-- --------------------------------------------------------

--
-- Table structure for table `ll_products_sub_category`
--

CREATE TABLE `ll_products_sub_category` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_title` varchar(256) NOT NULL,
  `subcategory_name` varchar(256) NOT NULL,
  `subcategory_image` varchar(256) DEFAULT NULL,
  `subcategory_status` enum('1','2') NOT NULL DEFAULT '1',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ll_products_variants`
--

CREATE TABLE `ll_products_variants` (
  `id` int(11) NOT NULL,
  `product_id` varchar(256) DEFAULT NULL,
  `product_variant_id` varchar(256) DEFAULT NULL,
  `title` varchar(256) DEFAULT NULL,
  `availableForSale` int(11) DEFAULT '0',
  `inventoryItem` varchar(256) DEFAULT NULL,
  `inventoryQuantity` int(11) DEFAULT NULL,
  `price` decimal(16,2) NOT NULL DEFAULT '0.00',
  `sku` varchar(256) DEFAULT NULL,
  `weight` decimal(16,2) NOT NULL DEFAULT '0.00',
  `weightUnit` varchar(50) DEFAULT NULL,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_products_variants`
--

INSERT INTO `ll_products_variants` (`id`, `product_id`, `product_variant_id`, `title`, `availableForSale`, `inventoryItem`, `inventoryQuantity`, `price`, `sku`, `weight`, `weightUnit`, `update_date`, `create_date`) VALUES
(283, 'gid://shopify/Product/5866280812696', 'gid://shopify/ProductVariant/36677190746264', 'Default Title', 1, NULL, 21, '34.95', '5/balck', '0.00', 'KILOGRAMS', '2021-02-12 12:11:27', '2021-02-12 12:11:27'),
(284, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-02-12 12:11:27', '2021-02-12 12:11:27'),
(285, 'gid://shopify/Product/5866269933720', 'gid://shopify/ProductVariant/36677164990616', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-02-12 12:11:41', '2021-02-12 12:11:41'),
(286, 'gid://shopify/Product/5866269933720', 'gid://shopify/ProductVariant/36677164990616', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-02-12 12:33:15', '2021-02-12 12:33:15'),
(287, 'gid://shopify/Product/5325955203224', 'gid://shopify/ProductVariant/37511017824408', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-02-12 12:33:19', '2021-02-12 12:33:19'),
(288, 'gid://shopify/Product/5866269933720', 'gid://shopify/ProductVariant/36677164990616', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-02-17 07:50:13', '2021-02-17 07:50:13'),
(289, 'gid://shopify/Product/5325955203224', 'gid://shopify/ProductVariant/37511017824408', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-02-17 07:50:13', '2021-02-17 07:50:13'),
(290, 'gid://shopify/Product/5325955203224', 'gid://shopify/ProductVariant/37511017824408', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-02-17 07:50:21', '2021-02-17 07:50:21'),
(291, 'gid://shopify/Product/5866269933720', 'gid://shopify/ProductVariant/36677164990616', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-02-17 07:50:24', '2021-02-17 07:50:24'),
(292, 'gid://shopify/Product/5866280812696', 'gid://shopify/ProductVariant/36677190746264', 'Default Title', 1, NULL, 21, '34.95', '5/balck', '0.00', 'KILOGRAMS', '2021-02-17 07:50:54', '2021-02-17 07:50:54'),
(293, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-02-17 07:50:54', '2021-02-17 07:50:54'),
(294, 'gid://shopify/Product/5866280812696', 'gid://shopify/ProductVariant/36677190746264', 'Default Title', 1, NULL, 21, '34.95', '5/balck', '0.00', 'KILOGRAMS', '2021-02-17 08:23:50', '2021-02-17 08:23:50'),
(295, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-02-17 08:23:50', '2021-02-17 08:23:50'),
(296, 'gid://shopify/Product/5866280812696', 'gid://shopify/ProductVariant/36677190746264', 'Default Title', 1, NULL, 21, '34.95', '5/balck', '0.00', 'KILOGRAMS', '2021-02-17 09:25:24', '2021-02-17 09:25:24'),
(297, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-02-17 09:25:24', '2021-02-17 09:25:24'),
(298, 'gid://shopify/Product/5866269933720', 'gid://shopify/ProductVariant/36677164990616', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-02-17 09:25:35', '2021-02-17 09:25:35'),
(299, 'gid://shopify/Product/5325955203224', 'gid://shopify/ProductVariant/37511017824408', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-02-17 09:25:35', '2021-02-17 09:25:35'),
(300, 'gid://shopify/Product/5866276749464', 'gid://shopify/ProductVariant/36677184848024', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-03-03 07:29:32', '2021-03-03 07:29:32'),
(301, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408489144472', 'Blue', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-03 08:11:05', '2021-03-03 08:11:05'),
(302, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471416984', 'Gray', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-03 08:11:05', '2021-03-03 08:11:05'),
(303, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471384216', 'White', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-03 08:11:05', '2021-03-03 08:11:05'),
(304, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471351448', 'Pink', 0, NULL, -5, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-03 08:11:05', '2021-03-03 08:11:05'),
(316, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 12:24:01', '2021-03-04 12:24:01'),
(317, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 12:27:01', '2021-03-04 12:27:01'),
(318, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 13:11:17', '2021-03-04 13:11:17'),
(319, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 13:32:09', '2021-03-04 13:32:09'),
(320, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 13:32:19', '2021-03-04 13:32:19'),
(321, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 13:33:32', '2021-03-04 13:33:32'),
(322, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 13:34:35', '2021-03-04 13:34:35'),
(323, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 13:45:40', '2021-03-04 13:45:40'),
(324, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 13:47:35', '2021-03-04 13:47:35'),
(325, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 14:28:54', '2021-03-04 14:28:54'),
(326, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 14:29:00', '2021-03-04 14:29:00'),
(327, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408489144472', 'Blue', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(328, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471416984', 'Gray', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(329, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471384216', 'White', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(330, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471351448', 'Pink', 0, NULL, -5, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(331, 'gid://shopify/Product/5866276749464', 'gid://shopify/ProductVariant/36677184848024', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(332, 'gid://shopify/Product/5707091509400', 'gid://shopify/ProductVariant/36054455713944', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:48', '2021-03-04 18:40:48'),
(333, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408489144472', 'Blue', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(334, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471416984', 'Gray', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(335, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471384216', 'White', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(336, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471351448', 'Pink', 0, NULL, -5, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(337, 'gid://shopify/Product/5866276749464', 'gid://shopify/ProductVariant/36677184848024', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(338, 'gid://shopify/Product/5707091509400', 'gid://shopify/ProductVariant/36054455713944', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-04 18:40:56', '2021-03-04 18:40:56'),
(339, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408489144472', 'Blue', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(340, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471416984', 'Gray', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(341, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471384216', 'White', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(342, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471351448', 'Pink', 0, NULL, -5, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(343, 'gid://shopify/Product/5866276749464', 'gid://shopify/ProductVariant/36677184848024', 'Default Title', 1, NULL, 0, '34.95', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:04', '2021-03-04 18:41:04'),
(344, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408489144472', 'Blue', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:09', '2021-03-04 18:41:09'),
(345, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471416984', 'Gray', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:09', '2021-03-04 18:41:09'),
(346, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471384216', 'White', 1, NULL, 1, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:09', '2021-03-04 18:41:09'),
(347, 'gid://shopify/Product/6087166623896', 'gid://shopify/ProductVariant/37408471351448', 'Pink', 0, NULL, -5, '19.99', '', '0.00', 'KILOGRAMS', '2021-03-04 18:41:09', '2021-03-04 18:41:09'),
(348, 'gid://shopify/Product/5866280812696', 'gid://shopify/ProductVariant/36677190746264', 'Default Title', 1, NULL, 21, '34.95', '5/balck', '0.00', 'KILOGRAMS', '2021-03-05 03:09:12', '2021-03-05 03:09:12'),
(349, 'gid://shopify/Product/5835130634392', 'gid://shopify/ProductVariant/36548795564184', 'Default Title', 1, NULL, 0, '59.95', '', '0.00', 'KILOGRAMS', '2021-03-05 03:09:12', '2021-03-05 03:09:12'),
(350, 'gid://shopify/Product/6565966020759', 'gid://shopify/ProductVariant/39385741262999', 'Rose Gold', 1, NULL, 5, '29.00', '', '0.00', 'POUNDS', '2021-03-05 05:11:36', '2021-03-05 05:11:36'),
(351, 'gid://shopify/Product/6565966020759', 'gid://shopify/ProductVariant/39385741230231', 'Silver', 1, NULL, 5, '29.00', '', '0.00', 'POUNDS', '2021-03-05 05:11:36', '2021-03-05 05:11:36'),
(352, 'gid://shopify/Product/6565966020759', 'gid://shopify/ProductVariant/39385741197463', 'Gold', 1, NULL, 5, '29.00', '', '0.00', 'POUNDS', '2021-03-05 05:11:36', '2021-03-05 05:11:36'),
(353, 'gid://shopify/Product/6565929123991', 'gid://shopify/ProductVariant/39385490948247', 'black', 1, NULL, 7, '90.00', '', '0.00', 'POUNDS', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(354, 'gid://shopify/Product/6565929123991', 'gid://shopify/ProductVariant/39385490915479', 'yellow', 1, NULL, 4, '90.00', '', '0.00', 'POUNDS', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(355, 'gid://shopify/Product/6565929123991', 'gid://shopify/ProductVariant/39385490882711', 'white', 1, NULL, 4, '90.00', '', '0.00', 'POUNDS', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(356, 'gid://shopify/Product/6565929123991', 'gid://shopify/ProductVariant/39385490849943', 'blue', 1, NULL, 13, '90.00', '', '0.00', 'POUNDS', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(357, 'gid://shopify/Product/6565929123991', 'gid://shopify/ProductVariant/39385490817175', 'red', 1, NULL, 13, '90.00', '', '0.00', 'POUNDS', '2021-03-05 05:11:55', '2021-03-05 05:11:55'),
(358, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845629079', 'Gray   25cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(359, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845596311', 'Gray   23cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(360, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845563543', 'Black   14cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(361, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845530775', 'Black   25cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(362, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845498007', 'Black   23cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(363, 'gid://shopify/Product/6565916835991', 'gid://shopify/ProductVariant/39385432162455', 'Unfinished Brass', 1, NULL, 10, '349.00', '', '0.00', 'POUNDS', '2021-03-05 05:12:29', '2021-03-05 05:12:29'),
(364, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845629079', 'Gray   25cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(365, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845596311', 'Gray   23cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(366, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845563543', 'Black   14cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(367, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845530775', 'Black   25cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(368, 'gid://shopify/Product/6566020284567', 'gid://shopify/ProductVariant/39385845498007', 'Black   23cm', 1, NULL, 5, '75.00', '', '0.00', 'POUNDS', '2021-03-05 05:13:10', '2021-03-05 05:13:10'),
(369, 'gid://shopify/Product/6565916835991', 'gid://shopify/ProductVariant/39385432162455', 'Unfinished Brass', 1, NULL, 10, '349.00', '', '0.00', 'POUNDS', '2021-03-05 05:13:10', '2021-03-05 05:13:10');

-- --------------------------------------------------------

--
-- Table structure for table `ll_product_broadcasting`
--

CREATE TABLE `ll_product_broadcasting` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) DEFAULT NULL,
  `channel_id` int(11) DEFAULT NULL,
  `channel_name` varchar(256) NOT NULL,
  `broadcast_id` varchar(256) DEFAULT NULL,
  `product_id` text,
  `broadcast_type` int(11) DEFAULT NULL,
  `broadcast_time` varchar(256) NOT NULL,
  `broadcast_status` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '1=active, 0= not active,2=broadcast end',
  `cover_image` varchar(256) DEFAULT NULL,
  `logo_img` varchar(256) DEFAULT NULL,
  `resolution_type` int(11) DEFAULT NULL,
  `text_on_screen` enum('0','1') NOT NULL DEFAULT '0',
  `screen_txt` text,
  `store_pickup` tinyint(1) DEFAULT NULL,
  `pickup_address` text,
  `channelTag` text,
  `is_delete` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0= active, 1 =deleted',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_product_broadcasting`
--

INSERT INTO `ll_product_broadcasting` (`id`, `user_id`, `channel_id`, `channel_name`, `broadcast_id`, `product_id`, `broadcast_type`, `broadcast_time`, `broadcast_status`, `cover_image`, `logo_img`, `resolution_type`, `text_on_screen`, `screen_txt`, `store_pickup`, `pickup_address`, `channelTag`, `is_delete`, `update_date`, `create_date`) VALUES
(39, '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', 59, '5050  sale', NULL, '5835130634392', NULL, '2021-02-01T08:30:08.000Z', '0', 'upload/1612031035137_form-logo.png', NULL, NULL, '0', NULL, NULL, NULL, NULL, '0', '2021-01-30 18:24:46', '2021-01-30 18:24:39'),
(40, '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', 60, 'demo 20 off', NULL, NULL, NULL, '2021-02-03T14:15:54.000Z', '0', 'upload/1612167710648_Untitled.png', NULL, NULL, '0', NULL, NULL, NULL, NULL, '1', '2021-02-01 08:24:59', '2021-02-01 08:22:21'),
(41, '4365e606-4950-49d5-81d8-8d06f8d1af45', 61, 'demo3streaming', NULL, '5835130634392,5866280812696', NULL, '2021-02-17T13:31:12.000Z', '0', 'upload/1612186267896_logo.png', NULL, NULL, '0', NULL, NULL, NULL, NULL, '0', '2021-02-01 13:31:32', '2021-02-01 13:31:21'),
(43, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 62, 'test1233', NULL, NULL, NULL, '2021-02-17T09:52:35.000Z', '0', 'upload/1612259554257_download.png', NULL, NULL, '0', NULL, NULL, NULL, NULL, '0', '2021-02-02 09:52:40', '2021-02-02 09:52:40'),
(44, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 63, '1223234', NULL, NULL, NULL, '2021-02-04T10:30:20.000Z', '0', 'upload/1612259600024_download.png', NULL, NULL, '0', NULL, NULL, NULL, NULL, '0', '2021-02-02 09:53:50', '2021-02-02 09:53:50'),
(46, 'df4a4808-6869-490c-b46d-1ae07faae372', 70, 'SDFSDF', NULL, '5325962477720', NULL, '2021-02-24T12:30:43.000Z', '0', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, '1', '2021-02-02 12:31:15', '2021-02-02 12:30:56'),
(49, 'df4a4808-6869-490c-b46d-1ae07faae372', 66, 'dfgdf', NULL, '5325962477720', NULL, '2021-02-17T12:03:11.000Z', '0', 'upload/1612267391660_download.png', NULL, NULL, '0', NULL, NULL, NULL, NULL, '1', '2021-02-03 07:54:25', '2021-02-02 12:46:03'),
(50, 'df4a4808-6869-490c-b46d-1ae07faae372', 71, 'mkl', NULL, NULL, NULL, '2021-02-18T06:31:54.000Z', '0', 'upload/1612333946805_download.png', NULL, NULL, '0', NULL, NULL, NULL, NULL, '1', '2021-02-03 07:53:44', '2021-02-03 06:33:08'),
(51, 'df4a4808-6869-490c-b46d-1ae07faae372', 72, 'test brodcast', NULL, '6087166623896,5707091509400', NULL, '2021-02-23T10:26:38.000Z', '0', 'upload/1612347997616_banner.jpg', NULL, NULL, '0', NULL, NULL, NULL, NULL, '0', '2021-02-03 10:26:49', '2021-02-03 10:26:44'),
(52, 'df4a4808-6869-490c-b46d-1ae07faae372', 74, 'SDfasdf', NULL, '5707091509400,6087166623896', NULL, '2021-02-24T11:07:17.000Z', '0', 'upload/1612350436588_Vision-Care-SG-–-A-nutritional-additive-that-will-help-you-achieve-a-balanced-diet-and-provide-efficient-daily-eye-care.png', NULL, NULL, '0', NULL, NULL, NULL, NULL, '0', '2021-02-03 11:07:36', '2021-02-03 11:07:23'),
(53, 'df4a4808-6869-490c-b46d-1ae07faae372', 75, 'Broadcasttest', NULL, '5325955203224,5866269933720', NULL, '2021-02-06T04:59:47.000Z', '0', 'upload/1612501185779_channel (3).png', NULL, NULL, '0', NULL, 1, 'FORI Products Store\n#345, Tribune Market, 23 SCO\nCalifornia, 450001\nUSA', NULL, '0', '2021-02-05 05:02:39', '2021-02-05 05:02:26'),
(54, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 76, 'abcd', NULL, NULL, NULL, '2021-02-25T11:34:46.000Z', '0', 'upload/1612524826864_channel (3).png', NULL, NULL, '0', NULL, 1, '', '#fori,#video,#products,#live,#sell', '0', '2021-02-05 11:34:59', '2021-02-05 11:34:59'),
(55, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 77, 'teststream', NULL, '5866276749464,5707091509400,5835130634392', NULL, '2021-03-17T14:32:45.000Z', '0', 'upload/1612535670609_Het_helal_diamond_painting.jpg', NULL, NULL, '0', NULL, 1, 'Fori Store Kindle\n#456, Tribune Market. Near Alksa\nCalifornia, 7300001\nUSA', 'products,sell,latest,newitems', '0', '2021-02-05 14:36:30', '2021-02-05 14:36:21'),
(56, 'df4a4808-6869-490c-b46d-1ae07faae372', 78, 'dsfsad', NULL, '5866269933720,5325955203224', NULL, '2021-02-18T06:58:20.000Z', '0', 'upload/1612767495403_Specials Mobile Banner.jpg', NULL, NULL, '0', NULL, 0, '', '', '0', '2021-02-08 06:58:26', '2021-02-08 06:58:22'),
(57, 'df4a4808-6869-490c-b46d-1ae07faae372', 79, 'testabc', NULL, '5866269933720,5325955203224', NULL, '2021-02-25T09:42:57.000Z', '0', 'upload/1612777293910_download.png', NULL, NULL, '0', NULL, 1, 'Kay General Store\nSector 8, Chandigarh\n#44566', 'latest,products,sell', '0', '2021-02-08 09:43:08', '2021-02-08 09:43:04'),
(58, '8c994b5c-f38f-4019-a422-2b7b067905d9', 80, 'newtestBroadast', NULL, '5866269933720,5835130634392,5866280812696', NULL, '2021-02-28T11:13:46.000Z', '0', 'upload/1613132044561_istockphoto-1130065303-612x612.jpg', NULL, NULL, '0', NULL, 1, 'Fori Lash Store\nNew Colony, It park\nChandigarh\n#4345456', 'sell,products,anything', '0', '2021-02-12 12:15:02', '2021-02-12 12:14:57'),
(59, '67417bbd-cc3b-44cf-9cf2-3cfc1700d963', 81, 'newmarchantaccount', NULL, '5325955203224', NULL, '2021-02-24T12:34:44.000Z', '0', 'upload/1613133274162_istockphoto-1130065303-612x612.jpg', NULL, NULL, '0', NULL, 0, '', 'new', '0', '2021-02-12 12:34:53', '2021-02-12 12:34:50'),
(60, 'df4a4808-6869-490c-b46d-1ae07faae372', 82, 'sdfgsdfg', NULL, 'NaN', NULL, '2021-02-17T08:25:15.766Z', '0', 'upload/1613550311797_Welcome-to-FORI-.png', NULL, NULL, '0', NULL, 0, '', '', '0', '2021-02-19 09:35:28', '2021-02-17 08:25:18'),
(61, 'df4a4808-6869-490c-b46d-1ae07faae372', 82, 'sdfgsdfg', NULL, NULL, NULL, '2021-02-22T18:30:00.000Z', '0', 'upload/1613550311797_Welcome-to-FORI-.png', NULL, NULL, '0', NULL, 1, 'jkghjgh', '', '0', '2021-02-19 09:57:23', '2021-02-19 09:57:23'),
(62, 'df4a4808-6869-490c-b46d-1ae07faae372', 83, 'Testnew', NULL, '5325955203224,5866269933720', NULL, '2021-02-24T09:58:42.000Z', '0', 'upload/1613728701760_1 (5).png', NULL, NULL, '0', NULL, 0, '', '', '1', '2021-03-04 18:33:37', '2021-02-19 09:58:47'),
(63, 'df4a4808-6869-490c-b46d-1ae07faae372', 83, 'Testnew', NULL, NULL, NULL, '2021-02-24T09:58:42.000Z', '0', 'upload/1613728701760_1 (5).png', NULL, NULL, '0', NULL, 1, 'it parck chandiagrhj', '', '1', '2021-03-04 18:33:37', '2021-02-19 09:59:35'),
(64, 'df4a4808-6869-490c-b46d-1ae07faae372', 83, 'Testnew', NULL, NULL, NULL, '2021-02-24T09:58:42.000Z', '0', 'upload/1613728701760_1 (5).png', NULL, NULL, '0', NULL, 0, '', '', '1', '2021-03-04 18:33:37', '2021-02-19 10:01:36'),
(65, 'df4a4808-6869-490c-b46d-1ae07faae372', 83, 'Testnew', NULL, NULL, NULL, '2021-02-24T09:58:42.000Z', '0', 'upload/1613728701760_1 (5).png', NULL, NULL, '0', NULL, 0, '', 'tes', '1', '2021-03-04 18:33:37', '2021-02-19 10:04:07'),
(66, 'df4a4808-6869-490c-b46d-1ae07faae372', 83, 'Testnew', NULL, NULL, NULL, '2021-02-24T09:58:42.000Z', '0', 'upload/1613728701760_1 (5).png', NULL, NULL, '0', NULL, 1, 'sdfgsdfhsf', 'tes,new', '1', '2021-03-04 18:33:37', '2021-02-19 10:04:24'),
(67, 'df4a4808-6869-490c-b46d-1ae07faae372', 84, 'dfsgsdf', NULL, '5866269933720,5325955203224,5835130634392,5866280812696', NULL, '2021-02-19T11:10:52.023Z', '0', 'upload/1613733034805_Vision-Care-SG-–-A-nutritional-additive-that-will-help-you-achieve-a-balanced-diet-and-provide-efficient-daily-eye-care.png', NULL, NULL, '0', NULL, 1, 'It Park Chandigarj', '\'sdfg\',\'ghjfghjfhh\',\'test\',\'yes\'', '0', '2021-02-19 12:41:34', '2021-02-19 11:11:10'),
(68, 'df4a4808-6869-490c-b46d-1ae07faae372', 83, 'Testnew', NULL, NULL, NULL, '2021-02-24T09:58:42.000Z', '0', 'upload/1613728701760_1 (5).png', NULL, NULL, '0', NULL, 0, '', 'tes,new,sdf,dfsdf', '1', '2021-03-04 18:33:37', '2021-02-19 11:40:10'),
(69, 'df4a4808-6869-490c-b46d-1ae07faae372', 83, 'Testnew', NULL, '5325955203224,5866269933720,5835130634392,5866280812696', NULL, '2021-02-24T09:58:42.000Z', '0', 'upload/1613728701760_1 (5).png', NULL, NULL, '0', NULL, 0, '', 'tes,new,sdf,dfsdf,shilpa', '1', '2021-03-04 18:33:37', '2021-02-19 11:50:43'),
(70, 'df4a4808-6869-490c-b46d-1ae07faae372', 85, 'new fori test', NULL, '5325955203224,5866269933720,5835130634392,5866280812696', NULL, '2021-02-28T12:57:48.000Z', '0', 'upload/1613739427417_1 (5).png', NULL, NULL, '0', NULL, 1, 'Fori product Store\nChandigarh IT Park\n7465845', 'test,new,fori', '0', '2021-02-19 12:57:58', '2021-02-19 12:57:53'),
(73, 'df4a4808-6869-490c-b46d-1ae07faae372', 86, 'Coming Soon Broadcast Channel', NULL, '6087166623896,5866280812696,5325955203224,5835130634392,6087166623896,5866276749464,5866280812696,5866280812696,6087166623896,5835130634392,5707091509400,5866269933720', NULL, '2021-03-30T15:30:00.000Z', '0', 'upload/1614757779191_f2.jpg', NULL, NULL, '0', NULL, 1, 'it park chanedigarh\nfori store pvt', 'fori,test', '0', '2021-03-05 09:59:57', '2021-03-03 07:49:52'),
(76, 'df4a4808-6869-490c-b46d-1ae07faae372', 85, 'new fori test yo', NULL, '6087166623896,5325955203224,5866280812696,5866276749464,5866280812696,5835130634392', NULL, '2021-03-04T18:30:00.000Z', '0', 'upload/1613739427417_1 (5).png', NULL, NULL, '0', NULL, 0, '', 'test,new,fori,latest,sell', '0', '2021-03-04 12:33:01', '2021-03-04 07:30:23'),
(80, 'df4a4808-6869-490c-b46d-1ae07faae372', 85, 'New One', NULL, NULL, NULL, '2021-03-04T18:30:00.000Z', '0', 'upload/1613739427417_1 (5).png', NULL, NULL, '0', NULL, 0, '', 'test,new,fori,latest,sell', '0', '2021-03-04 12:41:20', '2021-03-04 12:41:20'),
(81, 'df4a4808-6869-490c-b46d-1ae07faae372', 85, 'New One', NULL, NULL, NULL, '2021-03-04T18:30:00.000Z', '0', 'upload/1613739427417_1 (5).png', NULL, NULL, '0', NULL, 0, '', 'test,new,fori,latest,sell', '0', '2021-03-04 12:43:33', '2021-03-04 12:43:33'),
(83, 'df4a4808-6869-490c-b46d-1ae07faae372', 89, '65', NULL, '5835130634392,5866280812696,5866269933720', NULL, '2021-03-10T19:34:29.000Z', '0', 'upload/1614886469790_channel (2).png', NULL, NULL, '0', NULL, 0, '', '', '1', '2021-03-05 03:05:04', '2021-03-04 19:34:35'),
(84, 'df4a4808-6869-490c-b46d-1ae07faae372', 90, 'Test one', NULL, '6087166623896,5866276749464,5325955203224,5866269933720,5835130634392,5866280812696', NULL, '2021-03-23T19:40:21.000Z', '0', 'upload/1614886821987_channel (1).png', NULL, NULL, '0', NULL, 0, '', '', '1', '2021-03-05 03:29:44', '2021-03-04 19:40:30'),
(85, 'df4a4808-6869-490c-b46d-1ae07faae372', 91, 'Broad', NULL, '6087166623896,5707091509400,5866269933720,5835130634392,5866276749464,5866280812696', NULL, '2021-03-25T03:12:59.000Z', '0', 'upload/1614913977619_Vision-Care-SG-–-A-nutritional-additive-that-will-help-you-achieve-a-balanced-diet-and-provide-efficient-daily-eye-care.png', NULL, NULL, '0', NULL, 0, '', '', '1', '2021-03-05 03:28:07', '2021-03-05 03:13:03'),
(86, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', 92, 'FORI Demo Broadcast', NULL, '6565929123991,6565966020759', NULL, '2021-03-15T06:00:05.000Z', '0', 'upload/1614922253129_STORE IMG.jpg', NULL, NULL, '0', NULL, 0, '', 'FORI,DEMO', '0', '2021-03-05 05:40:33', '2021-03-05 05:37:25'),
(87, 'df4a4808-6869-490c-b46d-1ae07faae372', 108, 'testing broadcast new channel', NULL, '5866269933720,5835130634392,5866280812696,5866276749464', NULL, '2021-03-31T13:06:17.000Z', '0', 'upload/1615469327675_bannerImage.png', NULL, NULL, '0', NULL, 0, '', '', '0', '2021-03-11 13:29:08', '2021-03-11 13:06:29'),
(88, 'df4a4808-6869-490c-b46d-1ae07faae372', 111, 'testdemo Broadcast', NULL, '5866276749464,5866280812696,5835130634392', NULL, '2021-03-31T13:30:32.000Z', '0', 'upload/1615987768473_bannerImage.png', NULL, NULL, '0', NULL, 0, '', '', '0', '2021-03-17 13:29:46', '2021-03-17 13:29:40');

-- --------------------------------------------------------

--
-- Table structure for table `ll_shipping_fee`
--

CREATE TABLE `ll_shipping_fee` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `shipping_fee` decimal(16,2) NOT NULL DEFAULT '0.00',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_shipping_fee`
--

INSERT INTO `ll_shipping_fee` (`id`, `user_id`, `shipping_fee`, `update_date`, `create_create`) VALUES
(1, 'df4a4808-6869-490c-b46d-1ae07faae372', '4.00', '2021-03-03 18:41:34', '2021-02-18 12:27:42'),
(2, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', '5.00', '2021-02-22 05:16:53', '2021-02-22 05:16:53'),
(4, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', '10.00', '2021-03-05 05:53:37', '2021-03-05 05:53:37');

-- --------------------------------------------------------

--
-- Table structure for table `ll_shipping_fee_log`
--

CREATE TABLE `ll_shipping_fee_log` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `shipping_fee` decimal(16,2) NOT NULL DEFAULT '0.00',
  `create_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_shipping_fee_log`
--

INSERT INTO `ll_shipping_fee_log` (`id`, `user_id`, `shipping_fee`, `create_create`) VALUES
(1, 'df4a4808-6869-490c-b46d-1ae07faae372', '5.00', '2021-02-18 12:27:42'),
(2, 'df4a4808-6869-490c-b46d-1ae07faae372', '6.00', '2021-02-18 12:36:01'),
(3, 'df4a4808-6869-490c-b46d-1ae07faae372', '6.00', '2021-02-18 12:41:45'),
(4, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', '5.00', '2021-02-22 05:16:53'),
(5, 'df4a4808-6869-490c-b46d-1ae07faae372', '5.00', '2021-02-27 18:03:00'),
(6, 'df4a4808-6869-490c-b46d-1ae07faae372', '10.00', '2021-02-27 18:11:24'),
(7, 'df4a4808-6869-490c-b46d-1ae07faae372', '5.00', '2021-02-27 18:19:18'),
(8, 'df4a4808-6869-490c-b46d-1ae07faae372', '5.00', '2021-03-01 13:58:32'),
(9, 'df4a4808-6869-490c-b46d-1ae07faae372', '6.00', '2021-03-01 14:01:18'),
(10, 'df4a4808-6869-490c-b46d-1ae07faae372', '5.00', '2021-03-01 14:28:09'),
(11, 'df4a4808-6869-490c-b46d-1ae07faae372', '5.00', '2021-03-02 05:38:37'),
(12, 'df4a4808-6869-490c-b46d-1ae07faae372', '5.00', '2021-03-02 05:39:31'),
(13, 'df4a4808-6869-490c-b46d-1ae07faae372', '0.00', '2021-03-03 13:54:13'),
(14, 'df4a4808-6869-490c-b46d-1ae07faae372', '0.00', '2021-03-03 13:54:15'),
(15, 'df4a4808-6869-490c-b46d-1ae07faae372', '4.00', '2021-03-03 18:41:34'),
(16, '7f38832f-9cb4-444e-8bf7-cebc69324931', '10.00', '2021-03-04 11:57:26'),
(17, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', '10.00', '2021-03-05 05:53:37'),
(18, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', '10.00', '2021-03-05 05:53:55');

-- --------------------------------------------------------

--
-- Table structure for table `ll_shopify_auth`
--

CREATE TABLE `ll_shopify_auth` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) DEFAULT NULL,
  `store_name` varchar(256) DEFAULT NULL,
  `public_key` varchar(256) DEFAULT NULL,
  `private_key` varchar(256) DEFAULT NULL,
  `res_data` mediumtext,
  `status` int(11) DEFAULT '1',
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_shopify_auth`
--

INSERT INTO `ll_shopify_auth` (`id`, `user_id`, `store_name`, `public_key`, `private_key`, `res_data`, `status`, `update_date`, `create_date`) VALUES
(24, 'e5172339-c80e-499f-9d99-dc19797e3cc0', 'velardicandles', '07ad203bf9b4eb1805bc0f866d5bf831', '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', '{\"id\":40771190936,\"name\":\"velardicandles\",\"email\":\"houseofvelardi@gmail.com\",\"domain\":\"houseofvelardi.com\",\"province\":\"New South Wales\",\"country\":\"AU\",\"address1\":\"45 Torwood Avenue\",\"zip\":\"3150\",\"city\":\"Glen Waverley\",\"source\":null,\"phone\":\"2563694521\",\"latitude\":-37.8817104,\"longitude\":145.1873913,\"primary_locale\":\"en\",\"address2\":\"\",\"created_at\":\"2020-06-04T18:11:55-05:00\",\"updated_at\":\"2020-10-02T07:47:33-05:00\",\"country_code\":\"AU\",\"country_name\":\"Australia\",\"currency\":\"AUD\",\"customer_email\":\"houseofvelardi@gmail.com\",\"timezone\":\"(GMT-06:00) America/Chicago\",\"iana_timezone\":\"America/Chicago\",\"shop_owner\":\"Lisa Velardi\",\"money_format\":\"${{amount}}\",\"money_with_currency_format\":\"${{amount}} AUD\",\"weight_unit\":\"kg\",\"province_code\":\"NSW\",\"taxes_included\":false,\"auto_configure_tax_inclusivity\":null,\"tax_shipping\":null,\"county_taxes\":true,\"plan_display_name\":\"Basic Shopify\",\"plan_name\":\"basic\",\"has_discounts\":false,\"has_gift_cards\":false,\"myshopify_domain\":\"velardicandles.myshopify.com\",\"google_apps_domain\":null,\"google_apps_login_enabled\":null,\"money_in_emails_format\":\"${{amount}}\",\"money_with_currency_in_emails_format\":\"${{amount}} AUD\",\"eligible_for_payments\":true,\"requires_extra_payments_agreement\":false,\"password_enabled\":false,\"has_storefront\":true,\"eligible_for_card_reader_giveaway\":false,\"finances\":true,\"primary_location_id\":47750709400,\"cookie_consent_level\":\"implicit\",\"visitor_tracking_consent_preference\":\"allow_all\",\"force_ssl\":true,\"checkout_api_supported\":true,\"multi_location_enabled\":true,\"setup_required\":false,\"pre_launch_enabled\":false,\"enabled_presentment_currencies\":[\"AUD\"]}', 1, '2021-01-30 09:01:13', '2021-01-30 09:01:13'),
(33, 'df4a4808-6869-490c-b46d-1ae07faae372', 'velardicandles', '07ad203bf9b4eb1805bc0f866d5bf831', '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', '{\"id\":40771190936,\"name\":\"velardicandles\",\"email\":\"houseofvelardi@gmail.com\",\"domain\":\"houseofvelardi.com\",\"province\":\"New South Wales\",\"country\":\"AU\",\"address1\":\"45 Torwood Avenue\",\"zip\":\"3150\",\"city\":\"Glen Waverley\",\"source\":null,\"phone\":\"2563694521\",\"latitude\":-37.8817104,\"longitude\":145.1873913,\"primary_locale\":\"en\",\"address2\":\"\",\"created_at\":\"2020-06-04T18:11:55-05:00\",\"updated_at\":\"2021-02-18T15:30:21-06:00\",\"country_code\":\"AU\",\"country_name\":\"Australia\",\"currency\":\"AUD\",\"customer_email\":\"houseofvelardi@gmail.com\",\"timezone\":\"(GMT-06:00) America/Chicago\",\"iana_timezone\":\"America/Chicago\",\"shop_owner\":\"Lisa Velardi\",\"money_format\":\"${{amount}}\",\"money_with_currency_format\":\"${{amount}} AUD\",\"weight_unit\":\"kg\",\"province_code\":\"NSW\",\"taxes_included\":false,\"auto_configure_tax_inclusivity\":null,\"tax_shipping\":null,\"county_taxes\":true,\"plan_display_name\":\"Basic Shopify\",\"plan_name\":\"basic\",\"has_discounts\":true,\"has_gift_cards\":false,\"myshopify_domain\":\"velardicandles.myshopify.com\",\"google_apps_domain\":null,\"google_apps_login_enabled\":null,\"money_in_emails_format\":\"${{amount}}\",\"money_with_currency_in_emails_format\":\"${{amount}} AUD\",\"eligible_for_payments\":true,\"requires_extra_payments_agreement\":false,\"password_enabled\":false,\"has_storefront\":true,\"eligible_for_card_reader_giveaway\":false,\"finances\":true,\"primary_location_id\":47750709400,\"cookie_consent_level\":\"implicit\",\"visitor_tracking_consent_preference\":\"allow_all\",\"force_ssl\":true,\"checkout_api_supported\":true,\"multi_location_enabled\":true,\"setup_required\":false,\"pre_launch_enabled\":false,\"enabled_presentment_currencies\":[\"AUD\"]}', 1, '2021-02-25 07:24:57', '2021-02-25 07:24:57'),
(34, '21e55f2c-b0b5-4f54-adef-0089b20eb35b', 'velardicandles', '07ad203bf9b4eb1805bc0f866d5bf831', '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', '{\"id\":40771190936,\"name\":\"velardicandles\",\"email\":\"houseofvelardi@gmail.com\",\"domain\":\"houseofvelardi.com\",\"province\":\"New South Wales\",\"country\":\"AU\",\"address1\":\"45 Torwood Avenue\",\"zip\":\"3150\",\"city\":\"Glen Waverley\",\"source\":null,\"phone\":\"2563694521\",\"latitude\":-37.8817104,\"longitude\":145.1873913,\"primary_locale\":\"en\",\"address2\":\"\",\"created_at\":\"2020-06-04T18:11:55-05:00\",\"updated_at\":\"2021-02-18T15:30:21-06:00\",\"country_code\":\"AU\",\"country_name\":\"Australia\",\"currency\":\"AUD\",\"customer_email\":\"houseofvelardi@gmail.com\",\"timezone\":\"(GMT-06:00) America/Chicago\",\"iana_timezone\":\"America/Chicago\",\"shop_owner\":\"Lisa Velardi\",\"money_format\":\"${{amount}}\",\"money_with_currency_format\":\"${{amount}} AUD\",\"weight_unit\":\"kg\",\"province_code\":\"NSW\",\"taxes_included\":false,\"auto_configure_tax_inclusivity\":null,\"tax_shipping\":null,\"county_taxes\":true,\"plan_display_name\":\"Basic Shopify\",\"plan_name\":\"basic\",\"has_discounts\":true,\"has_gift_cards\":false,\"myshopify_domain\":\"velardicandles.myshopify.com\",\"google_apps_domain\":null,\"google_apps_login_enabled\":null,\"money_in_emails_format\":\"${{amount}}\",\"money_with_currency_in_emails_format\":\"${{amount}} AUD\",\"eligible_for_payments\":true,\"requires_extra_payments_agreement\":false,\"password_enabled\":false,\"has_storefront\":true,\"eligible_for_card_reader_giveaway\":false,\"finances\":true,\"primary_location_id\":47750709400,\"cookie_consent_level\":\"implicit\",\"visitor_tracking_consent_preference\":\"allow_all\",\"force_ssl\":true,\"checkout_api_supported\":true,\"multi_location_enabled\":true,\"setup_required\":false,\"pre_launch_enabled\":false,\"enabled_presentment_currencies\":[\"AUD\"]}', 1, '2021-03-04 04:05:04', '2021-03-04 04:05:04'),
(35, '7f38832f-9cb4-444e-8bf7-cebc69324931', 'nga-creations', '4459422a2d30322ccdbe91b668040169', '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', '{\"id\":55027564695,\"name\":\"NGA Creations\",\"email\":\"nehagulatikbs@gmail.com\",\"domain\":\"nga-creations.myshopify.com\",\"province\":\"California\",\"country\":\"US\",\"address1\":\"8 Strawberry Ave. \",\"zip\":\"90006\",\"city\":\"Los Angeles\",\"source\":null,\"phone\":\"9815954816\",\"latitude\":34.0470832,\"longitude\":-118.2965121,\"primary_locale\":\"en\",\"address2\":\"\",\"created_at\":\"2021-03-03T13:29:30+05:30\",\"updated_at\":\"2021-03-03T13:55:07+05:30\",\"country_code\":\"US\",\"country_name\":\"United States\",\"currency\":\"USD\",\"customer_email\":\"nehagulatikbs@gmail.com\",\"timezone\":\"(GMT+05:30) Asia/Calcutta\",\"iana_timezone\":\"Asia/Calcutta\",\"shop_owner\":\"Neha Gulati\",\"money_format\":\"${{amount}}\",\"money_with_currency_format\":\"${{amount}} USD\",\"weight_unit\":\"lb\",\"province_code\":\"CA\",\"taxes_included\":false,\"auto_configure_tax_inclusivity\":null,\"tax_shipping\":null,\"county_taxes\":true,\"plan_display_name\":\"trial\",\"plan_name\":\"trial\",\"has_discounts\":false,\"has_gift_cards\":false,\"myshopify_domain\":\"nga-creations.myshopify.com\",\"google_apps_domain\":null,\"google_apps_login_enabled\":null,\"money_in_emails_format\":\"${{amount}}\",\"money_with_currency_in_emails_format\":\"${{amount}} USD\",\"eligible_for_payments\":true,\"requires_extra_payments_agreement\":false,\"password_enabled\":true,\"has_storefront\":true,\"eligible_for_card_reader_giveaway\":true,\"finances\":true,\"primary_location_id\":61042950295,\"cookie_consent_level\":\"implicit\",\"visitor_tracking_consent_preference\":\"allow_all\",\"force_ssl\":true,\"checkout_api_supported\":true,\"multi_location_enabled\":true,\"setup_required\":false,\"pre_launch_enabled\":false,\"enabled_presentment_currencies\":[\"USD\"]}', 1, '2021-03-04 07:17:50', '2021-03-04 07:17:50'),
(36, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', 'nga-creations', '4459422a2d30322ccdbe91b668040169', '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', '{\"id\":55027564695,\"name\":\"NGA Creations\",\"email\":\"nehagulatikbs@gmail.com\",\"domain\":\"nga-creations.myshopify.com\",\"province\":\"California\",\"country\":\"US\",\"address1\":\"8 Strawberry Ave. \",\"zip\":\"90006\",\"city\":\"Los Angeles\",\"source\":null,\"phone\":\"9815954816\",\"latitude\":34.0470832,\"longitude\":-118.2965121,\"primary_locale\":\"en\",\"address2\":\"\",\"created_at\":\"2021-03-03T13:29:30+05:30\",\"updated_at\":\"2021-03-03T13:55:07+05:30\",\"country_code\":\"US\",\"country_name\":\"United States\",\"currency\":\"USD\",\"customer_email\":\"nehagulatikbs@gmail.com\",\"timezone\":\"(GMT+05:30) Asia/Calcutta\",\"iana_timezone\":\"Asia/Calcutta\",\"shop_owner\":\"Neha Gulati\",\"money_format\":\"${{amount}}\",\"money_with_currency_format\":\"${{amount}} USD\",\"weight_unit\":\"lb\",\"province_code\":\"CA\",\"taxes_included\":false,\"auto_configure_tax_inclusivity\":null,\"tax_shipping\":null,\"county_taxes\":true,\"plan_display_name\":\"trial\",\"plan_name\":\"trial\",\"has_discounts\":true,\"has_gift_cards\":false,\"myshopify_domain\":\"nga-creations.myshopify.com\",\"google_apps_domain\":null,\"google_apps_login_enabled\":null,\"money_in_emails_format\":\"${{amount}}\",\"money_with_currency_in_emails_format\":\"${{amount}} USD\",\"eligible_for_payments\":true,\"requires_extra_payments_agreement\":false,\"password_enabled\":true,\"has_storefront\":true,\"eligible_for_card_reader_giveaway\":true,\"finances\":true,\"primary_location_id\":61042950295,\"cookie_consent_level\":\"implicit\",\"visitor_tracking_consent_preference\":\"allow_all\",\"force_ssl\":true,\"checkout_api_supported\":true,\"multi_location_enabled\":true,\"setup_required\":false,\"pre_launch_enabled\":false,\"enabled_presentment_currencies\":[\"USD\"]}', 1, '2021-03-05 05:10:00', '2021-03-05 05:10:00');

-- --------------------------------------------------------

--
-- Table structure for table `ll_subscription`
--

CREATE TABLE `ll_subscription` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `customerID` varchar(256) NOT NULL,
  `subscriptionId` varchar(256) NOT NULL,
  `current_period_end` int(11) NOT NULL,
  `current_period_start` int(11) NOT NULL,
  `planID` varchar(256) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `plan_interval` varchar(256) NOT NULL,
  `product` varchar(256) NOT NULL,
  `livemode` tinyint(1) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_subscription`
--

INSERT INTO `ll_subscription` (`id`, `user_id`, `customerID`, `subscriptionId`, `current_period_end`, `current_period_start`, `planID`, `amount`, `plan_interval`, `product`, `livemode`, `status`, `update_date`, `create_date`) VALUES
(8, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J29qLadQEtRAhM', 'sub_J29qomVaWDCdsB', 1617259625, 1614581225, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 07:17:21', '2021-03-01 06:47:07'),
(9, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2AbOcM4jk4YP5', 'sub_J2AbDm45tTvHst', 1617262427, 1614584027, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 08:30:21', '2021-03-01 07:33:50'),
(10, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2Ao68g43G2vYh', 'sub_J2Aono8FXDsMQb', 1617263224, 1614584824, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 08:30:21', '2021-03-01 07:47:06'),
(11, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2Asoqd0hYFQ7e', 'sub_J2AsM2hcJMfcID', 1617263425, 1614585025, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 08:30:21', '2021-03-01 07:50:27'),
(12, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2BIbjxQ6jVnLa', 'sub_J2BIqQohEyMvkf', 1617264987, 1614586587, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 08:30:21', '2021-03-01 08:16:29'),
(13, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2CNtclrNNsLs2', 'sub_J2CNcyF1gxL4UZ', 1617269009, 1614590609, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 09:25:34', '2021-03-01 09:23:31'),
(14, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2CbPELCXTB1yF', 'sub_J2Cb8Rxhh5c0KI', 1617269853, 1614591453, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 09:40:50', '2021-03-01 09:37:35'),
(15, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2CfydvVpA1td3', 'sub_J2CfBHjiGRKbOy', 1617270099, 1614591699, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 13:58:44', '2021-03-01 09:41:41'),
(16, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2GrGYrYI2ecWj', 'sub_J2Gr3dVYmJRcA5', 1617285717, 1614607317, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-01 14:27:20', '2021-03-01 14:01:59'),
(17, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2HI8a5ANxBFeq', 'sub_J2HInLCYHJt0OI', 1617287321, 1614608921, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-02 05:54:47', '2021-03-01 14:28:44'),
(18, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2WIpn6BD8cC1T', 'sub_J2WIi5OnG5gxyI', 1617343146, 1614664746, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-02 06:21:51', '2021-03-02 05:59:07'),
(19, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2Wi5in461RLjX', 'sub_J2WiJSIKhIKwaR', 1617344671, 1614666271, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-02 06:26:10', '2021-03-02 06:24:33'),
(20, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2XKX8bSjx6Key', 'sub_J2XKUohcGMGy7O', 1617346995, 1614668595, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-02 09:40:27', '2021-03-02 07:03:17'),
(21, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2ZtSJ6vAlf6ld', 'sub_J2ZtWECjiNBNhv', 1617356520, 1614678120, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-02 13:56:12', '2021-03-02 09:42:02'),
(22, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J2e91LRtYXBMja', 'sub_J2e9YxRGKQb6zt', 1617372362, 1614693962, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-03 04:57:39', '2021-03-02 14:06:05'),
(23, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J31DvXxbFVvmtw', 'sub_J31De8ZVdKz3Wc', 1617458166, 1614779766, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '0', '2021-03-09 12:04:32', '2021-03-03 13:56:08'),
(24, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', 'cus_J3dUVj4D2KWcZd', 'sub_J3dUCqBNLenLsh', 1617600521, 1614922121, 'price_1INyovGm48tZv82d7EGvS4Y1', '99', 'month', 'prod_IzymajRGYUtoVN', 0, '1', '2021-03-05 05:28:43', '2021-03-05 05:28:43');

-- --------------------------------------------------------

--
-- Table structure for table `ll_users`
--

CREATE TABLE `ll_users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `sponsor_id` varchar(100) NOT NULL DEFAULT '',
  `invitation_code` varchar(256) DEFAULT NULL,
  `strip_id` varchar(255) NOT NULL DEFAULT '0',
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `profile_pic` varchar(256) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT 'Male',
  `dob` varchar(100) DEFAULT NULL,
  `city` varchar(256) DEFAULT NULL,
  `state` varchar(256) DEFAULT NULL,
  `country` int(11) DEFAULT '1',
  `user_type` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '0= user, 1 =marchant, 2,both',
  `isAdmin` enum('0','1') NOT NULL DEFAULT '0',
  `active` int(11) DEFAULT '0',
  `social_id` varchar(256) DEFAULT NULL,
  `social_type` enum('manual','fb','FACEBOOK','GOOGLE') NOT NULL DEFAULT 'manual',
  `isPay_account` enum('0','1') NOT NULL DEFAULT '0',
  `isSubscribed` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0= No, 1 =Yes',
  `activation_code` varchar(256) DEFAULT NULL,
  `two_fa_actived` enum('0','1') NOT NULL DEFAULT '0',
  `security_question` enum('0','1') NOT NULL DEFAULT '0',
  `isDelete` enum('0','1') NOT NULL DEFAULT '0',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `crdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_users`
--

INSERT INTO `ll_users` (`id`, `user_id`, `sponsor_id`, `invitation_code`, `strip_id`, `username`, `email`, `password`, `first_name`, `last_name`, `phone`, `profile_pic`, `gender`, `dob`, `city`, `state`, `country`, `user_type`, `isAdmin`, `active`, `social_id`, `social_type`, `isPay_account`, `isSubscribed`, `activation_code`, `two_fa_actived`, `security_question`, `isDelete`, `update_date`, `crdate`) VALUES
(51, '03aee3e1-f299-4415-b839-520622f8d6f1', '', NULL, '0', 'outlook', 'test.kbs@outlook.com', '$2b$10$oZ4OSkgTMynKg7HAjrpr.uuozdI16LZDEBUCq4EuuibrXoJQfMoDS', 'out', 'look', '988765543322', NULL, 'Male', NULL, NULL, NULL, 64, '0', '0', 1, NULL, 'manual', '0', '0', 'd0c4a5de-9268-45c7-84d4-c3d356939907', '0', '0', '0', '2021-02-04 12:39:40', '2021-02-04 12:39:40'),
(67, '0acfe943-122b-45c0-9cdf-2149ab4dba08', '', NULL, '0', 'chhavi', 'chhavi.garg@kindlebit.com', '$2b$10$NJGLBTi0kXjL6vBZhOcUiOdxwms7wRtrEpQlvJlZ4gqWqEZMEuBiy', 'chhavi', 'Limited', '08563489536', NULL, 'Male', NULL, NULL, NULL, 4, '0', '0', 1, NULL, 'manual', '0', '0', '74ee198e-ee42-4a0f-ab21-5c4ac0efb6fc', '0', '0', '0', '2021-03-05 12:26:50', '2021-03-05 12:26:50'),
(43, '0d02d189-908b-4e6d-bd56-31b882384e66', '', NULL, '0', 'sahil.p', 'sahil.palaha@kindlebit.com', '$2b$10$mWZEgESz2mE8rAxDJsLdOu/A71hBT7HahnHMT.PgWd6dMV1q7HbHe', 'sahil', 'sahil', '9876543210', NULL, 'Male', NULL, NULL, NULL, 97, '0', '0', 1, NULL, 'manual', '0', '0', '10e73578-7cbd-49fe-a147-2c7ca263b241', '0', '0', '0', '2021-01-29 10:35:36', '2021-01-29 10:35:36'),
(11, '1ceb362c-3d35-441b-abd7-55645b8fa533', '', NULL, '0', 'shilpa', 'shilpaa@gmail.com', '$2b$10$rPdSe4G9w9UPPoFYolyz/OejPtJgd.OnmGIe7Tr6SQtQjhCFwp3r.', 'shilpa', 'shilpa', '89465456346534', NULL, 'Male', NULL, NULL, NULL, NULL, '0', '0', 1, '', 'manual', '0', '0', '8608980b-cfe4-4beb-a613-a042237be1ba', '0', '0', '0', '2020-12-22 13:06:01', '2020-12-22 13:06:01'),
(22, '20d7211b-53d3-424f-8644-0380e4c519ab', '', NULL, '0', 'anil', 'shilparana@gmail.com', '$2b$10$/j8yiG5UyPJchFmoy4.jT.QRED9GKaNRqQTht3RAJH7q8s0fki.aS', 'shilpa', 'rana', '454566776756', NULL, 'Male', NULL, NULL, NULL, 13, '0', '0', 1, '', 'manual', '0', '0', '8d3c6789-a69f-4f12-b004-e6c093f089c3', '0', '0', '0', '2021-01-15 14:41:28', '2021-01-15 14:41:28'),
(4, '219d1de0-c23e-4e63-ab3b-6e1d546eee34', '', NULL, '0', 'admin1', 'shilpa@gmail.com1', '$2b$10$F/a1iP38zNe0KBnNfabH/O5Yj7bS/ic7fGkB4HvaI2aTl6mi/MAsC', 'fgsfg', 'sdfgsd', '4545245', NULL, 'Male', '2013-01-30', NULL, NULL, NULL, '0', '0', 1, '', 'manual', '0', '0', 'd136eddc-a5e0-45d8-abc9-930073c486f7', '0', '0', '0', '2021-02-01 13:45:43', '2020-11-26 10:20:17'),
(61, '21e55f2c-b0b5-4f54-adef-0089b20eb35b', '', NULL, '0', 'testone', 'testone@yopmail.com', '$2b$10$Ia7Ie.5x1Cf2DDBTRQAkdeIcGh1DwC3LQVfKZ8WVfZJfimCZKsh4.', 'test', 'one', '988765543322', NULL, 'Male', NULL, NULL, NULL, 14, '1', '0', 1, NULL, 'manual', '0', '0', 'a6c1815b-7da3-4529-932a-b37b12a08354', '0', '0', '0', '2021-03-04 04:01:43', '2021-03-04 04:01:43'),
(5, '2c4c7147-9830-42d7-9d6a-5fa32f61a604', '', NULL, '0', 'admin23', 'shilpa1@gmail.com', '$2b$10$lN40C69FN5fyLZ6vM8XoBuEsATgh7q37tMcgQmN3GoerqwEkZUA6i', 'fgsfg', 'sdfgsd', '4545245', NULL, 'Male', NULL, NULL, NULL, 5, '0', '0', 0, '', 'manual', '0', '0', 'e472888b-3ec4-4598-8fba-5fd3994767f4', '0', '0', '1', '2021-02-01 13:46:56', '2020-11-26 11:07:24'),
(69, '33a4e2b5-576f-42a6-a7cc-c66b0954a207', '', NULL, '0', 'testtwo', 'testtwo@yopmail.com', '$2b$10$a6eq7a25ALBiCdS3TwdCaOd8kKMmznS4d5FVkTvLqImfwZnI5TCxy', 'test', 'two', '1234567890', NULL, 'Male', NULL, NULL, NULL, 209, '0', '0', 1, NULL, 'manual', '0', '0', '935ed710-e9ca-4d48-b5c9-0b0f70f362b3', '0', '0', '0', '2021-03-05 12:53:54', '2021-03-05 12:39:14'),
(39, '3a4fa59d-764d-42b7-99b7-d74d0156a47b', '', NULL, '0', 'Shilpa Rana', 'shilparana006@gmail.com', NULL, 'Shilpa', 'Rana', NULL, 'https://lh3.googleusercontent.com/a-/AOh14GgpUuml9wbqa1cf3Gp-4nmzwNF3WmABdgEFio5Y=s96-c', 'Male', NULL, NULL, NULL, 1, '0', '0', 1, '110336312770785815857', 'GOOGLE', '0', '1', 'cc03fad2-fd67-4589-8634-8e25ffa1c014', '0', '0', '0', '2021-02-27 18:05:38', '2021-01-27 10:34:51'),
(8, '3c91d87b-b830-4c3a-88a7-eabf0a4e22cd', '', NULL, '0', '54564', 'shi564@gmail.com', '$2b$10$CeXoUJwhBTqMQX8wZxw.Ney5HxeRsenA2riL3cU01RTLykaeSymeS', 'fgsfgtur', 'sdfgsdt', NULL, NULL, 'Male', '2021-01-29', NULL, NULL, 17, '0', '0', 1, '', 'manual', '0', '0', '7f58ec34-8e68-489c-897f-3906e9ba9730', '0', '0', '1', '2021-01-29 14:08:27', '2020-11-26 11:46:26'),
(21, '3cae0997-2d2e-4a90-bf00-ea3be436d87a', '', NULL, '0', 'neha', 'neha@gmail.com', '$2b$10$P4.4aXdB3xUqAPQ55.NPIOvnzDmssSvk9JIr42s/At6ZI6vMWlo52', 'neha', 'Gulati', '45645647657', 'https://fori.kindlebit.com/upload/profile/1610631319224_Water-For-Life-USA-EOS-Water-Ionizers-Water-for-Life-USA.png', 'Male', NULL, NULL, NULL, 237, '0', '0', 1, '', 'manual', '0', '0', 'fd672952-c6b9-4cf0-847b-5e3cd2bda07e', '0', '0', '0', '2021-01-27 05:10:40', '2021-01-14 13:22:29'),
(49, '4365e606-4950-49d5-81d8-8d06f8d1af45', '', NULL, '0', 'demo3', 'demo3@gmail.com', '$2b$10$8EYVjtJG6qNfHZXYDhWjIOpBwoQ7aYM8vdjrit0CHruqodiC2kRHG', 'demo', 'test1', '988765543322', 'https://fori.kindlebit.com/upload/profile/1612186614177_Untitled.png', 'Male', '2021-01-01', NULL, NULL, 5, '0', '0', 1, NULL, 'manual', '0', '0', '38459ef1-acb9-48f5-a577-bca082394aeb', '0', '0', '0', '2021-02-01 13:36:54', '2021-02-01 13:20:52'),
(17, '49b62a14-11fc-46aa-a9b8-d31e7a955487', '', NULL, '0', 'ani', 'anil@gmail.com', '$2b$10$ps2arW3NVwVJ9fJTIJv0kOo8FQtR/LBoLjkCQ2YVrRwaVsyIpg2.W', 'shilpa', 'rana', '4566545666', NULL, 'Male', NULL, NULL, NULL, 56, '0', '0', 1, '', 'manual', '0', '0', 'cee11fdb-932c-42f2-98b2-e7b3bb3c9da9', '0', '0', '0', '2021-01-14 04:46:01', '2021-01-14 04:46:01'),
(15, '4ae1f2f0-7d5a-4789-ba2b-e9c4b49125b5', '', NULL, '0', 'kindle', 'chhavi@kindlebit.com', '$2b$10$.2dggowgqI4.vxspb8E3I.qcjYOcoXQSJOZh9uIMERqpXyH6o6N1S', 'kbs', 'php', NULL, 'https://fori.kindlebit.com/upload/profile/1610947023892_Contact-Us-Water-for-Life-USA-Water-for-Life-USA.png', 'Male', '2020-07-10', NULL, NULL, 12, '0', '0', 1, '', 'manual', '0', '0', 'a7655149-d59e-4b35-a700-966aa582cd93', '0', '0', '0', '2021-01-27 05:07:43', '2021-01-04 05:55:07'),
(50, '552db251-c1a2-4e9e-a4c0-931b2a51ef1d', '', NULL, '0', 'sanjay12', 'shilpa1111@gmail.com', '$2b$10$SCBnwixgZPt8yHqM6RMCg.9hyPCLvFdltmynkUynVHEiEAX0kEO.K', 'fgsfg', 'sdfgsd', '45452454364', NULL, 'Male', NULL, NULL, NULL, 1, '0', '0', 1, NULL, 'manual', '0', '0', '0aa4ea8b-de23-4269-8242-0d2bd7a2087f', '0', '0', '0', '2021-02-02 06:39:21', '2021-02-02 06:39:21'),
(10, '57270d2d-3217-4398-b40c-b356a153aa76', '', NULL, '0', '45', 'fg@gmail.com', '$2b$10$aEDsuJC7BgBXtQ/E/TGVkOLc/LO5giSbMbej0HOK9/DnUt4UbxCqO', 'fh', 'fgh', '45645', NULL, 'Male', NULL, NULL, NULL, 5, '0', '0', 1, '', 'manual', '0', '0', '2144eb8e-3c00-448a-96e7-5c6c82a9f480', '0', '0', '1', '2021-01-29 12:11:49', '2020-11-27 07:17:21'),
(56, '588f39b9-12b3-4e49-9904-8f95fbc3bb7c', '', NULL, '0', '@marchant', 'marchant@gmai.com', '$2b$10$cb6aDJBpY5h/ZSLL9nuwa.FuWVs.9j/iS8d5hnd3WDTeGZyeLboyG', '@demo', '@lash', '546345674575', NULL, 'Male', NULL, NULL, NULL, 11, '1', '0', 1, NULL, 'manual', '0', '0', 'e7d327e4-fc63-45d6-8567-27f7dd5c733c', '0', '0', '0', '2021-02-12 12:30:43', '2021-02-12 12:30:43'),
(16, '63b0adb4-6603-47cc-8b01-59a574c66041', '', NULL, '0', 'dffg', 'as@gmail.com', '$2b$10$JpxLNsxUzt8789AFU0y93u04Fw6KKb4ATGBs5xJL0XHauN6pHKKrS', 'dfg', 'dfg', '4545245324234', NULL, 'Male', NULL, NULL, NULL, NULL, '0', '0', 0, '', 'manual', '0', '0', '59158cf1-6211-4d57-8112-fc823e56c26e', '0', '0', '1', '2021-02-02 05:56:08', '2021-01-14 04:37:24'),
(12, '64d4910a-e3b8-41ac-aa9c-9d5e4f8f3c7e', '', NULL, '0', 'shilpasdgsd', 'shilpa5a@gmail.com', '$2b$10$LYLKGrkXpheunv8cday9ZelJYyebf57FrKb8RRE6UrmW9SJDP2kpa', 'shilpa', 'shilpa', '89465456346534', NULL, 'Male', NULL, NULL, NULL, NULL, '0', '0', 1, '', 'manual', '0', '0', '13cccb58-fb45-4772-ba5d-bfd08ab1f569', '0', '0', '0', '2020-12-22 13:06:43', '2020-12-22 13:06:43'),
(71, '65ba77ad-5f59-4818-9ada-48c990443e4d', '', NULL, '0', 'MichelleKimb', 'michelle.kimball2@gmail.com', '$2b$10$insZLnUNCPU4qgDSoS0tBefPe2wtFSP/.4sltOoeKH1FGurGR/HLW', 'Michelle', 'Keegan', '6159455160', NULL, 'Male', NULL, NULL, NULL, 218, '0', '0', 1, NULL, 'manual', '0', '0', '723b83bf-6fd0-47e4-b407-125c9ec3484b', '0', '0', '0', '2021-03-08 15:22:22', '2021-03-08 14:10:09'),
(57, '67417bbd-cc3b-44cf-9cf2-3cfc1700d963', '', NULL, '0', '@marchant1', 'marchant1@gmail.com', '$2b$10$nznZ3SXS.sHWBl3RZpj5ouHPXjqC32Devch.WW/C0x/JqnBBYwpA2', '@demo', '@kindle', '90784578790', NULL, 'Male', NULL, NULL, NULL, 1, '1', '0', 1, NULL, 'manual', '1', '0', '05c05603-9fc8-4095-9845-95b819d92ac2', '0', '0', '0', '2021-02-12 12:35:32', '2021-02-12 12:31:32'),
(73, '67aa13d5-40ac-47af-8cd8-0d0ecda75ec3', '', NULL, '0', 'MichelleKeeg', 'michelle.keegan@gmail.com', '$2b$10$BE.CwcM256QHKdz6wDnwRellcsAqRncv7V.foQ6tXhZrRaauqIAVi', 'Michelle', 'Keegan', '6159455334', NULL, 'Male', NULL, NULL, NULL, 218, '0', '0', 1, NULL, 'manual', '0', '0', '056efd8b-fcd2-4d5d-932a-1506c1080f56', '0', '0', '0', '2021-03-19 03:00:51', '2021-03-19 02:59:36'),
(23, '67c01740-29f8-4373-8b4d-ad1a13524cb9', '', NULL, '0', 'demo', 'demo@gmail.com', '$2b$10$Iv5vaYAn9VWozWigVpbhaOpM82fvJ301yv3imnr.YNqLMBXIbxpl.', 'demo', 'test', '90784578790', NULL, 'Male', NULL, NULL, NULL, 11, '0', '0', 1, '', 'manual', '0', '1', '7f0626e8-3440-4cfb-ab9f-2c1939ac15ed', '0', '0', '0', '2021-02-27 18:14:32', '2021-01-16 08:37:50'),
(2, '69e149e9-ad98-42e5-b703-248f4ab274a0', '', NULL, '0', 'lash', 'lash@yopmail.com', '$2b$10$WIUBqyHWU0RpoMsqBMNFXe7oUxDUjVHCZEXpZCBeiWHPWECJggc7K', 'Lash', 'Fori', '9874563210', NULL, 'Male', '2005-02-01', NULL, NULL, NULL, '0', '0', 0, '', 'manual', '0', '0', '62dde518-9c06-49f5-94bd-757838694ccc', '0', '0', '1', '2021-02-01 13:13:26', '2020-11-23 07:08:47'),
(26, '6f1152b5-8d98-48a1-a5fb-da800fd7937e', '', NULL, '0', 'lash2', 'lash12@gmail.com', '$2b$10$Wgsd8xtBJ5uKn6Y7SdeExesEYGAj1QS7Q.m/bDWMdonrxeM1cvNrm', 'lash', 'test', '546345674575', NULL, 'Male', NULL, NULL, NULL, 11, '0', '0', 1, '', 'manual', '0', '0', 'e0e1d244-e728-4a2c-8e3a-b3a800badd82', '0', '0', '0', '2021-01-16 09:17:36', '2021-01-16 09:17:36'),
(62, '77b96db9-3a05-4df4-8386-3e42f75d8670', '', NULL, '0', 'yop123', 'yop123@yopmail.com', '$2b$10$J4US55VQnGrt31czTr0CLeLTTcrC9A/eWW5CdfrreN8By7xLbUYZy', 'tets', 'yop', '556386296789', NULL, 'Male', NULL, NULL, NULL, 7, '1', '0', 0, NULL, 'manual', '0', '0', 'd2cf1a38-8067-44c2-8ba1-fe8e41847b99', '0', '0', '0', '2021-03-05 04:48:30', '2021-03-05 04:48:30'),
(24, '839bb93c-f4fe-48cf-afae-7f709c3b3148', '', NULL, '0', 'testing', 'test@gmail.com', '$2b$10$Y7g5dB2KL0nbHWDnZY.qouxODGt6RpC/ATrIXhihOkZmvuE93B56C', 'demo', 'test', '45345455666', NULL, 'Male', NULL, NULL, NULL, 28, '0', '0', 1, '', 'manual', '0', '0', '0b3a25df-d80e-4c16-9bb1-4c4b6a9b7f84', '0', '0', '0', '2021-01-16 08:45:05', '2021-01-16 08:45:05'),
(55, '8c994b5c-f38f-4019-a422-2b7b067905d9', '', NULL, '0', '@kindle12', 'kindle12@gmail.com', '$2b$10$EmdZNZT19paMSMBQMqhTIuJoO7ybpoXh2aEFO6YpGQomixytCMg7S', '@kindle', '@lash', '43534564753', NULL, 'Male', NULL, NULL, NULL, 27, '1', '0', 1, NULL, 'manual', '1', '0', 'fdba762b-67fe-41a6-a24d-2786fef92e51', '0', '0', '0', '2021-02-12 12:17:10', '2021-02-12 12:09:43'),
(47, '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', '', NULL, '0', 'demo30', 'demo30@yopmail.com', '$2b$10$ySvkSBh6gV9V9.58HW/4JejkCvQWGOj3U8/0OrHoCKmhYYxgajsfy', 'demo', '30', '988765543322', 'https://fori.kindlebit.com/upload/profile/1612031163336_telegram.png', 'Male', '2020-12-31', NULL, NULL, 56, '0', '0', 1, NULL, 'manual', '0', '0', '8239ad10-480f-41d8-bd83-50051e003b87', '0', '0', '0', '2021-01-30 18:48:29', '2021-01-30 18:18:27'),
(19, '8e7ee84a-0ef4-439f-8ee5-151c032a54d7', '', NULL, '0', 'kb', 'kb@gmail.com', '$2b$10$1fmjjvfcl/UEpcl3gE9yqejxWy679yk9z4GFG0bd03joLNIXIRfUy', 'kbs', 'php', '6456675677', NULL, 'Male', NULL, NULL, NULL, 28, '0', '0', 1, '', 'manual', '0', '0', 'db595eb8-f195-4e9b-8d40-abcaa5a80a70', '0', '0', '0', '2021-01-14 05:11:22', '2021-01-14 05:11:22'),
(66, '8fc53ca1-c9b5-4a9d-884c-818930e453b7', '', NULL, '0', 'nandni.chugh', 'nandni.chatrath@gmail.com', '$2b$10$oZDrKQ3kpAMwXcAD2Bwux..SJP8bUTxKIFnq/fGS8Q/oyUnNpr3KC', 'nandni', 'chugh', '324432324324324', NULL, 'Male', NULL, NULL, NULL, 1, '0', '0', 1, NULL, 'manual', '0', '0', '6a05b4df-ade9-4b0d-9806-a0bcbd157596', '0', '0', '0', '2021-03-05 10:21:16', '2021-03-05 10:21:16'),
(18, '93eb898a-218f-4b7a-8144-00dbd300b89f', '', NULL, '0', 'ashok', 'ashok@gmail.com', '$2b$10$7lkSzRONiPqkhQaK9QPveuIg1Z0CcSqISq/cfMpESGPoURvES.xXK', 'ashok1', 'kumar1', NULL, 'https://fori.kindlebit.com/upload/profile/1610599946174_Blog-Water-for-Life-USA-Water-for-Life-USA.png', 'Male', '2021-01-21', NULL, NULL, 56, '0', '0', 1, '', 'manual', '0', '0', 'b6ec1041-83bd-480c-a6a8-3452075fe884', '0', '0', '0', '2021-01-27 05:10:22', '2021-01-14 04:50:53'),
(46, '98ba7036-f1d8-467e-8272-30af8293cfac', '', NULL, '0', 'demojan', 'demojan@yopmail.com', '$2b$10$0ys6KS8uJwyz3b.cw7rsHOJR2ZrFHpcUqBTLgo7NIsCIYiblDuDOW', 'demo', 'jan', '988765543322', NULL, 'Male', NULL, NULL, NULL, 237, '0', '0', 1, NULL, 'manual', '0', '0', 'ea97faf2-0a6c-490e-b7c0-f727ca9625dc', '0', '0', '0', '2021-01-30 18:04:41', '2021-01-30 18:04:41'),
(28, '9c3d78a6-ad30-47ab-b70e-021786f36896', '', NULL, '0', 'gulati', 'gulati@gmail.com', '$2b$10$oqjAsjjH9tB/6.BCStLx9.ALAgrXG/cGCqjnhUiXvLazPcTvcI/vO', 'gulati', 'Neha', '9876400344', NULL, 'Male', NULL, NULL, NULL, 28, '0', '0', 1, '', 'manual', '0', '0', '4dc28c62-fada-432f-b6a3-15dfdbe5b8ae', '0', '0', '0', '2021-01-21 13:07:57', '2021-01-21 13:07:57'),
(52, '9dc9cd45-3e82-4a89-a863-5abd256f026c', '', NULL, '0', 'abcxyz', 'ashokphp89@hotmail.com', '$2b$10$p5vO3HztptPXM2z/ky2ureDaudkclce9P9uSMINrEnXlUM7fIpxTi', 'abc', 'xyz', '988765543322', NULL, 'Male', NULL, NULL, NULL, 72, '0', '0', 1, NULL, 'manual', '0', '0', 'bfa43d9e-ba28-4038-abe8-80799bdecd86', '0', '0', '0', '2021-02-04 13:01:28', '2021-02-04 13:01:28'),
(38, 'a1901c31-4a1d-4c4d-8169-d6c5a3259a5b', '', NULL, '0', 'professional developer', 'dynamitedeveloper@gmail.com', NULL, 'professional', 'developer', NULL, 'https://lh4.googleusercontent.com/-czcklCzZp2g/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnru1HESIPEXlMzw1qLNE1WgQVCMA/s96-c/photo.jpg', 'Male', NULL, NULL, NULL, 5, '0', '0', 1, '118086423198360970707', 'GOOGLE', '0', '0', 'a904df45-77e7-4127-8af3-6a9e4ebf99b9', '0', '0', '0', '2021-01-27 06:16:16', '2021-01-27 06:16:16'),
(48, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', '', NULL, '0', 'Kindlebit Php', 'kindlebit.php@gmail.com', '$2b$10$C6sV31Gh4DFHYcJB2XNGe.tt7ea.G/RhjXHzS7.cApIV3ckZklPkW', 'Kindlebit', 'Php', NULL, 'https://lh3.googleusercontent.com/a-/AOh14GgdyiDqycWruvy4_-ccjPuQpNT2FqAQMcT9ohMy=s96-c', 'Male', NULL, NULL, NULL, 1, '0', '0', 1, '117622325757065877300', 'GOOGLE', '1', '0', '4f3b5c42-1be3-4258-a6c6-53adb95f5e35', '0', '0', '0', '2021-02-12 08:06:20', '2021-02-01 05:40:25'),
(9, 'a839124a-c77e-4ebe-981c-f40fd7fc2d19', '', NULL, '0', 'chavi', 'chavi@gmail.com', '$2b$10$RJFcg76LO9BMIVMYNayazuO1Yc3vZYcUIvU3kARoHLP7uQKvlotRu', 'chavi', 'update', '786', NULL, 'Male', '2010-01-14', NULL, NULL, NULL, '0', '0', 1, '', 'manual', '0', '0', '14e562bb-315f-453a-901f-0bc099991159', '0', '0', '0', '2021-02-01 13:47:28', '2020-11-27 05:28:16'),
(54, 'aff57cd9-7ad1-42c1-8ad4-cba16680a5ff', '', NULL, '0', '@kbb', 'kbb@gmail.com', '$2b$10$cs5oIQXHSbm7pMcESjCkdeqRIIE0eKlj/LYQEw2XsFOxr7PoNW6qu', '@kbs', '@demo', '90784578790', NULL, 'Male', NULL, NULL, NULL, 50, '1', '0', 1, NULL, 'manual', '0', '0', '7b298f4d-dcc8-4f36-ba8e-2585224ba49e', '0', '0', '0', '2021-02-12 12:05:56', '2021-02-12 12:05:56'),
(70, 'b465b5d4-1fac-4b7b-88f4-a2dbfd64aeb8', '', NULL, '0', 'silvasstore', 'domingo@scale8up.com', '$2b$10$G0wE9fFAH9cv/LnvJsyU/exdZq/ti0xasv.anHWlLfuIW6h7lfgPy', 'Domingo', 'Silvas', '5615420047', 'https://fori.kindlebit.com/upload/profile/1616005898026_IMG_8326.jpg', 'Male', NULL, NULL, NULL, 218, '1', '0', 1, NULL, 'manual', '0', '0', 'a6b15ede-fc5c-42df-b150-bb54fe7e7203', '0', '0', '0', '2021-03-17 18:31:38', '2021-03-07 20:55:32'),
(1, 'b4812231-f4a0-4bb8-88d5-71b63792673f', '', NULL, '0', 'admin', 'admin@lash.com', '$2b$10$amzbcF4UhyNmYzsmdxvBE.8ICqEOCJotbr3./1M4FHzffsttiggK2', 'admin', 'admin', '9874563210', NULL, 'Male', NULL, NULL, NULL, 5, '0', '1', 1, '', 'manual', '0', '0', 'b20fe487-128e-45ed-a412-4f3a85911c25', '0', '0', '0', '2020-12-08 06:21:03', '2020-11-23 06:56:54'),
(59, 'baa526f0-3e05-4e93-9d6e-172692c4e1bf', '', NULL, '0', '@ashok123', 'ashok123@gmail.com', '$2b$10$lpY4QR9zUocNkpCthKL1DO6CRGnHpvYNBW43YrGkeLjvTOf.PC07G', '@ashok', '@kumar', '454524556456', NULL, 'Male', NULL, NULL, NULL, 1, '0', '0', 1, NULL, 'manual', '0', '0', '1b4a9079-6451-4495-9b23-162b2904b2b6', '0', '0', '0', '2021-03-01 09:56:06', '2021-03-01 09:56:06'),
(44, 'bd7a0ea2-caf4-4871-8c36-93b3792022ef', '', NULL, '0', 'Amit Kumar', 'amit131ku@gmail.com', NULL, 'Amit', 'Kumar', NULL, 'https://lh6.googleusercontent.com/-fGHFLMsRoyM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclZRzED0FWM-SF6-Fp6A36HT_2thQ/s96-c/photo.jpg', 'Male', NULL, NULL, NULL, 1, '0', '0', 1, '102344552377271627820', 'GOOGLE', '0', '0', '9e681942-7833-48ea-864b-1d9efd4626e6', '0', '0', '0', '2021-01-29 10:48:37', '2021-01-29 10:48:37'),
(64, 'c9c9e269-fdee-4d6d-a4b2-1f3634e98659', '', NULL, '0', 'hdjkh', 'yop987@yopmail.com', '$2b$10$B68EFdzw74tmGbuH5Q2qF.ROuz7ql2nDfKT6Bwn3IagU1G4punyxm', 'tesnk', 'hidkjl', '6764786987987', NULL, 'Male', NULL, NULL, NULL, 13, '1', '0', 1, NULL, 'manual', '0', '0', '98ea223d-2c27-48d3-90dd-dc21951a9c33', '0', '0', '0', '2021-03-05 04:52:34', '2021-03-05 04:52:34'),
(53, 'd1a55392-7cae-4bca-918d-141d5f7064e1', '', NULL, '0', '@demoone1', 'dynamitedeveloper11@gmail.com', '$2b$10$dfCsgGebNJtNdTsfuQ4iCu8Gvc1/yTDjcpoz5sflSb9hVYSmrgzj6', '@fghf', '@Php', '90784578790', NULL, 'Male', NULL, NULL, NULL, 34, '1', '0', 1, NULL, 'manual', '0', '0', 'df154224-50dd-4cd1-b2d9-84306f7960d7', '0', '0', '0', '2021-02-12 11:10:40', '2021-02-12 11:10:40'),
(14, 'd1b5cf55-ccbd-4c44-9b84-70983bb21d92', '', NULL, '0', 'rana', 'shilpa122@gmail.com', '$2b$10$Eiesh9wwKmeHrq4TshBGFOQDqtAWC4BaJY9SO6glBE8WcLtbbJ/Cu', 'shilpa', 'rana', '9878987987', NULL, 'Male', NULL, NULL, NULL, NULL, '0', '0', 1, '', 'manual', '0', '0', '87100b0b-ba80-4552-8798-2787d35aee64', '0', '0', '0', '2020-12-23 11:34:01', '2020-12-23 07:24:05'),
(6, 'd816e819-b152-4b39-81cf-33a6e0df667c', '', NULL, '0', 'kbs', 'shilpa.kumari@kindlebit.com', '$2b$10$jaQEY.f/p679hE0a1YAFw.Q/XKLv3OK6KYf6qaUh4gwr7JLmXHp0G', 'shilpa', 'Rana', NULL, NULL, 'Male', '2021-01-29', NULL, NULL, 1, '0', '0', 1, '', 'manual', '0', '0', 'f049cb02-d2d5-4b19-8320-8bbe29a86d6c', '0', '0', '0', '2021-01-29 13:52:55', '2020-11-26 11:25:55'),
(72, 'db52f69d-aa42-4c4e-a1fd-3922325c81dc', '', NULL, '0', 'scale8up', 'support@scale8up.com', '$2b$10$MBXizBII4Q41G9tWDTw3UusZ47rYeM2PkCKjyLrnjaf5ID9tjyiI6', 'Domingo', 'Silvas', '5615420047', NULL, 'Male', NULL, NULL, NULL, 218, '1', '0', 1, NULL, 'manual', '0', '0', '924cc5d9-cdb1-47e4-a9de-1e8bbd6dc22a', '0', '0', '0', '2021-03-18 14:36:02', '2021-03-18 14:25:36'),
(13, 'dd884a2b-b020-44ff-8b30-c65230e32d18', '', NULL, '0', 'dfg', 'dfg@gmail.com', '$2b$10$7r.Pv5GjsqvaBVKfeui6e.ONHRn0zYN/qOy/mVquqNAapW0c0bJjK', 'dfg', 'dfg', '456456345345', NULL, 'Male', NULL, NULL, NULL, NULL, '0', '0', 1, '', 'manual', '0', '0', '034deefc-85ed-4d38-9d8b-48743cef6822', '0', '0', '1', '2021-01-29 14:08:57', '2020-12-22 13:19:21'),
(20, 'df4a4808-6869-490c-b46d-1ae07faae372', '', NULL, '0', 'demoone', 'demoone@yopmail.com', '$2b$10$OhemgOuCnIXhiivKRevvO.pafGSAjetbid7NxkfUPsDT260c0SbNS', 'demo', 'one', NULL, 'https://fori.kindlebit.com/upload/profile/1614884887885_channel (2).png', 'Male', '2020-12-14', NULL, NULL, 56, '1', '0', 1, '', 'manual', '1', '0', '2787e455-0d93-40e8-8c0e-b6125ebfd4d6', '0', '0', '0', '2021-03-09 12:04:32', '2021-01-14 05:13:01'),
(25, 'e5172339-c80e-499f-9d99-dc19797e3cc0', '', NULL, '0', 'lash1', 'lash@gmail.com', '$2b$10$56uNuzVY.2ah5MXf0epk0e5I06aU9NwrQ04OazYU7a5dDpQWXBdie', 'lash', 'test', '43534564753', NULL, 'Male', NULL, NULL, NULL, 13, '0', '0', 1, '', 'manual', '0', '1', '3223f339-2200-4e11-9281-2f9d2209f9c2', '0', '0', '0', '2021-02-27 18:21:48', '2021-01-16 08:53:15'),
(65, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', '', NULL, '0', 'nehag', 'nehagulatikbs@gmail.com', '$2b$10$W4ADYmCt4sBoKwAw8NhUSu6PNBu2lmXddDxkYNgXoESk.hHMYXqE.', 'Neha', 'Gulati', '9815954816', 'https://fori.kindlebit.com/upload/profile/1614923003741_IMG_20190315_192244__01.jpg', 'Male', NULL, NULL, NULL, 218, '1', '0', 1, NULL, 'manual', '1', '1', '3fdb6f7e-e279-471a-8e5f-cbe70e239072', '0', '0', '0', '2021-03-05 05:43:23', '2021-03-05 05:01:19'),
(3, 'e7140ed9-0a64-45ab-bc0a-c0969f951c2e', '', NULL, '0', 'kbssdfsdf', 'shilpa@gmail.com', '$2b$10$Q06GJjDZysX/62tPuaEvbuHq7JjjLepT0t1ToLioTgdYFANLCNpNK', 'shilpa', 'Rana', NULL, NULL, 'Male', '2021-01-29', NULL, NULL, 1, '0', '0', 1, '', 'manual', '0', '0', '22f667b9-4f6e-4dc0-9dab-139f2de248c7', '0', '0', '0', '2021-01-29 13:52:14', '2020-11-26 05:39:41'),
(68, 'f2de5554-3dad-4879-b0c3-9ec77d35715c', '', NULL, '0', 'umesh', 'umesh.rana@kindlebit.com', '$2b$10$5.9aBt0Lm4AvwRBRtIwgNefjbFHBSygBIpmV3sZttfiICIWgiiuGW', 'umesh', 'rana', '08563489536', NULL, 'Male', NULL, NULL, NULL, 10, '1', '0', 1, NULL, 'manual', '0', '0', '09f63173-4ec6-4308-bddb-d840c2246d35', '0', '0', '0', '2021-03-05 12:30:06', '2021-03-05 12:30:06'),
(63, 'f5db7abe-617f-4fc4-8489-729106408e25', '', NULL, '0', 'amit', 'sunil.kumar@kindlebit.com', '$2b$10$mtDl4YoHXMcVJohomv34le5m0hNnxdfYSJ9iWAd4hMuGtZIxe6Hwm', 'sunil', 'rana', '4534544545245', NULL, 'Male', NULL, NULL, NULL, 1, '1', '0', 0, NULL, 'manual', '0', '0', '14275c4a-f3b9-424b-a747-68bc4e242c7d', '0', '0', '0', '2021-03-05 04:49:22', '2021-03-05 04:49:22'),
(58, 'f79af0e0-1ea3-4a79-bc62-a8993dee1de0', '', NULL, '0', 'Sunny Kumar', 'sunny.kbs121@gmail.com', NULL, 'Sunny', 'Kumar', NULL, 'https://graph.facebook.com/1419612515064862/picture?type=normal', 'Male', NULL, NULL, NULL, 1, '0', '0', 1, '1419612515064862', 'FACEBOOK', '0', '0', '7cb577dc-98ec-43c8-a011-c15ef2a69f98', '0', '0', '0', '2021-02-22 05:30:03', '2021-02-22 05:30:03'),
(27, 'f9fb121d-945c-43ac-8e65-01c7f259664d', '', NULL, '0', 'askur', 'ask@yopmail.com', '$2b$10$13YrAcVHiX0BVoDpFg0I5.sbQc2GRloXcE47FEpughQdUo2dWtis6', 'ask', 'kur', '988765543322', NULL, 'Male', NULL, NULL, NULL, 28, '0', '0', 1, '', 'manual', '0', '0', '473d9a11-393b-4782-aaf9-a5e03e2a3898', '0', '0', '0', '2021-01-20 05:13:54', '2021-01-20 05:13:54');

-- --------------------------------------------------------

--
-- Table structure for table `ll_users_address`
--

CREATE TABLE `ll_users_address` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `address_1` varchar(256) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `pin_code` varchar(20) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `address_type` enum('Billing','Shipping','Both') NOT NULL DEFAULT 'Billing',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_users_address`
--

INSERT INTO `ll_users_address` (`id`, `user_id`, `fullname`, `address`, `address_1`, `city`, `state`, `country`, `pin_code`, `contact_no`, `address_type`, `status`, `update_date`, `create_date`) VALUES
(2, 'a1901c31-4a1d-4c4d-8169-d6c5a3259a5b', 'fghf', 'ghfgh', 'ghfgh', 'fghfg', 'hfghfgh', 'Anegada', '564564', '65756756756', 'Shipping', 0, '2021-02-05 06:48:50', '2021-01-27 13:07:34'),
(6, 'bd7a0ea2-caf4-4871-8c36-93b3792022ef', 'Kindlebit', 'it park', 'Near Infosys', 'chandigarh', 'Washington', 'india', '43234', '4545245454', 'Shipping', 0, '2021-02-05 06:48:50', '2021-01-29 11:30:52'),
(7, 'e5172339-c80e-499f-9d99-dc19797e3cc0', 'fghf', 'ghfgh', 'ghfgh', 'fghfg', 'hfghfgh', 'Anegada', '564564', '65756756756', 'Shipping', 0, '2021-02-05 06:48:50', '2021-01-30 10:20:30'),
(8, '4ae1f2f0-7d5a-4789-ba2b-e9c4b49125b5', 'fghf', 'ghfgh', 'ghfgh', 'fghfg', 'hfghfgh', 'anguilla', '564564', '65756756756', 'Shipping', 0, '2021-02-05 06:48:50', '2021-01-30 12:30:41'),
(9, '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', 'demo', 'F-567', 'Street : West-D', 'NY', 'NY', 'barbados', '123456', '55465546546546', 'Both', 0, '2021-02-05 06:48:50', '2021-01-30 18:30:27'),
(10, '4365e606-4950-49d5-81d8-8d06f8d1af45', 'demo', 'F-567', 'Street : West-D', 'NY', 'NY', 'australia', '1234', '55465546546546', 'Shipping', 0, '2021-02-05 06:48:50', '2021-02-01 13:33:35'),
(11, '4365e606-4950-49d5-81d8-8d06f8d1af45', 'demo', 'F-567', 'Street : West-D', 'NY', 'NY', 'australia', '1234', '55465546546546', 'Shipping', 0, '2021-02-05 06:48:50', '2021-02-01 13:33:35'),
(12, '4365e606-4950-49d5-81d8-8d06f8d1af45', 'demo', 'F-567', 'Street : West-D', 'NY', 'NY', 'belarus', '1234', '55465546546546', 'Shipping', 0, '2021-02-05 06:48:50', '2021-02-01 13:36:23'),
(13, 'df4a4808-6869-490c-b46d-1ae07faae372', 'Shilpa12', 'Tribun Chownk', 'sector 9', 'chandigarh', 'Punjab', 'hong kong', '67567', '08563489536', 'Shipping', 0, '2021-02-19 13:11:15', '2021-02-03 12:54:12'),
(14, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 'kindle', 'ghfgh', 'ghfgh', 'fghfg', 'hfghfgh', 'azerbaijan', '564564', '65756756756', 'Shipping', 1, '2021-02-05 14:38:12', '2021-02-05 14:38:12'),
(15, '8c994b5c-f38f-4019-a422-2b7b067905d9', 'fghf', 'ghfgh', 'ghfgh', 'fghfg', 'hfghfgh', 'afghanistan', '564564', '65756756756', 'Billing', 1, '2021-02-12 12:17:54', '2021-02-12 12:17:54'),
(16, '8c994b5c-f38f-4019-a422-2b7b067905d9', 'fghf', 'ghfgh', 'ghfgh', 'fghfg', 'hfghfgh', 'afghanistan', '564564', '65756756756', 'Billing', 1, '2021-02-12 12:21:28', '2021-02-12 12:21:28'),
(17, '67417bbd-cc3b-44cf-9cf2-3cfc1700d963', 'fghf', 'ghfgh', 'ghfgh', 'fghfg', 'hfghfgh', 'afghanistan', '564564', '65756756756', 'Shipping', 1, '2021-02-12 12:36:42', '2021-02-12 12:36:42'),
(20, 'df4a4808-6869-490c-b46d-1ae07faae372', 'demo11112', 'F-567', 'Street : West-D', 'NY', 'NY', 'barbados', '123456', '98784560660', 'Shipping', 1, '2021-02-19 07:43:25', '2021-02-18 05:48:02'),
(26, 'df4a4808-6869-490c-b46d-1ae07faae372', 'SHILPA', 'it park', 'Near Infosys', 'chandigarh', 'Washington', 'bahamas', '43234', '08563489536', 'Billing', 1, '2021-02-18 08:29:47', '2021-02-18 08:17:55'),
(28, 'df4a4808-6869-490c-b46d-1ae07faae372', 'fgsfg sdfgsd', 'it park', 'sector 9', 'chandigarh', 'Washington', 'hong kong', '43234', '08563489536', 'Billing', 1, '2021-02-19 07:20:44', '2021-02-19 07:20:44'),
(29, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', 'test', '#123j demo', '#68559', 'Los Angles', 'California', 'united states', '98345', '98767856899', 'Shipping', 1, '2021-03-05 06:11:40', '2021-03-05 06:11:40'),
(30, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', 'abc', '#5748', '#785', 'Los Angles', 'California', 'united states', '64749', '65785483900', 'Both', 1, '2021-03-05 06:14:27', '2021-03-05 06:14:27'),
(31, 'b465b5d4-1fac-4b7b-88f4-a2dbfd64aeb8', 'DOmingo', '104 Sunrise Cove Circle', '104', 'Huntsville', 'Alabama', 'united states', '35811', '5615420047', 'Shipping', 1, '2021-03-07 21:01:42', '2021-03-07 21:01:42');

-- --------------------------------------------------------

--
-- Table structure for table `ll_users_channels`
--

CREATE TABLE `ll_users_channels` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `channel_name` varchar(256) NOT NULL,
  `channel_org_name` varchar(256) DEFAULT NULL,
  `description` longtext,
  `channel_logo` varchar(256) NOT NULL,
  `channel_cover_img` varchar(256) DEFAULT NULL,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_users_channels`
--

INSERT INTO `ll_users_channels` (`id`, `user_id`, `product_id`, `channel_name`, `channel_org_name`, `description`, `channel_logo`, `channel_cover_img`, `update_date`, `create_date`) VALUES
(23, '4ae1f2f0-7d5a-4789-ba2b-e9c4b49125b5', NULL, '@er', 'er', 'reewr', 'upload/1610449475362_Contact-Us-Water-for-Life-USA-Water-for-Life-USA.png', NULL, '2021-01-12 11:04:35', '2021-01-05 12:26:22'),
(24, '93eb898a-218f-4b7a-8144-00dbd300b89f', NULL, '@ret', 'ret', 'ertert5456', 'upload/1610600021355_Blog-Water-for-Life-USA-Water-for-Life-USA.png', NULL, '2021-01-14 04:53:41', '2021-01-14 04:53:18'),
(25, 'df4a4808-6869-490c-b46d-1ae07faae372', NULL, '@demoone', 'demoone', 'my first channel', 'upload/1610601371962_form-logo.png', NULL, '2021-01-14 05:16:11', '2021-01-14 05:15:53'),
(26, '3cae0997-2d2e-4a90-bf00-ea3be436d87a', NULL, '@ewrwer', 'ewrwer', 'werwe', 'upload/1610631790048_Blog-Water-for-Life-USA-Water-for-Life-USA.png', NULL, '2021-01-14 13:43:10', '2021-01-14 13:42:57'),
(27, '63b0adb4-6603-47cc-8b01-59a574c66041', NULL, '@rt', 'rt', 'ert', 'upload/1610686674899_Contact-Us-Water-for-Life-USA-Water-for-Life-USA.png', NULL, '2021-01-15 04:57:54', '2021-01-15 04:57:44'),
(28, '20d7211b-53d3-424f-8644-0380e4c519ab', NULL, '@newchannel', 'new channel', 'dgsdfg', 'upload/1610721726829_Blog-Water-for-Life-USA-Water-for-Life-USA.png', NULL, '2021-01-15 14:42:06', '2021-01-15 14:41:46'),
(29, '67c01740-29f8-4373-8b4d-ad1a13524cb9', NULL, '@demochannel', 'demo channel', 'testing', 'upload/1610786312770_channel (2).png', NULL, '2021-01-16 08:38:32', '2021-01-16 08:38:20'),
(30, '839bb93c-f4fe-48cf-afae-7f709c3b3148', NULL, '@test', 'test', 'test channel', 'upload/1610786751615_channel (2).png', NULL, '2021-01-16 08:45:51', '2021-01-16 08:45:30'),
(31, 'e5172339-c80e-499f-9d99-dc19797e3cc0', NULL, '@lash', 'lash', 'lash test', 'upload/1610787233137_channel (3).png', NULL, '2021-01-16 08:53:53', '2021-01-16 08:53:39'),
(32, '6f1152b5-8d98-48a1-a5fb-da800fd7937e', NULL, '@lash12', 'lash12', 'test', 'upload/1610788689049_channel (2).png', NULL, '2021-01-16 09:18:09', '2021-01-16 09:17:55'),
(33, '8e7ee84a-0ef4-439f-8ee5-151c032a54d7', NULL, '@rtr', 'rtr', 'rtrt', 'upload/1610946649578_Blog-Water-for-Life-USA-Water-for-Life-USA.png', NULL, '2021-01-18 05:10:49', '2021-01-18 05:10:34'),
(34, 'f9fb121d-945c-43ac-8e65-01c7f259664d', NULL, '@ask', 'ask', 'ask description', 'upload/1611119678801_logo.png', NULL, '2021-01-20 05:14:38', '2021-01-20 05:14:20'),
(35, '9c3d78a6-ad30-47ab-b70e-021786f36896', NULL, '@gulati', 'gulati', 'testing', 'upload/1611234521859_banner.jpg', NULL, '2021-01-21 13:08:41', '2021-01-21 13:08:26'),
(36, 'be2649f7-84d2-4823-a19f-87816d36702b', NULL, '@FirstChannel', 'First Channel', 'testing', 'upload/1611235036304_download.png', NULL, '2021-01-21 13:17:16', '2021-01-21 13:16:55'),
(37, 'c760cc78-7771-4b89-8cd4-0df9a5cfbe14', NULL, '@Testing', 'Testing', 'demo test', 'upload/1611235948114_download.png', NULL, '2021-01-21 13:32:28', '2021-01-21 13:32:18'),
(38, '12ed30cd-32ad-4b7e-9939-30691faba594', NULL, '@honey', 'honey', 'sharma', 'upload/1611238046675_111903564_m.png', NULL, '2021-01-21 14:07:26', '2021-01-21 14:07:02'),
(43, '8d047ce8-8d2e-4c33-94c0-a4fe9fb0fb1b', NULL, '@demo30', 'demo30', 'demo 30 description', 'upload/1612030758019_form-logo.png', NULL, '2021-01-30 18:19:18', '2021-01-30 18:19:02'),
(44, '4365e606-4950-49d5-81d8-8d06f8d1af45', NULL, '@testdemo3', 'testdemo3', 'testing', 'upload/1612185956445_telegram.png', NULL, '2021-02-01 13:25:56', '2021-02-01 13:25:43'),
(45, '552db251-c1a2-4e9e-a4c0-931b2a51ef1d', NULL, '@fdgdfgdfg', 'fdgdfgdfg', 'dfgdfg', '', NULL, '2021-02-02 06:41:34', '2021-02-02 06:41:34'),
(46, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', NULL, '@storekindlebit', 'storekindlebit', 'test ', 'upload/1612535469762_channel (1).png', NULL, '2021-02-05 14:31:09', '2021-02-05 14:30:59'),
(47, '8c994b5c-f38f-4019-a422-2b7b067905d9', NULL, '@newchanlleinfor', 'newchanlleinfor', 'test', 'upload/1613131847563_Noorderlicht_diamond_painting.jpg', NULL, '2021-02-12 12:10:47', '2021-02-12 12:10:32'),
(48, '67417bbd-cc3b-44cf-9cf2-3cfc1700d963', NULL, '@Testingstore', 'Testingstore', 'test', 'upload/1613133152706_channel (3).png', NULL, '2021-02-12 12:32:32', '2021-02-12 12:32:10'),
(50, '21e55f2c-b0b5-4f54-adef-0089b20eb35b', NULL, '@testone', 'testone', 'testone', 'upload/1614830686534_1580282695364_3e0739ab-050b-4ed4-9b2b-29c0676a8460.png', NULL, '2021-03-04 04:04:46', '2021-03-04 04:02:51'),
(51, 'e5cd6071-4182-4fd0-b189-c99533f5ac22', NULL, '@NGACreations', 'NGA Creations', 'n publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia\n', 'upload/1614920636973_STORE IMG.jpg', NULL, '2021-03-05 05:03:56', '2021-03-05 05:03:03'),
(52, 'b465b5d4-1fac-4b7b-88f4-a2dbfd64aeb8', NULL, '@Domingosilvas', 'Domingo_silvas', 'sdfn;sdjnf;jdfngvjkdfnvjdnfvjdnfvjndfjvnjdkfvnjdfvnjdf', 'upload/1615150603616_3.png', NULL, '2021-03-07 20:56:43', '2021-03-07 20:56:31'),
(53, 'db52f69d-aa42-4c4e-a1fd-3922325c81dc', NULL, '@samplecandlestore', 'samplecandlestore', 'We specialize in candle ', '', NULL, '2021-03-18 14:39:32', '2021-03-18 14:39:32');

-- --------------------------------------------------------

--
-- Table structure for table `ll_users_detail`
--

CREATE TABLE `ll_users_detail` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `value` longtext,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `crdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ll_user_card`
--

CREATE TABLE `ll_user_card` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `custom_id` varchar(256) NOT NULL,
  `payment_menthod_id` varchar(256) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `card_no` varchar(20) DEFAULT NULL,
  `exp_month` varchar(10) DEFAULT NULL,
  `exp_year` varchar(10) DEFAULT NULL,
  `client_secret` varchar(256) DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ll_user_card`
--

INSERT INTO `ll_user_card` (`id`, `user_id`, `custom_id`, `payment_menthod_id`, `name`, `card_no`, `exp_month`, `exp_year`, `client_secret`, `update_date`, `create_date`) VALUES
(15, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8DanvLEsQtadu', 'pm_1IVx9CGm48tZv82dDTDmZph2', 'dsgd', '4242', '4', '2024', 'pi_1IVx9DGm48tZv82da6suucZf_secret_moEYlTP9Bf4q8RkGBmZylgLmq', '2021-03-17 11:02:45', '2021-03-17 11:02:45'),
(16, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8Dc1E6pXoaILW', 'pm_1IVxB9Gm48tZv82dRnbtNj79', 'ddfg', '4242', '4', '2024', 'pi_1IVxBBGm48tZv82dtWGo09rj_secret_zD3ogSlAdQ7xW266oVVQ8KeS1', '2021-03-17 11:04:47', '2021-03-17 11:04:47'),
(17, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8De6nUlUixsrW', 'pm_1IVxCjGm48tZv82dG6h8FpeT', 'vueWorpress', '4242', '4', '2024', 'pi_1IVxClGm48tZv82dCKgiu7dW_secret_iKkkyagvJvmUWklIfiAX52AxE', '2021-03-17 11:06:25', '2021-03-17 11:06:25'),
(18, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8DgSK5DFOr69J', 'pm_1IVxFGGm48tZv82del4HJRmw', 'ashok', '4242', '4', '2024', 'pi_1IVxFHGm48tZv82dhg1kd3sr_secret_GshaywJ86fUdR0PBlNs23iDkB', '2021-03-17 11:09:02', '2021-03-17 11:09:02'),
(19, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8DodLw5228onN', 'pm_1IVxMOGm48tZv82dlbYUzequ', 'admin', '4242', '4', '2024', 'pi_1IVxMQGm48tZv82dQigBasiA_secret_zRATots4rZzLIC5ph4e5XvW47', '2021-03-17 11:16:24', '2021-03-17 11:16:24'),
(20, 'a4d31335-c033-4a4e-b27c-1a36af6a9a63', 'cus_J8Ztxm0DKx9xm0', 'pm_1IWIk7Gm48tZv82dZzKGVrPN', 'admin@123', '4242', '4', '2024', 'pi_1IWIk8Gm48tZv82dMd1hiGhB_secret_cUP92JKLdQLKO50wFRrbqGnxv', '2021-03-18 10:06:20', '2021-03-18 10:06:20'),
(21, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8ybtnPNjBVmNJ', 'pm_1IWge2Gm48tZv82diKsmnD0q', 'try', '4242', '4', '2024', 'pi_1IWge3Gm48tZv82dsxo8s7rx_secret_m8GrUQ1jtR5vlmyJVAjgyaOVo', '2021-03-19 11:37:37', '2021-03-19 11:37:37'),
(22, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8ykKyuKJk99Wz', 'pm_1IWgmkGm48tZv82dbXEJSty5', 'shilpa', '4242', '4', '2024', 'pi_1IWgmmGm48tZv82dgVFPNMgH_secret_0flQtfgsRlCM5XlUcgknUOD7L', '2021-03-19 11:46:37', '2021-03-19 11:46:37'),
(23, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8yptfKnCCwh0p', 'pm_1IWgrTGm48tZv82dc2TtJZFf', 'Ashok', '4242', '4', '2024', 'pi_1IWgrUGm48tZv82dJVhwzRQm_secret_HHGWsf6TmOYmOrVZDKQ44eYrf', '2021-03-19 11:51:30', '2021-03-19 11:51:30'),
(24, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J8yvQxKdpPPKtF', 'pm_1IWgy5Gm48tZv82d7M331Lz4', 'Ashok', '4242', '4', '2024', 'pi_1IWgy7Gm48tZv82dvUzSJFKC_secret_0Cymuc9gGm1dPwsDJ46KucwLA', '2021-03-19 11:58:21', '2021-03-19 11:58:21'),
(25, 'df4a4808-6869-490c-b46d-1ae07faae372', 'cus_J90BuAQxPyvQAc', 'pm_1IWiBNGm48tZv82dUBsM8iam', 'kbs', '4242', '4', '2024', 'pi_1IWiBOGm48tZv82dswAOC5uR_secret_hJSW1wDeVPj2Ultb0w5qJrPTY', '2021-03-19 13:16:08', '2021-03-19 13:16:08');

-- --------------------------------------------------------

--
-- Table structure for table `ll_user_interest_log`
--

CREATE TABLE `ll_user_interest_log` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `page` varchar(256) DEFAULT NULL,
  `product_data` text,
  `comment` text,
  `start_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ll_user_logs`
--

CREATE TABLE `ll_user_logs` (
  `id` int(11) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `login_time` timestamp NULL DEFAULT NULL,
  `logout_time` timestamp NULL DEFAULT NULL,
  `create_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ll_admin_fee`
--
ALTER TABLE `ll_admin_fee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_channel_followers`
--
ALTER TABLE `ll_channel_followers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_country`
--
ALTER TABLE `ll_country`
  ADD PRIMARY KEY (`countryId`);

--
-- Indexes for table `ll_forgot_password`
--
ALTER TABLE `ll_forgot_password`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_mail_template`
--
ALTER TABLE `ll_mail_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_orders`
--
ALTER TABLE `ll_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_order_items`
--
ALTER TABLE `ll_order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_payment_details`
--
ALTER TABLE `ll_payment_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_payment_gateway`
--
ALTER TABLE `ll_payment_gateway`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_products`
--
ALTER TABLE `ll_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_id` (`product_id`);

--
-- Indexes for table `ll_products_category`
--
ALTER TABLE `ll_products_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_products_images`
--
ALTER TABLE `ll_products_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_products_shipping_address`
--
ALTER TABLE `ll_products_shipping_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_products_streaming_content`
--
ALTER TABLE `ll_products_streaming_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_products_sub_category`
--
ALTER TABLE `ll_products_sub_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_products_variants`
--
ALTER TABLE `ll_products_variants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_product_broadcasting`
--
ALTER TABLE `ll_product_broadcasting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_shipping_fee`
--
ALTER TABLE `ll_shipping_fee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_shipping_fee_log`
--
ALTER TABLE `ll_shipping_fee_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_shopify_auth`
--
ALTER TABLE `ll_shopify_auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_subscription`
--
ALTER TABLE `ll_subscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscriptionId` (`subscriptionId`);

--
-- Indexes for table `ll_users`
--
ALTER TABLE `ll_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `ll_users_address`
--
ALTER TABLE `ll_users_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_users_channels`
--
ALTER TABLE `ll_users_channels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_users_detail`
--
ALTER TABLE `ll_users_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_user_card`
--
ALTER TABLE `ll_user_card`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_user_interest_log`
--
ALTER TABLE `ll_user_interest_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ll_user_logs`
--
ALTER TABLE `ll_user_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ll_admin_fee`
--
ALTER TABLE `ll_admin_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `ll_channel_followers`
--
ALTER TABLE `ll_channel_followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `ll_mail_template`
--
ALTER TABLE `ll_mail_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `ll_orders`
--
ALTER TABLE `ll_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT for table `ll_order_items`
--
ALTER TABLE `ll_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
--
-- AUTO_INCREMENT for table `ll_payment_details`
--
ALTER TABLE `ll_payment_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `ll_payment_gateway`
--
ALTER TABLE `ll_payment_gateway`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `ll_products`
--
ALTER TABLE `ll_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;
--
-- AUTO_INCREMENT for table `ll_products_category`
--
ALTER TABLE `ll_products_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `ll_products_images`
--
ALTER TABLE `ll_products_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=432;
--
-- AUTO_INCREMENT for table `ll_products_shipping_address`
--
ALTER TABLE `ll_products_shipping_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ll_products_streaming_content`
--
ALTER TABLE `ll_products_streaming_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;
--
-- AUTO_INCREMENT for table `ll_products_sub_category`
--
ALTER TABLE `ll_products_sub_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ll_products_variants`
--
ALTER TABLE `ll_products_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=370;
--
-- AUTO_INCREMENT for table `ll_product_broadcasting`
--
ALTER TABLE `ll_product_broadcasting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- AUTO_INCREMENT for table `ll_shipping_fee`
--
ALTER TABLE `ll_shipping_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `ll_shipping_fee_log`
--
ALTER TABLE `ll_shipping_fee_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `ll_shopify_auth`
--
ALTER TABLE `ll_shopify_auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `ll_subscription`
--
ALTER TABLE `ll_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `ll_users`
--
ALTER TABLE `ll_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT for table `ll_users_address`
--
ALTER TABLE `ll_users_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `ll_users_channels`
--
ALTER TABLE `ll_users_channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `ll_users_detail`
--
ALTER TABLE `ll_users_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ll_user_card`
--
ALTER TABLE `ll_user_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `ll_user_interest_log`
--
ALTER TABLE `ll_user_interest_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ll_user_logs`
--
ALTER TABLE `ll_user_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
