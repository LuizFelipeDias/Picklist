-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 06/12/2024 às 10:40
-- Versão do servidor: 8.0.34
-- Versão do PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `picklist`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `picklist`
--

CREATE TABLE `picklist` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `barcode` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `linha` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `picklist`
--

INSERT INTO `picklist` (`id`, `user_id`, `barcode`, `linha`, `status`, `created_at`, `updated_at`) VALUES

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_user` int NOT NULL,
  `name_user` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `prontuario_user` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password_user` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `linha` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id_user`, `name_user`, `prontuario_user`, `password_user`, `linha`) VALUES
--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `picklist`
--
ALTER TABLE `picklist`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `prontuario_user` (`prontuario_user`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `picklist`
--
ALTER TABLE `picklist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9116;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
