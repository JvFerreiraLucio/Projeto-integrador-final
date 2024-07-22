package com.example.pi.sistemaescolauniversidade.controller;

import com.example.pi.sistemaescolauniversidade.model.Usuario;
import com.example.pi.sistemaescolauniversidade.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioService.authenticate(loginRequest.getNomeUsuario(), loginRequest.getSenhaUsuario());
        if (usuario != null) {
            return ResponseEntity.ok().body(new LoginResponse("Login bem-sucedido!", usuario.getTipoUsuario()));
        } else {
            return ResponseEntity.status(401).body(new LoginResponse("Nome de usuário ou senha inválidos."));
        }
    }
    
   
    @PostMapping
    public Usuario addUsuario(@RequestBody Usuario usuario) {
        return usuarioService.saveUsuario(usuario);
    }

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id);
    }

    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.updateUsuario(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
    }
}
