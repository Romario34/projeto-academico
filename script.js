
const campoSenha = document.getElementById("senha");
const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valorTamanho");
const mensagem = document.getElementById("mensagem");

tamanho.addEventListener("input", () => {
    valorTamanho.textContent = tamanho.value;
});

document.getElementById("gerar").addEventListener("click", () => {
    const opcoes = [
        {
            id: "maiusculas",
            caracteres: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        },
        {
            id: "minusculas",
            caracteres: "abcdefghijklmnopqrstuvwxyz"
        },
        {
            id: "numeros",
            caracteres: "0123456789"
        },
        {
            id: "simbolos",
            caracteres: "!@#$%&*_-+="
        }
    ];

    const selecionadas = opcoes.filter(opcao =>
        document.getElementById(opcao.id).checked
    );

    if (selecionadas.length === 0) {
        mensagem.textContent = "Selecione pelo menos uma opção.";
        return;
    }

    const todosCaracteres = selecionadas
        .map(opcao => opcao.caracteres)
        .join("");

    const caracteresSenha = [];

    // Garante pelo menos um caractere de cada tipo escolhido.
    selecionadas.forEach(opcao => {
        caracteresSenha.push(
            opcao.caracteres[crypto.getRandomValues(
                new Uint32Array(1)
            )[0] % opcao.caracteres.length]
        );
    });

    // Completa a senha até atingir o tamanho escolhido.
    while (caracteresSenha.length < Number(tamanho.value)) {
        caracteresSenha.push(
            todosCaracteres[crypto.getRandomValues(
                new Uint32Array(1)
            )[0] % todosCaracteres.length]
        );
    }

    // Embaralha os caracteres usando aleatoriedade criptográfica.
    for (let i = caracteresSenha.length - 1; i > 0; i--) {
        const j = crypto.getRandomValues(
            new Uint32Array(1)
        )[0] % (i + 1);

        [caracteresSenha[i], caracteresSenha[j]] =
            [caracteresSenha[j], caracteresSenha[i]];
    }

    campoSenha.value = caracteresSenha.join("");
    mensagem.textContent = "Senha gerada com sucesso!";
});

document.getElementById("copiar").addEventListener("click", async () => {
    if (!campoSenha.value) {
        mensagem.textContent = "Gere uma senha primeiro.";
        return;
    }

    try {
        await navigator.clipboard.writeText(campoSenha.value);
        mensagem.textContent = "Senha copiada!";
    } catch {
        mensagem.textContent =
            "Não foi possível copiar. Abra o site em localhost ou HTTPS.";
    }
});
