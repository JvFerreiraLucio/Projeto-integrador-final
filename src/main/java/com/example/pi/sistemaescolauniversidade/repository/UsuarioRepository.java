package com.example.pi.sistemaescolauniversidade.repository;

import com.example.pi.sistemaescolauniversidade.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByNomeUsuarioAndSenhaUsuario(String nomeUsuario, String senhaUsuario);
}
