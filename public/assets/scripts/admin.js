
let isEditing = false;
let editingEventId = null;
let chartSerieInstance = null;
let chartDataInstance = null;

document.addEventListener('DOMContentLoaded', () => {

    // --- URLs DA API ---
    const API_URL_EVENTOS = 'http://localhost:3000/eventos';
    const API_URL_MATRICULAS = 'http://localhost:3000/preMatriculas';

    // --- Elementos do Modal ( ---
    const formEvento = document.getElementById('evento-form');
    const btnNovoEvento = document.getElementById('btn-novo-evento');
    const btnSalvarEvento = document.getElementById('salvar-evento-btn');
    const eventoModalElement = document.getElementById('eventoModal');
    const eventoModal = eventoModalElement ? new bootstrap.Modal(eventoModalElement) : null;
    const tituloInput = document.getElementById('evento-titulo');
    const introducaoInput = document.getElementById('evento-introducao');
    const descricaoDetalhadaInput = document.getElementById('evento-descricao-detalhada');
    const dataInput = document.getElementById('evento-data');
    const tipoInput = document.getElementById('evento-tipo');
    const imagemInput = document.getElementById('evento-secao-imagem');
    const layoutInput = document.getElementById('evento-layout');
    const ativoInput = document.getElementById('evento-ativo');
    const imgPreview = document.getElementById('img-preview-principal');
    const previewContainer = document.getElementById('preview-imagem-principal');

    const eventosListContainer = document.getElementById('eventos-list');
    const eventosVazio = document.getElementById('eventos-vazio');
    const eventosLoading = document.getElementById('eventos-loading');

    // --- Elementos das pre-matrículas ---
    const matriculasTableBody = document.getElementById('matriculas-table-body');
    const matriculasVazio = document.getElementById('matriculas-vazio');
    const matriculasLoading = document.getElementById('matriculas-loading');


    // 1. INICIALIZAÇÃO

    /*Função principal que carrega todos os dados da API e renderiza a página.*/
    const initAdminPanel = async () => {
        console.log("Inicializando painel administrativo...");
        showLoading(eventosLoading, eventosListContainer, eventosVazio);
        showLoading(matriculasLoading, matriculasTableBody, matriculasVazio);

        // Busca dados de eventos e matrículas em paralelo
        try {
            const [eventos, matriculas] = await Promise.all([
                fetch(API_URL_EVENTOS).then(res => res.json()),
                fetch(API_URL_MATRICULAS).then(res => res.json())
            ]);

            console.log(`Dados carregados: ${eventos.length} eventos, ${matriculas.length} matrículas.`);

            // 1. Renderiza o Dashboard (Stats e Gráficos)
            renderizarDashboardStats(eventos, matriculas);
            renderizarGraficos(matriculas);
            
            // 2. Renderiza a Aba de Eventos
            renderizarCardsEventos(eventos);

            // 3. Renderiza a Aba de Matrículas
            renderizarTabelaMatriculas(matriculas);
            
            // 4. Inicializa o calendário (depois de tudo carregado)
            // Usar setTimeout para garantir que o DOM e FullCalendar estejam prontos
            setTimeout(() => {
                if (typeof FullCalendar !== 'undefined') {
                    initAdminCalendar(eventos);
                } else {
                    console.error('FullCalendar não está disponível ainda. Tentando novamente...');
                    setTimeout(() => {
                        initAdminCalendar(eventos);
                    }, 500);
                }
            }, 200);

        } catch (error) {
            console.error("Erro fatal ao carregar dados:", error);
            alert("Não foi possível carregar os dados da API. Verifique se o servidor (localhost:3000) está rodando.");
            showVazio(eventosLoading, eventosListContainer, eventosVazio);
            showVazio(matriculasLoading, matriculasTableBody, matriculasVazio);
        }
    };

    // =========================================================================
    // 2. LÓGICA DO DASHBOARD (STATS E GRÁFICOS)
    // =========================================================================

    /**
     * Atualiza os cards de estatísticas na aba "Visão Geral".
     */
    const renderizarDashboardStats = (eventos, matriculas) => {
        // Card: Total de Inscrições
        document.getElementById('stats-total-matriculas').textContent = matriculas.length;

        // Card: Matrículas Pendentes
        const pendentes = matriculas.filter(m => m.status === 'pendente' || m.status === 'Pendente').length;
        document.getElementById('stats-matriculas-pendentes').textContent = pendentes;

        // Card: Eventos Ativos
        const ativos = eventos.filter(e => e.ativo).length;
        document.getElementById('stats-eventos-ativos').textContent = ativos;

        // Card: Próximo Evento
        const agora = new Date();
        const proximoEvento = eventos
            .filter(e => e.ativo && new Date(e.data) >= agora) // Filtra ativos e futuros
            .sort((a, b) => new Date(a.data) - new Date(b.data)); // Ordena por data

        if (proximoEvento.length > 0) {
            document.getElementById('stats-proximo-evento').textContent = proximoEvento[0].titulo;
            document.getElementById('stats-proximo-evento-data').textContent = formatarData(proximoEvento[0].data);
        } else {
            document.getElementById('stats-proximo-evento').textContent = "Nenhum evento";
            document.getElementById('stats-proximo-evento-data').textContent = "---";
        }
    };

    /**
     * Renderiza os dois gráficos da aba "Visão Geral".
     */
    const renderizarGraficos = (matriculas) => {
        renderizarGraficoSeries(matriculas);
        renderizarGraficoDatas(matriculas);
    };

    /**
     * Gráfico de Donut: Inscrições por Série.
     */
    const renderizarGraficoSeries = (matriculas) => {
        const ctx = document.getElementById('matriculasPorSerieChart');
        if (!ctx) return;

        // Agrega os dados por série
        const contagemSeries = matriculas.reduce((acc, m) => {
            const serieFormatada = formatarSerie(m.serie);
            acc[serieFormatada] = (acc[serieFormatada] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(contagemSeries);
        const data = Object.values(contagemSeries);

        // Destrói gráfico antigo se houver
        if (chartSerieInstance) {
            chartSerieInstance.destroy();
        }

        // Cria o novo gráfico
        chartSerieInstance = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#003366', '#084b81', '#f6c23e', '#1cc88a', '#36b9cc', '#e74a3b', '#858796'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: true,
                        caretPadding: 10,
                    }
                },
                cutout: '60%',
            }
        });
    };

    /**
     * Gráfico de Linha: Inscrições ao longo do tempo (Últimos 30 dias).
     */
    const renderizarGraficoDatas = (matriculas) => {
        const ctx = document.getElementById('matriculasPorDataChart');
        if (!ctx) return;

        // Agrega dados por dia (últimos 30 dias)
        const hoje = new Date();
        const labels = [];
        const dataMap = new Map();

        // Cria labels e mapa para os últimos 30 dias
        for (let i = 29; i >= 0; i--) {
            const data = new Date(hoje);
            data.setDate(hoje.getDate() - i);
            const diaString = data.toISOString().split('T')[0]; // "YYYY-MM-DD"
            labels.push(data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })); // "DD/MM"
            dataMap.set(diaString, 0);
        }

        // Conta as matrículas
        matriculas.forEach(m => {
            const dataInscricao = (m.dataCadastro || m.dataEnvio || '');
            if (dataInscricao) {
                const dataStr = dataInscricao.includes('T') ? dataInscricao.split('T')[0] : dataInscricao;
                if (dataMap.has(dataStr)) {
                    dataMap.set(dataStr, dataMap.get(dataStr) + 1);
                }
            }
        });

        const data = Array.from(dataMap.values());

        // Destrói gráfico antigo se houver
        if (chartDataInstance) {
            chartDataInstance.destroy();
        }

        // Cria o novo gráfico
        chartDataInstance = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Inscrições",
                    data: data,
                    fill: true,
                    backgroundColor: 'rgba(0, 51, 102, 0.1)',
                    borderColor: '#003366',
                    tension: 0.2,
                    pointBackgroundColor: '#003366',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#003366',
                    pointHoverBorderColor: '#fff',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            // Garante que só tenhamos números inteiros no eixo Y
                            precision: 0
                        }
                    }
                }
            }
        });
    };

    // =========================================================================
    // 2.5. CALENDÁRIO DE EVENTOS
    // =========================================================================

    /**
     * Inicializa o calendário FullCalendar no painel admin
     */
    const initAdminCalendar = (eventos) => {
        const calendarEl = document.getElementById('admin-calendar');
        if (!calendarEl) {
            console.warn('Elemento admin-calendar não encontrado');
            return;
        }

        // Verificar se FullCalendar está disponível - tentar várias vezes
        function verificarEInicializar(tentativas = 0) {
            if (typeof FullCalendar !== 'undefined') {
                console.log('FullCalendar carregado, inicializando calendário admin...');
                inicializarCalendarioAdmin();
            } else if (tentativas < 10) {
                setTimeout(() => {
                    verificarEInicializar(tentativas + 1);
                }, 200);
            } else {
                console.error('FullCalendar não foi carregado após várias tentativas.');
                calendarEl.innerHTML = '<div class="alert alert-warning">Calendário não disponível. Verifique se a biblioteca FullCalendar foi carregada.</div>';
            }
        }

        function inicializarCalendarioAdmin() {
            // Função para obter cor baseada no tipo de evento
            const getEventColor = (tipo, isAtivo) => {
                if (!isAtivo) return { bg: '#6c757d', border: '#495057' };
                
                const cores = {
                'evento-escolar': { bg: '#003366', border: '#084b81' },
                'prova-geral': { bg: '#dc3545', border: '#c82333' },
                'reuniao-pais': { bg: '#28a745', border: '#218838' },
                'feriado': { bg: '#ffc107', border: '#e0a800' },
                'atividade-extracurricular': { bg: '#17a2b8', border: '#138496' },
                'formacao': { bg: '#6f42c1', border: '#5a32a3' },
                'outro': { bg: '#6c757d', border: '#5a6268' }
                };
                
                return cores[tipo] || cores['outro'];
            };

            // Converter eventos para formato FullCalendar
            const calendarEvents = eventos
            .filter(e => e && e.data) // Filtrar eventos sem data
            .map(evento => {
                const ativoValue = evento.ativo;
                const isAtivo = ativoValue !== false && ativoValue !== 'false' && ativoValue !== 0 && ativoValue !== '0';
                const tipo = evento.tipo || 'evento-escolar';
                const cores = getEventColor(tipo, isAtivo);
                
                return {
                    title: evento.titulo || 'Evento',
                    start: evento.data,
                    allDay: true,
                    backgroundColor: cores.bg,
                    borderColor: cores.border,
                    textColor: '#ffffff',
                    extendedProps: {
                        id: evento.id,
                        introducao: evento.introducao || '',
                        tipo: tipo,
                        ativo: isAtivo
                    }
                };
            });

            // Destruir calendário existente se houver
            if (window.adminCalendarInstance) {
                try {
                    window.adminCalendarInstance.destroy();
                } catch (e) {
                    console.warn('Erro ao destruir calendário anterior:', e);
                }
            }

            try {
                // Inicializar FullCalendar
                window.adminCalendarInstance = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth',
                    locale: 'pt-br',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,listWeek'
                    },
                    events: calendarEvents,
                    selectable: true, // Habilitar seleção de datas
                    selectMirror: true,
                    dayMaxEvents: true,
                    eventClick: function(info) {
                        const eventoId = info.event.extendedProps.id;
                        if (eventoId) {
                            abrirModalEditar(eventoId);
                        }
                    },
                    dateClick: function(info) {
                        // Quando clica em uma data vazia, abre modal para criar evento
                        const dataSelecionada = info.dateStr; // Formato YYYY-MM-DD
                        abrirModalNovoComData(dataSelecionada);
                    },
                    select: function(info) {
                        // Quando seleciona um range de datas
                        const dataInicio = info.startStr;
                        abrirModalNovoComData(dataInicio);
                        window.adminCalendarInstance.unselect(); // Limpa a seleção
                    },
                    height: 'auto',
                    eventDisplay: 'block',
                    editable: false
                });

                window.adminCalendarInstance.render();
                console.log('Calendário admin inicializado com', calendarEvents.length, 'eventos');
            } catch (error) {
                console.error('Erro ao inicializar calendário admin:', error);
                calendarEl.innerHTML = '<div class="alert alert-danger">Erro ao carregar calendário: ' + error.message + '</div>';
            }
        }

        // Iniciar verificação
        verificarEInicializar();
    };

    /**
     * Abre o modal para criar um novo evento com uma data pré-selecionada
     */
    const abrirModalNovoComData = (data) => {
        isEditing = false;
        editingEventId = null;
        
        // Limpar o campo hidden de ID
        const eventoIdHidden = document.getElementById('evento-id');
        if (eventoIdHidden) eventoIdHidden.value = '';
        
        formEvento.reset(); // Limpa o formulário
        
        document.getElementById('eventoModalLabel').textContent = 'Novo Evento';
        imgPreview.src = '';
        previewContainer.style.display = 'none';
        const placeholder = document.getElementById('preview-placeholder');
        if (placeholder) placeholder.style.display = 'flex';
        btnSalvarEvento.textContent = 'Salvar Evento';
        
        // Garantir que o checkbox de evento ativo esteja marcado (forçar após reset)
        setTimeout(() => {
            // Preencher a data selecionada DEPOIS do reset
            if (dataInput && data) {
                dataInput.value = data;
            }
            if (ativoInput) {
                ativoInput.checked = true;
            }
            if (tipoInput) {
                tipoInput.value = 'evento-escolar'; // Valor padrão
            }
        }, 100);
        
        if (eventoModal) eventoModal.show();
    };

    // 3. LÓGICA DE EVENTOS (CRUD)

    /**
     * Pega a lista de eventos (já carregada) e renderiza os cards na UI.
     */
    const renderizarCardsEventos = (eventos) => {
        // Garantir que eventos é um array
        if (!Array.isArray(eventos)) {
            console.error('Eventos não é um array:', eventos);
            eventos = [];
        }

        // Ordena por data (mais recente primeiro)
        eventos.sort((a, b) => {
            if (!a.data || !b.data) return 0;
            return new Date(b.data) - new Date(a.data);
        });

        eventosListContainer.innerHTML = ''; // Limpa a lista

        if (eventos.length === 0) {
            showVazio(eventosLoading, eventosListContainer, eventosVazio);
            return;
        }

        eventos.forEach((evento) => {
            if (!evento || !evento.id) {
                console.warn('Evento inválido ignorado:', evento);
                return;
            }
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';

            const imgSrc = evento.imagemBase64 || evento.secaoDetalhes1?.imagem || 'assets/img/banner.jpg';
            // Garantir que ativo seja tratado como boolean
            const isAtivo = evento.ativo !== false && evento.ativo !== 'false' && evento.ativo !== 0 && evento.ativo !== '0';
            const statusColor = isAtivo ? 'success' : 'danger';
            const statusText = isAtivo ? 'ATIVO' : 'INATIVO';

            // Obter nome do tipo de evento
            const tiposEventos = {
                'evento-escolar': 'Evento Escolar',
                'prova-geral': 'Prova Geral',
                'reuniao-pais': 'Reunião de Pais',
                'feriado': 'Feriado',
                'atividade-extracurricular': 'Atividade Extracurricular',
                'formacao': 'Formação/Workshop',
                'outro': 'Outro'
            };
            const tipoEvento = evento.tipo || 'evento-escolar';
            const nomeTipo = tiposEventos[tipoEvento] || 'Evento';

            const cardHtml = `
                <div class="card admin-event-card h-100 shadow-sm border-0 overflow-hidden border-top border-5 border-${statusColor}">
                    <img src="${imgSrc}" 
                         class="card-img-top" 
                         alt="Imagem do Evento" 
                         onerror="this.onerror=null;this.src='assets/img/banner.jpg';"
                         style="height: 180px; object-fit: cover;">
                    
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title text-primary fw-bold mb-0">${evento.titulo}</h5>
                            <span class="badge bg-secondary">${nomeTipo}</span>
                        </div>
                        <p class="card-text text-muted mb-1"><i class="fas fa-calendar-alt me-1"></i> Data: ${formatarData(evento.data)}</p>
                        <p class="card-text flex-grow-1">${evento.introducao ? evento.introducao.substring(0, 100) + '...' : 'Sem descrição'}</p>
                        
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

        // Esconde o loading e mostra a lista
        showContent(eventosLoading, eventosListContainer, eventosVazio);

        // Adiciona listeners aos botões recém-criados
        adicionarListenersAcaoEventos();
    };

    /**
     * Adiciona listeners de 'click' aos botões de Editar e Remover dos cards de evento.
     */
    const adicionarListenersAcaoEventos = () => {
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
                const cardElement = e.currentTarget.closest('.admin-event-card');
                const tituloRemover = cardElement ? cardElement.querySelector('.card-title').textContent : 'este evento';

                if (confirm(`Tem certeza que deseja remover o evento "${tituloRemover}" permanentemente?`)) {
                    const sucesso = await removerEventoAPI(id);
                    if (sucesso) {
                        alert(`Evento "${tituloRemover}" removido com sucesso.`);
                        initAdminPanel(); // Recarrega todos os dados
                    }
                }
            });
        });
    };

    /**
     * Abre o modal para criar um novo evento.
     */
    const abrirModalNovo = () => {
        isEditing = false;
        editingEventId = null;
        
        // Limpar o campo hidden de ID
        const eventoIdHidden = document.getElementById('evento-id');
        if (eventoIdHidden) eventoIdHidden.value = '';
        
        formEvento.reset(); // Limpa o formulário
        
        document.getElementById('eventoModalLabel').textContent = 'Novo Evento';
        imgPreview.src = '';
        previewContainer.style.display = 'none';
        const placeholder = document.getElementById('preview-placeholder');
        if (placeholder) placeholder.style.display = 'flex';
        btnSalvarEvento.textContent = 'Salvar Evento';
        
        // Garantir que o checkbox de evento ativo esteja marcado (forçar após reset)
        setTimeout(() => {
            if (ativoInput) {
                ativoInput.checked = true;
            }
            if (tipoInput) {
                tipoInput.value = 'evento-escolar'; // Valor padrão
            }
        }, 100);
        
        if (eventoModal) eventoModal.show();
    };

    /**
     * Busca os dados de um evento na API e abre o modal para edição.
     */
    const abrirModalEditar = async (id) => {
        try {
            const response = await fetch(`${API_URL_EVENTOS}/${id}`);
            if (!response.ok) throw new Error("Evento não encontrado.");

            const evento = await response.json();

            isEditing = true;
            editingEventId = id;

            // Preenche o formulário
            tituloInput.value = evento.titulo || '';
            introducaoInput.value = evento.introducao || '';
            if (descricaoDetalhadaInput) {
                descricaoDetalhadaInput.value = evento.secaoDetalhes1?.texto || evento.introducao || '';
            }
            dataInput.value = evento.data || '';
            if (tipoInput) {
                tipoInput.value = evento.tipo || 'evento-escolar';
            }
            layoutInput.value = evento.secaoDetalhes1?.layout || 'image-left';
            // Garantir que o checkbox reflita o estado correto do evento
            const ativoValue = evento.ativo;
            const isAtivo = ativoValue !== false && ativoValue !== 'false' && ativoValue !== 0 && ativoValue !== '0';
            if (ativoInput) {
                ativoInput.checked = isAtivo;
            }

            // Preenche o preview da imagem 
            const imgSource = evento.imagemBase64 || evento.secaoDetalhes1?.imagem || '';
            const placeholder = document.getElementById('preview-placeholder');
            if (imgSource) {
                imgPreview.src = imgSource;
                previewContainer.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
            } else {
                imgPreview.src = '';
                previewContainer.style.display = 'none';
                if (placeholder) placeholder.style.display = 'flex';
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

    /**
     * Manipula o submit do formulário de evento (Criação ou Edição).
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // 1. Coleta os dados do formulário
        const titulo = tituloInput.value;
        const introducao = introducaoInput.value;
        const descricaoDetalhada = descricaoDetalhadaInput ? descricaoDetalhadaInput.value : '';
        const data = dataInput.value;
        const tipo = tipoInput ? tipoInput.value : 'evento-escolar';
        const layout = layoutInput.value;
        // Garantir que ativo seja um boolean
        const ativo = ativoInput ? ativoInput.checked : true;

        if (!titulo || !introducao || !data) {
            alert('Por favor, preencha todos os campos obrigatórios (Título, Introdução e Data).');
            return;
        }

        // 2. Converte nova imagem Base64 (se houver)
        const novaImagemBase64 = await toBase64(imagemInput.files[0]);

        // 3. Monta o objeto base do evento
        let eventoParaSalvar = {
            titulo,
            introducao,
            data,
            tipo: tipo, // Tipo de evento
            ativo,
            // Campos da página de detalhes (são atualizados ou criados)
            secaoDetalhes1: {
                titulo: "Detalhes do Evento",
                texto: descricaoDetalhada || introducao || "Descrição do evento.", 
                layout: layout,
                altImagem: `Imagem de ${titulo}`,
                imagem: "" // Será preenchido abaixo
            },
            galeria: { titulo: "Momentos e Atividades", imagens: [], descricao: "Galeria de fotos do evento" },
            depoimento: { texto: "", autor: "", posicao: "" },
            cta: { titulo: "Quer participar? Junte-se a nós!", textoBotao: "Garanta sua vaga", linkBotao: "index.html#ma" },
            imagemBase64: "" // Será preenchido abaixo
        };

        let sucesso = false;
        let acao = '';

        if (isEditing && editingEventId) {
            // Modo EDIÇÃO (PUT)
            acao = 'editado';

            // Busca o evento existente para não sobrescrever dados (ex: galeria)
            const response = await fetch(`${API_URL_EVENTOS}/${editingEventId}`);
            const eventoExistente = response.ok ? await response.json() : {};

            // Define a imagem: usa a nova se foi upada, senão mantém a antiga 
            const imagemFinalBase64 = novaImagemBase64 || eventoExistente.imagemBase64 || '';
            const imagemFinalUrl = !novaImagemBase64 ? (eventoExistente.secaoDetalhes1?.imagem || '') : '';

            // Se a nova imagem for Base64, ela tem prioridade
            if (novaImagemBase64) {
                eventoParaSalvar.imagemBase64 = novaImagemBase64;
                eventoParaSalvar.secaoDetalhes1.imagem = novaImagemBase64;
            } else {
                eventoParaSalvar.imagemBase64 = imagemFinalBase64;
                eventoParaSalvar.secaoDetalhes1.imagem = imagemFinalUrl || imagemFinalBase64;
            }

            // Mescla o evento existente com os novos dados
            eventoParaSalvar = {
                ...eventoExistente,
                ...eventoParaSalvar,
                // Garante que o tipo seja preservado se não foi alterado
                tipo: tipo || eventoExistente.tipo || 'evento-escolar',
                // Garante que a 'secaoDetalhes1' seja mesclada e não substituída
                secaoDetalhes1: {
                    ...eventoExistente.secaoDetalhes1,
                    ...eventoParaSalvar.secaoDetalhes1
                }
            };

            sucesso = await atualizarEventoAPI(editingEventId, eventoParaSalvar);

        } else {
            // Modo CRIAÇÃO (POST)
            acao = 'adicionado';

            // Define a imagem de criação
            eventoParaSalvar.imagemBase64 = novaImagemBase64 || '';
            eventoParaSalvar.secaoDetalhes1.imagem = novaImagemBase64 || ''; // Popula a imagem principal na seção de detalhes tbm

            // Garantir que o evento tenha um ID único
            if (!eventoParaSalvar.id) {
                eventoParaSalvar.id = Date.now().toString();
            }

            // Garantir que ativo seja boolean
            eventoParaSalvar.ativo = eventoParaSalvar.ativo !== undefined ? eventoParaSalvar.ativo : true;

            eventoParaSalvar.createdAt = new Date().toISOString();
            eventoParaSalvar.updatedAt = new Date().toISOString();

            console.log('Salvando novo evento:', eventoParaSalvar);
            sucesso = await criarEventoAPI(eventoParaSalvar);
        }

        // 4. Salva e atualiza UI
        if (sucesso) {
            if (eventoModal) eventoModal.hide();
            
            // Mostrar mensagem de sucesso
            const mensagem = `Evento "${titulo}" ${acao} com sucesso!`;
            console.log(mensagem);
            
            // Aguardar um pouco antes de recarregar para garantir que a API processou
            setTimeout(async () => {
                try {
                    // Recarregar eventos da API
                    const response = await fetch(API_URL_EVENTOS);
                    if (response.ok) {
                        const eventosAtualizados = await response.json();
                        // Atualizar a lista de eventos e o calendário
                        renderizarCardsEventos(eventosAtualizados);
                        initAdminCalendar(eventosAtualizados);
                        console.log('Lista de eventos e calendário atualizados');
                    } else {
                        // Se falhar, recarrega tudo
                        initAdminPanel();
                    }
                } catch (error) {
                    console.error('Erro ao atualizar eventos:', error);
                    // Se falhar, recarrega tudo
                    initAdminPanel();
                }
            }, 600);
        } else {
            alert(`Erro ao ${acao === 'adicionado' ? 'criar' : 'editar'} evento. Verifique o console para mais detalhes.`);
        }
    };

    // --- Funções da API de Eventos (POST, PUT, DELETE) ---

    const criarEventoAPI = async (evento) => {
        try {
            // Garantir que o evento tenha todos os campos necessários
            // Garantir que ativo seja boolean
            const ativoValue = typeof evento.ativo === 'boolean' ? evento.ativo : (evento.ativo !== false && evento.ativo !== 'false');
            
            const eventoCompleto = {
                ...evento,
                id: evento.id || Date.now().toString(), // Gerar ID se não existir
                ativo: ativoValue, // Sempre boolean
                createdAt: evento.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            console.log('Criando evento:', eventoCompleto);

            const response = await fetch(API_URL_EVENTOS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventoCompleto)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro na resposta:', errorText);
                throw new Error(`Falha ao criar evento: ${response.status} ${response.statusText}`);
            }

            const eventoCriado = await response.json();
            console.log('Evento criado com sucesso:', eventoCriado);
            
            // Verificar se o evento foi realmente criado
            if (!eventoCriado || !eventoCriado.id) {
                console.error('Evento criado sem ID válido:', eventoCriado);
                throw new Error('Evento criado sem ID válido');
            }
            
            return eventoCriado;
        } catch (error) {
            console.error("Erro no fetch POST:", error);
            alert(`Erro ao criar evento: ${error.message}. Verifique se o servidor JSON está rodando em http://localhost:3000`);
            return null;
        }
    };

    const atualizarEventoAPI = async (id, evento) => {
        try {
            const response = await fetch(`${API_URL_EVENTOS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evento)
            });
            if (!response.ok) throw new Error('Falha ao atualizar evento.');
            return await response.json();
        } catch (error) {
            console.error("Erro no fetch PUT:", error);
            alert('Erro ao atualizar evento. Tente novamente.');
            return null;
        }
    };

    const removerEventoAPI = async (id) => {
        try {
            const response = await fetch(`${API_URL_EVENTOS}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Falha ao remover evento.');
            return true;
        } catch (error) {
            console.error("Erro no fetch DELETE:", error);
            alert('Erro ao remover evento. Tente novamente.');
            return false;
        }
    };

    // 4. LÓGICA DE MATRÍCULAS (LISTAGEM E UPDATE)

    /**
     * Pega a lista de matrículas (já carregada) e renderiza a tabela na UI.
     */
    const renderizarTabelaMatriculas = (matriculas) => {
        // Ordena por data (mais recente primeiro)
        matriculas.sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro));

        matriculasTableBody.innerHTML = ''; // Limpa a tabela

        if (matriculas.length === 0) {
            showVazio(matriculasLoading, matriculasTableBody, matriculasVazio);
            return;
        }

        matriculas.forEach(m => {
            const tr = document.createElement('tr');

            let statusBadge = '';
            let acoes = '';

            const statusLower = (m.status || '').toLowerCase();
            switch (statusLower) {
                case 'pendente':
                    statusBadge = `<span class="badge bg-warning">Pendente</span>`;
                    acoes = `
                        <button class="btn btn-sm btn-success acao-matricula-btn" data-id="${m.id}" data-acao="confirmada" title="Confirmar Matrícula">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-sm btn-danger acao-matricula-btn ms-1" data-id="${m.id}" data-acao="rejeitada" title="Rejeitar Matrícula">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    break;
                case 'confirmada':
                case 'aprovada':
                    statusBadge = `<span class="badge bg-success">Confirmada</span>`;
                    acoes = `
                        <button class="btn btn-sm btn-secondary acao-matricula-btn" data-id="${m.id}" data-acao="pendente" title="Mover para Pendente">
                            <i class="fas fa-undo"></i>
                        </button>
                    `;
                    break;
                case 'rejeitada':
                    statusBadge = `<span class="badge bg-danger">Rejeitada</span>`;
                    acoes = `
                        <button class="btn btn-sm btn-secondary acao-matricula-btn" data-id="${m.id}" data-acao="pendente" title="Mover para Pendente">
                            <i class="fas fa-undo"></i>
                        </button>
                    `;
                    break;
                default:
                    statusBadge = `<span class="badge bg-secondary">${m.status || 'N/A'}</span>`;
            }

            tr.innerHTML = `
                <td>${statusBadge}</td>
                <td>${m.nomeAluno || 'N/A'}</td>
                <td>${formatarSerie(m.serie)}</td>
                <td>${m.responsavel || m.nomeResponsavel || 'N/A'}</td>
                <td>${m.telefone || 'N/A'}</td>
                <td>${formatarData(m.dataCadastro || m.dataEnvio)}</td>
                <td class="text-center">${acoes}</td>
            `;
            matriculasTableBody.appendChild(tr);
        });

        // Esconde o loading e mostra a tabela
        showContent(matriculasLoading, matriculasTableBody, matriculasVazio);

        // Adiciona listeners aos botões de ação da tabela
        adicionarListenersAcaoMatriculas();
    };

    /**
     * Adiciona listeners de 'click' aos botões de ação da tabela de matrículas.
     */
    const adicionarListenersAcaoMatriculas = () => {
        document.querySelectorAll('.acao-matricula-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                const novoStatus = e.currentTarget.dataset.acao;

                const sucesso = await atualizarStatusMatriculaAPI(id, novoStatus);
                if (sucesso) {
                    alert(`Status da matrícula atualizado para "${novoStatus}".`);
                    initAdminPanel(); // Recarrega todos os dados
                }
            });
        });
    };

    /**
     * Atualiza o status de uma matrícula na API (PATCH).
     */
    const atualizarStatusMatriculaAPI = async (id, novoStatus) => {
        try {
            const response = await fetch(`${API_URL_MATRICULAS}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: novoStatus })
            });
            if (!response.ok) throw new Error('Falha ao atualizar status da matrícula.');
            return true;
        } catch (error) {
            console.error("Erro no fetch PATCH:", error);
            alert('Erro ao atualizar status. Tente novamente.');
            return false;
        }
    };


    // 5. FUNÇÕES UTILITÁRIAS

    /**
     * Converte um arquivo de imagem para Base64.
     */
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

    /* Atualiza o preview da imagem no modal.*/
    window.previewImagemPrincipal = (event) => {
        const file = event.target.files[0];
        const placeholder = document.getElementById('preview-placeholder');
        
        if (file) {
            // Validar tamanho (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('A imagem é muito grande! Por favor, selecione uma imagem de até 5MB.');
                event.target.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function () {
                imgPreview.src = reader.result;
                previewContainer.style.display = 'block';
                if (placeholder) placeholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            imgPreview.src = '';
            previewContainer.style.display = 'none';
            if (placeholder) placeholder.style.display = 'flex';
        }
    };

    const formatarData = (dataString) => {
        if (!dataString) return 'N/A';
        let data;
        if (dataString.includes('T') || dataString.includes('Z') || dataString.includes('+')) {
            data = new Date(dataString);
        } else {
            const parts = dataString.split('-');
            data = new Date(parts[0], parts[1] - 1, parts[2]); // Mês é 0-indexado
        }

        const dataCorrigida = new Date(data.getTime() + (data.getTimezoneOffset() * 60000));


        return dataCorrigida.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); // Assegura UTC para 'YYYY-MM-DD'
    };

    const formatarSerie = (serieId) => {
        const series = {
            "6": "6º Ano",
            "7": "7º Ano",
            "8": "8º Ano",
            "9": "9º Ano",
            "1": "1º Ano (Médio)",
            "2": "2º Ano (Médio)",
            "3": "3º Ano (Médio)",
        };
        return series[serieId] || serieId; 
    };

    const showLoading = (loadingEl, contentEl, vazioEl) => {
        if (loadingEl) loadingEl.style.display = 'block';
        if (contentEl) contentEl.style.display = 'none';
        if (vazioEl) vazioEl.style.display = 'none';
    };

    const showVazio = (loadingEl, contentEl, vazioEl) => {
        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'none';
        if (vazioEl) vazioEl.style.display = 'block';
    };

    const showContent = (loadingEl, contentEl, vazioEl) => {
        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'block'; 
        if (contentEl.tagName === 'TBODY') contentEl.style.display = 'table-row-group';
        if (vazioEl) vazioEl.style.display = 'none';
    };

    // --- Listeners Iniciais ---
    if (formEvento) {
        formEvento.addEventListener('submit', handleFormSubmit);
    }
    if (btnNovoEvento) {
        btnNovoEvento.addEventListener('click', abrirModalNovo);
    }

    // Listener para quando o modal é mostrado 
    if (eventoModalElement) {
        eventoModalElement.addEventListener('show.bs.modal', function() {
            if (!isEditing && ativoInput) {
                setTimeout(() => {
                    ativoInput.checked = true;
                    // Atualizar visual do toggle se a função existir
                    if (typeof atualizarToggleEvento === 'function') {
                        atualizarToggleEvento();
                    }
                }, 100);
            } else if (isEditing && ativoInput) {
                setTimeout(() => {
                    // Atualizar visual do toggle se a função existir
                    if (typeof atualizarToggleEvento === 'function') {
                        atualizarToggleEvento();
                    }
                }, 100);
            }
        });
        
        eventoModalElement.addEventListener('hidden.bs.modal', function() {
            formEvento.reset();
            setTimeout(() => {
                if (ativoInput) {
                    ativoInput.checked = true;
                    // Atualizar visual do toggle se a função existir
                    if (typeof atualizarToggleEvento === 'function') {
                        atualizarToggleEvento();
                    }
                }
            }, 100);
        });
    }

    initAdminPanel();
});