-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2024 a las 17:14:54
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
-- Base de datos: `db_stel1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_correspondencia`
--

CREATE TABLE `tbl_correspondencia` (
  `id` int(11) NOT NULL,
  `tipo_correspondencia` varchar(30) DEFAULT NULL,
  `est_correspondencia` varchar(20) DEFAULT NULL,
  `fentr_correspondencia` datetime(6) DEFAULT NULL,
  `frec_correspodencia` datetime(6) DEFAULT NULL,
  `fkid_trabajador` int(11) DEFAULT NULL,
  `fkid_inmueble` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_correspondencia`
--

INSERT INTO `tbl_correspondencia` (`id`, `tipo_correspondencia`, `est_correspondencia`, `fentr_correspondencia`, `frec_correspodencia`, `fkid_trabajador`, `fkid_inmueble`) VALUES
(2, 'Sobre fragil', 'No entregado', NULL, '2024-06-10 19:00:00.000000', 1, 3),
(4, 'Paquete urgente', 'No entregado', NULL, '2024-06-10 19:00:00.000000', 1, 6),
(5, 'Recibo Gas', 'Entregado', '2024-06-11 19:00:00.000000', '2024-06-11 19:00:00.000000', 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_estcartera`
--

CREATE TABLE `tbl_estcartera` (
  `id` int(11) NOT NULL,
  `est_cartera` varchar(30) DEFAULT NULL,
  `noti_estcartera` varchar(35) DEFAULT NULL,
  `fec_estcartera` datetime(6) DEFAULT NULL,
  `fkid_inmueble` int(11) DEFAULT NULL,
  `fkid_trabajador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_estcartera`
--

INSERT INTO `tbl_estcartera` (`id`, `est_cartera`, `noti_estcartera`, `fec_estcartera`, `fkid_inmueble`, `fkid_trabajador`) VALUES
(1, 'Mora', 'Notificar residente', '2024-06-09 00:00:00.000000', 3, 3),
(2, 'Paz y Salvo', 'Enviar certificado', '2024-06-16 19:00:00.000000', 1, 3);

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
(6, 1, 6, 11),
(10, 1, 8, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_multa`
--

CREATE TABLE `tbl_multa` (
  `id` int(11) NOT NULL,
  `fec_multa` datetime DEFAULT NULL,
  `fpag_multa` datetime DEFAULT NULL,
  `tipo_multa` varchar(30) DEFAULT NULL,
  `val_multa` int(11) NOT NULL,
  `fkid_inmueble` int(11) DEFAULT NULL,
  `fkid_trabajador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_multa`
--

INSERT INTO `tbl_multa` (`id`, `fec_multa`, `fpag_multa`, `tipo_multa`, `val_multa`, `fkid_inmueble`, `fkid_trabajador`) VALUES
(1, '2023-12-11 00:15:00', NULL, 'Ruido excesivo', 100000, 1, 3),
(7, '2024-06-12 19:00:00', NULL, 'Ruido Excesivo', 80000, 6, 3),
(9, '2024-06-11 19:00:00', '2024-07-05 19:00:00', 'Daños Al Conjunto', 100000, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_novedades`
--

CREATE TABLE `tbl_novedades` (
  `id` int(11) NOT NULL,
  `rem_novedades` varchar(30) DEFAULT NULL,
  `tipo_novedad` varchar(45) DEFAULT NULL,
  `asunto_novedades` varchar(65) DEFAULT NULL,
  `desc_novedades` varchar(65) DEFAULT NULL,
  `est_novedades` varchar(25) DEFAULT NULL,
  `fec_novedades` datetime(6) DEFAULT NULL,
  `res_novedades` varchar(30) DEFAULT NULL,
  `fkid_role` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_novedades`
--

INSERT INTO `tbl_novedades` (`id`, `rem_novedades`, `tipo_novedad`, `asunto_novedades`, `desc_novedades`, `est_novedades`, `fec_novedades`, `res_novedades`, `fkid_role`) VALUES
(1, 'Juan Arauzo', 'zonas comunes', 'Lámpara rota', 'Falta iluminación anden 2', 'espera', '2024-06-17 16:07:00.000000', 'programar revisión', 2),
(2, 'Carlos Guzman', 'mascotas', 'mascota sin correa', 'del inmueble 100', 'espera', '2024-06-17 18:08:00.000000', 'Hablar con el propietario', 2),
(3, 'Jorge Cortes', 'parqueadero', 'carro rayado', 'solicito revisión camaras', 'espera', '2024-06-10 08:35:00.000000', 'Programar revisión', 2),
(4, 'Alberto Dominguez', 'Residente', 'Problemas en el anden 2', 'exceso de ruido en inmueble 63', 'Atendida', '2024-06-09 13:13:12.000000', 'programar reunión', 2),
(5, 'Carlos Perez', 'parqueadero', 'carro rayado', 'Revisar cámaras estan rayando carros', 'Espera', '2024-06-09 16:17:00.000000', 'Programar revisión cámaras', 3),
(6, 'Rafael Casas', 'Vigilante', 'daños en el parque', 'Niños rompieron la escalera', 'Espera', '2024-06-11 10:08:00.000000', 'Revisar daños', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_parqueadero`
--

CREATE TABLE `tbl_parqueadero` (
  `id` int(11) NOT NULL,
  `tipo_parqueadero` varchar(30) DEFAULT NULL,
  `estado_parqueadero` varchar(30) DEFAULT NULL,
  `fec_parqueadero` datetime(6) DEFAULT NULL,
  `dvte_parqueadero` varchar(45) DEFAULT NULL,
  `cup_parqueadero` int(11) DEFAULT NULL,
  `hora_salida` datetime(6) DEFAULT NULL,
  `costo_parqueadero` int(11) DEFAULT NULL,
  `fkid_rate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_parqueadero`
--

INSERT INTO `tbl_parqueadero` (`id`, `tipo_parqueadero`, `estado_parqueadero`, `fec_parqueadero`, `dvte_parqueadero`, `cup_parqueadero`, `hora_salida`, `costo_parqueadero`, `fkid_rate`) VALUES
(5, 'Carro-Propietario', 'Inhabilitado', '2024-06-10 12:01:00.000000', 'AWD-662 bmw negro', 1, NULL, 0, NULL),
(7, 'Carro-Visitante', 'Inhabilitado', '2024-06-13 15:51:00.000000', 'SDA-458 Logan Azul ', 2, '2024-06-13 17:53:00.000000', 0, NULL),
(8, 'Carro-Visitante', 'Habilitado', '2024-06-17 16:23:00.000000', 'LAK-795 Mazda Rojo', 3, '2024-06-18 00:12:00.000000', 0, NULL),
(9, 'moto-visitante', 'habilitado', '2024-06-17 16:56:00.000000', 'DFS-27F', 4, '2024-06-17 18:45:00.000000', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_residente`
--

CREATE TABLE `tbl_residente` (
  `id` int(11) NOT NULL,
  `num_integrantes` int(11) DEFAULT NULL,
  `fkid_parqueadero` int(11) DEFAULT NULL,
  `fkid_rol` int(11) DEFAULT NULL,
  `fkid_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_residente`
--

INSERT INTO `tbl_residente` (`id`, `num_integrantes`, `fkid_parqueadero`, `fkid_rol`, `fkid_user`) VALUES
(1, 3, NULL, 2, 2),
(2, 4, NULL, 2, 3),
(3, 3, NULL, 2, 4),
(4, 2, NULL, 2, 5),
(5, 4, NULL, 2, 6),
(6, 1, NULL, 2, 11),
(11, 4, NULL, 2, 9),
(12, 2, NULL, 2, 10),
(13, 3, NULL, 2, 13);

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
(1, 'Administrador'),
(2, 'Residente'),
(3, 'Vigilante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tarifa`
--

CREATE TABLE `tbl_tarifa` (
  `id` int(11) NOT NULL,
  `tipo_vehiculo` varchar(7) DEFAULT NULL,
  `tipo_persona` varchar(11) DEFAULT NULL,
  `rhora_ini` time(6) DEFAULT NULL,
  `rhora_fin` time(6) DEFAULT NULL,
  `tarifa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_tarifa`
--

INSERT INTO `tbl_tarifa` (`id`, `tipo_vehiculo`, `tipo_persona`, `rhora_ini`, `rhora_fin`, `tarifa`) VALUES
(1, 'Carro', 'Visitante', '06:00:00.000000', '18:59:00.000000', 4000),
(2, 'Moto', 'Visitante', '06:00:00.000000', '18:59:00.000000', 6000),
(3, 'Carro', 'Propietario', '06:00:00.000000', '18:59:00.000000', 50000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_trabajador`
--

CREATE TABLE `tbl_trabajador` (
  `id` int(11) NOT NULL,
  `tpco_trabajador` varchar(40) DEFAULT NULL,
  `carg_trabajador` varchar(30) DEFAULT NULL,
  `emp_trabajador` varchar(30) DEFAULT NULL,
  `fkid_rol` int(11) DEFAULT NULL,
  `fkid_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_trabajador`
--

INSERT INTO `tbl_trabajador` (`id`, `tpco_trabajador`, `carg_trabajador`, `emp_trabajador`, `fkid_rol`, `fkid_user`) VALUES
(1, 'Fijo', 'Vigilante', 'Porvenir', 3, 7),
(2, 'Indefinido', 'Vigilante', 'Vigias', 3, 8),
(3, 'Prestación de Servicios', 'Administrador', 'Administradores Colombia', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(30) DEFAULT NULL,
  `contrasena` varchar(15) DEFAULT NULL,
  `nombre` varchar(35) DEFAULT NULL,
  `cedula` int(11) DEFAULT NULL,
  `celular` bigint(20) DEFAULT NULL,
  `fkid_rol` int(11) DEFAULT NULL,
  `tipo-documento` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`id`, `usuario`, `contrasena`, `nombre`, `cedula`, `celular`, `fkid_rol`, `tipo-documento`) VALUES
(1, 'albaamaya@gmail.com', 'AL@8M3*l', 'Alba Amaya', 21374580, 3115462103, 1, 'Cédula de Ciudadanía'),
(2, 'pabloguz@gmail.com', 'P@Bl0gu2', 'Pablo Guzman', 54125368, 3117844521, 2, 'Cédula de Ciudadanía'),
(3, 'danrodriguez@gmail.com', 'D4Nir34!', 'Daniel Rodriguez', 60598795, 3123469877, 2, 'Cédula de Ciudadanía'),
(4, 'samuelli@gmail.com', 'Sam23!l*', 'Samuel Lizarralde', 1011359874, 3131549874, 2, 'Cédula de Ciudadanía'),
(5, 'pablodelgado@gmail.com', 'pAb8l!d3', 'Pablo Delgado', 1013456874, 3150654879, 2, 'Cédula de Ciudadanía'),
(6, 'lorenzoli@gmail.com', 'Lor3l!9*', 'Lorenzo Linares', 56984652, 3107954620, 2, 'Cédula de Ciudadanía'),
(7, 'rafablas@gmail.com', 'R4f@bl1s', 'Rafael Blas', 1103156486, 3134564532, 3, 'Cédula de Ciudadanía'),
(8, 'gabrielang@gmail.com', 'Gab1!mg3', 'Gabriel Romero', 1110546213, 3119865431, 3, 'Cédula de Ciudadanía'),
(9, 'santiagocarrero@gmail.com', '5@Nti!g0', 'Santiago Carrero', 40658987, 3114556879, 2, 'Cédula de Ciudadanía'),
(10, 'carlosmeza@gmail.com', 'Car70!m3', 'Carlos Meza', 55315648, 3109788754, 2, 'Cédula de Ciudadanía'),
(11, 'carlosadness@gmail.com', '(CGfh!Pb', 'Carlos Sadness', 816543211, 3109465231, 2, 'Cédula de Extranjeria'),
(13, 'maryro@gmail.com', 'sLCPwcOx', 'Mary Rosales', 62356894, 3009465210, 2, 'Cédula de Ciudadanía'),
(14, 'claredo@gmail.com', '{A[X[Qdu', 'Clare Dominguez', 15315464, 3105511223, 2, 'Cédula de Ciudadanía'),
(15, 'daphne@gmail.com', '+c9RnkGJ', 'Daphne Ramirez', 54913672, 3207650589, 2, 'Cédula de Ciudadanía'),
(16, 'emasal@gmail.com', 'S%PblFoe', 'Ema Salas', 43165106, 3019430977, 2, 'Cédula de Ciudadanía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_visitantes`
--

CREATE TABLE `tbl_visitantes` (
  `id` int(11) NOT NULL,
  `nom_visitante` varchar(35) DEFAULT NULL,
  `cedula` int(11) DEFAULT NULL,
  `nom_residente` varchar(35) DEFAULT NULL,
  `car_visitante` varchar(2) DEFAULT NULL,
  `ingr_visitante` varchar(2) DEFAULT NULL,
  `fec_visitante` datetime(6) DEFAULT NULL,
  `fkid_trabajador` int(11) DEFAULT NULL,
  `fkid_parqueadero` int(11) DEFAULT NULL,
  `fkid_inmueble` int(11) DEFAULT NULL,
  `tipo-documento` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_visitantes`
--

INSERT INTO `tbl_visitantes` (`id`, `nom_visitante`, `cedula`, `nom_residente`, `car_visitante`, `ingr_visitante`, `fec_visitante`, `fkid_trabajador`, `fkid_parqueadero`, `fkid_inmueble`, `tipo-documento`) VALUES
(1, 'Enzo Rojas', 42398465, 'Francisco Rojas', 'no', 'si', '2024-06-09 00:00:00.000000', 1, NULL, 2, 'Cédula de Ciudadanía'),
(2, 'Guido Torres', 1014364897, 'Alberto Torres', 'no', 'si', '2024-06-09 00:00:00.000000', 1, NULL, 3, 'Cédula de Ciudadanía'),
(3, 'Juliana Salamanca', 1011459876, 'Judith Robledo', 'no', 'si', '2024-06-09 00:00:00.000000', 1, NULL, 1, 'Cédula de Ciudadanía'),
(4, 'Noah López', 1013554221, 'Nicolas Valderrama', 'no', 'si', '2024-06-09 00:00:00.000000', 1, NULL, 2, 'Cédula de Ciudadanía'),
(5, 'Laura Perez', 1001356890, 'Judith Robledo', 'no', 'si', '2024-06-09 00:00:00.000000', 1, NULL, 5, 'Cédula de Ciudadanía'),
(7, 'Enzo Rojas', 1013365414, 'David Rios', 'si', 'si', '2024-06-11 19:00:00.000000', 2, 5, 2, 'Cédula de Ciudadanía'),
(8, 'Clohe Rios', 1011445423, 'Francisco Rojas', 'si', 'si', '2024-06-13 19:00:00.000000', 2, 7, 6, 'Cédula de Ciudadanía'),
(9, 'Guido Martinez', 1135649874, 'Carlos Mateo', 'no', 'si', '2024-06-13 19:00:00.000000', 1, NULL, 2, 'Cédula de Ciudadanía');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_correspondencia`
--
ALTER TABLE `tbl_correspondencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKq0m6ry1ppo69b18wtl43cs9yt` (`fkid_inmueble`),
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmdqay70w3uqib68vfkysx4jd7` (`fkid_role`);

--
-- Indices de la tabla `tbl_parqueadero`
--
ALTER TABLE `tbl_parqueadero`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_icc3cx2r22ak4oancn2cfvonv` (`fkid_rate`);

--
-- Indices de la tabla `tbl_residente`
--
ALTER TABLE `tbl_residente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_7f8de6w726x37r0hvpsbx0kk8` (`fkid_user`),
  ADD KEY `FK8w3gesmftw8g8cug3qn74jxqk` (`fkid_parqueadero`),
  ADD KEY `FK4tcet6lof1y7vu5qismynlmws` (`fkid_rol`);

--
-- Indices de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_tarifa`
--
ALTER TABLE `tbl_tarifa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_trabajador`
--
ALTER TABLE `tbl_trabajador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt1lrnp3fumykv007ohxu3hrql` (`fkid_rol`),
  ADD KEY `FKdvwdpxyj8xkor1jucj9fab65n` (`fkid_user`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_estcartera`
--
ALTER TABLE `tbl_estcartera`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_inmueble`
--
ALTER TABLE `tbl_inmueble`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tbl_multa`
--
ALTER TABLE `tbl_multa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tbl_novedades`
--
ALTER TABLE `tbl_novedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_parqueadero`
--
ALTER TABLE `tbl_parqueadero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tbl_residente`
--
ALTER TABLE `tbl_residente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_tarifa`
--
ALTER TABLE `tbl_tarifa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_trabajador`
--
ALTER TABLE `tbl_trabajador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tbl_visitantes`
--
ALTER TABLE `tbl_visitantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_correspondencia`
--
ALTER TABLE `tbl_correspondencia`
  ADD CONSTRAINT `FKd08be0l3jmxjjbr9rnlj8sjmp` FOREIGN KEY (`fkid_trabajador`) REFERENCES `tbl_trabajador` (`id`),
  ADD CONSTRAINT `FKq0m6ry1ppo69b18wtl43cs9yt` FOREIGN KEY (`fkid_inmueble`) REFERENCES `tbl_inmueble` (`id`);

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
-- Filtros para la tabla `tbl_novedades`
--
ALTER TABLE `tbl_novedades`
  ADD CONSTRAINT `FKmdqay70w3uqib68vfkysx4jd7` FOREIGN KEY (`fkid_role`) REFERENCES `tbl_rol` (`id`);

--
-- Filtros para la tabla `tbl_parqueadero`
--
ALTER TABLE `tbl_parqueadero`
  ADD CONSTRAINT `FKe57dd5ld4piaam3jv3w8tuqea` FOREIGN KEY (`fkid_rate`) REFERENCES `tbl_tarifa` (`id`);

--
-- Filtros para la tabla `tbl_residente`
--
ALTER TABLE `tbl_residente`
  ADD CONSTRAINT `FK4tcet6lof1y7vu5qismynlmws` FOREIGN KEY (`fkid_rol`) REFERENCES `tbl_rol` (`id`),
  ADD CONSTRAINT `FK8w3gesmftw8g8cug3qn74jxqk` FOREIGN KEY (`fkid_parqueadero`) REFERENCES `tbl_parqueadero` (`id`),
  ADD CONSTRAINT `FKm4k2fg1yo8aju23aplwbteoit` FOREIGN KEY (`fkid_user`) REFERENCES `tbl_usuarios` (`id`);

--
-- Filtros para la tabla `tbl_trabajador`
--
ALTER TABLE `tbl_trabajador`
  ADD CONSTRAINT `FKdvwdpxyj8xkor1jucj9fab65n` FOREIGN KEY (`fkid_user`) REFERENCES `tbl_usuarios` (`id`),
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
