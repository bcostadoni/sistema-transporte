package unla.isw3.equipo7.sistema_transporte.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RecargaModelActualizar {
    private Integer id;
    private LocalDateTime fecha;
    private String canal;
    private String validacion;
    private Integer usuarioId;
    private Integer metodoPagoId;
}
