$(document).ready(function() {
    // Função para adicionar professor
    $('#add-teacher-form').submit(function(event) {
        event.preventDefault();
        const novoProfessor = {
            nome: $('#teacherName').val(),
            cpf: $('#teacherCPF').val(),
            disciplina: $('#teacherSubject').val()
        };
        $.ajax({
            url: 'http://localhost:8080/api/professores',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(novoProfessor),
            success: function() {
                alert('Professor cadastrado com sucesso!');
                $('#add-teacher-form')[0].reset();
            },
            error: function() {
                alert('Erro ao cadastrar professor');
            }
        });
    });
});



