package unla.isw3.equipo7.sistema_transporte.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import unla.isw3.equipo7.sistema_transporte.entity.Usuario;
import java.util.Optional;

public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Usuario> findByEmailAndPassword(String email, String password);

}


