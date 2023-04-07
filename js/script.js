const incomeArea = document.querySelector('.transactions__income-area');
const expensesArea = document.querySelector('.transactions__expenses-area');
const availableMoney = document.querySelector('.options__available-money');

const btnDelete = document.querySelector('.transactions__delete');
const btnAddTransaction = document.querySelector('.options__add-transaction');
const btnDeleteAll = document.querySelector('.options__delete-all');
const btnLightTheme = document.querySelector('.options__light');
const btnDarkTheme = document.querySelector('.options__light--dark');
const btnSave = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');

const transactionPanel = document.querySelector('.add-transaction-panel');
const nameOfTransaction = document.querySelector('#name');
const amountOfTransaction = document.querySelector('#amount');
const select = document.querySelector('#category');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
	transactionPanel.style.display = 'flex';
};

const hidePanel = () => {
	transactionPanel.style.display = 'none';
    clearInputs()
};

const checkForm = () => {
	if (
		nameOfTransaction.value === '' ||
		amountOfTransaction.value === '' ||
		select.value === 'none'
	) {
		alert('Wypełnij wszystkie pola!');
	} else {
        createNewTransaction()
        hidePanel()
        clearInputs()
	}
};

const clearInputs = () => {
	nameOfTransaction.value = '';
	amountOfTransaction.value = '';
	select.selectedIndex = 0;
};

const createNewTransaction = () => {

    checkCategory(selectedCategory)

    const newTransaction = document.createElement('div')
    newTransaction.classList.add('transactions__transaction')
    newTransaction.setAttribute('id', ID);

    newTransaction.innerHTML = `
    <p class="transactions__transaction-name">${categoryIcon} ${nameOfTransaction.value}</p>
    <p class="transactions__transaction-amount">${amountOfTransaction.value}PLN 
    <button class="transactions__delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>
    `
    
    parseFloat(amountOfTransaction.value) > 0 ? incomeArea.append(newTransaction) && newTransaction.classList.add('income') : expensesArea.append(newTransaction) && newTransaction.classList.add('expense')

    moneyArr.push(parseFloat(amountOfTransaction.value))
    countMoney(moneyArr)
    ID++
}

const checkCategory = transaction => {
    switch(transaction) {
        case `[ + ] Income`:
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
            break;
        case `[ - ] Shopping`:
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
            break;
        case `[ - ] Food`:
            categoryIcon = '<i class="fas fa-hamburger"></i>'
            break;
        case `[ - ] Cinema`:
            categoryIcon = '<i class="fas fa-film"></i>'
            break;

    }
}

const selectCategory = () => {
    selectedCategory = select.options[select.selectedIndex].text
}

const countMoney = money => {
    const newMoney = money.reduce((a,b) => a+b)
    availableMoney.textContent = `${newMoney}`
}

const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText)
    const indexOfTransaction = moneyArr.indexOf(transactionAmount)

    moneyArr.splice(indexOfTransaction, 1)
    console.log(transactionToDelete);
    transactionToDelete.classList.contains('income') ? incomeArea.removeChild(transactionToDelete) : expensesArea.removeChild(transactionToDelete)

    countMoney(moneyArr)
}

btnAddTransaction.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', hidePanel);
btnSave.addEventListener('click', checkForm);
