// estrutura json pagina de detalhes
const projetosDetalhes = {

    // Feira de Ciências e Tecnologia
    "feiraDeCiencias": { // ID em camelCase
        // Seção Detalhes principal
        titulo: "Feira de Ciências e Tecnologia",
        introducao: "Explore a inovação e o pensamento científico que movem nossos alunos em busca de soluções para o futuro.",

        // Seção de detalhes 1 (imagem + texto)
        secaoDetalhes1: {
            titulo: "Polo de Iniciação Científica e Tecnologia",
            imagem: "assets/img/alunos_trabalhando_feira_de_ciencias.png",
            altImagem: "Alunos trabalhando em projeto de feira de ciências",
            texto: `A Feira de Ciências e Tecnologia anual da Escola Estadual Florentino Arnaldo Coelho é o ápice do aprendizado investigativo. Nossos estudantes, sob a orientação de professores especializados, desenvolvem projetos inovadores que abrangem diversas áreas do conhecimento. Essa iniciativa estimula a curiosidade, o pensamento crítico e a aplicação prática de conceitos aprendidos em sala de aula, preparando-os para os desafios do ensino superior e do mercado de trabalho.`,
            layout: "image-left"
        },

        // Seção de galeria
        galeria: {
            titulo: "Momentos e Descobertas na Feira",
            imagens: [
                { src: "assets/img/aluno_apresentando_projeto_feira.png", alt: "Aluno apresentando projeto na feira" },
                { src: "assets/img/experimento_cientifico_em_andamento.png", alt: "Experimento científico em andamento" },
                { src: "assets/img/visitantes_interagindo_feira.png", alt: "Visitantes interagindo com projetos na feira" }
            ],
            descricao: "Confira alguns dos momentos mais marcantes e das invenções apresentadas em nossas últimas edições, evidenciando o talento e a dedicação de nossos jovens cientistas"
        },

        // Seção de depoimento
        depoimento: {
            texto: "Participar da Feira de Ciências foi uma experiência transformadora. Aprendi a pesquisar, a colaborar e apresentar minhas ideias com confiança.",
            autor: "Julia Santos",
            posicao: "Aluna, 2º Ano do Ensino Médio"
        },

        // Seção de botão de pré-matrícula (CTA - Call To Action)
        cta: {
            titulo: "Ficou Inspirado? Faça parte desta jornada!",
            textoBotao: "Garanta sua vaga",
            linkBotao: "index.html#ma"
        }
    },


    // Clube de Debates e Oratória
    "clubeDeDebates": {
        titulo: "Clube de Debates: Voz, Argumento e Cidadania",
        introducao: "Desenvolvemos pensadores críticos e comunicadores eficazes, preparando-os para liderar e influenciar o mundo.",

        // Seção de detalhes 1 (imagem + texto)
        secaoDetalhes1: {
            titulo: "A Arte da Argumentação",
            imagem: "assets/img/alunos_participando_de_debate.png",
            altImagem: "Alunos participando de um debate",
            texto: `O Clube de Debates da Escola Florentino Arnaldo Coelho é um ambiente estimulante onde os alunos aprimoram suas habilidades de oratória, pesquisa e pensamento crítico. Semanalmente, discutimos temas relevantes da atualidade, praticando a construção de argumentos sólidos e a escuta ativa. Essa atividade é fundamental para a formação de cidadãos conscientes e preparados para defender suas ideias de forma articulada e respeitosa em qualquer esfera da vida.`,
            layout: "image-right"
        },

        // Seção de galeria
        galeria: {
            titulo: "Pensamento em Ação",
            imagens: [
                { src: "assets/img/mesa_de_debate_com_alunos.png", alt: "Mesa de debate estudantil com alunos" },
                { src: "assets/img/aluna_fazendo_apresentacao_oral.png", alt: "Aluna fazendo apresentação oral" },
                { src: "assets/img/grupo_de_debate_em_discussao_ativa.png", alt: "Grupo de debate em discussão ativa" }
            ],
            descricao: "Imagens que ilustram a seriedade e o dinamismo de nossos debates, onde cada aluno tem a oportunidade de expressar sua voz e aprimorar seu poder de persuasão."
        },

        // Seção de depoimento
        depoimento: {
            texto: "O Clube de Debates me deu a confiança para expressar minhas opiniões e a capacidade de entender diferentes pontos de vista.",
            autor: "Mariana Souza",
            posicao: "Membro do Clube, 2º Ano"
        },

        // Seção de botão de pré-matrícula
        cta: {
            titulo: "Quer ter sua voz ouvida? Junte-se ao nosso clube!",
            textoBotao: "Garanta sua vaga",
            linkBotao: "index.html#ma"
        }
    },

    // Jornada Cultural de Artes
    "jornadaCulturalDeArtes": {
        titulo: "Jornada Cultural: Expressão e Protagonismo",
        introducao: "Um palco para os talentos, vozes e criatividade dos nossos alunos, celebrando a arte e a diversidade cultural.",

        // Seção de detalhes 1 (imagem + texto)
        secaoDetalhes1: {
            titulo: "Desenvolvimento de Talentos e Habilidades",
            imagem: "assets/img/aluno_em_apresentacao_teatral.png",
            altImagem: "Aluno em apresentação teatral",
            texto: `A Jornada Cultural da Escola Florentino Arnaldo Coelho é um espaço vibrante onde os alunos exploram e desenvolvem suas habilidades artísticas e de comunicação. Com oficinas de teatro, música, dança e artes visuais, incentivamos a expressão individual e coletiva, aprimorando a criatividade, a disciplina e a capacidade de trabalhar em equipe. É uma celebração anual da diversidade e do talento que florescem em nossa comunidade escolar.`,
            layout: "image-left"
        },

        // Seção de galeria
        galeria: {
            titulo: "Cultura em Cena",
            imagens: [
                { src: "assets/img/peca_de_teatro_estudantil.png", alt: "Peça de teatro estudantil" },
                { src: "assets/img/alunos_tocando_instrumentos.png", alt: "Alunos tocando instrumentos musicais" },
                { src: "assets/img/exposicao_de_arte_estudantil.png", alt: "Exposição de arte estudantil" }
            ],
            descricao: "Imagens que ilustram a seriedade e o dinamismo de nossos debates, onde cada aluno tem a oportunidade de expressar sua voz e aprimorar seu poder de persuasão."
        },

        // Seção de depoimento
        depoimento: {
            texto: "A Jornada Cultural me ajudou a descobrir minha paixão pelo teatro e a superar a timidez. É um espaço onde podemos ser quem somos.",
            autor: "Pedro Henrique",
            posicao: "Aluno, 1º Ano do Ensino Médio"
        },
        cta: {
            titulo: "Desperte seu potencial artístico e acadêmico!",
            textoBotao: "Garanta sua vaga",
            linkBotao: "index.html#ma"
        }
    },


    // Seção de Olimpíadas Acadêmicas
    "olimpiadasDoConhecimento": {
        titulo: "Olimpíadas do Conhecimento: Desafios e Conquistas",
        introducao: "Incentivamos a excelência e o pensamento lógico através da participação em competições que revelam grandes talentos.",

        // Seção de detalhes (imagem + texto)
        secaoDetalhes1: {
            titulo: "Preparação para o Sucesso",
            imagem: "assets/img/alunos_resolvendo_problemas.png",
            altImagem: "Alunos resolvendo problemas em competição",
            texto: `Nossa escola tem um histórico de sucesso nas Olimpíadas Acadêmicas de Matemática, Física, Química, Biologia e Línguas. Oferecemos programas de preparação intensivos, com aulas extras e simulados, para que nossos alunos se destaquem em nível regional e nacional. A participação nessas competições não apenas aprimora o conhecimento técnico, mas também desenvolve habilidades de resolução de problemas, raciocínio lógico e gestão de tempo, essenciais para o futuro acadêmico e profissional.`,
            layout: "image-left"
        },

        // Seção de Galeria
        galeria: {
            titulo: "Momentos de Concentração e Vitórias",
            imagens: [
                { src: "assets/img/alunos_concentrados_em_provas.png", alt: "Alunos concentrados em prova" },
                { src: "assets/img/cerimonia_de_premiacao_olimpiadas.png", alt: "Cerimônia de premiação de olimpíada" },
                { src: "assets/img/grupo_de_estudo_olimpiadas.png", alt: "Grupo de estudo para olimpíadas" }
            ],
            descricao: "Veja nossos alunos em ação, dedicados aos estudos e celebrando suas conquistas nas diversas olimpíadas do conhecimento que participamos anualmente."
        },

        // Seção de depoimento
        depoimento: {
            texto: "As Olimpíadas me ensinaram que a persistência e o estudo em equipe são chaves para superar qualquer desafio acadêmico.",
            autor: "Lucas Ferreira",
            posicao: "Medalhista em Matemática, 3º Ano"
        },

        // Seção de pré-matrícula das olimpíadas do conhecimento
        cta: {
            titulo: "Tem paixão por desafios? Venha para o Florentino!",
            textoBotao: "Garanta sua vaga",
            linkBotao: "index.html#ma"
        }
    },
    // FIM DA CORREÇÃO 1: As entradas abaixo foram inseridas DENTRO do objeto
    
    // Carnaval Escolar
    "carnaval": {
        titulo: "Carnaval Escolar",
        introducao: "Uma festa colorida e animada que celebra a alegria e a cultura brasileira, transformando nossa escola em um verdadeiro reduto de folia e diversão.",

        secaoDetalhes1: {
            titulo: "A Maior Festa do Ano",
            imagem: "assets/img/peca_de_teatro_estudantil.png",
            altImagem: "Alunos no Carnaval Escolar",
            texto: `O Carnaval da Escola Estadual Florentino Arnaldo Coelho é um evento que reúne toda a comunidade escolar em um grande desfile de cores, música e criatividade. Nossos alunos e professores se dedicam durante semanas para criar fantasias temáticas, coreografias animadas e blocos carnavalescos que percorrem os corredores da escola. O evento promove a integração entre turmas, desenvolve habilidades artísticas e de trabalho em equipe, além de celebrar a rica cultura popular brasileira. É um momento de descontração, mas também de aprendizado sobre nossa identidade cultural.`,
            layout: "image-left"
        },

        galeria: {
            titulo: "Momentos de Alegria e Criatividade",
            imagens: [
                { src: "assets/img/alunos_tocando_instrumentos.png", alt: "Alunos em apresentação musical no Carnaval" },
                { src: "assets/img/peca_de_teatro_estudantil.png", alt: "Fantasias criativas dos alunos" },
                { src: "assets/img/exposicao_de_arte_estudantil.png", alt: "Decoração e adereços do Carnaval" }
            ],
            descricao: "Veja os melhores momentos do nosso Carnaval, desde as fantasias criativas até as apresentações musicais e coreografias que animam toda a escola."
        },

        depoimento: {
            texto: "O Carnaval da escola foi uma experiência incrível! Foi muito divertido criar as fantasias com meus colegas e ver toda a escola se unindo em uma grande festa.",
            autor: "Camila Oliveira",
            posicao: "Aluna, 2º Ano do Ensino Médio"
        },

        cta: {
            titulo: "Quer participar do próximo Carnaval? Junte-se a nós!",
            textoBotao: "Garanta sua vaga",
            linkBotao: "index.html#ma"
        }
    },

    // Halloween
    "halloween": {
        titulo: "Halloween Escolar",
        introducao: "Uma noite mágica e assustadora que celebra a criatividade, o trabalho em equipe e a diversão, inspirando nossos alunos através de uma tradição internacional.",

        secaoDetalhes1: {
            titulo: "Uma Noite de Mistérios e Criatividade",
            imagem: "assets/img/exposicao_de_arte_estudantil.png",
            altImagem: "Halloween na escola",
            texto: `O Halloween da nossa escola é um evento único que combina aprendizado lúdico com muita diversão. Durante semanas, alunos e professores trabalham juntos para transformar salas de aula em cenários temáticos assustadores, criar fantasias criativas e desenvolver atividades interativas. O evento inclui concursos de fantasias, decoração de salas, caça ao tesouro temática e apresentações artísticas. Além de ser uma grande celebração, o Halloween promove habilidades de planejamento, criatividade, trabalho em equipe e organização, enquanto os alunos exploram diferentes aspectos culturais e históricos.`,
            layout: "image-right"
        },

        galeria: {
            titulo: "A Magia do Halloween em Ação",
            imagens: [
                { src: "assets/img/aluno_em_apresentacao_teatral.png", alt: "Apresentação teatral no Halloween" },
                { src: "assets/img/exposicao_de_arte_estudantil.png", alt: "Decoração criativa das salas" },
                { src: "assets/img/peca_de_teatro_estudantil.png", alt: "Fantasias e personagens do Halloween" }
            ],
            descricao: "Confira os detalhes das decorações temáticas, das fantasias criativas e das atividades que fazem do nosso Halloween uma noite memorável."
        },

        depoimento: {
            texto: "Adorei participar do Halloween! Foi incrível trabalhar com meus amigos para decorar nossa sala e criar uma experiência realmente assustadora para todos.",
            autor: "Rafael Santos",
            posicao: "Aluno, 1º Ano do Ensino Médio"
        },

        cta: {
            titulo: "Quer fazer parte da próxima noite de Halloween? Venha para o Florentino!",
            textoBotao: "Garanta sua vaga",
            linkBotao: "index.html#ma"
        }
    },

    // Festa Junina
    "festaJunina": {
        titulo: "Festa Junina",
        introducao: "O arraial mais animado da cidade! Celebre conosco as tradições juninas com quadrilhas, comidas típicas e muita alegria que reúne toda a comunidade escolar.",

        secaoDetalhes1: {
            titulo: "Tradição, Cultura e Integração",
            imagem: "assets/img/alunos_trabalhando_feira_de_ciencias.png",
            altImagem: "Festa Junina na escola",
            texto: `A Festa Junina da Escola Estadual Florentino Arnaldo Coelho é um dos eventos mais aguardados do ano, reunindo alunos, professores, famílias e toda a comunidade em uma celebração autêntica das tradições brasileiras. O evento conta com quadrilhas coreografadas pelos alunos, barracas de comidas típicas preparadas com muito carinho, apresentações musicais, fogueira simbólica e diversas brincadeiras tradicionais como pescaria, argola e correio elegante. Além de fortalecer os laços comunitários, o evento promove o resgate cultural, o trabalho colaborativo e a organização de eventos, criando memórias duradouras para todos os participantes.`,
            layout: "image-left"
        },

        galeria: {
            titulo: "Arraial em Fotos",
            imagens: [
                { src: "assets/img/alunos_tocando_instrumentos.png", alt: "Apresentação musical na Festa Junina" },
                { src: "assets/img/peca_de_teatro_estudantil.png", alt: "Quadrilha junina dos alunos" },
                { src: "assets/img/exposicao_de_arte_estudantil.png", alt: "Decoração e barracas da Festa Junina" }
            ],
            descricao: "Veja os momentos mais especiais do nosso arraial: as quadrilhas, as comidas típicas, as apresentações e toda a alegria que marca esta celebração."
        },

        depoimento: {
            texto: "A Festa Junina foi incrível! Adorei participar da quadrilha e ajudar a organizar as barracas. Foi uma experiência que me aproximou mais da minha cultura e dos meus colegas.",
            autor: "Larissa Costa",
            posicao: "Aluna, 3º Ano do Ensino Médio"
        },

        cta: {
            titulo: "Quer vivenciar a melhor Festa Junina? Faça parte da nossa escola!",
            textoBotao: "Garanta sua vaga",
            linkBotao: "index.html#ma"
        }
    },

    // Formatura
    "formatura": {
        titulo: "Cerimônia de Formatura",
        introducao: "O momento mais emocionante do ano letivo! Celebramos a conquista dos nossos formandos e marcamos o início de uma nova jornada acadêmica e profissional.",

        secaoDetalhes1: {
            titulo: "Celebrando Conquistas e Novos Começos",
            imagem: "assets/img/cerimonia_de_premiacao_olimpiadas.png",
            altImagem: "Cerimônia de Formatura",
            texto: `A Cerimônia de Formatura da Escola Estadual Florentino Arnaldo Coelho é um momento solene e emocionante que marca a conclusão de mais uma etapa na vida educacional dos nossos alunos. O evento conta com a entrega de diplomas, homenagens especiais aos alunos destaques, apresentação de oradores, discursos motivacionais e um coquetel de confraternização. É um momento de reconhecimento ao esforço e dedicação dos formandos, suas famílias e todo o corpo docente. A formatura simboliza não apenas uma conclusão, mas também o início de uma nova fase repleta de oportunidades e desafios, com nossos alunos preparados para ingressar nas melhores universidades e conquistar seus objetivos profissionais.`,
            layout: "image-right"
        },

        galeria: {
            titulo: "Momentos Marcantes da Formatura",
            imagens: [
                { src: "assets/img/cerimonia_de_premiacao_olimpiadas.png", alt: "Cerimônia de entrega de diplomas" },
                { src: "assets/img/alunos_concentrados_em_provas.png", alt: "Formandos em momento solene" },
                { src: "assets/img/exposicao_de_arte_estudantil.png", alt: "Confraternização pós-cerimônia" }
            ],
            descricao: "Reviva os momentos mais emocionantes da nossa cerimônia de formatura: a entrega de diplomas, as homenagens e a celebração desta conquista tão importante."
        },

        depoimento: {
            texto: "A formatura foi o momento mais emocionante da minha vida escolar. Ver todo o reconhecimento ao meu esforço e meus sonhos sendo celebrados me motivou ainda mais para seguir em frente.",
            autor: "Bruno Mendes",
            posicao: "Ex-aluno, Formando 2023"
        },

        cta: {
            titulo: "Quer ter sua formatura aqui? Venha fazer parte da família Florentino!",
            textoBotao: "Garanta sua vaga",
            linkBotao: "index.html#ma"
        }
    }
};


// URL base da API (JSON Server)
const API_URL = 'http://localhost:3000';


// Lógica JavaScript para Carregar Eventos da API na página index.html
document.addEventListener('DOMContentLoaded', () => {
    // Carregar eventos na página inicial se existir a seção de eventos
    const eventosSection = document.getElementById('eventos');
    if (eventosSection) {
        loadEventos();
    }

    // Formulário de matrícula
    const formMatricula = document.getElementById('form-matricula');
    if (formMatricula) {
        formMatricula.addEventListener('submit', salvarMatricula);
    }
});

// Função para salvar matrícula via API
async function salvarMatricula(e) {
    e.preventDefault();
    
    const matricula = {
        nomeAluno: document.getElementById('n_aluno').value,
        serie: document.getElementById('serie').value,
        responsavel: document.getElementById('responsavel').value,
        telefone: document.getElementById('telefone').value,
        status: 'pendente',
        dataCadastro: new Date().toISOString()
    };

    const messageDiv = document.getElementById('matricula-message');
    
    try {
        const response = await fetch(`${API_URL}/matriculas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(matricula)
        });

        if (response.ok) {
            messageDiv.className = 'alert alert-success mt-3';
            messageDiv.textContent = 'Pré-matrícula enviada com sucesso! Nossa secretaria entrará em contato em breve.';
            messageDiv.style.display = 'block';
            document.getElementById('form-matricula').reset();
            
            // Ocultar mensagem após 5 segundos
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Erro ao salvar matrícula');
        }
    } catch (error) {
        console.error('Erro ao salvar matrícula:', error);
        messageDiv.className = 'alert alert-danger mt-3';
        messageDiv.textContent = 'Erro ao enviar pré-matrícula. Por favor, tente novamente.';
        messageDiv.style.display = 'block';
    }
}

// Função para carregar eventos da API e exibir na página inicial
async function loadEventos() {
    const eventosContainer = document.querySelector('#eventos .row.eventos-cards');
    
    if (!eventosContainer) {
        console.error('Container de eventos não encontrado');
        return;
    }
    
    try {
        console.log('Buscando eventos da API...');
        // Primeiro tenta buscar apenas eventos ativos
        let response = await fetch(`${API_URL}/eventos?ativo=true`);
        
        // Se não funcionar, busca todos os eventos e filtra no cliente
        if (!response.ok) {
            console.log('Tentando buscar todos os eventos...');
            response = await fetch(`${API_URL}/eventos`);
        }
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        let eventos = await response.json();
        console.log('Eventos recebidos da API:', eventos);
        
        // Garantir que eventos é um array
        if (!Array.isArray(eventos)) {
            console.warn('Resposta da API não é um array:', eventos);
            eventos = [];
        }
        
        // Filtrar apenas eventos ativos (ativo deve ser true ou undefined/null, mas não false)
        // JSON Server pode retornar como string "true" ou boolean true
        eventos = eventos.filter(e => {
            const ativoValue = e.ativo;
            // Aceitar: true, "true", undefined, null, ou qualquer valor que não seja explicitamente false
            const isAtivo = ativoValue !== false && 
                                   ativoValue !== 'false' && 
                                   ativoValue !== 0 && 
                                   ativoValue !== '0';
            console.log(`Evento "${e.titulo || 'Sem título'}" (ID: ${e.id}) - ativo: ${ativoValue} (${typeof ativoValue}), filtrado: ${isAtivo}`);
            return isAtivo;
        });
        
        console.log(`Eventos após filtro: ${eventos.length} eventos ativos`);
        
        eventosContainer.innerHTML = '';
        
        if (!eventos || eventos.length === 0) {
            eventosContainer.innerHTML = '<div class="col-12 text-center text-muted py-4"><p>Nenhum evento disponível no momento.</p></div>';
            return;
        }
        
        eventos.forEach(evento => {
            console.log('Criando card para evento:', evento);
            const eventoCard = createEventoCard(evento);
            eventosContainer.appendChild(eventoCard);
        });
        
        console.log(`${eventos.length} eventos carregados com sucesso`);
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        eventosContainer.innerHTML = `
            <div class="col-12 text-center text-danger py-4">
                <p><strong>Erro ao carregar eventos</strong></p>
                <p class="small">Verifique se o servidor está rodando em http://localhost:3000</p>
                <p class="small text-muted">Erro: ${error.message}</p>
            </div>
        `;
    }
}

// Função para criar card de evento
function createEventoCard(evento) {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    
    const imagem = evento.secaoDetalhes1?.imagem || evento.imagem || 'assets/img/calendario.png';
    const titulo = evento.titulo || 'Evento';
    const introducao = evento.introducao || 'Descrição do evento';
    const eventoId = evento.id || '';
    
    // Escapar caracteres especiais para evitar problemas no HTML
    const escapeHtml = (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };
    
    col.innerHTML = `
        <div class="card evento-card h-100">
            <img src="${escapeHtml(imagem)}" class="card-img-top" alt="${escapeHtml(titulo)}" style="height: 200px; object-fit: cover;" onerror="this.src='assets/img/calendario.png'">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-primary-color">${escapeHtml(titulo)}</h5>
                <p class="card-text flex-grow-1">${escapeHtml(introducao.substring(0, 120))}${introducao.length > 120 ? '...' : ''}</p>
                <a href="eventos.html?id=${escapeHtml(eventoId)}" class="btn btn-primary mt-auto align-self-center">Saiba Mais</a>
            </div>
        </div>
    `;
    
    return col;
}


// Lógica JavaScript para Carregar Detalhes de Eventos na página eventos.html
document.addEventListener('DOMContentLoaded', async () => {
    // Verifica se estamos na página eventos.html (pela presença do elemento evento-title)
    const eventoTitle = document.getElementById('evento-title');
    if (!eventoTitle) return; // Se não encontrar, não estamos em eventos.html

    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('id');

    // Tenta carregar dados da API (para eventos dinâmicos)
    if (eventoId) {
        try {
            const response = await fetch(`${API_URL}/eventos/${eventoId}`);
            if (response.ok) {
                const evento = await response.json();
                loadEventDetails(evento);
            } else {
                showEventoError(eventoTitle);
            }
        } catch (error) {
            console.error('Erro ao carregar evento da API:', error);
            showEventoError(eventoTitle);
        }
    } else {
        showEventoError(eventoTitle);
    }
});

function showEventoError(eventoTitle) {
    eventoTitle.textContent = "Evento Não Encontrado";
    document.getElementById('evento-intro').textContent = "Parece que o evento que você procura não existe ou o link está inválido. Por favor, retorne à página inicial.";
    
    // Ocultar seções dinâmicas
    const sections = ['details-section-1', 'gallery-section', 'depoimento-section', 'btn-section'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}
    

// Lógica JavaScript para Carregar Detalhes na página detalhes.html 
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    // Verifica se o ID existe na URL e se o projeto correspondente existe no nosso JSON
    if (projectId && projetosDetalhes[projectId]) {
        loadProjectDetails(projetosDetalhes[projectId]);
    } else {
        // Lidar com projeto não encontrado ou ID ausente
        console.error("Projeto não encontrado ou ID ausente na URL.");
        // Exibir uma mensagem de erro ou redirecionar
        const projectTitle = document.getElementById('project-title');
        if (projectTitle) projectTitle.textContent = "Projeto Não Encontrado";
        
        const projectIntro = document.getElementById('project-intro');
        if (projectIntro) projectIntro.textContent = "Parece que o projeto que você procura não existe ou o link está inválido. Por favor, retorne à página inicial.";

        // Ocultar seções dinâmicas se o projeto não for encontrado
        if (document.getElementById('details-section-1')) document.getElementById('details-section-1').style.display = 'none';
        if (document.getElementById('gallery-section')) document.getElementById('gallery-section').style.display = 'none';
        if (document.getElementById('depoimento-section')) document.getElementById('depoimento-section').style.display = 'none';
        if (document.getElementById('btn-section')) document.getElementById('btn-section').style.display = 'none';
    }
});

function loadProjectDetails(data) {
    // Atualiza o título da página
    document.title = `Detalhes - ${data.titulo}`;

    // Seção Detalhes Principal
    document.getElementById('project-title').textContent = data.titulo;
    document.getElementById('project-intro').textContent = data.introducao;

    // --- SEÇÃO DE DETALHES 1 (IMAGEM + TEXTO) ---
    const detalhesSecao1 = data.secaoDetalhes1;
    if (detalhesSecao1) {
        document.getElementById('details-title-1').textContent = detalhesSecao1.titulo;
        document.getElementById('main-image-1').src = detalhesSecao1.imagem;
        document.getElementById('main-image-1').alt = detalhesSecao1.altImagem;
        document.getElementById('details-text-1').textContent = detalhesSecao1.texto;

        // Lógica para inverter layout
        const row1 = document.querySelector('#details-section-1 .row');
        if (row1) { // Verifica se o elemento existe
            if (detalhesSecao1.layout === "image-right") {
                row1.classList.add('flex-row-reverse');
            } else {
                row1.classList.remove('flex-row-reverse');
            }
        }
    } else {
        // Ocultar seção se não houver dados
        if (document.getElementById('details-section-1')) document.getElementById('details-section-1').style.display = 'none';
    }


    // --- SEÇÃO DE GALERIA ---
    const galeriaData = data.galeria;
    if (galeriaData && galeriaData.imagens && galeriaData.imagens.length > 0) {
        document.querySelector('#gallery-section h3').textContent = galeriaData.titulo;
        const galleryRow = document.getElementById('gallery-row');
        if (galleryRow) {
            galleryRow.innerHTML = '';
            galeriaData.imagens.forEach(item => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6 mb-4';
                col.innerHTML = `<img src="${item.src}" class="img-fluid rounded shadow-sm" alt="${item.alt}">`;
                galleryRow.appendChild(col);
            });
        }
        document.getElementById('gallery-description').textContent = galeriaData.descricao;
    } else {
        if (document.getElementById('gallery-section')) document.getElementById('gallery-section').style.display = 'none';
    }


    // --- SEÇÃO DE DEPOIMENTO ---
    const depoimentoData = data.depoimento;
    if (depoimentoData && depoimentoData.texto && depoimentoData.autor) {
        document.getElementById('depoimento-text').textContent = depoimentoData.texto;
        // Uso de innerHTML para incluir a tag <cite>
        document.getElementById('depoimento-author').innerHTML = `${depoimentoData.autor} <cite title="Fonte do Depoimento">${depoimentoData.posicao}</cite>`;
    } else {
        if (document.getElementById('depoimento-section')) document.getElementById('depoimento-section').style.display = 'none';
    }


    // --- SEÇÃO DE CTA (Chamada para Ação do botão) ---
    const ctaData = data.cta;
    if (ctaData) {
        document.querySelector('#btn-section h2').textContent = ctaData.titulo;
        const ctaButton = document.querySelector('#btn-section .btn');
        if (ctaButton) { // Verifica se o elemento existe
            ctaButton.textContent = ctaData.textoBotao;
            ctaButton.href = ctaData.linkBotao;
        }
    } else {
        if (document.getElementById('btn-section')) document.getElementById('btn-section').style.display = 'none';
    }
}

// CORREÇÃO 2: Função loadEventDetails completada.
function loadEventDetails(data) {
    // Atualiza o título da página
    document.title = `Detalhes - ${data.titulo}`;

    // Seção Detalhes Principal
    document.getElementById('evento-title').textContent = data.titulo;
    document.getElementById('evento-intro').textContent = data.introducao;

    // --- SEÇÃO DE DETALHES 1 (IMAGEM + TEXTO) ---
    const detalhesSecao1 = data.secaoDetalhes1;
    if (detalhesSecao1) {
        document.getElementById('details-title-1').textContent = detalhesSecao1.titulo;
        document.getElementById('main-image-1').src = detalhesSecao1.imagem;
        document.getElementById('main-image-1').alt = detalhesSecao1.altImagem;
        document.getElementById('details-text-1').textContent = detalhesSecao1.texto;

        // Lógica para inverter layout
        const row1 = document.querySelector('#details-section-1 .row');
        if (row1) { // Verifica se o elemento existe
            if (detalhesSecao1.layout === "image-right") {
                row1.classList.add('flex-row-reverse');
            } else {
                row1.classList.remove('flex-row-reverse');
            }
        }
    } else {
        // Ocultar seção se não houver dados
        if (document.getElementById('details-section-1')) document.getElementById('details-section-1').style.display = 'none';
    }


    // --- SEÇÃO DE GALERIA ---
    const galeriaData = data.galeria;
    if (galeriaData && galeriaData.imagens && galeriaData.imagens.length > 0) {
        document.querySelector('#gallery-section h3').textContent = galeriaData.titulo;
        const galleryRow = document.getElementById('gallery-row');
        if (galleryRow) {
            galleryRow.innerHTML = '';
            galeriaData.imagens.forEach(item => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6 mb-4';
                col.innerHTML = `<img src="${item.src}" class="img-fluid rounded shadow-sm" alt="${item.alt}">`;
                galleryRow.appendChild(col);
            });
        }
        document.getElementById('gallery-description').textContent = galeriaData.descricao;
    } else {
        if (document.getElementById('gallery-section')) document.getElementById('gallery-section').style.display = 'none';
    }


    // --- SEÇÃO DE DEPOIMENTO ---
    const depoimentoData = data.depoimento;
    if (depoimentoData && depoimentoData.texto && depoimentoData.autor) {
        document.getElementById('depoimento-text').textContent = depoimentoData.texto;
        document.getElementById('depoimento-author').innerHTML = `${depoimentoData.autor} <cite title="Fonte do Depoimento">${depoimentoData.posicao}</cite>`;
    } else {
        if (document.getElementById('depoimento-section')) document.getElementById('depoimento-section').style.display = 'none';
    }


    // --- SEÇÃO DE CTA (Chamada para Ação do botão) ---
    const ctaData = data.cta;
    if (ctaData) {
        document.querySelector('#btn-section h2').textContent = ctaData.titulo;
        const ctaButton = document.querySelector('#btn-section .btn');
        if (ctaButton) { // Verifica se o elemento existe
            ctaButton.textContent = ctaData.textoBotao;
            ctaButton.href = ctaData.linkBotao;
        }
    } else {
        if (document.getElementById('btn-section')) document.getElementById('btn-section').style.display = 'none';
    }
}
