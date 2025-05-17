-- Usuarios
INSERT INTO usuario (nombre, apellido, email, password, tipo_documento, numero_documento) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '12345', 'DNI', '12345678'),
('María', 'Gómez', 'maria.gomez@example.com', '12345', 'DNI', '87654321'),
('Carlos', 'López', 'carlos.lopez@example.com', '12345', 'Pasaporte', 'AB123456'),
('Ana', 'Martínez', 'ana.martinez@example.com', '12345', 'DNI', '11223344'),
('Lucía', 'Fernández', 'lucia.fernandez@example.com', '12345', 'Cedula', '55667788');

-- Métodos de Pago
INSERT INTO metodo_de_pago (tipo, proveedor) VALUES
('Tarjeta de Crédito', 'Visa'),
('Tarjeta de Débito', 'Mastercard'),
('Mercado Pago', 'Mercado Libre'),
('Transferencia Bancaria', 'Banco Nación'),
('Billetera Virtual', 'Ualá');
