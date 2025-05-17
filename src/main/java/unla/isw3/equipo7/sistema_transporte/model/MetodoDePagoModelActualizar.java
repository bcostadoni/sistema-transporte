package unla.isw3.equipo7.sistema_transporte.model;

import lombok.Data;

@Data
public class MetodoDePagoModelActualizar {
    private Integer id_metodo_pago;
    private String tipo;
    private String proveedor;
}
