package unla.isw3.equipo7.sistema_transporte.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RecargaModelCrear {
    private LocalDateTime fecha;
    private Double monto;
    private Integer usuarioId;
    private Integer metodoPagoId;
}
