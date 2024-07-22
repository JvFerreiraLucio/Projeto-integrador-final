$(document).ready(function() {
    const tipoUsuario = localStorage.getItem('tipoUsuario'); // Obter o tipo de usuário do local storage

    // Carregar a lista de alunos quando a página carrega
    getAlunos();

    // Adicionar eventos de clique para os botões de pesquisa e exclusão
    $('#searchButton').click(function() {
        searchStudents();
    });

    $('#searchButtonBottom').click(function() {
        searchStudents();
    });

    $('#deleteSelected').click(function() {
        deleteSelectedAluno();
    });

    // Adicionar evento de envio do formulário de cadastro de aluno
    $('#add-student-form').submit(function(event) {
        event.preventDefault(); // Evitar o envio padrão do formulário
        addAluno();
    });

    // Função para obter e exibir a lista de alunos
    function getAlunos() {
        $.ajax({
            url: "/api/alunos",
            type: "GET",
            success: function(response) {
                var studentsTable = $("#studentsTable");
                studentsTable.empty(); // Limpar o conteúdo atual da tabela
                response.forEach(function(aluno) {
                    studentsTable.append(
                        `<tr data-id="${aluno.id}"><td>${aluno.nomeAluno}</td><td>${aluno.cpfAluno}</td><td>${aluno.cursoMatriculado}</td>` +
                        (tipoUsuario === "Gerente" ? "<td><button class='btn btn-danger delete-button'>Excluir</button></td>" : "<td></td>") +
                        "</tr>"
                    );
                });

                // Adicionar evento de clique nas linhas da tabela
                $('#studentsTable tr').on('click', function() {
                    $('#studentsTable tr').removeClass('table-active'); // Remove classe de todas as linhas
                    $(this).addClass('table-active'); // Adiciona classe à linha clicada
                });

                // Adicionar evento de clique aos botões de exclusão
                $('.delete-button').click(function(event) {
                    event.stopPropagation(); // Evitar que o clique no botão também selecione a linha
                    const alunoId = $(this).closest('tr').data('id');
                    deleteAluno(alunoId);
                });
            },
            error: function() {
                alert("Erro ao carregar a lista de alunos.");
            }
        });
    }

    // Função para adicionar um novo aluno
    function addAluno() {
        const nomeAluno = $('#nomeAluno').val();
        const cpfAluno = $('#cpfAluno').val();
        const cursoMatriculado = $('#cursoMatriculado').val();

        $.ajax({
            url: "/api/alunos",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                nomeAluno: nomeAluno,
                cpfAluno: cpfAluno,
                cursoMatriculado: cursoMatriculado
            }),
            success: function() {
                alert("Aluno adicionado com sucesso!");
                getAlunos();
                $('#add-student-form')[0].reset(); // Limpar o formulário
            },
            error: function() {
                alert("Erro ao adicionar aluno.");
            }
        });
    }

    // Função para excluir um aluno selecionado
    function deleteSelectedAluno() {
        const selectedRow = $('#studentsTable tr.table-active');
        if (selectedRow.length > 0) {
            const alunoId = selectedRow.data('id');
            deleteAluno(alunoId);
        } else {
            alert("Nenhum aluno selecionado.");
        }
    }

    // Função para excluir um aluno pelo ID
    function deleteAluno(id) {
        $.ajax({
            url: "/api/alunos/" + id,
            type: "DELETE",
            success: function() {
                alert("Aluno deletado com sucesso!");
                getAlunos();
            },
            error: function() {
                alert("Erro ao deletar aluno.");
            }
        });
    }

    // Função para pesquisar alunos na tabela
    function searchStudents() {
        let input = $('#searchInput').val().toLowerCase();
        $('#studentsTable tr').each(function() {
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
