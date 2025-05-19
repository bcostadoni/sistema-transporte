package unla.isw3.equipo7.sistema_transporte.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unla.isw3.equipo7.sistema_transporte.entity.MetodoDePago;
import unla.isw3.equipo7.sistema_transporte.entity.Usuario;
import unla.isw3.equipo7.sistema_transporte.entity.Viaje;
import unla.isw3.equipo7.sistema_transporte.model.ViajeModelActualizar;
import unla.isw3.equipo7.sistema_transporte.model.ViajeModelCrear;
import unla.isw3.equipo7.sistema_transporte.model.ViajeModelTraer;
import unla.isw3.equipo7.sistema_transporte.service.EstacionService;
import unla.isw3.equipo7.sistema_transporte.service.MetodoDePagoService;
import unla.isw3.equipo7.sistema_transporte.service.UsuarioService;
import unla.isw3.equipo7.sistema_transporte.service.ViajeService;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/viajes")
public class ViajeController {

    @Autowired
    private ViajeService viajeService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private MetodoDePagoService metodoDePagoService;

    @Autowired
    private EstacionService estacionService;

    @GetMapping
    public ResponseEntity<List<Viaje>> obtenerTodos() {
        return ResponseEntity.ok(viajeService.obtenerTodos());
    }

    @PostMapping("/traer")
    public ResponseEntity<Viaje> obtenerPorId(@RequestBody ViajeModelTraer model) {
        Optional<Viaje> viaje = viajeService.obtenerPorId(model.getId());
        return viaje.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/crear")
    public ResponseEntity<Viaje> crear(@RequestBody ViajeModelCrear model) {
        Viaje nuevo = new Viaje();
        nuevo.setFechaHora(model.getFechaHora());
        nuevo.setMonto(model.getMonto());

        // Set usuario
        usuarioService.obtenerPorId(model.getUsuarioId()).ifPresent(nuevo::setUsuario);

        // Set método de pago
        metodoDePagoService.obtenerPorId(model.getMetodoPagoId()).ifPresent(nuevo::setMetodoDePago);

        // Set estaciones
        estacionService.obtenerPorId(model.getEstacionOrigenId()).ifPresent(nuevo::setEstacionOrigen);
        estacionService.obtenerPorId(model.getEstacionDestinoId()).ifPresent(nuevo::setEstacionDestino);

        Viaje guardado = viajeService.crearViaje(nuevo);
        return ResponseEntity.ok(guardado);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Viaje> actualizar(@RequestBody ViajeModelActualizar model) {
        Optional<Viaje> existente = viajeService.obtenerPorId(model.getId());
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Viaje viaje = existente.get();
        viaje.setFechaHora(model.getFechaHora());
        viaje.setMonto(model.getMonto());

        usuarioService.obtenerPorId(model.getUsuarioId()).ifPresent(viaje::setUsuario);
        metodoDePagoService.obtenerPorId(model.getMetodoPagoId()).ifPresent(viaje::setMetodoDePago);
        estacionService.obtenerPorId(model.getEstacionOrigenId()).ifPresent(viaje::setEstacionOrigen);
        estacionService.obtenerPorId(model.getEstacionDestinoId()).ifPresent(viaje::setEstacionDestino);

        Viaje actualizado = viajeService.actualizarViaje(viaje);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Viaje> existente = viajeService.obtenerPorId(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        viajeService.eliminarViaje(id);
        return ResponseEntity.ok().build();
    }
}