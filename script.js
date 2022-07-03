
let openForm =()=>{
    console.log("EEEE")
    let form = document.getElementById('cad-form')
    form.style.display = "block"
}

let testClient ={
    nome: "Revertis",
    email: "kelvinrev2@hotmail.com",
    date:"06/10/1995",
    tel:"33987046181"
}

let getLocalStorage = ()=> JSON.parse(localStorage.getItem('data')) ?? []
let setLocalStorage = (data) => localStorage.setItem("data", JSON.stringify(data))

let saveClient = (client) =>{
    const data = getLocalStorage()
    console.log(data)
    data.push(client)

}

let editClient = (index,client)=>{
    let edit = getLocalStorage()
    edit[index] = client
    setLocalStorage(edit)
    
}