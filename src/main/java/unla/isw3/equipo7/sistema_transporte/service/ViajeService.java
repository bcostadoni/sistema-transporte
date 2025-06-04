package unla.isw3.equipo7.sistema_transporte.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unla.isw3.equipo7.sistema_transporte.entity.Viaje;
import unla.isw3.equipo7.sistema_transporte.repository.IViajeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ViajeService {

    @Autowired
    private IViajeRepository viajeRepository;

    public Viaje crearViaje(Viaje viaje) {
        return viajeRepository.save(viaje);
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
