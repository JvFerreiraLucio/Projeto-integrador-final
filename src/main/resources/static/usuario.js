$(document).ready(function() {
    $("#add-user-form").submit(function(event) {
        event.preventDefault();
        var usuario = {
            nomeUsuario: $("#nomeUsuario").val(),
            senhaUsuario: $("#senhaUsuario").val()
        };

        $.ajax({
            url: "/api/usuarios",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(usuario),
            success: function(response) {
                alert("Usuário cadastrado com sucesso!");
                window.location.href = "/login";
            },
            error: function(xhr, status, error) {
                alert("Erro ao cadastrar usuário: " + xhr.responseText);
            }
        });
    });
});
