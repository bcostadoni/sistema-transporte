package unla.isw3.equipo7.sistema_transporte.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unla.isw3.equipo7.sistema_transporte.entity.Estacion;
import unla.isw3.equipo7.sistema_transporte.model.EstacionModelActualizar;
import unla.isw3.equipo7.sistema_transporte.model.EstacionModelCrear;
import unla.isw3.equipo7.sistema_transporte.model.EstacionModelTraer;
import unla.isw3.equipo7.sistema_transporte.service.EstacionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/estaciones")
public class EstacionController {

    @Autowired
    private EstacionService estacionService;

    // Obtener todas las estaciones
    @GetMapping
    public ResponseEntity<List<Estacion>> obtenerTodos() {
        return ResponseEntity.ok(estacionService.obtenerTodos());
    }

    // Obtener estación por ID
    @PostMapping("/traer")
    public ResponseEntity<Estacion> obtenerPorId(@RequestBody EstacionModelTraer model) {
        Optional<Estacion> estacion = estacionService.obtenerPorId(model.getId());
        return estacion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva estación
    @PostMapping("/crear")
    public ResponseEntity<Estacion> crear(@RequestBody EstacionModelCrear model) {
        Estacion nueva = new Estacion();
        nueva.setUbicacion(model.getUbicacion());
        nueva.setTipo(model.getTipo());

        Estacion guardada = estacionService.crear(nueva);
        return ResponseEntity.ok(guardada);
    }

    // Actualizar estación
    @PutMapping("/actualizar")
    public ResponseEntity<Estacion> actualizar(@RequestBody EstacionModelActualizar model) {
        Optional<Estacion> existente = estacionService.obtenerPorId(model.getId());
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Estacion estacion = existente.get();
        estacion.setUbicacion(model.getUbicacion());
        estacion.setTipo(model.getTipo());

        Estacion actualizada = estacionService.actualizar(estacion);
        return ResponseEntity.ok(actualizada);
    }

    // Eliminar estación por ID
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Estacion> existente = estacionService.obtenerPorId(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        estacionService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
