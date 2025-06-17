package unla.isw3.equipo7.sistema_transporte.dtos;

import unla.isw3.equipo7.sistema_transporte.entity.Recarga;

import java.time.LocalDateTime;

public class RecargaDTO {
    private Integer id;
    private LocalDateTime fecha;
    private Double monto;
    private Integer usuarioId;
    private MetodoPagoDTO metodoPago;


    public RecargaDTO(Recarga recarga) {
        this.id = recarga.getId();
        this.fecha = recarga.getFecha();
        this.monto = recarga.getMonto();
        this.usuarioId = recarga.getUsuario().getId();
        this.metodoPago = new MetodoPagoDTO(recarga.getMetodoDePago());
    }


    public Integer getId() { return id; }
    public LocalDateTime getFecha() { return fecha; }
    public Double getMonto() { return monto; }
    public Integer getUsuarioId() { return usuarioId; }
    public MetodoPagoDTO getMetodoPago() { return metodoPago; }
}
