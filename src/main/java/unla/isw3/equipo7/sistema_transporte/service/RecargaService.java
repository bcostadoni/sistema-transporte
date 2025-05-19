package unla.isw3.equipo7.sistema_transporte.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unla.isw3.equipo7.sistema_transporte.entity.Recarga;
import unla.isw3.equipo7.sistema_transporte.repository.IRecargaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RecargaService {

    @Autowired
    private IRecargaRepository recargaRepository;

    public List<Recarga> obtenerTodas() {
        return recargaRepository.findAll();
    }

    public Optional<Recarga> obtenerPorId(Integer id) {
        return recargaRepository.findById(id);
    }

    public Recarga crearRecarga(Recarga recarga) {
        return recargaRepository.save(recarga);
    }

    public Recarga actualizarRecarga(Recarga recarga) {
        return recargaRepository.save(recarga);
    }

    public void eliminarRecarga(Integer id) {
        recargaRepository.deleteById(id);
    }
}