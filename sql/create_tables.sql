-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS veterinaria;
USE veterinaria;

-- Tabla tipo_documento (mejorada con valores por defecto)
CREATE TABLE IF NOT EXISTS tipo_documento (
    id_tp_doc INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar tipos de documento básicos si no existen
INSERT IGNORE INTO tipo_documento (nombre) VALUES 
('Cédula de Ciudadanía'),
('Tarjeta de Identidad'),
('Cédula de Extranjería'),
('Pasaporte');

-- Tabla contrato (solo para Proveedor - mejorada)
CREATE TABLE IF NOT EXISTS contrato (
    id_contrato INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (fecha_fin > fecha_inicio)
);

-- Tabla Persona (tabla madre - mejorada)
CREATE TABLE IF NOT EXISTS Persona (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    direccion VARCHAR(100),
    correo VARCHAR(50) UNIQUE,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    id_tp_doc INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tp_doc) REFERENCES tipo_documento(id_tp_doc),
    INDEX idx_persona_correo (correo)
);

-- Tabla Especializacion (mejorada)
CREATE TABLE IF NOT EXISTS Especializacion (
    id_especializacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Veterinario (mejorada)
CREATE TABLE IF NOT EXISTS Veterinario (
    id_veterinario INT AUTO_INCREMENT PRIMARY KEY,
    credencial VARCHAR(50) NOT NULL UNIQUE,
    salario DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    id_persona INT NOT NULL,
    id_especializacion INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_especializacion) REFERENCES Especializacion(id_especializacion),
    INDEX idx_veterinario_credencial (credencial)
);

-- Tabla Proveedor (mejorada)
CREATE TABLE IF NOT EXISTS Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(100) NOT NULL,
    credencial VARCHAR(50) NOT NULL UNIQUE,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    id_persona INT NOT NULL,
    id_contrato INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_contrato) REFERENCES contrato(id_contrato)
);

-- Tabla Cliente (mejorada)
CREATE TABLE IF NOT EXISTS Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    tipo_cliente VARCHAR(30) NOT NULL DEFAULT 'regular',
    telefono VARCHAR(15),
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    id_persona INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    INDEX idx_cliente_telefono (telefono)
);

-- Tabla Categoria (mejorada)
CREATE TABLE IF NOT EXISTS Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Producto (mejorada)
CREATE TABLE IF NOT EXISTS Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    id_proveedor INT NOT NULL,
    id_categoria INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor),
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria),
    INDEX idx_producto_nombre (nombre)
);

-- Tabla tipo_mascota (mejorada)
CREATE TABLE IF NOT EXISTS tipo_mascota (
    id_tp_mascota INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla mascota (mejorada)
CREATE TABLE IF NOT EXISTS mascota (
    id_mascota INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE,
    raza VARCHAR(50),
    estado VARCHAR(20) NOT NULL DEFAULT 'activo',
    id_tp_mascota INT NOT NULL,
    id_cliente INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tp_mascota) REFERENCES tipo_mascota(id_tp_mascota),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    INDEX idx_mascota_nombre (nombre)
);

-- Tabla servicio (mejorada con restricciones)
CREATE TABLE IF NOT EXISTS servicio (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    costo DECIMAL(10, 2) NOT NULL CHECK (costo >= 0),
    duracion_estimada INT COMMENT 'Duración en minutos',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar servicios básicos si no existen
INSERT IGNORE INTO servicio (nombre_servicio, costo, descripcion, duracion_estimada) VALUES
('Ayudas Diagnósticas', 30000, 'Servicios de diagnóstico por imágenes y laboratorio', 60),
('Hospitalización', 30000, 'Cuidado y monitoreo de mascotas hospitalizadas', 1440),
('Urgencias 24 Horas', 30000, 'Atención de emergencias veterinarias', 30),
('Cirugía Veterinaria', 30000, 'Procedimientos quirúrgicos para mascotas', 120),
('Medicina Preventiva', 30000, 'Vacunación y prevención de enfermedades', 30),
('Consulta Veterinaria', 30000, 'Consulta general con veterinario', 30),
('Laboratorio Clínico', 30000, 'Análisis clínicos y pruebas de laboratorio', 45);

-- Tabla compra (mejorada)
CREATE TABLE IF NOT EXISTS compra (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    total_compra DECIMAL(10,2) NOT NULL CHECK (total_compra >= 0),
    descuento DECIMAL(10,2) DEFAULT 0 CHECK (descuento >= 0),
    fecha_compra DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    forma_pago ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
    estado ENUM('pendiente', 'completada', 'cancelada') DEFAULT 'pendiente',
    id_cliente INT NOT NULL,
    id_veterinario INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_veterinario) REFERENCES Veterinario(id_veterinario),
    INDEX idx_compra_fecha (fecha_compra)
);

-- Tabla detalle_compra (mejorada)
CREATE TABLE IF NOT EXISTS detalle_compra (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario >= 0),
    id_compra INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    UNIQUE KEY uk_compra_producto (id_compra, id_producto)
);

-- Tabla lote_producto (mejorada)
CREATE TABLE IF NOT EXISTS lote_producto (
    id_lote INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL CHECK (cantidad >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    fecha_vencimiento DATE,
    id_producto INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    INDEX idx_lote_vencimiento (fecha_vencimiento)
);

-- Tabla cita (mejorada con restricciones)
CREATE TABLE IF NOT EXISTS cita (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    hora_cita TIME NOT NULL,
    fecha_cita DATE NOT NULL,
    motivo TEXT,
    estado ENUM('pendiente', 'confirmada', 'completada', 'cancelada', 'no_asistio') DEFAULT 'pendiente',
    id_mascota INT NOT NULL,
    id_veterinario INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mascota) REFERENCES mascota(id_mascota),
    FOREIGN KEY (id_veterinario) REFERENCES Veterinario(id_veterinario),
    UNIQUE KEY uk_cita_veterinario (fecha_cita, hora_cita, id_veterinario),
    CHECK (fecha_cita >= CURRENT_DATE)
);

-- Tabla cita_servicio (mejorada)
CREATE TABLE IF NOT EXISTS cita_servicio (
    id_cita INT NOT NULL,
    id_servicio INT NOT NULL,
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_cita, id_servicio),
    FOREIGN KEY (id_cita) REFERENCES cita(id_cita),
    FOREIGN KEY (id_servicio) REFERENCES servicio(id_servicio)
);

-- Tabla usuario_credenciales (mejorada con índices)
CREATE TABLE IF NOT EXISTS usuario_credenciales (
    id_credencial INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    ultimo_login TIMESTAMP NULL,
    intentos_fallidos INT DEFAULT 0,
    estado ENUM('activo', 'bloqueado', 'pendiente') DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    INDEX idx_credenciales_correo (correo)
);

-- Crear usuario admin por defecto si no existe
INSERT IGNORE INTO Persona (nombres, apellidos, correo, id_tp_doc) VALUES 
('Admin', 'Sistema', 'admin@veterinaria.com', 1);

SET @id_persona_admin = LAST_INSERT_ID();

INSERT IGNORE INTO Cliente (id_persona, tipo_cliente) VALUES 
(@id_persona_admin, 'admin');

INSERT IGNORE INTO usuario_credenciales (id_persona, correo, password, estado) VALUES 
(@id_persona_admin, 'admin@veterinaria.com', '$2b$10$N9qo8uLOickgx2ZMRZoMy.MH/qj1Z8LrFNLQ.FUupW/u8X8jLI7uK', 'activo'); -- password: Admin123

-- Crear usuario cliente de prueba
INSERT IGNORE INTO Persona (nombres, apellidos, correo, id_tp_doc) VALUES 
('Cliente', 'Prueba', 'cliente@veterinaria.com', 1);

SET @id_persona_cliente = LAST_INSERT_ID();

INSERT IGNORE INTO Cliente (id_persona) VALUES 
(@id_persona_cliente);

INSERT IGNORE INTO usuario_credenciales (id_persona, correo, password, estado) VALUES 
(@id_persona_cliente, 'cliente@veterinaria.com', '$2b$10$N9qo8uLOickgx2ZMRZoMy.MH/qj1Z8LrFNLQ.FUupW/u8X8jLI7uK', 'activo'); -- password: Admin123

-- Insertar datos básicos de especializaciones
INSERT IGNORE INTO Especializacion (nombre, descripcion) VALUES
('Cirugía', 'Especialista en procedimientos quirúrgicos'),
('Dermatología', 'Especialista en enfermedades de la piel'),
('Cardiología', 'Especialista en enfermedades del corazón'),
('Oftalmología', 'Especialista en enfermedades oculares');

-- Insertar tipos de mascota básicos
INSERT IGNORE INTO tipo_mascota (nombre) VALUES
('Perro'),
('Gato'),
('Ave'),
('Roedor'),
('Reptil'),
('Pez');