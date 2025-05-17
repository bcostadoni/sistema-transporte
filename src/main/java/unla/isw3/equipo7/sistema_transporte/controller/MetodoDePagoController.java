package unla.isw3.equipo7.sistema_transporte.controller;

import unla.isw3.equipo7.sistema_transporte.entity.MetodoDePago;
import unla.isw3.equipo7.sistema_transporte.model.MetodoDePagoModelCrear;
import unla.isw3.equipo7.sistema_transporte.model.MetodoDePagoModelActualizar;
import unla.isw3.equipo7.sistema_transporte.model.MetodoDePagoModelTraer;
import unla.isw3.equipo7.sistema_transporte.service.MetodoDePagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/MetodoDePagos")
public class MetodoDePagoController {

    @Autowired
    private MetodoDePagoService metodoDePagoService;

    // Obtener todos los MetodoDePagos
    @GetMapping
    public ResponseEntity<List<MetodoDePago>> obtenerTodos() {
        return ResponseEntity.ok(metodoDePagoService.obtenerTodos());
    }

    // Obtener MetodoDePago por ID
    @PostMapping("/traer")
    public ResponseEntity<MetodoDePago> obtenerPorId(@RequestBody MetodoDePagoModelTraer model) {
        Optional<MetodoDePago> MetodoDePago = metodoDePagoService.obtenerPorId(model.getId_metodo_pago());
        return MetodoDePago.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nuevo MetodoDePago
    @PostMapping("/crear")
    public ResponseEntity<MetodoDePago> crear(@RequestBody MetodoDePagoModelCrear model) {
        MetodoDePago nuevo = new MetodoDePago();
        nuevo.setTipo(model.getTipo());
        nuevo.setProveedor(model.getProvedor());
        
        MetodoDePago guardado = metodoDePagoService.crearMetodoDePago(nuevo);
        return ResponseEntity.ok(guardado);
    }

    // Actualizar MetodoDePago
    @PutMapping("/actualizar")
    public ResponseEntity<MetodoDePago> actualizar(@RequestBody MetodoDePagoModelActualizar model) {
        Optional<MetodoDePago> existente = metodoDePagoService.obtenerPorId(model.getId_metodo_pago());
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        MetodoDePago MetodoDePago = existente.get();
        MetodoDePago.setTipo(model.getTipo());
        MetodoDePago.setProveedor(model.getProveedor());

        MetodoDePago actualizado = metodoDePagoService.actualizarMetodoDePago(MetodoDePago);
        return ResponseEntity.ok(actualizado);
    }

    // Eliminar MetodoDePago por ID
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<MetodoDePago> existente = metodoDePagoService.obtenerPorId(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        metodoDePagoService.eliminarMetodoDePago(id);
        return ResponseEntity.ok().build();
    }
}