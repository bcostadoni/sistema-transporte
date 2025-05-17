package unla.isw3.equipo7.sistema_transporte.controller;

import unla.isw3.equipo7.sistema_transporte.entity.Usuario;
import unla.isw3.equipo7.sistema_transporte.model.UsuarioModelCrear;
import unla.isw3.equipo7.sistema_transporte.model.UsuarioModelActualizar;
import unla.isw3.equipo7.sistema_transporte.model.UsuarioModelTraer;
import unla.isw3.equipo7.sistema_transporte.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodos() {
        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    // Obtener usuario por ID
    @PostMapping("/traer")
    public ResponseEntity<Usuario> obtenerPorId(@RequestBody UsuarioModelTraer model) {
        Optional<Usuario> usuario = usuarioService.obtenerPorId(model.getId());
        return usuario.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nuevo usuario
    @PostMapping("/crear")
    public ResponseEntity<Usuario> crear(@RequestBody UsuarioModelCrear model) {
        Usuario nuevo = new Usuario();
        nuevo.setNombre(model.getNombre());
        nuevo.setApellido(model.getApellido());
        nuevo.setEmail(model.getEmail());
        nuevo.setPassword(model.getPassword());
        nuevo.setTipo_documento(model.getTipo_documento());
        nuevo.setNumero_documento(model.getNumero_documento());

        Usuario guardado = usuarioService.crearUsuario(nuevo);
        return ResponseEntity.ok(guardado);
    }

    // Actualizar usuario
    @PutMapping("/actualizar")
    public ResponseEntity<Usuario> actualizar(@RequestBody UsuarioModelActualizar model) {
        Optional<Usuario> existente = usuarioService.obtenerPorId(model.getId());
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Usuario usuario = existente.get();
        usuario.setNombre(model.getNombre());
        usuario.setApellido(model.getApellido());
        usuario.setEmail(model.getEmail());
        usuario.setPassword(model.getPassword());        
        usuario.setTipo_documento(model.getTipo_documento());
        usuario.setNumero_documento(model.getNumero_documento());

        Usuario actualizado = usuarioService.actualizarUsuario(usuario);
        return ResponseEntity.ok(actualizado);
    }

    // Eliminar usuario por ID
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        Optional<Usuario> existente = usuarioService.obtenerPorId(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok().build();
    }
}