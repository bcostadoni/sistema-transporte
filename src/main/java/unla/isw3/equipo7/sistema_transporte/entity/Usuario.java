package unla.isw3.equipo7.sistema_transporte.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // <- columna en la base de datos
    private Integer id;   // <- propiedad Java (camelCase)
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String tipo_documento;
    private String numero_documento;
    private Double saldo;

    // Lombok genera el constructor por defecto, getters, setters y otros métodos como equals(), hashCode(), toString()
}
