const API_URL = 'http://localhost:3002/tarefas';

const form = document.getElementById('form-tarefa');
const inputDescricao = document.getElementById('descricao');
const container = document.getElementById('tarefas-container');

const statTotal = document.getElementById('stat-total');
const statPendentes = document.getElementById('stat-pendentes');
const statConcluidas = document.getElementById('stat-concluidas');

const inputFiltroBusca = document.getElementById('filtro-busca');
const selectFiltroConcluido = document.getElementById('filtro-concluido');

let debounceTimer;

function debouncedLoadTarefas() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(loadTarefas, 500);
}

document.addEventListener('DOMContentLoaded', boot);

async function boot() {
    await loadTarefas();
    await loadResumo();
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await createTarefa();
});

async function loadResumo() {
    try {
        const res = await fetch('http://localhost:3002/resumo');
        const data = await res.json();

        statTotal.innerText = data.total;
        statPendentes.innerText = data.pendentes;
        statConcluidas.innerText = data.concluidas;
    } catch {
        statTotal.innerText = '-';
        statPendentes.innerText = '-';
        statConcluidas.innerText = '-';
    }
}

async function loadTarefas() {
    try {
        const params = new URLSearchParams();

        if (inputFiltroBusca.value)
            params.append('busca', inputFiltroBusca.value);

        if (selectFiltroConcluido.value)
            params.append('concluido', selectFiltroConcluido.value);

        const url = params.toString()
            ? `${API_URL}?${params}`
            : API_URL;

        const res = await fetch(url);
        const tarefas = await res.json();

        renderTarefas(tarefas);
    } catch {
        alert('Erro ao conectar');
    }
}

function renderTarefas(tarefas) {
    container.innerHTML = '';

    tarefas.forEach(t => {
        const div = document.createElement('div');

        div.innerHTML = `
            <input type="checkbox" ${t.concluido ? 'checked' : ''} onclick="toggleTarefa(${t.id})">
            ${t.descricao}
            <button onclick="deleteTarefa(${t.id})">X</button>
        `;

        container.appendChild(div);
    });
}

async function createTarefa() {
    const descricao = inputDescricao.value;

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descricao })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.message);
        return;
    }

    inputDescricao.value = '';
    boot();
}

async function toggleTarefa(id) {
    await fetch(`${API_URL}/${id}/concluir`, {
        method: 'PATCH'
    });

    boot();
}

async function deleteTarefa(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    boot();
}