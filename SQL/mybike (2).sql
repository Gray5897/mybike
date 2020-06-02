-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2020 a las 01:21:23
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 7.0.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mybike`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bicicletas`
--

CREATE TABLE `bicicletas` (
  `id` int(15) NOT NULL,
  `marca` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `modelo` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `color` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `serie` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `imagen` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `id_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `Id_user` bigint(20) NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`Id_user`, `password`) VALUES
(1079412118, '7110eda4d09e062aa5e4a390b0a572ac0d2c0220');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `tipo_doc` enum('TI','CC') COLLATE utf8_spanish_ci NOT NULL,
  `users_id` bigint(20) NOT NULL,
  `nombres` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `apellidoA` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `apellidoS` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fecha_Nacimiento` date NOT NULL,
  `telefono` bigint(20) NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `tipo_user` enum('cliente','Administrador') COLLATE utf8_spanish_ci NOT NULL,
  `genero` enum('M','F') COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`tipo_doc`, `users_id`, `nombres`, `apellidoA`, `apellidoS`, `fecha_Nacimiento`, `telefono`, `email`, `direccion`, `tipo_user`, `genero`) VALUES
('CC', 22222222, 'bbbbbbbbbCC', 'bbbbbbbbbCC', 'CCCC', '1996-09-09', 43434343434, 'bbbbbbbbbCCC', 'sddsdsdCCCC', 'Administrador', 'F'),
('CC', 1079412118, 'jeferson alejandro', 'cubides ', 'saenz', '1997-08-05', 3102613172, '123jefersaenzgmail.com', 'calle 6 N 2-18', 'Administrador', 'M'),
('CC', 111111111111, 'aaaaabC', 'aaaaabC', 'aaaaaaaaaabC', '2020-05-05', 222222222, 'aaaaaaaaa', 'aaaaaaa', 'cliente', 'M');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bicicletas`
--
ALTER TABLE `bicicletas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`Id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bicicletas`
--
ALTER TABLE `bicicletas`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD CONSTRAINT `sesion_ibfk_1` FOREIGN KEY (`Id_user`) REFERENCES `users` (`users_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
