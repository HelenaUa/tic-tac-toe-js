const container = document.querySelector('.js-content');

const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

let player = 'X';
let historyX = [];
let historyO = [];

function initGame() {
    let markup = '';

    for (let i = 1; i < 10; i++) {
    markup += `<div class='item js-item' data-id='${i}'></div>`;
    }
    container.innerHTML = markup;
    historyX = [];
    historyO = [];
    player = 'X';

    container.addEventListener('click', onClick);
}

function onClick(event) {
    if (!event.target.classList.contains('js-item') || event.target.textContent) {
        return;
    }

    const id = Number(event.target.dataset.id);
    
    if (player === 'X') {
        historyX.push(id);
        event.target.textContent = 'X';
        if (isWinner(historyX)) {
            setTimeout(() => {
                alert(`Winner X 😎`);
                initGame()
            }, 200)
            container.removeEventListener('click', onClick);
            return;
        }
    } else {
        historyO.push(id);
        event.target.textContent = 'O';
        if (isWinner(historyO)) {
            setTimeout(() => {
                alert(`Winner O 😎`);
                initGame()
            }, 200)
            container.removeEventListener('click', onClick);
            return;
        }
    }

    if (historyX.length + historyO.length === 9) {
        setTimeout(() => {
            alert(`Try again 😉`);
            initGame();
        }, 200)
    }

    // Перемикаємо гравця тільки після перевірки перемоги
    player = player === 'X' ? 'O' : 'X';
}

function isWinner(arr) {
    return wins.some(item => item.every(id => arr.includes(id)));
}

initGame();



