package unla.isw3.equipo7.sistema_transporte.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table
@Data
public class Viaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;
    @Column(name = "monto")
    private float monto;
    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;
    @OneToOne
    @JoinColumn(name = "metodo_pago_id", referencedColumnName = "id")
    private MetodoDePago metodoDePago;

    @ManyToOne
    @JoinColumn(name = "estacion_origen_id", referencedColumnName = "id")
    private Estacion estacionOrigen;

    @ManyToOne
    @JoinColumn(name = "estacion_destino_id", referencedColumnName = "id")
    private Estacion estacionDestino;
}




