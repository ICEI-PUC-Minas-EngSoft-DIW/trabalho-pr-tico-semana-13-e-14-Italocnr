// URL base da API (JSON Server)
const API_URL = 'http://localhost:3000';

// Função para obter o ID do evento da URL
function getEventoIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função para formatar data
function formatarData(dataString) {
    if (!dataString) return 'Data não informada';
    
    try {
        let data;
        if (dataString.includes('T') || dataString.includes('Z') || dataString.includes('+')) {
            data = new Date(dataString);
        } else {
            const parts = dataString.split('-');
            data = new Date(parts[0], parts[1] - 1, parts[2]);
        }
        
        const dataCorrigida = new Date(data.getTime() + (data.getTimezoneOffset() * 60000));
        return dataCorrigida.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    } catch (error) {
        return dataString;
    }
}

// Função para carregar os detalhes do evento
async function carregarDetalhesEvento() {
    const eventoId = getEventoIdFromURL();
    
    if (!eventoId) {
        mostrarErro('ID do evento não fornecido na URL.');
        return;
    }

    try {
        console.log('Buscando evento com ID:', eventoId);
        const response = await fetch(`${API_URL}/eventos/${eventoId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                mostrarErro('Evento não encontrado.');
            } else {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return;
        }

        const evento = await response.json();
        console.log('Evento carregado:', evento);
        
        // Preencher os dados do evento na página
        preencherDadosEvento(evento);
        
    } catch (error) {
        console.error('Erro ao carregar evento:', error);
        mostrarErro('Erro ao carregar os detalhes do evento. Verifique se o servidor está rodando.');
    }
}

// Função para preencher os dados do evento na página
function preencherDadosEvento(evento) {
    // Título e introdução
    document.getElementById('evento-titulo').textContent = evento.titulo || 'Evento';
    document.getElementById('evento-introducao').textContent = evento.introducao || '';
    document.getElementById('evento-data-texto').textContent = formatarData(evento.data);
    
    // Seção de detalhes principal
    const secaoDetalhes = evento.secaoDetalhes1 || {};
    const detailsTitle = document.getElementById('details-title-1');
    const detailsText = document.getElementById('details-text-1');
    const mainImage = document.getElementById('main-image-1');
    const imagePlaceholder = document.getElementById('image-placeholder');
    const detailsRow = document.getElementById('details-row');
    
    if (detailsTitle) {
        detailsTitle.textContent = secaoDetalhes.titulo || 'Detalhes do Evento';
    }
    
    if (detailsText) {
        detailsText.textContent = secaoDetalhes.texto || evento.introducao || 'Detalhes do evento em breve.';
    }
    
    // Imagem principal
    const imagemSrc = evento.imagemBase64 || secaoDetalhes.imagem || '';
    if (imagemSrc) {
        mainImage.src = imagemSrc;
        mainImage.alt = secaoDetalhes.altImagem || evento.titulo || 'Imagem do evento';
        mainImage.style.display = 'block';
        if (imagePlaceholder) imagePlaceholder.style.display = 'none';
    } else {
        mainImage.style.display = 'none';
        if (imagePlaceholder) imagePlaceholder.style.display = 'block';
    }
    
    // Layout da imagem (esquerda ou direita)
    if (secaoDetalhes.layout === 'image-right') {
        const imageCol = document.getElementById('details-image-col');
        const textCol = document.getElementById('details-text-col');
        if (imageCol && textCol && detailsRow) {
            detailsRow.innerHTML = '';
            detailsRow.appendChild(textCol);
            detailsRow.appendChild(imageCol);
        }
    }
    
    // Galeria
    const galeria = evento.galeria || {};
    const gallerySection = document.getElementById('gallery-section');
    const galleryRow = document.getElementById('gallery-row');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryDescription = document.getElementById('gallery-description');
    
    if (galeria.imagens && Array.isArray(galeria.imagens) && galeria.imagens.length > 0) {
        if (galleryTitle) galleryTitle.textContent = galeria.titulo || 'Momentos e Atividades';
        if (galleryDescription) galleryDescription.textContent = galeria.descricao || '';
        
        if (galleryRow) {
            galleryRow.innerHTML = '';
            galeria.imagens.forEach((img, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6 mb-4';
                const imgElement = document.createElement('img');
                imgElement.src = img;
                imgElement.className = 'img-fluid rounded shadow-sm';
                imgElement.alt = `Atividade ${index + 1}`;
                col.appendChild(imgElement);
                galleryRow.appendChild(col);
            });
        }
        
        if (gallerySection) gallerySection.style.display = 'block';
    } else {
        if (gallerySection) gallerySection.style.display = 'none';
    }
    
    // Depoimento
    const depoimento = evento.depoimento || {};
    const depoimentoSection = document.getElementById('depoimento-section');
    const depoimentoText = document.getElementById('depoimento-text');
    const depoimentoAuthor = document.getElementById('depoimento-author');
    
    if (depoimento.texto) {
        if (depoimentoText) depoimentoText.textContent = `"${depoimento.texto}"`;
        if (depoimentoAuthor) {
            depoimentoAuthor.innerHTML = `${depoimento.autor || 'Aluno'} <cite title="Fonte do Depoimento">${depoimento.posicao || ''}</cite>`;
        }
        if (depoimentoSection) depoimentoSection.style.display = 'block';
    } else {
        if (depoimentoSection) depoimentoSection.style.display = 'none';
    }
    
    // Call to Action
    const cta = evento.cta || {};
    const ctaTitulo = document.getElementById('cta-titulo');
    const ctaBotao = document.getElementById('cta-botao');
    
    if (cta.titulo) {
        if (ctaTitulo) ctaTitulo.textContent = cta.titulo;
    }
    
    if (cta.textoBotao && cta.linkBotao) {
        if (ctaBotao) {
            ctaBotao.textContent = cta.textoBotao;
            ctaBotao.href = cta.linkBotao;
        }
    }
}

// Função para mostrar erro
function mostrarErro(mensagem) {
    const header = document.querySelector('.evento-header');
    if (header) {
        header.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                        <h2 class="text-white">Erro ao carregar evento</h2>
                        <p class="text-white">${mensagem}</p>
                        <a href="index.html" class="btn btn-warning btn-lg mt-3">
                            <i class="fas fa-arrow-left me-2"></i>Voltar para a página inicial
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}


// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carregarDetalhesEvento();
});

