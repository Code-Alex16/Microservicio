CREATE DATABASE DB_Agenda_Contactos;
USE DB_Agenda_Contactos;

CREATE TABLE tbl_categorias (
	id_categoria INT PRIMARY KEY AUTO_INCREMENT,
	categoria VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL UNIQUE,
	passkey VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_contactos (
	id_contacto INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
	apellido VARCHAR(100),
	telefono VARCHAR(20) NOT NULL,
	correo VARCHAR(50),
	id_usuario INT,
	id_categoria INT
);

ALTER TABLE tbl_contactos
ADD CONSTRAINT fk_contactos_usuario
FOREIGN KEY (id_usuario)
REFERENCES tbl_usuario(id_usuario);

ALTER TABLE tbl_contactos
ADD CONSTRAINT fk_contactos_categoria
FOREIGN KEY (id_categoria)
REFERENCES tbl_categorias(id_categoria);