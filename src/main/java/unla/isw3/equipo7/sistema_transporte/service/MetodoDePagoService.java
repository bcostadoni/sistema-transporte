package unla.isw3.equipo7.sistema_transporte.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unla.isw3.equipo7.sistema_transporte.entity.MetodoDePago;
import unla.isw3.equipo7.sistema_transporte.repository.IMetodoDePagoRepository;

@Service
public class MetodoDePagoService {
    @Autowired
    private IMetodoDePagoRepository metodoDePagoRepository;

    public MetodoDePago crearMetodoDePago(MetodoDePago metodoDePago){
        return metodoDePagoRepository.save(metodoDePago);
    }

    public MetodoDePago actualizarMetodoDePago(MetodoDePago metodoDePAgo) {
        return metodoDePagoRepository.save(metodoDePAgo);
    }

    public void eliminarMetodoDePago(Integer id) {
        metodoDePagoRepository.deleteById(id);
    }

    public Optional<MetodoDePago> obtenerPorId(Integer id) {
        return metodoDePagoRepository.findById(id);
    }

    public List<MetodoDePago> obtenerTodos() {
        return metodoDePagoRepository.findAll();
    }


}
