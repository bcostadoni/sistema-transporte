package unla.isw3.equipo7.sistema_transporte.model;

import lombok.Data;

@Data
public class UsuarioModelCrear {
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String tipo_documento;
    private String numero_documento;

}
