package unla.isw3.equipo7.sistema_transporte.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unla.isw3.equipo7.sistema_transporte.entity.Recarga;
import unla.isw3.equipo7.sistema_transporte.entity.Usuario;
import unla.isw3.equipo7.sistema_transporte.repository.IRecargaRepository;
import unla.isw3.equipo7.sistema_transporte.repository.IUsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RecargaService {

    private final IRecargaRepository recargaRepository;
    private final IUsuarioRepository usuarioRepository;

    @Autowired
    public RecargaService(IRecargaRepository recargaRepository, IUsuarioRepository usuarioRepository) {
        this.recargaRepository = recargaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Recarga> obtenerTodas() {
        return recargaRepository.findAll();
    }

    public Optional<Recarga> obtenerPorId(Integer id) {
        return recargaRepository.findById(id);
    }
    public Recarga crearRecarga(Recarga recarga) {
        Usuario usuario = recarga.getUsuario();

        Optional<Usuario> usuarioExistenteOpt = usuarioRepository.findById(usuario.getId());
        if (usuarioExistenteOpt.isPresent()) {
            Usuario usuarioExistente = usuarioExistenteOpt.get();

            Double saldoActual = usuarioExistente.getSaldo() != null ? usuarioExistente.getSaldo() : 0.0;
            usuarioExistente.setSaldo(saldoActual + recarga.getMonto());

            usuarioRepository.save(usuarioExistente);

            recarga.setUsuario(usuarioExistente);

            return recargaRepository.save(recarga);
        } else {
            throw new RuntimeException("Usuario no encontrado con ID: " + usuario.getId());
        }
    }
    public Recarga actualizarRecarga(Recarga recarga) {
        return recargaRepository.save(recarga);
    }

    public void eliminarRecarga(Integer id) {
        recargaRepository.deleteById(id);
    }
}