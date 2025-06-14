package unla.isw3.equipo7.sistema_transporte.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unla.isw3.equipo7.sistema_transporte.entity.Estacion;
import unla.isw3.equipo7.sistema_transporte.repository.IEstacionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EstacionService {
    @Autowired
    private IEstacionRepository estacionRepository;

    public Estacion crear(Estacion estacion) {
        return estacionRepository.save(estacion);
    }

    public List<Estacion> obtenerTodos() {
        return estacionRepository.findAll();
    }

    public Optional<Estacion> obtenerPorId(Integer id) {
        return estacionRepository.findById(id);
    }

    public Estacion actualizar(Estacion estacion) {
        if (estacion.getId() == null || !estacionRepository.existsById(estacion.getId())) {
            throw new IllegalArgumentException("La estación no existe o no tiene ID.");
        }
        return estacionRepository.save(estacion);
    }

    public void eliminar(Integer id) {
        if (!estacionRepository.existsById(id)) {
            throw new IllegalArgumentException("La estación con ID " + id + " no existe.");
        }
        estacionRepository.deleteById(id);
    }
}
