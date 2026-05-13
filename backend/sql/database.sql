-- CondoReserva - Script de base de datos
-- Ejecutar con XAMPP sin clave: mysql -u root < database.sql

CREATE DATABASE IF NOT EXISTS condoreserva_db;
USE condoreserva_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(100) NOT NULL,
  rol VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS espacios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  categoria VARCHAR(50),
  capacidad INT,
  ubicacion VARCHAR(100),
  precio DECIMAL(10,2) DEFAULT 0,
  es_pago BOOLEAN DEFAULT FALSE,
  imagen VARCHAR(255),
  estado VARCHAR(20) DEFAULT 'activo'
);

CREATE TABLE IF NOT EXISTS reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  espacio_id INT NOT NULL,
  fecha DATE NOT NULL,
  hora VARCHAR(10) NOT NULL,
  estado VARCHAR(20) DEFAULT 'confirmada',
  estado_pago VARCHAR(20) DEFAULT 'no_aplica',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (espacio_id) REFERENCES espacios(id)
);

CREATE TABLE IF NOT EXISTS avisos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  fecha DATE NOT NULL,
  estado VARCHAR(20) DEFAULT 'activo'
);

CREATE TABLE IF NOT EXISTS reclamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  descripcion TEXT NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente',
  respuesta TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Usuarios de prueba (contrasenas en texto simple para uso academico)
INSERT IGNORE INTO usuarios (nombre, correo, contrasena, rol) VALUES
('Administrador CondoReserva', 'admin@condoreserva.com', '123456', 'admin'),
('Carlos Fernandez', 'carlos@condoreserva.com', '123456', 'residente');

-- Espacios iniciales
INSERT INTO espacios (nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen, estado)
SELECT 'Piscina Olimpica Norte', 'Piscina para uso recreativo de los residentes. Disponible todos los dias.', 'Relax', 25, 'Piso 1', 0, false, 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=600', 'activo'
WHERE NOT EXISTS (SELECT 1 FROM espacios WHERE nombre = 'Piscina Olimpica Norte');

INSERT INTO espacios (nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen, estado)
SELECT 'Salon de Eventos Gran', 'Ambiente para reuniones familiares y eventos pequenos hasta 60 personas.', 'Social', 60, 'Torre A', 45.00, true, 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600', 'activo'
WHERE NOT EXISTS (SELECT 1 FROM espacios WHERE nombre = 'Salon de Eventos Gran');

INSERT INTO espacios (nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen, estado)
SELECT 'Cancha de Padel Cristal', 'Cancha deportiva para residentes. Se requiere reserva previa.', 'Deporte', 4, 'Zona deportiva', 12.50, true, 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600', 'activo'
WHERE NOT EXISTS (SELECT 1 FROM espacios WHERE nombre = 'Cancha de Padel Cristal');

INSERT INTO espacios (nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen, estado)
SELECT 'Zona de Parrillas', 'Area para parrillas y reuniones al aire libre con vista al jardin.', 'Social', 15, 'Terraza', 10.00, true, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600', 'activo'
WHERE NOT EXISTS (SELECT 1 FROM espacios WHERE nombre = 'Zona de Parrillas');

INSERT INTO espacios (nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen, estado)
SELECT 'Gimnasio Cardiovascular', 'Gimnasio equipado con maquinas de cardio y pesas basicas.', 'Deporte', 12, 'Piso 2', 0, false, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600', 'activo'
WHERE NOT EXISTS (SELECT 1 FROM espacios WHERE nombre = 'Gimnasio Cardiovascular');

INSERT INTO espacios (nombre, descripcion, categoria, capacidad, ubicacion, precio, es_pago, imagen, estado)
SELECT 'Sala de Coworking', 'Sala tranquila con mesas y sillas para trabajo o estudio.', 'Servicios', 10, 'Lobby', 0, false, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600', 'activo'
WHERE NOT EXISTS (SELECT 1 FROM espacios WHERE nombre = 'Sala de Coworking');

-- Avisos iniciales
INSERT INTO avisos (titulo, descripcion, fecha, estado)
SELECT 'Mantenimiento de ascensores', 'El ascensor B estara fuera de servicio el dia de hoy de 14:00 a 17:00. Se recomienda usar las escaleras o el ascensor A.', CURDATE(), 'activo'
WHERE NOT EXISTS (SELECT 1 FROM avisos WHERE titulo = 'Mantenimiento de ascensores');

INSERT INTO avisos (titulo, descripcion, fecha, estado)
SELECT 'Nueva normativa de piscina', 'Se recuerda a todos los residentes el uso obligatorio de gorra de bano al ingresar a la piscina. Esta medida es por higiene y seguridad.', CURDATE(), 'activo'
WHERE NOT EXISTS (SELECT 1 FROM avisos WHERE titulo = 'Nueva normativa de piscina');
