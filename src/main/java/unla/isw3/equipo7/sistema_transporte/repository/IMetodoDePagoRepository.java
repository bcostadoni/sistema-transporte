package unla.isw3.equipo7.sistema_transporte.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import unla.isw3.equipo7.sistema_transporte.entity.MetodoDePago;
//import java.util.Optional;

public interface IMetodoDePagoRepository extends JpaRepository<MetodoDePago, Integer> {
    //Optional<MetodoDePago> findByIdOptional(Integer idMetodoDePago);

}
