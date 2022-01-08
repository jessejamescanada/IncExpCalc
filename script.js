const expenseName = document.querySelector('.expenseName')
const expenseAmount = document.querySelector('.expenseAmount')
const IncomeName = document.querySelector('.incomeName')
const IncomeAmount = document.querySelector('.incomeAmount')

const expenseTot = document.querySelector('.expenseTotal')
const expenseDisplayName = document.querySelector('.expenseDisplayName')
const expensePrice = document.querySelector('.expensePrice')

const incomeTot = document.querySelector('.incomeTotal')
const incomeDisplayName = document.querySelector('.incomeDisplayName')
const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')
const sortExpBtn = document.querySelector('.sortExpBtn')
const sortIncBtn = document.querySelector('.sortIncBtn')

const errorDisplay = document.querySelector('.error')
const errorDisplay2 = document.querySelector('.error2')
const overlay = document.querySelector('.overlay')

const totalMoney = document.querySelector('.totalMoney')

let finalExpense = 0
let finalIncome = 0

let expenseObject = []
let incomeObject = []

btn1.addEventListener('click', (e) => {
    if(expenseName.value && expenseAmount.value !== ''){
        expenseObject.push({
            id: randomID(),
            expense: expenseName.value,
            expensePrice: parseFloat(expenseAmount.value)
        })
    }else{
        showError()
        setTimeout(() => {
            hideError()
        }, 2000);
    }
    addExpenseTotal()
    showExpenseDom()
    expenseName.value = ''
    expenseAmount.value = ''
    e.preventDefault()
})


btn2.addEventListener('click', (e) => {
    if(IncomeName.value && IncomeAmount.value !== ''){
        incomeObject.push({
            id: randomID(),
            income: IncomeName.value,
            incomePrice: parseFloat(IncomeAmount.value)
        })
    }else{
        showError2()
        setTimeout(() => {
            hideError2()
        }, 2000);
    }
    addIncomeTotal()
    showIncomeDom()
    IncomeName.value = ''
    IncomeAmount.value = ''
    e.preventDefault()
})

function addExpenseTotal() {
    const addedExpenses = expenseObject.reduce((acc, cv) => acc + cv.expensePrice, 0)
    expenseTot.innerText = addedExpenses
    finalExpense = addedExpenses
    showMoney()
}

function addIncomeTotal() {
    const addedIncome = incomeObject.reduce((acc, cv) => acc + cv.incomePrice, 0)
    incomeTot.innerText = addedIncome
    finalIncome = addedIncome
    showMoney()
}

function removeExp(id){
    expenseObject = expenseObject.filter(exp => exp.id !== id)
    addExpenseTotal()
    showExpenseDom()
    showMoney()
}

function removeInc(id){
    incomeObject = incomeObject.filter(inc => inc.id !== id)
    addIncomeTotal()
    showIncomeDom()
    showMoney()
}

function showExpenseDom() {
    expenseDisplayName.innerHTML = expenseObject.map((exp) => {
        return `<ul>
            <div class="deleteBtn"><li>${exp.expense} $${exp.expensePrice}</li> <button onclick="removeExp(${exp.id})"> x </button></div>
            </ul>`
    }).join('')
}

function showIncomeDom() {
    incomeDisplayName.innerHTML = incomeObject.map((inc) => {
        return `<ul>
            <div class="deleteBtn"><li>${inc.income} $${inc.incomePrice}</li> <button onclick="removeInc(${inc.id})"> x </button></div>
            </ul>`
    }).join('')
}

function showMoney() {
    const total = finalIncome - finalExpense
    totalMoney.innerHTML = total
    if(total < 0){
        totalMoney.style.color = 'red'
    }else{
        totalMoney.style.color = 'green'
    }
}

function randomID() {
    return Math.floor(Math.random() * 100000000)
}

function showError(){
    errorDisplay.style.display = 'block'
    overlay.style.display = 'block'
}

function showError2(){
    errorDisplay2.style.display = 'block'
    overlay.style.display = 'block'
}

function hideError(){
    errorDisplay.style.display = 'none'
    overlay.style.display = 'none'
}

function hideError2(){
    errorDisplay2.style.display = 'none'
    overlay.style.display = 'none'
}

sortExpBtn.addEventListener('click', sortExpenses)

sortIncBtn.addEventListener('click', sortIncome)

function sortExpenses(e) {
    e.preventDefault()
    expenseObject.sort((a, b) => parseFloat(b.expensePrice) - parseFloat(a.expensePrice))
    showExpenseDom()
}

function sortIncome(e) {
    e.preventDefault()
    incomeObject.sort((a, b) => parseFloat(b.incomePrice) - parseFloat(a.incomePrice))
    showIncomeDom()
}