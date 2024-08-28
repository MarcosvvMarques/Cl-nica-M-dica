document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const medico = {
        nome: document.getElementById('medico-nome').value,
        especialidade: document.getElementById('medico-especialidade').value,
        crm: document.getElementById('medico-crm').value
    };

    const paciente = {
        nome: document.getElementById('paciente-nome').value,
        nascimento: document.getElementById('paciente-nascimento').value,
        telefone: document.getElementById('paciente-telefone').value
    };

    const consulta = {
        data: document.getElementById('consulta-data').value,
        hora: document.getElementById('consulta-hora').value,
        medico,
        paciente
    };

    // Salvar dados no localStorage
    let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));

    alert('Consulta adicionada com sucesso!');
    document.getElementById('form').reset();
});

function preencherMedico() {
    const crm = document.getElementById('medico-crm').value.trim();
    const nomeField = document.getElementById('medico-nome');
    const especialidadeField = document.getElementById('medico-especialidade');

    // Limpar os campos
    nomeField.value = '';
    especialidadeField.value = '';
    nomeField.removeAttribute('readonly');
    especialidadeField.removeAttribute('readonly');

    // Verificar se o CRM contém apenas números
    if (crm && !/^\d+$/.test(crm)) {
        alert('O CRM deve conter apenas números.');
        document.getElementById('medico-crm').value = '';
        nomeField.value = '';
        especialidadeField.value = '';
        return;
    }

    if (crm) {
        // Buscar no localStorage
        const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
        const consulta = consultas.find(consulta => consulta.medico.crm === crm);

        if (consulta) {
            // Preencher campos com os dados encontrados
            nomeField.value = consulta.medico.nome;
            especialidadeField.value = consulta.medico.especialidade;
        } else {
            // Permitir edição caso o CRM não seja encontrado
            nomeField.placeholder = 'Nome do Médico (Novo)';
            especialidadeField.placeholder = 'Especialidade do Médico (Nova)';
        }
    } else {
        // Caso o CRM esteja vazio, limpe os campos
        nomeField.value = '';
        especialidadeField.value = '';
    }
}

function consultarRegistros() {
    let crmFiltro = document.getElementById('crm-filtro').value.trim();
    let consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    let resultado = '';

    // Verificar se o CRM no filtro contém apenas números
    if (crmFiltro && !/^\d+$/.test(crmFiltro)) {
        alert('O CRM de filtro deve conter apenas números.');
        document.getElementById('resultado-consulta').innerHTML = 'Nenhum registro encontrado.';
        return;
    }

    consultas = crmFiltro ? consultas.filter(consulta => consulta.medico.crm === crmFiltro) : consultas;

    consultas.forEach(consulta => {
        resultado += `<div>
            <h3>Consulta em ${consulta.data} às ${consulta.hora}</h3>
            <p><strong>Médico:</strong> ${consulta.medico.nome}</p>
            <p><strong>CRM:</strong> ${consulta.medico.crm}</p>
            <p><strong>Especialidade:</strong> ${consulta.medico.especialidade}</p>
            <p><strong>Paciente:</strong> ${consulta.paciente.nome}</p>
            <p><strong>Data de Nascimento:</strong> ${consulta.paciente.nascimento}</p>
            <p><strong>Telefone:</strong> ${consulta.paciente.telefone}</p>
        </div><hr>`;
    });

    document.getElementById('resultado-consulta').innerHTML = resultado || 'Nenhum registro encontrado.';
}

function minimizarConsulta() {
    const consultaSection = document.getElementById('consultar-registro');
    consultaSection.classList.toggle('minimizado');
}

function fecharRegistro() {
    document.getElementById('consultar-registro').style.display = 'none';
}
