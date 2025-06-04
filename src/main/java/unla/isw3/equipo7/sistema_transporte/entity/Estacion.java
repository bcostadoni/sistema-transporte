package unla.isw3.equipo7.sistema_transporte.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Estacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "ubicacion")
    private String ubicacion;
    @Column(name = "tipo")
    private String tipo;

}
