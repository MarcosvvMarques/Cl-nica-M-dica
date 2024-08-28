
// Manipulação dos dados de login
const usuarios = {
    "2819": "Alisson",  // Matrícula 2819 associada ao nome Alisson
  // aqui poderá replicar
};

// Função de login
function login(event) {
    event.preventDefault();  // Prevenir o comportamento padrão de recarregar a página

    var matricula = document.getElementById('matricula').value;
    var senha = document.getElementById('senha').value;

    // Verificação básica
    if (matricula === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
    } else if (usuarios[matricula] && senha === "1234") {  // Verifica se a matrícula existe e se a senha está correta
        var nomeUsuario = usuarios[matricula];  // Pega o nome associado à matrícula
        alert(`Bem-vindo, ${nomeUsuario}! Login realizado com sucesso!`);
        window.location.href = "/src/dependents/pag1.html";  // Redireciona para o dashboard
    } else {
        alert("Matrícula ou senha incorretos.");
    }
}


        // Adiciona/Remove foco nos campos de entrada
        const inputs = document.querySelectorAll(".input");

        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }

        // Adiciona o evento de submit ao formulário
        document.getElementById("loginForm").addEventListener("submit", login);
    