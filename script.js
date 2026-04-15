let expenses = [];
let total = 0;
let chart;
window.onload = function ()
{
    let savedData = localStorage.getItem("expenses");
    if (savedData)
    {
        expenses = JSON.parse(savedData);
        displayExpenses();
    }
};

function addExpense() 
{
    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    if (title === "" || amount === "") 
    {
        alert("Enter details");
        return;
    }
    let expense = 
    {
        title: title,
        amount: Number(amount)
    };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
}

function displayExpenses() 
{
    let list = document.getElementById("list");
    list.innerHTML = "";
    total = 0;
    let titles = [];
    let amounts = [];
    expenses.forEach((exp, index) => 
        {
            let li = document.createElement("li");
            li.innerHTML = `
            <strong>${exp.title} - ₹ ${exp.amount}</strong>
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>`;
            list.appendChild(li);
            total += exp.amount;
            titles.push(exp.title);
            amounts.push(exp.amount);
        });

    document.getElementById("total").innerText = total;
    updateChart(titles, amounts);
}

function deleteExpense(index) 
{
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

function clearAll() 
{
    if (confirm("Delete all expenses?")) 
        {
            localStorage.removeItem("expenses");
            expenses = [];
            total = 0;
            document.getElementById("list").innerHTML = "";
            document.getElementById("total").innerText = 0;
        }
}

function searchExpense() 
{
    let searchValue = document.getElementById("search").value.toLowerCase().trim();
    let listItems = document.querySelectorAll("#list li");
    let found = false;
    listItems.forEach((li) => 
        {
            let text = li.innerText.toLowerCase(); 
            if (text.includes(searchValue)) 
                {
                    li.style.display = "flex";
                    found = true;
                } 
            else 
                {
                    li.style.display = "none";
                }
        });

    if (found || searchValue === "") 
        {
            document.getElementById("notFound").style.display = "none";
        } 
    else 
        {
            document.getElementById("notFound").style.display = "block";
        }
}

function updateChart(titles, amounts) 
{
    let ctx = document.getElementById("myChart").getContext("2d");
    if (chart) 
        {
            chart.destroy();
        }
    chart = new Chart(ctx, 
        {
            type: "bar",
            data: 
            {
                labels: titles,
                datasets: 
                [{
                label: "Expenses ₹",
                data: amounts,
                backgroundColor: "rgba(245, 198, 29, 0.91)",
                borderColor: "rgba(244, 222, 83, 0.92)",
                borderWidth: 1
                 }]
            },
            options: 
            {
                responsive: true,
                maintainAspectRatio: false, 
                devicePixelRatio: 2,        
                scales: 
                {
                y: { beginAtZero: true }
                }
            }
        });
}
