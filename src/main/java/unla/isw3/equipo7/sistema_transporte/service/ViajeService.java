package unla.isw3.equipo7.sistema_transporte.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unla.isw3.equipo7.sistema_transporte.entity.Usuario;
import unla.isw3.equipo7.sistema_transporte.entity.Viaje;
import unla.isw3.equipo7.sistema_transporte.repository.IEstacionRepository;
import unla.isw3.equipo7.sistema_transporte.repository.IUsuarioRepository;
import unla.isw3.equipo7.sistema_transporte.repository.IViajeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ViajeService {

    private final IViajeRepository viajeRepository;
    private final IUsuarioRepository usuarioRepository;
    @Autowired

    public ViajeService(IViajeRepository viajeRepository, IUsuarioRepository usuarioRepository) {
        this.viajeRepository = viajeRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Viaje crearViaje(Viaje viaje) {
        Usuario usuario = viaje.getUsuario();

        Optional<Usuario> usuarioExistenteOpt = usuarioRepository.findById(usuario.getId());
        if (usuarioExistenteOpt.isPresent()) {
            Usuario usuarioExistente = usuarioExistenteOpt.get();

            Double saldoActual = usuarioExistente.getSaldo() != null ? usuarioExistente.getSaldo() : 0.0;

            // Validar si el saldo es suficiente
            if (saldoActual < viaje.getMonto()) {
                throw new IllegalArgumentException("Saldo insuficiente para realizar el viaje. Saldo actual: "
                        + saldoActual + ", monto del viaje: " + viaje.getMonto());
            }
            usuarioExistente.setSaldo(saldoActual - viaje.getMonto());

            usuarioRepository.save(usuarioExistente);

            viaje.setUsuario(usuarioExistente);

            return viajeRepository.save(viaje);
        } else {
            throw new RuntimeException("Usuario no encontrado con ID: " + usuario.getId());
        }

    }

    public Viaje actualizarViaje(Viaje viaje) {
        return viajeRepository.save(viaje);
    }

    public void eliminarViaje(Integer idViaje) {
        viajeRepository.deleteById(idViaje);
    }

    public Optional<Viaje> obtenerPorId(Integer id) {
        return viajeRepository.findById(id);
    }

    public List<Viaje> obtenerTodos() {
        return viajeRepository.findAll();
    }

    public List<Viaje> obtenerPorUsuario(Integer usuarioId) {
        return viajeRepository.findByUsuarioId(usuarioId);
    }
}
