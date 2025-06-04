package unla.isw3.equipo7.sistema_transporte.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unla.isw3.equipo7.sistema_transporte.entity.Recarga;
import unla.isw3.equipo7.sistema_transporte.model.RecargaModelActualizar;
import unla.isw3.equipo7.sistema_transporte.model.RecargaModelCrear;
import unla.isw3.equipo7.sistema_transporte.model.RecargaModelTraer;
import unla.isw3.equipo7.sistema_transporte.service.MetodoDePagoService;
import unla.isw3.equipo7.sistema_transporte.service.RecargaService;
import unla.isw3.equipo7.sistema_transporte.service.UsuarioService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recargas")
public class RecargaController {

    @Autowired
    private RecargaService recargaService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private MetodoDePagoService metodoDePagoService;

    @GetMapping
    public ResponseEntity<List<Recarga>> obtenerTodas() {
        return ResponseEntity.ok(recargaService.obtenerTodas());
    }

    @PostMapping("/traer")
    public ResponseEntity<Recarga> obtenerPorId(@RequestBody RecargaModelTraer model) {
        Optional<Recarga> recarga = recargaService.obtenerPorId(model.getId());
        return recarga.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/crear")
    public ResponseEntity<Recarga> crear(@RequestBody RecargaModelCrear model) {
        Recarga nueva = new Recarga();
        nueva.setFecha(model.getFecha());

        usuarioService.obtenerPorId(model.getUsuarioId()).ifPresent(nueva::setUsuario);
        metodoDePagoService.obtenerPorId(model.getMetodoPagoId()).ifPresent(nueva::setMetodoDePago);

        Recarga guardada = recargaService.crearRecarga(nueva);
        return ResponseEntity.ok(guardada);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Recarga> actualizar(@RequestBody RecargaModelActualizar model) {
        Optional<Recarga> existente = recargaService.obtenerPorId(model.getId());
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Recarga recarga = existente.get();
        recarga.setFecha(model.getFecha());

        usuarioService.obtenerPorId(model.getUsuarioId()).ifPresent(recarga::setUsuario);
        metodoDePagoService.obtenerPorId(model.getMetodoPagoId()).ifPresent(recarga::setMetodoDePago);

        Recarga actualizada = recargaService.actualizarRecarga(recarga);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Recarga> existente = recargaService.obtenerPorId(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        recargaService.eliminarRecarga(id);
        return ResponseEntity.ok().build();
    }
}