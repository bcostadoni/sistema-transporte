package unla.isw3.equipo7.sistema_transporte.dtos;

import unla.isw3.equipo7.sistema_transporte.entity.MetodoDePago;

public class MetodoPagoDTO {
    private Integer id;
    private String tipo;
    private String proveedor;

    public MetodoPagoDTO(MetodoDePago metodo) {
        this.id = metodo.getId();
        this.tipo = metodo.getTipo();
        this.proveedor=metodo.getProveedor();

    }


    public Integer getId() { return id; }
    public String getTipo() { return tipo; }
    public String getProveedor() {return proveedor;}

}