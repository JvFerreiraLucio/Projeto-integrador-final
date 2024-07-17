package com.example.pi.sistemaescolauniversidade.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ControllerHTML {
    
    
    
    @GetMapping("/")
    public String inicio() {
        return "login";
    }
    
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
    
    @GetMapping("/cadastrar")
    public String cadastrar() {
        return "cadastrar";
    }
    
    
    @GetMapping("/listaProfessores")
    public String listaProfessores() {
        return "listaProfessores";
    }
    
    @GetMapping("/listaAlunos")
    public String listaAlunos() {
        return "listaAlunos";
    }
    
    
    @GetMapping("/menu")
    public String menu() {
        return "menu";
    }
    
    
    @GetMapping("/cadastroProfessor")
    public String cadastroProfessor() {
        return "cadastroProfessor";
    }
    
    
    @GetMapping("/cadastroAluno")
    public String cadastroAluno() {
        return "cadastroAluno";
    }
    
    
    
    
}
