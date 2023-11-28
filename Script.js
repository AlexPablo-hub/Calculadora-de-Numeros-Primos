function processarNúmeroPrimo() {
    // Obtém o valor inserido pelo usuário e elementos de resultado do documento HTML.
    const campoEntrada = document.getElementById("inputField").value;
    const elementoResultado = document.getElementById("result");

    // Verifica se o campo de entrada está vazio.
    if (campoEntrada.trim() === "") {
        elementoResultado.textContent = "Insira um Número.";
        return;
    }

    // Converte o valor do campo de entrada para um número inteiro.
    const número = parseInt(campoEntrada);

    // Verifica se o número é menor ou igual a 1.
    if (número <= 1) {
        elementoResultado.textContent = `${número} não é primo, pois é menor ou igual a 1.`;
        return;
    }

    if (número === 2 || número === 3) {
        elementoResultado.textContent = `${número} é primo, pois só tem dois divisores: 1 e ele mesmo.`;
        return;
    }

    // Encontra os números primos menores que N usando o Crivo de Eratóstenes.
    const primosAnteriores = crivoEratostenes(número - 1);

    // Se o número for primo, utiliza o Crivo de Eratóstenes para encontrar primos anteriores.
    if (éPrimo(número)) {
        elementoResultado.innerHTML = `${número} é primo, pois só tem dois divisores: 1 e ele mesmo.<br><br>Primos anteriores: ${primosAnteriores.join(", ")}`;
    } else {
        // Se o número for composto, encontra seus divisores.
        const divisores = encontrarDivisores(número);
        elementoResultado.innerHTML = `${número} não é primo, é composto. <br><br>Primos anteriores: ${primosAnteriores.join(", ")} <br><br>Divisores: ${divisores.join(", ")}.`;
    }
}

// Função para adicionar dígitos ao campo de entrada
function adicionarAoCampo(digito) {
    const campoEntrada = document.getElementById("inputField");
    campoEntrada.value += digito;
}

// Função para limpar o campo de entrada e o resultado
function limparCampo() {
    const campoEntrada = document.getElementById("inputField");
    campoEntrada.value = "";
    document.getElementById("result").textContent = "";
}

// Função para verificar se um número é primo
function éPrimo(num) {
    // Verifica casos especiais onde num não é primo.
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    // Loop para verificar se num é divisível por números ímpares maiores que 3.
    let divisor = 5;
    while (divisor * divisor <= num) {
        if (num % divisor === 0 || num % (divisor + 2) === 0) {
            return false;
        }
        divisor += 6;
    }
    // Se nenhum divisor foi encontrado, num é primo.
    return true;
}

// Função para aplicar o Crivo de Eratóstenes e encontrar números primos menores que N
function crivoEratostenes(n) {
    // Cria um array chamado "crivo" de tamanho n+1 e preenche todos os elementos com "true".
    const crivo = new Array(n + 1).fill(true);
    // Define crivo[0] e crivo[1] como "false", pois 0 e 1 não são primos.
    crivo[0] = crivo[1] = false;

    // Loop para encontrar os números primos usando o Crivo de Eratóstenes.
    for (let atual = 2; atual <= Math.sqrt(n); atual++) {
        if (crivo[atual]) {
            // Marca como "false" todos os múltiplos do número atual.
            for (let múltiplo = atual * atual; múltiplo <= n; múltiplo += atual) {
                crivo[múltiplo] = false;
            }
        }
    }

    // Cria um array "númerosPrimos" que conterá os números primos encontrados.
    const númerosPrimos = [];
    // Preenche o array com os números primos encontrados.
    for (let i = 2; i < n; i++) {
        if (crivo[i]) {
            númerosPrimos.push(i);
        }
    }

    // Retorna a lista de números primos encontrados.
    return númerosPrimos;
}

// Função para encontrar os divisores de um número composto
function encontrarDivisores(num) {
    // Cria um array "divisores" que conterá os divisores encontrados.
    const divisores = [];

    // Loop para encontrar os divisores de num.
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            divisores.push(i);
        }
    }

    // Retorna a lista de divisores encontrados.
    return divisores;
}