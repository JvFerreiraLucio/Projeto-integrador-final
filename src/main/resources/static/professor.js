$(document).ready(function() {
    const tipoUsuario = localStorage.getItem('tipoUsuario'); // Obter o tipo de usuário do local storage

    getProfessores();

    $('#searchButton').click(function() {
        searchTeachers();
    });

    $('#searchButtonBottom').click(function() {
        searchTeachers();
    });

    $('#deleteSelected').click(function() {
        deleteSelectedProfessor();
    });

    $('#add-professor-form').submit(function(event) {
        event.preventDefault(); // Evitar o envio padrão do formulário
        addProfessor();
    });

    function addProfessor() {
        const nomeProfessor = $('#nomeProfessor').val();
        const cpfProfessor = $('#cpfProfessor').val();
        const disciplina = $('#disciplina').val();

        $.ajax({
            url: "/api/professores",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                nomeProfessor: nomeProfessor,
                cpfProfessor: cpfProfessor,
                disciplina: disciplina
            }),
            success: function() {
                alert("Professor adicionado com sucesso!");
                $('#add-professor-form')[0].reset(); // Limpar o formulário
                getProfessores(); // Recarregar a lista de professores
            },
            error: function() {
                alert("Erro ao adicionar professor.");
            }
        });
    }

    function getProfessores() {
        $.ajax({
            url: "/api/professores",
            type: "GET",
            success: function(response) {
                var teachersTable = $("#teachersTable");
                teachersTable.empty(); // Limpar o conteúdo atual da tabela
                response.forEach(function(professor) {
                    teachersTable.append(
                        `<tr data-id="${professor.id}"><td>${professor.nomeProfessor}</td><td>${professor.cpfProfessor}</td><td>${professor.disciplina}</td>` +
                        (tipoUsuario === "Gerente" ? "<td><button class='btn btn-danger delete-button'>Excluir</button></td>" : "<td></td>") +
                        "</tr>"
                    );
                });

                // Adicionar evento de clique nas linhas da tabela
                $('#teachersTable tr').on('click', function() {
                    $('#teachersTable tr').removeClass('table-active'); // Remove classe de todas as linhas
                    $(this).addClass('table-active'); // Adiciona classe à linha clicada
                });

                // Adicionar evento de clique aos botões de exclusão
                $('.delete-button').off('click').on('click', function(event) {
                    event.stopPropagation(); // Evitar que o clique no botão também selecione a linha
                    const professorId = $(this).closest('tr').data('id');
                    deleteProfessor(professorId);
                });
            },
            error: function() {
                alert("Erro ao carregar a lista de professores.");
            }
        });
    }

    function deleteSelectedProfessor() {
        const selectedRow = $('#teachersTable tr.table-active');
        if (selectedRow.length > 0) {
            const professorId = selectedRow.data('id');
            deleteProfessor(professorId);
        } else {
            alert("Nenhum professor selecionado.");
        }
    }

    function deleteProfessor(id) {
        $.ajax({
            url: "/api/professores/" + id,
            type: "DELETE",
            success: function() {
                alert("Professor deletado com sucesso!");
                getProfessores(); // Recarregar a lista de professores
            },
            error: function() {
                alert("Erro ao deletar professor.");
            }
        });
    }

    function searchTeachers() {
        let input = $('#searchInput').val().toLowerCase();
        $('#teachersTable tr').each(function() {
            let row = $(this);
            let cols = row.find('td');
            let match = false;
            cols.each(function() {
                if ($(this).text().toLowerCase().indexOf(input) > -1) {
                    match = true;
                    return false; // Para sair do loop
                }
            });
            row.toggle(match);
        });
    }
});
