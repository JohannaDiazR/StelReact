-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-04-2024 a las 16:39:25
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `stel1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `new_has_role`
--

CREATE TABLE `new_has_role` (
  `fkid_novedades` int(11) NOT NULL,
  `fkid_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `new_has_role`
--

INSERT INTO `new_has_role` (`fkid_novedades`, `fkid_rol`) VALUES
(2, 2),
(3, 1),
(2, 2),
(3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_correspondence`
--

CREATE TABLE `property_correspondence` (
  `fkid_inmueble` int(11) NOT NULL,
  `fkid_correspondencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_correspondence`
--

INSERT INTO `property_correspondence` (`fkid_inmueble`, `fkid_correspondencia`) VALUES
(1, 1),
(2, 2),
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_correspondencia`
--

CREATE TABLE `tbl_correspondencia` (
  `id` int(11) NOT NULL,
  `tipo_correspondencia` varchar(30) DEFAULT NULL,
  `frec_correspodencia` datetime DEFAULT NULL,
  `est_correspondencia` varchar(20) DEFAULT NULL,
  `fentr_correspondencia` datetime DEFAULT NULL,
  `fkid_trabajador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_correspondencia`
--

INSERT INTO `tbl_correspondencia` (`id`, `tipo_correspondencia`, `frec_correspodencia`, `est_correspondencia`, `fentr_correspondencia`, `fkid_trabajador`) VALUES
(1, 'Convocatoria reunion', '2023-09-07 13:11:00', 'Entregado', '2023-09-07 15:30:00', 3),
(2, 'Paquete', '2023-12-12 13:30:00', 'Entregado', '2023-12-13 08:20:00', 3),
(3, 'Recibo', '2024-01-12 13:30:00', 'Entregado', '2024-01-03 08:20:00', 3),
(4, 'Recibo Luz', '2024-03-15 09:30:00', 'Entregado', '2024-03-15 13:20:00', 3),
(5, 'Recibo Gas', '2024-03-15 09:30:00', 'Entregado', '2024-03-15 13:20:00', 3),
(7, 'Paquete', '2024-03-15 09:30:00', 'Entregado', '2024-03-15 13:20:00', 3),
(8, 'Cartilla Asamblea', '2024-03-15 09:30:00', 'Entregado', '2024-03-15 13:20:00', 3),
(9, 'Paquete chileno', '2024-02-18 09:30:00', 'Entregado', '2024-03-15 13:20:00', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_estcartera`
--

CREATE TABLE `tbl_estcartera` (
  `id` int(11) NOT NULL,
  `est_cartera` varchar(30) DEFAULT NULL,
  `tacc_estcartera` varchar(20) DEFAULT NULL,
  `noti_estcartera` varchar(35) DEFAULT NULL,
  `fkid_inmueble` int(11) DEFAULT NULL,
  `fkid_trabajador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_estcartera`
--

INSERT INTO `tbl_estcartera` (`id`, `est_cartera`, `tacc_estcartera`, `noti_estcartera`, `fkid_inmueble`, `fkid_trabajador`) VALUES
(1, 'Paz y salvo', 'Permitido', 'Enviar documento', 1, 1),
(2, 'Paz y Salvo', 'Permitido', 'enviar certificado', 2, 1),
(4, 'Mora', 'Bloqueado', 'Notificar Residente', 3, 1),
(5, 'Mora', 'Bloqueado', 'Notificar Residente', 4, 1),
(6, 'Mora', 'Bloqueado', 'Notificar Residente', 5, 1),
(7, 'Mora', 'Bloqueado', 'Notificar Residente', 6, 1),
(8, 'Mora', 'Bloqueado', 'enviar carta', 7, 1),
(9, 'Mora', 'Bloqueado', 'Notificar', 8, 1),
(10, 'Mora', 'Bloqueado', 'Notificar', 9, 1),
(12, 'Acuerdo de pago', 'Bloqueado', 'Notificar residente', 11, 1),
(13, 'Acuerdo de pago', 'Bloqueado', 'Notificar residente', 12, 1),
(14, 'Acuerdo de pago', 'Bloqueado', 'Notificar residente', 13, 1),
(15, 'pazysalvo', 'Permitido', 'Notificar residente', 14, 1),
(16, 'pazysalvo', 'Permitido', 'Notificar residente', 16, 1),
(17, 'pazysalvo', 'Permitido', 'Notificar residente', 17, 1),
(18, 'Paz y salvo', 'Permitido', 'Enviar certificado', 18, 1),
(24, 'mora', 'Bloqueado', 'Notificar residente', 19, 1),
(28, 'Proceso Juridico', 'Bloqueado', 'Enviar proceso', 20, 1),
(29, 'paz y salvo', 'permitido', 'enviar certificado', 21, 1),
(30, 'Mora', 'Bloqueado', 'Enviar carta', 49, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_inmueble`
--

CREATE TABLE `tbl_inmueble` (
  `id` int(11) NOT NULL,
  `and_inmueble` int(11) DEFAULT NULL,
  `num_inmueble` int(11) DEFAULT NULL,
  `fkid_residente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_inmueble`
--

INSERT INTO `tbl_inmueble` (`id`, `and_inmueble`, `num_inmueble`, `fkid_residente`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 1, 4, 4),
(5, 1, 5, 5),
(6, 1, 6, 6),
(7, 1, 7, 7),
(8, 1, 8, 8),
(9, 1, 9, NULL),
(10, 1, 10, NULL),
(11, 1, 11, NULL),
(12, 1, 12, NULL),
(13, 0, 13, NULL),
(14, 1, 14, NULL),
(15, 1, 15, NULL),
(16, 1, 16, NULL),
(17, 1, 17, NULL),
(18, 1, 18, NULL),
(19, 1, 19, NULL),
(20, 1, 20, NULL),
(21, 0, 21, NULL),
(22, 1, 22, NULL),
(23, 1, 23, NULL),
(24, 1, 24, NULL),
(25, 1, 25, NULL),
(26, 1, 26, NULL),
(27, 1, 27, NULL),
(28, 1, 28, NULL),
(29, 1, 29, NULL),
(30, 1, 30, NULL),
(31, 2, 31, NULL),
(32, 2, 32, NULL),
(33, 2, 33, NULL),
(34, 2, 34, NULL),
(35, 2, 35, NULL),
(36, 2, 36, NULL),
(37, 2, 37, NULL),
(38, 2, 38, NULL),
(39, 2, 39, NULL),
(40, 2, 40, NULL),
(41, 2, 41, NULL),
(42, 2, 42, NULL),
(43, 2, 43, NULL),
(44, 2, 44, NULL),
(45, 2, 45, NULL),
(46, 2, 46, NULL),
(47, 2, 47, NULL),
(48, 2, 48, NULL),
(49, 2, 49, NULL),
(50, 2, 50, NULL),
(51, 2, 51, NULL),
(52, 2, 52, NULL),
(53, 2, 53, NULL),
(54, 2, 54, NULL),
(55, 2, 55, NULL),
(56, 2, 56, NULL),
(57, 2, 57, NULL),
(58, 2, 58, NULL),
(59, 2, 59, NULL),
(60, 2, 60, NULL),
(61, 2, 61, NULL),
(62, 2, 62, NULL),
(63, 3, 63, NULL),
(64, 3, 64, NULL),
(65, 3, 65, NULL),
(66, 3, 66, NULL),
(67, 3, 67, NULL),
(68, 3, 68, NULL),
(69, 3, 69, NULL),
(70, 3, 70, NULL),
(71, 3, 71, NULL),
(72, 3, 72, NULL),
(73, 3, 73, NULL),
(74, 3, 74, NULL),
(75, 3, 75, NULL),
(76, 3, 76, NULL),
(77, 3, 77, NULL),
(78, 3, 78, NULL),
(79, 3, 79, NULL),
(80, 3, 80, NULL),
(81, 3, 81, NULL),
(82, 3, 82, NULL),
(83, 3, 83, NULL),
(84, 3, 84, NULL),
(85, 3, 85, NULL),
(86, 3, 86, NULL),
(87, 4, 87, NULL),
(88, 4, 88, NULL),
(89, 4, 89, NULL),
(90, 4, 90, NULL),
(91, 4, 91, NULL),
(92, 4, 92, NULL),
(93, 4, 93, NULL),
(94, 4, 94, NULL),
(95, 4, 95, NULL),
(96, 4, 96, NULL),
(97, 4, 97, NULL),
(98, 4, 98, NULL),
(99, 4, 99, NULL),
(100, 4, 100, NULL),
(101, 4, 101, NULL),
(102, 5, 102, NULL),
(103, 5, 103, NULL),
(104, 5, 104, NULL),
(105, 5, 105, NULL),
(106, 5, 106, NULL),
(107, 5, 107, NULL),
(108, 5, 108, NULL),
(109, 5, 109, NULL),
(110, 5, 110, NULL),
(111, 5, 111, NULL),
(112, 5, 112, NULL),
(113, 5, 113, NULL),
(114, 5, 114, NULL),
(115, 5, 115, NULL),
(116, 6, 116, NULL),
(117, 6, 117, NULL),
(118, 6, 118, NULL),
(119, 6, 119, NULL),
(120, 6, 120, NULL),
(121, 6, 121, NULL),
(122, 6, 122, NULL),
(123, 6, 123, NULL),
(124, 6, 124, NULL),
(125, 6, 125, NULL),
(126, 6, 126, NULL),
(127, 6, 127, NULL),
(128, 6, 128, NULL),
(129, 6, 129, NULL),
(130, 6, 130, NULL),
(131, 6, 131, NULL),
(132, 6, 132, NULL),
(133, 6, 133, NULL),
(134, 6, 134, NULL),
(135, 6, 135, NULL),
(136, 6, 136, NULL),
(137, 6, 137, NULL),
(138, 6, 138, NULL),
(139, 6, 139, NULL),
(140, 7, 140, NULL),
(141, 7, 141, NULL),
(142, 7, 142, NULL),
(143, 7, 143, NULL),
(144, 7, 144, NULL),
(145, 7, 145, NULL),
(146, 7, 146, NULL),
(147, 7, 147, NULL),
(148, 7, 148, NULL),
(149, 7, 149, NULL),
(150, 7, 150, NULL),
(151, 7, 151, NULL),
(152, 7, 152, NULL),
(153, 7, 153, NULL),
(154, 7, 154, NULL),
(155, 7, 155, NULL),
(156, 7, 156, NULL),
(157, 7, 157, NULL),
(158, 7, 158, NULL),
(159, 7, 159, NULL),
(160, 7, 160, NULL),
(161, 7, 161, NULL),
(162, 7, 162, NULL),
(163, 7, 163, NULL),
(164, 8, 164, NULL),
(165, 8, 165, NULL),
(166, 8, 166, NULL),
(167, 8, 167, NULL),
(168, 8, 168, NULL),
(169, 8, 169, NULL),
(170, 8, 170, NULL),
(171, 8, 171, NULL),
(172, 8, 172, NULL),
(173, 8, 173, NULL),
(174, 8, 174, NULL),
(175, 8, 175, NULL),
(176, 8, 176, NULL),
(177, 8, 177, NULL),
(178, 8, 178, NULL),
(179, 8, 179, NULL),
(180, 8, 180, NULL),
(181, 8, 181, NULL),
(182, 8, 182, NULL),
(183, 8, 183, NULL),
(184, 8, 184, NULL),
(185, 8, 185, NULL),
(186, 8, 186, NULL),
(187, 8, 187, NULL),
(188, 9, 188, NULL),
(189, 9, 189, NULL),
(190, 9, 190, NULL),
(191, 9, 191, NULL),
(192, 9, 192, NULL),
(193, 9, 193, NULL),
(194, 9, 194, NULL),
(195, 9, 195, NULL),
(196, 9, 196, NULL),
(197, 9, 197, NULL),
(198, 9, 198, NULL),
(199, 9, 199, NULL),
(200, 9, 200, NULL),
(201, 9, 201, NULL),
(202, 9, 202, NULL),
(203, 9, 203, NULL),
(204, 9, 204, NULL),
(205, 9, 205, NULL),
(206, 9, 206, NULL),
(207, 9, 207, NULL),
(208, 9, 208, NULL),
(209, 9, 209, NULL),
(210, 9, 210, NULL),
(211, 9, 211, NULL),
(212, 9, 212, NULL),
(213, 9, 213, NULL),
(214, 10, 214, NULL),
(215, 10, 215, NULL),
(216, 10, 216, NULL),
(217, 10, 217, NULL),
(218, 10, 218, NULL),
(219, 10, 219, NULL),
(220, 10, 220, NULL),
(221, 10, 221, NULL),
(222, 10, 222, NULL),
(223, 10, 223, NULL),
(224, 10, 224, NULL),
(225, 10, 225, NULL),
(226, 10, 226, NULL),
(227, 10, 227, NULL),
(228, 10, 228, NULL),
(229, 10, 229, NULL),
(230, 10, 230, NULL),
(231, 10, 231, NULL),
(232, 10, 232, NULL),
(233, 10, 233, NULL),
(234, 10, 234, NULL),
(235, 10, 235, NULL),
(236, 10, 236, NULL),
(237, 10, 237, NULL),
(238, 10, 238, NULL),
(239, 10, 239, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_multa`
--

CREATE TABLE `tbl_multa` (
  `id` int(11) NOT NULL,
  `tipo_multa` varchar(30) DEFAULT NULL,
  `fec_multa` datetime DEFAULT NULL,
  `val_multa` int(11) NOT NULL,
  `fpag_multa` datetime DEFAULT NULL,
  `fkid_inmueble` int(11) DEFAULT NULL,
  `fkid_trabajador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_multa`
--

INSERT INTO `tbl_multa` (`id`, `tipo_multa`, `fec_multa`, `val_multa`, `fpag_multa`, `fkid_inmueble`, `fkid_trabajador`) VALUES
(1, 'Estacionamiento indebido', '2023-01-10 22:00:00', 250000, '2023-02-10 10:15:00', 3, 3),
(2, 'Ruido excesivo', '2023-11-11 00:15:00', 100000, '2024-02-10 13:18:00', 4, 3),
(3, 'Mascota sin correa', '2023-12-11 00:15:00', 100000, '2024-02-10 13:18:00', 1, 3),
(5, 'Estacionamiento indebido', '2024-03-13 19:00:00', 250000, '2024-03-28 19:00:00', 13, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_novedades`
--

CREATE TABLE `tbl_novedades` (
  `id` int(11) NOT NULL,
  `asunto_novedades` varchar(65) DEFAULT NULL,
  `desc_novedades` varchar(65) DEFAULT NULL,
  `est_novedades` varchar(25) DEFAULT NULL,
  `fec_novedades` datetime DEFAULT NULL,
  `rem_novedades` varchar(30) DEFAULT NULL,
  `res_novedades` varchar(30) DEFAULT NULL,
  `tipo_novedad` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_novedades`
--

INSERT INTO `tbl_novedades` (`id`, `asunto_novedades`, `desc_novedades`, `est_novedades`, `fec_novedades`, `rem_novedades`, `res_novedades`, `tipo_novedad`) VALUES
(2, 'Solicitud Camara Seguridad', 'Revisión cámaras de seguridad', 'Solicitud Atendida', '2023-06-12 14:45:00', 'Jose Perez', 'verificar danos', 'Residente'),
(3, 'Solicitud Zonas Comunes', 'Reporte de danos en las areas comunes', 'Solicitud Atendida', '2023-06-12 14:45:00', 'Dan Casas', 'verificar danos', 'Residente'),
(4, 'Solicitud Reunion con administrador', 'danos', 'Solicitud Atendida', '2023-06-12 14:45:00', 'Jose Perez', 'programar reunión', 'Residente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_parqueadero`
--

CREATE TABLE `tbl_parqueadero` (
  `id` int(11) NOT NULL,
  `tipo_parqueadero` varchar(30) DEFAULT NULL,
  `estado_parqueadero` varchar(30) DEFAULT NULL,
  `fec_parqueadero` datetime DEFAULT NULL,
  `dvte_parqueadero` varchar(45) DEFAULT NULL,
  `cup_parqueadero` int(11) DEFAULT NULL,
  `hora_salida` datetime DEFAULT NULL,
  `tar_parqueadero` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_parqueadero`
--

INSERT INTO `tbl_parqueadero` (`id`, `tipo_parqueadero`, `estado_parqueadero`, `fec_parqueadero`, `dvte_parqueadero`, `cup_parqueadero`, `hora_salida`, `tar_parqueadero`) VALUES
(1, 'Carro-Propietario', 'Inhabilitado', '2024-03-01 07:46:00', 'AWD-662 bmw negro', 1, NULL, 50000),
(2, 'Carro-propietario', 'inhabilitado', '2023-09-20 05:38:00', 'ABC123 kwai rojo', 18, NULL, 40000),
(3, 'Carro-Visitante', 'Habilitado', '2024-03-06 06:22:00', 'XSW-487 Sail blanco', 30, '2024-03-06 10:19:00', 10000),
(4, 'Carro-Visitante', 'Habilitado', '2023-12-13 10:50:09', 'HFR-631 Logan negro', 55, '2023-12-13 12:31:57', 10000),
(5, 'Carro-propietario', 'inhabilitado', '2023-09-20 05:38:00', 'XSG456 Sail rojo', 22, NULL, 50000),
(6, 'Carro-Propietario', 'Habilitado', '2024-03-28 16:15:00', 'DSA-498 Sail Negro', 3, '2024-03-28 18:19:00', 10000),
(7, 'Carro-Propietario', 'Inhabilitado', '2024-03-14 01:44:00', 'SDA-458 Logan Azul ', 2, NULL, 50000),
(8, 'Carro-Propietario', 'Inhabilitado', '2024-03-08 22:49:00', 'LAK-795 Mazda Rojo', 4, NULL, 50000),
(9, 'Carro-Propietario', 'Inhabilitado', '2024-03-13 19:33:00', 'LAS-489 Logan Rojo', 5, NULL, 50000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_residente`
--

CREATE TABLE `tbl_residente` (
  `id` int(11) NOT NULL,
  `nom_residente` varchar(35) DEFAULT NULL,
  `ced_residente` int(11) DEFAULT NULL,
  `ema_residente` varchar(40) DEFAULT NULL,
  `cel_residente` bigint(11) DEFAULT NULL,
  `num_integrantes` int(11) DEFAULT NULL,
  `fkid_parqueadero` int(11) DEFAULT NULL,
  `fkid_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_residente`
--

INSERT INTO `tbl_residente` (`id`, `nom_residente`, `ced_residente`, `ema_residente`, `cel_residente`, `num_integrantes`, `fkid_parqueadero`, `fkid_rol`) VALUES
(1, 'Orlando Diaz', 110143564, 'orlandodiazdelgado@hotmail.com', 3119485621, 4, 1, 1),
(2, 'Ben Romero', 1114228584, 'benrodriguez@gmail.com', 3134521687, 3, 2, 1),
(3, 'Carlos Arauzo', 1034587951, 'carlosol@gmail.com', 3107543210, 2, 5, 1),
(4, 'Lorenzo Lozano', 1048216548, 'londilo@gmail.com', 3138754221, 3, 6, 1),
(5, 'Pablo Gutierrez', 1114210354, 'padi@gmail.com', 3107543210, 2, NULL, 1),
(6, 'Ruben Silva', 1014321548, 'rubensi@gmail.com', 3114587984, 3, 8, 1),
(7, 'Monica Garzon', 120487986, 'monicga@gmail.com', 3114879875, 5, 9, 1),
(8, 'Miguel Salazar', 1015498765, 'miguelsal@gmail.com', 3158978542, 2, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_rol`
--

CREATE TABLE `tbl_rol` (
  `id` int(11) NOT NULL,
  `nombre_rol` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_rol`
--

INSERT INTO `tbl_rol` (`id`, `nombre_rol`) VALUES
(1, 'Residente'),
(2, 'Administrador'),
(3, 'Vigilante'),
(4, 'Todero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_trabajador`
--

CREATE TABLE `tbl_trabajador` (
  `id` int(11) NOT NULL,
  `nom_trabajador` varchar(35) DEFAULT NULL,
  `cc_trabajador` int(11) NOT NULL,
  `cel_trabajador` bigint(11) NOT NULL,
  `ema_trabajador` varchar(40) DEFAULT NULL,
  `tpco_trabajador` varchar(40) DEFAULT NULL,
  `carg_trabajador` varchar(30) DEFAULT NULL,
  `emp_trabajador` varchar(30) DEFAULT NULL,
  `fkid_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_trabajador`
--

INSERT INTO `tbl_trabajador` (`id`, `nom_trabajador`, `cc_trabajador`, `cel_trabajador`, `ema_trabajador`, `tpco_trabajador`, `carg_trabajador`, `emp_trabajador`, `fkid_rol`) VALUES
(1, 'Alba Amaya', 101653218, 3101246879, 'albaamaya@gmail.com', 'Prestación de Servicios', 'Administradora', 'Administradores', 2),
(2, 'Juan Gonzales', 1032798025, 3114521358, 'Juan1971@gmail.com', 'Indefinido', 'Todero', 'ToderoColombia', 4),
(3, NULL, 0, 0, NULL, NULL, 'Vigilante', NULL, 3),
(4, 'Ruben Noel', 1045785421, 3114587998, 'rubenno@gmail.com', 'Indefinido', 'Vigilante', 'Vigias Colombia', 3),
(5, 'Jorge Torres', 1011874213, 3102245876, 'jorgetorres@gmail.com', 'Indefinido', 'Vigilante', 'Prevenir', 3),
(6, 'Gerardo Cifuentes', 14234875, 3114521879, 'gerardoci@gmail.com', 'Indefinido', 'Vigilante', 'Vigilancia Colombia', 3),
(7, 'Bruce Rosas', 1010154875, 3114521879, 'bruceros@gmail.com', 'Indefinido', 'Vigilante', 'Vigias Colombia', 3),
(9, 'Fernando Medina', 14234878, 3114521210, 'fernandomedina@gmail.com', 'Indefinido', 'Vigilante', 'Vigias Colombia', 3),
(10, 'Jaime Figueroa', 13458794, 3104547870, 'jaimef@gmail.com', 'Indefinido', 'Todero', 'Toderos Colombia', 4),
(11, 'Arturo Ortiz', 1024548764, 3204562130, 'artor@gmail.com', 'Indefinido', 'Vigilante', 'Vigias Colombia', 3),
(12, 'Enrique Delgado', 100459874, 3128978543, 'enriquedelg@gmail.com', 'Indefinido', 'Vigilante', 'Vigias Colombia', 3),
(13, 'Carlos Hoyos', 12458795, 3114589875, 'carlosho@gmail.com', 'Indefinido', 'Vigilante', 'Vigias Colombia', 3),
(14, 'Manuel Zarate', 18354987, 3116542841, 'manuelzar@gmail.com', 'Indefinido', 'Vigilante', 'Vigias Colombia', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(30) DEFAULT NULL,
  `contrasena` varchar(15) DEFAULT NULL,
  `fkid_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`id`, `usuario`, `contrasena`, `fkid_rol`) VALUES
(1, 'pabloguz@gmail.com', 'P@-Gu7m4n.3!', 1),
(2, 'danmartinez@gmail.com', 'D4n.!123', 2),
(3, 'bentedder@gmail.com', 'T3d-de!37*8/', 3),
(4, 'borjavilaseca@gmail.com', 'B0!r2!/1$-3a', 4),
(5, 'jaimeroque@gmail.com', 'J4im3ro', 1),
(6, 'bencasas@gmail.com', 'b3nc4s!', 1),
(7, 'lauraro@gmail.com', 'l4ural@', 1),
(9, 'danielrodriguez@gmail.com', 'D@NiR0*', 3),
(11, 'felipediaz@gmail.com', 'F3l!pe@d1a', 1),
(13, 'claregomez@gmail.com', 'cl4r1G@m', 3),
(14, 'angiecortes@gmail.com', '4ng!e*', 1),
(15, 'cesarlopez@gmail.com', 'ces4r', 1),
(17, 'albert@gmail.com', 'alb4rt', 1),
(20, 'jesusgonzales@gmail.com', 'JFSU@S', 1),
(21, 'jacintaperez@gmail.com', 'jaci2t@!', 1),
(23, 'martharo@gmail.com', 'm2rt@a', 1),
(24, 'santiagocarrero@gmail.com', 's4ntiagoc5@*', 1),
(26, 'marina@gmail.com', 'm4r!g', 1),
(27, 'guillermoriv@gmail.com', 'gus@ald', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_visitantes`
--

CREATE TABLE `tbl_visitantes` (
  `id` int(11) NOT NULL,
  `nom_visitante` varchar(35) DEFAULT NULL,
  `ced_visitante` int(11) DEFAULT NULL,
  `nom_residente` varchar(35) DEFAULT NULL,
  `car_visitante` bit(1) DEFAULT NULL,
  `ingr_visitante` bit(1) DEFAULT NULL,
  `fec_visitante` datetime DEFAULT NULL,
  `fkid_trabajador` int(11) DEFAULT NULL,
  `fkid_parqueadero` int(11) DEFAULT NULL,
  `fkid_inmueble` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_visitantes`
--

INSERT INTO `tbl_visitantes` (`id`, `nom_visitante`, `ced_visitante`, `nom_residente`, `car_visitante`, `ingr_visitante`, `fec_visitante`, `fkid_trabajador`, `fkid_parqueadero`, `fkid_inmueble`) VALUES
(1, 'Guido Martinez', 14245168, 'Alvaro Alvarez', b'1', b'1', '2024-01-17 06:40:08', 3, 4, 4),
(2, 'Clare Lopez', 1154632485, 'Damian Lopez', b'1', b'1', '2024-03-21 19:00:00', 3, 3, 3),
(3, 'Juan Carlos Arauzo', 1015487950, 'Orlando Diaz', b'1', b'1', '2023-11-17 08:35:08', 3, 1, 1),
(4, 'Carlos Guarnizo', 1018745120, 'Carlos Mateo', b'0', b'1', '2024-01-17 06:40:08', 3, NULL, NULL),
(9, 'Enzo Rojas', 1123445645, 'Francisco Rojas', b'1', b'1', '2024-03-12 19:00:00', 6, 6, 17),
(10, 'Juliana Salamanca', 1014564311, 'Santiago Bautista', b'1', b'1', '2024-03-05 19:00:00', 5, 4, 52),
(11, 'Clohe Rios', 1045687987, 'David Rios', b'1', b'1', '2024-03-14 19:00:00', 10, 2, 10),
(12, 'Maria Gomez', 1234564654, 'Patricia Gomez', b'1', b'1', '2024-03-20 19:00:00', 5, 6, 19),
(13, 'Juliana Salamanca', 1021456454, 'Judith Robledo', b'0', b'1', '2024-03-15 19:00:00', 4, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `new_has_role`
--
ALTER TABLE `new_has_role`
  ADD KEY `FKcj516a2s7ee9rxm34il4js20` (`fkid_rol`),
  ADD KEY `FKavrel0867e1bcp1924adfmquw` (`fkid_novedades`);

--
-- Indices de la tabla `property_correspondence`
--
ALTER TABLE `property_correspondence`
  ADD KEY `FKasrj8e1cihlowrcsiu6hw5tmi` (`fkid_correspondencia`),
  ADD KEY `FK2wa7hha45yviy2rpto6y4c0ba` (`fkid_inmueble`);

--
-- Indices de la tabla `tbl_correspondencia`
--
ALTER TABLE `tbl_correspondencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKd08be0l3jmxjjbr9rnlj8sjmp` (`fkid_trabajador`);

--
-- Indices de la tabla `tbl_estcartera`
--
ALTER TABLE `tbl_estcartera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkpdnn5uwpax8x487ub81heg5b` (`fkid_inmueble`),
  ADD KEY `FKmojd19qbf7p50pypiasun622v` (`fkid_trabajador`);

--
-- Indices de la tabla `tbl_inmueble`
--
ALTER TABLE `tbl_inmueble`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjn4gusrj56crrnxcnpdlpgquq` (`fkid_residente`);

--
-- Indices de la tabla `tbl_multa`
--
ALTER TABLE `tbl_multa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKh6e6h051h51r229y3ku265515` (`fkid_inmueble`),
  ADD KEY `FKkji958iwl6u52ftmyhu5jlyht` (`fkid_trabajador`);

--
-- Indices de la tabla `tbl_novedades`
--
ALTER TABLE `tbl_novedades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_parqueadero`
--
ALTER TABLE `tbl_parqueadero`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_residente`
--
ALTER TABLE `tbl_residente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8w3gesmftw8g8cug3qn74jxqk` (`fkid_parqueadero`),
  ADD KEY `FK4tcet6lof1y7vu5qismynlmws` (`fkid_rol`);

--
-- Indices de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_trabajador`
--
ALTER TABLE `tbl_trabajador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt1lrnp3fumykv007ohxu3hrql` (`fkid_rol`);

--
-- Indices de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8kmbvss9j8iiea0v84tt41wpx` (`fkid_rol`);

--
-- Indices de la tabla `tbl_visitantes`
--
ALTER TABLE `tbl_visitantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKsim7hyw3kbcv4y92jfq73g5r3` (`fkid_parqueadero`),
  ADD KEY `FKlfa3n6kyqjlb7su6hpblg65rk` (`fkid_inmueble`),
  ADD KEY `FK84s7bxw8llyx2if0jj8kddxp5` (`fkid_trabajador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_correspondencia`
--
ALTER TABLE `tbl_correspondencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tbl_estcartera`
--
ALTER TABLE `tbl_estcartera`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `tbl_inmueble`
--
ALTER TABLE `tbl_inmueble`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;

--
-- AUTO_INCREMENT de la tabla `tbl_multa`
--
ALTER TABLE `tbl_multa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_novedades`
--
ALTER TABLE `tbl_novedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_parqueadero`
--
ALTER TABLE `tbl_parqueadero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tbl_residente`
--
ALTER TABLE `tbl_residente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_trabajador`
--
ALTER TABLE `tbl_trabajador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tbl_visitantes`
--
ALTER TABLE `tbl_visitantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `new_has_role`
--
ALTER TABLE `new_has_role`
  ADD CONSTRAINT `FKavrel0867e1bcp1924adfmquw` FOREIGN KEY (`fkid_novedades`) REFERENCES `tbl_novedades` (`id`),
  ADD CONSTRAINT `FKcj516a2s7ee9rxm34il4js20` FOREIGN KEY (`fkid_rol`) REFERENCES `tbl_rol` (`id`);

--
-- Filtros para la tabla `property_correspondence`
--
ALTER TABLE `property_correspondence`
  ADD CONSTRAINT `FK2wa7hha45yviy2rpto6y4c0ba` FOREIGN KEY (`fkid_inmueble`) REFERENCES `tbl_inmueble` (`id`),
  ADD CONSTRAINT `FKasrj8e1cihlowrcsiu6hw5tmi` FOREIGN KEY (`fkid_correspondencia`) REFERENCES `tbl_correspondencia` (`id`);

--
-- Filtros para la tabla `tbl_correspondencia`
--
ALTER TABLE `tbl_correspondencia`
  ADD CONSTRAINT `FKd08be0l3jmxjjbr9rnlj8sjmp` FOREIGN KEY (`fkid_trabajador`) REFERENCES `tbl_trabajador` (`id`);

--
-- Filtros para la tabla `tbl_estcartera`
--
ALTER TABLE `tbl_estcartera`
  ADD CONSTRAINT `FKkpdnn5uwpax8x487ub81heg5b` FOREIGN KEY (`fkid_inmueble`) REFERENCES `tbl_inmueble` (`id`),
  ADD CONSTRAINT `FKmojd19qbf7p50pypiasun622v` FOREIGN KEY (`fkid_trabajador`) REFERENCES `tbl_trabajador` (`id`);

--
-- Filtros para la tabla `tbl_inmueble`
--
ALTER TABLE `tbl_inmueble`
  ADD CONSTRAINT `FKjn4gusrj56crrnxcnpdlpgquq` FOREIGN KEY (`fkid_residente`) REFERENCES `tbl_residente` (`id`);

--
-- Filtros para la tabla `tbl_multa`
--
ALTER TABLE `tbl_multa`
  ADD CONSTRAINT `FKh6e6h051h51r229y3ku265515` FOREIGN KEY (`fkid_inmueble`) REFERENCES `tbl_inmueble` (`id`),
  ADD CONSTRAINT `FKkji958iwl6u52ftmyhu5jlyht` FOREIGN KEY (`fkid_trabajador`) REFERENCES `tbl_trabajador` (`id`);

--
-- Filtros para la tabla `tbl_residente`
--
ALTER TABLE `tbl_residente`
  ADD CONSTRAINT `FK4tcet6lof1y7vu5qismynlmws` FOREIGN KEY (`fkid_rol`) REFERENCES `tbl_rol` (`id`),
  ADD CONSTRAINT `FK8w3gesmftw8g8cug3qn74jxqk` FOREIGN KEY (`fkid_parqueadero`) REFERENCES `tbl_parqueadero` (`id`);

--
-- Filtros para la tabla `tbl_trabajador`
--
ALTER TABLE `tbl_trabajador`
  ADD CONSTRAINT `FKt1lrnp3fumykv007ohxu3hrql` FOREIGN KEY (`fkid_rol`) REFERENCES `tbl_rol` (`id`);

--
-- Filtros para la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD CONSTRAINT `FK8kmbvss9j8iiea0v84tt41wpx` FOREIGN KEY (`fkid_rol`) REFERENCES `tbl_rol` (`id`);

--
-- Filtros para la tabla `tbl_visitantes`
--
ALTER TABLE `tbl_visitantes`
  ADD CONSTRAINT `FK84s7bxw8llyx2if0jj8kddxp5` FOREIGN KEY (`fkid_trabajador`) REFERENCES `tbl_trabajador` (`id`),
  ADD CONSTRAINT `FKlfa3n6kyqjlb7su6hpblg65rk` FOREIGN KEY (`fkid_inmueble`) REFERENCES `tbl_inmueble` (`id`),
  ADD CONSTRAINT `FKsim7hyw3kbcv4y92jfq73g5r3` FOREIGN KEY (`fkid_parqueadero`) REFERENCES `tbl_parqueadero` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
