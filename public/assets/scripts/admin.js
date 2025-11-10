

 /*Lógica para o Painel do Administrador (admin.html) */


document.addEventListener('DOMContentLoaded', () => {

    // URL base da sua API 
    const API_URL = 'http://localhost:3000/eventos'; 

    // Seletor dos elementos principais
    const formEvento = document.getElementById('evento-form');
    const eventosListContainer = document.getElementById('eventos-list');
    const eventosVazio = document.getElementById('eventos-vazio');
    const eventosLoading = document.getElementById('eventos-loading');
    const btnNovoEvento = document.getElementById('btn-novo-evento');
    const btnSalvarEvento = document.getElementById('salvar-evento-btn');
    const eventoModalElement = document.getElementById('eventoModal');
    
    const eventoModal = eventoModalElement ? new bootstrap.Modal(eventoModalElement) : null; 

    // Variáveis de controle
    let isEditing = false;
    let editingEventId = null; // Usaremos o ID da API para edição, não o índice
    
    // Elementos do Modal
    const tituloInput = document.getElementById('evento-titulo');
    const introducaoInput = document.getElementById('evento-introducao');
    const dataInput = document.getElementById('evento-data');
    const imagemInput = document.getElementById('evento-secao-imagem');
    const layoutInput = document.getElementById('evento-layout');
    const ativoInput = document.getElementById('evento-ativo');
    const imgPreview = document.getElementById('img-preview-principal');
    const previewContainer = document.getElementById('preview-imagem-principal');
    

    const toBase64 = file => new Promise((resolve) => {
        if (!file) {
            resolve('');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(''); 
    });
    
    /** Preview da imagem principal */
    window.previewImagemPrincipal = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(){
                imgPreview.src = reader.result;
                previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imgPreview.src = '';
            previewContainer.style.display = 'none';
        }
    };
    
    // --- Funções de Manipulação de Dados (API Fetch) ---
    const carregarEventosAPI = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Erro ao carregar eventos: ' + response.statusText);
            }
            let eventos = await response.json();
            
            // Ordena por data (mais recente primeiro)
            eventos.sort((a, b) => new Date(b.data) - new Date(a.data)); 
            
            return eventos;

        } catch (error) {
            console.error("Erro no fetch GET:", error);
            // Em caso de falha, mostra mensagem de erro (ou array vazio)
            alert('Não foi possível conectar à API. Verifique se o servidor está rodando em ' + API_URL);
            return [];
        }
    };

    /** Cria um novo evento na API (POST) */
    const criarEventoAPI = async (evento) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evento)
            });
            if (!response.ok) {
                throw new Error('Falha ao criar evento.');
            }
            return await response.json();
        } catch (error) {
            console.error("Erro no fetch POST:", error);
            alert('Erro ao criar evento. Tente novamente.');
            return null;
        }
    };

    /** Atualiza um evento existente na API (PUT) */
    const atualizarEventoAPI = async (id, evento) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evento)
            });
            if (!response.ok) {
                throw new Error('Falha ao atualizar evento.');
            }
            return await response.json();
        } catch (error) {
            console.error("Erro no fetch PUT:", error);
            alert('Erro ao atualizar evento. Tente novamente.');
            return null;
        }
    };
    
    /** Remove um evento da API (DELETE) */
    const removerEventoAPI = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Falha ao remover evento.');
            }
            return true;
        } catch (error) {
            console.error("Erro no fetch DELETE:", error);
            alert('Erro ao remover evento. Tente novamente.');
            return false;
        }
    };


    /** Renderiza a lista de eventos */
    const renderizarEventos = async () => {
        if (eventosLoading) eventosLoading.style.display = 'block';
        eventosListContainer.innerHTML = '';
        if (eventosVazio) eventosVazio.style.display = 'none';

        const eventos = await carregarEventosAPI();
        
        if (eventosLoading) eventosLoading.style.display = 'none';

        if (eventos.length === 0) {
            if (eventosVazio) eventosVazio.style.display = 'block';
            return;
        }
        
        eventos.forEach((evento) => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4'; 
            
            const imgSrc = evento.imagemBase64 || 'assets/img/placeholder_event.png';
            const statusColor = evento.ativo ? 'success' : 'danger';
            const statusText = evento.ativo ? 'ATIVO' : 'INATIVO';

            const cardHtml = `
                <div class="card event-card h-100 shadow-lg border-0 overflow-hidden border-top border-5 border-${statusColor}">
                    <img src="${imgSrc}" 
                        class="card-img-top" 
                        alt="Imagem do Evento" 
                        onerror="this.onerror=null;this.src='assets/img/placeholder_event.png';"
                        style="height: 180px; object-fit: cover;">
                    
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary fw-bold">${evento.titulo}</h5>
                        <p class="card-text text-muted mb-1"><i class="fas fa-calendar-alt me-1"></i> Data: ${evento.data}</p>
                        <p class="card-text flex-grow-1">${evento.introducao.substring(0, 100)}...</p>
                        
                        <div class="mt-3 d-flex justify-content-between align-items-center">
                            <span class="badge bg-${statusColor} text-white">${statusText}</span>
                            <div>
                                <button class="btn btn-sm btn-info editar-btn me-2" data-id="${evento.id}"><i class="fas fa-edit"></i> Editar</button>
                                <button class="btn btn-sm btn-danger remover-btn" data-id="${evento.id}"><i class="fas fa-trash-alt"></i> Remover</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            card.innerHTML = cardHtml;
            eventosListContainer.appendChild(card);
        });
        
        adicionarListenersAcao();
    };

    const abrirModalEditar = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error("Evento não encontrado.");
            
            const evento = await response.json();

            isEditing = true;
            editingEventId = id; // Define o ID para uso na atualização

            // Preenche o formulário
            tituloInput.value = evento.titulo;
            introducaoInput.value = evento.introducao;
            dataInput.value = evento.data;
            layoutInput.value = evento.layout || 'image-left';
            ativoInput.checked = !!evento.ativo;
            
            // Preenche o preview da imagem
            const imgSource = evento.imagemBase64 || '';
            if (imgSource) {
                imgPreview.src = imgSource;
                previewContainer.style.display = 'block';
            } else {
                imgPreview.src = '';
                previewContainer.style.display = 'none';
            }
            
            imagemInput.value = ''; // Limpa o input file

            document.getElementById('eventoModalLabel').textContent = `Editar Evento: ${evento.titulo}`;
            btnSalvarEvento.textContent = 'Salvar Alterações';
            if (eventoModal) eventoModal.show();
            
        } catch (error) {
            console.error("Erro ao carregar evento para edição:", error);
            alert("Não foi possível carregar os detalhes do evento para edição.");
        }
    };

    // --- Lógica de Criação e Edição (Form Submit) ---

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // 1. Coleta os dados do formulário
        const titulo = tituloInput.value;
        const introducao = introducaoInput.value;
        const data = dataInput.value;
        const layout = layoutInput.value;
        const ativo = ativoInput.checked;
        
        if (!titulo || !introducao || !data) {
             alert('Por favor, preencha todos os campos obrigatórios (Título, Introdução e Data).');
             return;
        }

        // 2. Converte nova imagem Base64
        const novaImagemBase64 = await toBase64(imagemInput.files[0]);
        
        let eventoParaSalvar = {
            titulo,
            introducao,
            data,
            layout,
            ativo,
            imagemBase64: novaImagemBase64,
        };
        
        let sucesso = false;
        let acao = '';

        if (isEditing && editingEventId) {
            // Modo EDIÇÃO (PUT)
            acao = 'editado';
            
            const response = await fetch(`${API_URL}/${editingEventId}`);
            const eventoExistente = response.ok ? await response.json() : {};

            const imagemFinal = novaImagemBase64 || eventoExistente.imagemBase64 || '';

            eventoParaSalvar = {
                ...eventoExistente, 
                ...eventoParaSalvar, 
                imagemBase64: imagemFinal,
            };
            
            sucesso = await atualizarEventoAPI(editingEventId, eventoParaSalvar);

        } else {

            acao = 'adicionado';
            
            eventoParaSalvar = {
                ...eventoParaSalvar,
                secaoDetalhes1: { titulo: "Detalhes do Evento", texto: "", layout: "image-left", altImagem: "Imagem do evento" },
                galeria: { titulo: "Momentos e Atividades", imagens: [], descricao: "Galeria de fotos do evento" },
                depoimento: { texto: "", autor: "", posicao: "" },
                cta: { titulo: "Quer participar? Junte-se a nós!", textoBotao: "Garanta sua vaga", linkBotao: "index.html#ma" },
                createdAt: new Date().toISOString(),
            };
            
            sucesso = await criarEventoAPI(eventoParaSalvar);
        }

        // 3. Salva e atualiza UI
        if (sucesso) {
            renderizarEventos();
            if (eventoModal) eventoModal.hide(); 
            alert(`Evento "${titulo}" ${acao} com sucesso! (Persistido na API)`);
        }
    };

    if (formEvento) {
        formEvento.addEventListener('submit', handleFormSubmit);
    }
    
    // --- Lógica de Listeners e Ações de CRUD ---

    const adicionarListenersAcao = () => {
        // Listener para Editar
        document.querySelectorAll('.editar-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                abrirModalEditar(id);
            });
        });
        
        // Listener para Remover
        document.querySelectorAll('.remover-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                const cardElement = e.currentTarget.closest('.event-card');
                
                const tituloRemover = cardElement ? cardElement.querySelector('.card-title').textContent : 'este evento';

                if (confirm(`Tem certeza que deseja remover o evento "${tituloRemover}" permanentemente?`)) {
                    const sucesso = await removerEventoAPI(id); 

                    if (sucesso) {
                        renderizarEventos(); 
                        alert(`Evento "${tituloRemover}" removido com sucesso.`);
                    }
                }
            });
        });
    };
    
    const abrirModalNovo = () => {
        isEditing = false;
        editingEventId = null;
        formEvento.reset();
        document.getElementById('eventoModalLabel').textContent = 'Novo Evento';
        imgPreview.src = '';
        previewContainer.style.display = 'none';
        btnSalvarEvento.textContent = 'Salvar';
        if (eventoModal) eventoModal.show();
    };

    if(btnNovoEvento) {
        btnNovoEvento.addEventListener('click', abrirModalNovo);
    }
    
    // --- Inicialização ---

    renderizarEventos();
    
    // Lógica básica para carregar a lista de matrículas
    const renderizarMatriculas = () => {
        const loading = document.getElementById('matriculas-loading');
        const vazio = document.getElementById('matriculas-vazio');

        if (loading) loading.style.display = 'none';
        if (vazio) vazio.style.display = 'block';
    };
    renderizarMatriculas();
});