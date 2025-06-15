package unla.isw3.equipo7.sistema_transporte.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table
@Data
public class Recarga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "fecha")
    private LocalDateTime fecha;
    @Column(name = "monto")
    private Double monto;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metodo_pago_id", nullable = false)
    private MetodoDePago metodoDePago;
}
