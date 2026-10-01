const versionsHeader = () => {
    const showVersion = document.getElementById("header")
    showVersion.innerHTML = `NODE : ${system.node()} | CHROME : ${system.chrome()} | ELECTRON : ${system.electron()}`
}
document.getElementById('addBtn').onclick = async () => {
    const nameBox = document.getElementById('nameBox');
    const dataBox = document.getElementById('dataBox');

    const inputName = nameBox.value.trim();
    const inputData = dataBox.value.trim();

    if (inputName === "" || inputData === "") {
        console.log('Invalid Input!')
        return;
    }

    await list_database.add(inputName, inputData)
    nameBox.value = '';
    dataBox.value = '';
    await cardDisplayer()
}
document.getElementById('container').onclick = async (e) => {
    if (e.target.classList.contains('cardBtn')) {
        const cardDiv = e.target.closest('.cardDiv');
        const entryId = cardDiv.id.replace('card_', '')

        await list_database.delete(Number(entryId))
        await cardDisplayer();
    }
}
const cardDisplayer = async () => {
    const myCards = await list_database.display()
    const cardDisplay = myCards.map(entry => `
        <div id="card_${entry.id}" class="cardDiv">
            <h6 class="cardName">${entry.name}</h6>
            <p class="cardData">${entry.data}</p>
            <button class="cardBtn">Delete</button>
        </div>`
    ).join('')
    
    document.getElementById('container').innerHTML = cardDisplay
}

// Executions

versionsHeader()
cardDisplayer()