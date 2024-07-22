package com.example.pi.sistemaescolauniversidade.repository;

import com.example.pi.sistemaescolauniversidade.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}
