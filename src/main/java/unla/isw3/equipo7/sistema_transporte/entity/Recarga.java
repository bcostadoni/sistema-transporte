package unla.isw3.equipo7.sistema_transporte.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table
@Data
public class Recarga {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "recarga_id")
    private Integer recargaID;
    @Column(name = "fecha")
    private LocalDateTime fecha;
    @Column(name = "canal")
    private String canal;
    @Column(name = "validacion")
    private String validacion;
    @OneToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id_usuario")
    private Usuario usuario;
    @OneToOne
    @JoinColumn(name = "metodo_pago_id", referencedColumnName = "id_metodo_pago")
    private MetodoDePago metodoDePago;
}
