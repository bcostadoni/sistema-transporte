package unla.isw3.equipo7.sistema_transporte.dtos;

import lombok.Data;
import unla.isw3.equipo7.sistema_transporte.entity.Estacion;

@Data

public class EstacionDTO {


    private Integer id;
    private String ubicacion;
    private String tipo;

    public EstacionDTO(Estacion estacion) {
        if(estacion != null) {
            this.id = estacion.getId();// Asegúrate que la entidad tenga este campo
            this.ubicacion = estacion.getUbicacion();
            this.tipo = estacion.getTipo();
        }
    }
}
