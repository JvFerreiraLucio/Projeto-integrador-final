package com.example.pi.sistemaescolauniversidade.controller;

class LoginResponse {
    private String message;
    private String tipoUsuario;

    public LoginResponse(String message, String tipoUsuario) {
        this.message = message;
        this.tipoUsuario = tipoUsuario;
    }

    public LoginResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }
}
