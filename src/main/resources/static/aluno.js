$(document).ready(function() {
    // Função para adicionar aluno
    $('#add-student-form').submit(function(event) {
        event.preventDefault();
        const novoAluno = {
            nome: $('#studentName').val(),
            cpf: $('#studentCPF').val()
        };
        $.ajax({
            url: 'http://localhost:8080/api/alunos',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(novoAluno),
            success: function() {
                alert('Aluno cadastrado com sucesso!');
                $('#add-student-form')[0].reset();
            },
            error: function() {
                alert('Erro ao cadastrar aluno');
            }
        });
    });
});


