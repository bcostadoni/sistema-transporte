package unla.isw3.equipo7.sistema_transporte.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unla.isw3.equipo7.sistema_transporte.entity.Viaje;

public interface IViajeRepository extends JpaRepository<Viaje,Integer> {
}
