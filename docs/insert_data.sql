USE sistema_transporte;

-- Usuarios
INSERT INTO Usuario (nombre, apellido, email, password, tipo_documento, numero_documento, saldo) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '12345', 'DNI', '12345678', 5000),
('María', 'Gómez', 'maria.gomez@example.com', '12345', 'DNI', '87654321', 6000),
('Carlos', 'López', 'carlos.lopez@example.com', '12345', 'Pasaporte', 'AB123456', 7000),
('Ana', 'Martínez', 'ana.martinez@example.com', '12345', 'DNI', '11223344', 8000),
('Lucía', 'Fernández', 'lucia.fernandez@example.com', '12345', 'Cedula', '55667788', 9000);

-- Métodos de Pago
INSERT INTO Metodo_De_Pago (tipo, proveedor) VALUES
('Tarjeta de Crédito', 'Visa'),
('Tarjeta de Débito', 'Mastercard'),
('Mercado Pago', 'Mercado Libre'),
('Transferencia Bancaria', 'Banco Nación'),
('Billetera Virtual', 'Ualá');

INSERT INTO Estacion (ubicacion, tipo) VALUES
('Constitución', 'Tren'),
('Hipólito Yrigoyen', 'Tren'),
('Darío Santillán y Maximiliano Kosteki', 'Tren'),
('Gerli', 'Tren'),
('Lanús', 'Tren'),
('Escalada', 'Tren'),
('Banfield', 'Tren'),
('Lomas de Zamora', 'Tren'),
('Temperley', 'Tren'),
('Adrogué', 'Tren'),
('Burzaco', 'Tren'),
('Longchamps', 'Tren'),
('Glew', 'Tren'),
('Guernica', 'Tren'),
('Alejandro Korn', 'Tren');


-- Recargas
INSERT INTO Recarga (monto, fecha, usuario_id, metodo_pago_id)
VALUES 
(200.00, '2024-06-01 10:30:00', 1, 1),
(100.00, '2024-06-02 11:00:00', 2, 2),
(150.00, '2024-06-03 09:45:00', 3, 3);

-- Viajes
INSERT INTO Viaje (fecha_hora, costo, qr_generado, usuario_id, metodo_pago_id, estacion_origen_id, estacion_destino_id)
VALUES 
('2024-06-03 12:00:00', 50.00, 'QR123ABC', 1, 1, 1, 2),
('2024-06-03 13:30:00', 45.00, 'QR456DEF', 2, 2, 2, 3),
('2024-06-03 14:15:00', 30.00, 'QR789GHI', 3, 3, 3, 1);
