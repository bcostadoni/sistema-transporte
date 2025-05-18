package unla.isw3.equipo7.sistema_transporte.entity;

import jakarta.persistence.*;
import lombok.Data;
import unla.isw3.equipo7.sistema_transporte.entity.MetodoDePago;
import unla.isw3.equipo7.sistema_transporte.entity.Usuario;

import java.time.LocalDateTime;

@Entity
@Table
@Data
public class Viaje {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "viaje_id")
    private Integer viajeId;
    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;
    @Column(name = "monto")
    private float monto;
    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id_usuario")
    private Usuario usuario;
    @OneToOne
    @JoinColumn(name = "metodo_pago_id", referencedColumnName = "id_metodo_pago")
    private MetodoDePago metodoDePago;

}




