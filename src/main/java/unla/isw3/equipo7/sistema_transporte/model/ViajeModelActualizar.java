package unla.isw3.equipo7.sistema_transporte.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ViajeModelActualizar {
    private Integer id;
    private LocalDateTime fechaHora;
    private float monto;
    private Integer usuarioId;
    private Integer metodoPagoId;
}
