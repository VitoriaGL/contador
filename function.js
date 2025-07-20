let intervalo = null;

// Inicia o contador com a data informada
function iniciarContador(dataInput) {
    const partesData = dataInput.split("-");
    const dataAlvo = new Date(
        parseInt(partesData[0]),
        parseInt(partesData[1]) - 1,
        parseInt(partesData[2]),
        0, 0, 0
    );

    const agora = new Date();
    if (dataAlvo <= agora) {
        alert("A data selecionada já passou. Por favor, escolha uma data futura.");
        localStorage.removeItem("dataDoGrandeDia");
        return;
    }

    // Salva a nova data
    localStorage.setItem("dataDoGrandeDia", dataInput);

    if (intervalo) clearInterval(intervalo);
    document.getElementById("contador").style.display = "block";

    intervalo = setInterval(() => atualizarContador(dataAlvo), 1000);
    atualizarContador(dataAlvo);
}

// Atualiza os valores do contador na tela
function atualizarContador(dataAlvo) {
    const agora = new Date();
    const tempoRestante = dataAlvo - agora;

    if (tempoRestante <= 0) {
        clearInterval(intervalo);
        document.getElementById("contador").innerHTML = `
            <h2 class="text-xl font-semibold mb-2">🎉 Chegou o Grande Dia! 🎉</h2>`;
        localStorage.removeItem("dataDoGrandeDia"); // Limpa quando chega o dia
        return;
    }

    const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

    document.getElementById("dia").textContent = dias;
    document.getElementById("hora").textContent = horas;
    document.getElementById("minuto").textContent = minutos;
    document.getElementById("segundo").textContent = segundos;
}

// Quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("default-datepicker");
    const dataSalva = localStorage.getItem("dataDoGrandeDia");
    const hoje = new Date();

    if (dataSalva) {
        const dataSalvaDate = new Date(dataSalva);
        if (dataSalvaDate > hoje) {
            input.value = dataSalva;
            iniciarContador(dataSalva);
        } else {
            localStorage.removeItem("dataDoGrandeDia");
            input.value = hoje.toISOString().split("T")[0];
        }
    } else {
        input.value = hoje.toISOString().split("T")[0];
    }

    // Quando muda o input, reinicia o contador com nova data
    input.addEventListener("change", function () {
        const dataSelecionada = new Date(this.value);
        const agora = new Date();

        if (dataSelecionada <= agora) {
            alert("A data selecionada já passou. Por favor, escolha uma data futura.");
            this.value = agora.toISOString().split("T")[0];
            localStorage.removeItem("dataDoGrandeDia");
            return;
        }

        iniciarContador(this.value);
    });
});
