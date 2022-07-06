
let openForm = () => {
    let form = document.getElementById('cad-form')
    form.style.display = "block"
}

let closeForm = () =>{
    let form = document.getElementById('cad-form')
    form.style.display = "none"
}

let getLocalStorage = () => JSON.parse(localStorage.getItem('data')) ?? []
let setLocalStorage = (data) => localStorage.setItem("data", JSON.stringify(data))

let saveClient = (client) => {
    const data = getLocalStorage()
    data.push(client)
    setLocalStorage(data)
}


const fillForm = (client) => {
    document.getElementById('name').value = client.name
    document.getElementById('email').value = client.email
    document.getElementById('tel').value = client.tel
    document.getElementById('name').dataset.index = client.index
}

let attClient = (index) => {
    let client = getLocalStorage()[index]
    client.index = index
    fillForm(client)
    openForm()
}

let editClient = (index, client) => {
    let edit = getLocalStorage()
    edit[index] = client
    setLocalStorage(edit)
    console.log("testeeee")
}

let delClient = (index) => {
    const data = getLocalStorage()
    data.splice(index, 1)
    setLocalStorage(data)
}


//Verifica se o campo foi preenchido e retona 
let validityForm = () => {
    return document.getElementById('cad-form').reportValidity()
}

let addClient = () => {
    if (validityForm()) {
        let client = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            tel: document.getElementById('tel').value,
        }
        let index = document.getElementById('name').dataset.index
        if (index == 'new') {
            saveClient(client)
            attClient()
            closeForm()
        } else {
            editClient(index, client)
            attTable()
            closeForm()
        }
    }
}

let addClientLine = (client, index) => {
    let clientLine = document.createElement('tr')
    clientLine.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.tel}</td>
        <td>
        <button type="button" id="edit-${index}">Edit</button>
        <button type="button" class="delete" id="delete-${index}">Delete</button>
        </td>
    `
    document.getElementById('client-list').appendChild(clientLine)
}

let attTable = () => {
    let data = getLocalStorage()
    cleanTable()
    data.forEach(addClientLine)

}

let cleanTable = () => {
    let lines = document.querySelectorAll('tbody tr')
    lines.forEach(line => line.parentNode.removeChild(line))
}

let editDel = (event) => {
    if (event.target.type == 'button') {
        let [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            attClient(index)
        } else {
            delClient(index)
            attTable()
        }
    }
}

attTable()

document.querySelector('tbody')
    .addEventListener('click', editDel)
