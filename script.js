function add() {
    let input_element = document.querySelector('#btn-add-tarefa')
    let input = input_element.value.trim() // retira os espaços inuteis
    let caixa_cards = document.querySelector('.tarefas-container')

    if(input !== '') {
        
        let novo_elemento = document.createElement('div')
        novo_elemento.setAttribute('class', 'cards')

        let novo_texto = document.createElement('p')
        novo_texto.textContent = input

        let novo_btn = document.createElement('button')
        novo_btn.textContent = 'Apagar'
        novo_btn.addEventListener('click', deletar) // cria um evento pra se clicar no botão de deletar

        novo_elemento.appendChild(novo_texto)
        novo_elemento.appendChild(novo_btn)

        caixa_cards.appendChild(novo_elemento)

        
        input_element.value = ' ' // limpa o imput
        salvarTarefa()
    } else {
        alert('Escreva algo para adicionar uma tarefa')
    } 
}

function deletar(event) {
    let botao = event.target // pega o evento alvo do botão
    let tarefa = botao.parentElement // pega o pai
    tarefa.remove() // remove o pai
    removerTarefaDoLocalStorage(tarefa)
}

function salvarTarefa() {
    const tarefas = document.querySelectorAll('.cards p')
    let listaTarefas = []

    for (let tarefinhas of tarefas) {
        listaTarefas.push(tarefinhas.innerText)
    }

    const tarefasJSON = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionarTarefasSalvas() {
    let caixa_cards = document.querySelector('.tarefas-container')
    let tarefas_json = localStorage.getItem('tarefas')
    
    if (tarefas_json) {
        let tarefasSalvas = JSON.parse(tarefas_json)
    
        for (let itens_tarefas of tarefasSalvas) {
            let novo_elemento = document.createElement('div')
            novo_elemento.setAttribute('class', 'cards')

            let novo_texto = document.createElement('p')
            novo_texto.textContent = itens_tarefas

            let novo_btn = document.createElement('button')
            novo_btn.textContent = 'Apagar'

            novo_btn.addEventListener('click', deletar)

            novo_elemento.appendChild(novo_texto)
            novo_elemento.appendChild(novo_btn)

            caixa_cards.appendChild(novo_elemento)
        }
    }
}

function removerTarefaDoLocalStorage(tarefa) {
    const tarefas_json = localStorage.getItem('tarefas')
    if (tarefas_json) {
        let listaTarefas = JSON.parse(tarefas_json)
        const textoTarefa = tarefa.querySelector('p').innerText

        listaTarefas = listaTarefas.filter(tarefa => tarefa !== textoTarefa)

        localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
    }
}

adicionarTarefasSalvas()
