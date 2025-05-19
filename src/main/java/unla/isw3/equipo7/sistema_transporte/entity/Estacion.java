package unla.isw3.equipo7.sistema_transporte.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table
@Data
public class Estacion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "estacion_id")
    private Integer estacionId;
    @Column(name = "ubicacion")
    private String ubicacion;
    @Column(name = "tipo")
    private String tipo;

}
