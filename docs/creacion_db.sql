CREATE DATABASE sistema_transporte;
USE sistema_transporte;

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    contraseña VARCHAR(100),
    tipo_documento VARCHAR(20),
    numero_documento VARCHAR(20),
    saldo DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE MetodoPago (
    id_metodo_pago INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    proveedor VARCHAR(100)
);

CREATE TABLE Estacion (
    id_estacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    tipo VARCHAR(50),
    ubicacion VARCHAR(150)
);

CREATE TABLE Recarga (
    id_recarga INT AUTO_INCREMENT PRIMARY KEY,
    monto DECIMAL(10, 2),
    fecha DATETIME,
    id_usuario INT,
    id_metodo_pago INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_metodo_pago) REFERENCES MetodoPago(id_metodo_pago)
);

CREATE TABLE Viaje (
    id_viaje INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATETIME,
    costo DECIMAL(10,2),
    qr_generado TEXT,
    id_usuario INT,
    id_metodo_pago INT,
    id_estacion_origen INT,
    id_estacion_destino INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_metodo_pago) REFERENCES MetodoPago(id_metodo_pago),
    FOREIGN KEY (id_estacion_origen) REFERENCES Estacion(id_estacion),
    FOREIGN KEY (id_estacion_destino) REFERENCES Estacion(id_estacion)
);