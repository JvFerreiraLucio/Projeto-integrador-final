$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault();

        var usuario = {
            nomeUsuario: $("#nomeUsuario").val(),
            senhaUsuario: $("#senhaUsuario").val()
        };

        $.ajax({
            url: "/api/usuarios/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(usuario),
            success: function(response) {
                localStorage.setItem('tipoUsuario', response.tipoUsuario);
                alert(response.message || "Login bem-sucedido!");
                window.location.href = "/menu";
            },
            error: function(xhr) {
                let errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "Nome de usuário ou senha inválidos.";
                alert(errorMessage);
            }
        });
    });
});
