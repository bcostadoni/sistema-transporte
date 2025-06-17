package unla.isw3.equipo7.sistema_transporte.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unla.isw3.equipo7.sistema_transporte.entity.Recarga;

import java.util.List;

public interface IRecargaRepository extends JpaRepository<Recarga,Integer> {

    List<Recarga> findByUsuarioId(Integer usuarioId);
}
