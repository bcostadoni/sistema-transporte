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
import unla.isw3.equipo7.sistema_transporte.service.ViajeService;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/viajes")
public class ViajeController {

    @Autowired
    private ViajeService viajeService;

    // Obtener todos los viajes
    @GetMapping
    public ResponseEntity<List<Viaje>> obtenerTodos() {
        return ResponseEntity.ok(viajeService.obtenerTodos());
    }

    // Obtener viaje por ID
    @PostMapping("/traer")
    public ResponseEntity<Viaje> obtenerPorId(@RequestBody ViajeModelTraer model) {
        Optional<Viaje> viaje = viajeService.obtenerPorId(model.getId());
        return viaje.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nuevo viaje
    @PostMapping("/crear")
    public ResponseEntity<Viaje> crear(@RequestBody ViajeModelCrear model) {
        Viaje nuevo = new Viaje();
        nuevo.setFechaHora(model.getFechaHora());
        nuevo.setMonto(model.getMonto());

        Usuario usuario = new Usuario();
        usuario.setId_usuario(model.getUsuarioId());
        nuevo.setUsuario(usuario);

        MetodoDePago metodo = new MetodoDePago();
        metodo.setId_metodo_pago(model.getMetodoPagoId());
        nuevo.setMetodoDePago(metodo);

        Viaje guardado = viajeService.crearViaje(nuevo);
        return ResponseEntity.ok(guardado);
    }

    // Actualizar viaje
    @PutMapping("/actualizar")
    public ResponseEntity<Viaje> actualizar(@RequestBody ViajeModelActualizar model) {
        Optional<Viaje> existente = viajeService.obtenerPorId(model.getId());
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Viaje viaje = existente.get();
        viaje.setFechaHora(model.getFechaHora());
        viaje.setMonto(model.getMonto());

        Usuario usuario = new Usuario();
        usuario.setId_usuario(model.getUsuarioId());
        viaje.setUsuario(usuario);

        MetodoDePago metodo = new MetodoDePago();
        metodo.setId_metodo_pago(model.getMetodoPagoId());
        viaje.setMetodoDePago(metodo);

        Viaje actualizado = viajeService.actualizarViaje(viaje);
        return ResponseEntity.ok(actualizado);
    }

    // Eliminar viaje por ID
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