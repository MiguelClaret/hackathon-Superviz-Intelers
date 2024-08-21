document.addEventListener('DOMContentLoaded', () => {
    const openPopupButton = document.getElementById('open-popup');
    const closePopupButton = document.querySelector('.popup .close');
    const popup = document.getElementById('popup');

    if (openPopupButton && closePopupButton && popup) {
        openPopupButton.onclick = () => {
            popup.style.display = 'block';
        };

        closePopupButton.onclick = () => {
            popup.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        };
    } else {
        console.error('Um ou mais elementos não foram encontrados.');
    }
});

// Adiciona um novo card ao enviar o formulário
document.getElementById('new-card-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtenha o título e a descrição do card
    const title = document.getElementById('card-title').value;
    const description = document.getElementById('card-description').value;

    // Crie um ID único para o novo card
    const cardId = 'card-' + new Date().getTime();

    // Crie um novo card
    const newCard = document.createElement('div');
    newCard.className = 'kanban-card';
    newCard.draggable = true;
    newCard.id = cardId; // Atribua o ID único
    newCard.ondragstart = drag;

    // Adicione o título e a descrição ao card
    newCard.innerHTML = `<h3>${title}</h3><p>${description}</p>`;

    // Adicione o card à primeira coluna (To Do)
    document.querySelector('.kanban-board .kanban-column:first-of-type .kanban-content').appendChild(newCard);

    // Limpa os campos do formulário e fecha o pop-up
    document.getElementById('card-title').value = '';
    document.getElementById('card-description').value = '';
    popup.style.display = 'none';
});

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const card = document.getElementById(data);
    event.target.closest('.kanban-column').querySelector('.kanban-content').appendChild(card);
}