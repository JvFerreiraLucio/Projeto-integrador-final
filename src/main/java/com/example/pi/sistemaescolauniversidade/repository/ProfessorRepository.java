package com.example.pi.sistemaescolauniversidade.repository;

import com.example.pi.sistemaescolauniversidade.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}

