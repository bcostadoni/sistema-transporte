package unla.isw3.equipo7.sistema_transporte.dtos;

import jakarta.persistence.*;
import lombok.Data;
import unla.isw3.equipo7.sistema_transporte.entity.Estacion;
import unla.isw3.equipo7.sistema_transporte.entity.MetodoDePago;
import unla.isw3.equipo7.sistema_transporte.entity.Usuario;
import unla.isw3.equipo7.sistema_transporte.entity.Viaje;

import java.time.LocalDateTime;

@Data
public class ViajesDTO {


    private Integer id;
    private LocalDateTime fechaHora;
    private float monto;
    private MetodoPagoDTO metodoDePago;
    private EstacionDTO estacionOrigen;
    private EstacionDTO estacionDestino;

    public ViajesDTO(Viaje viaje) {
        this.id = viaje.getId();
        this.fechaHora = viaje.getFechaHora();
        this.monto = viaje.getMonto();

        // Convertir las entidades a DTOs
        this.metodoDePago = new MetodoPagoDTO(viaje.getMetodoDePago());
        this.estacionOrigen = new EstacionDTO(viaje.getEstacionOrigen());
        this.estacionDestino = new EstacionDTO(viaje.getEstacionDestino());

    }
}
