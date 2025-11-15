// Função para atualizar o visual do toggle de evento ativo
function atualizarToggleEvento() {
    const ativoInput = document.getElementById('evento-ativo');
    const toggleIcon = document.getElementById('toggle-icon');
    const toggleTitle = document.getElementById('toggle-title');
    const toggleDescription = document.getElementById('toggle-description');
    
    if (!ativoInput || !toggleIcon || !toggleTitle || !toggleDescription) {
        return;
    }
    
    if (ativoInput.checked) {
        // Evento ativo
        toggleIcon.className = 'fas fa-toggle-on fa-2x me-3 toggle-on';
        toggleIcon.style.color = '#28a745';
        toggleTitle.textContent = 'Evento Ativo';
        toggleDescription.textContent = 'O evento está visível no site público';
        toggleDescription.className = 'text-success mb-0 small';
    } else {
        // Evento inativo
        toggleIcon.className = 'fas fa-toggle-off fa-2x me-3 toggle-off';
        toggleIcon.style.color = '#dc3545';
        toggleTitle.textContent = 'Evento Inativo';
        toggleDescription.textContent = 'O evento está oculto do site público';
        toggleDescription.className = 'text-danger mb-0 small';
    }
}

// Inicializar o toggle quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const ativoInput = document.getElementById('evento-ativo');
    if (ativoInput) {
        // Atualizar visual inicial
        atualizarToggleEvento();
        
        // Adicionar listener para mudanças
        ativoInput.addEventListener('change', atualizarToggleEvento);
    }
});

