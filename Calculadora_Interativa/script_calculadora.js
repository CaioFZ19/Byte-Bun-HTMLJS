// const sltPao = document.querySelector("#sltPao")

// sltPao.addEventListener("change", function() {
//     switch(sltPao.value) {
//         case("null"):
//             valorPao = 0
//             break
        
//         case("frances"):
//             valorPao = 1.5
//             break
        
//         case("integral"):
//             valorPao = 2
//             break
        
//         case("ciabatta"):
//             valorPao = 2.5
//             break
//     }
//     return valorPao
// })

// const sltRecheio = document.querySelector("#sltRecheio")
// let valorRecheio
// sltRecheio.addEventListener("change", function() {
//     switch(sltRecheio.value) {
//         case("null"):
//             valorRecheio = 0
//             break
        
//         case("frango"):
//             valorRecheio = 5
//             break
        
//         case("carne"):
//             valorRecheio = 6.5
//             break

//         case("vegetariano"):
//             valorRecheio = 4
//             break
//     }
//     return valorRecheio
// })

// const sltMolho = document.querySelector("#sltMolho")
// let valorMolho
// sltMolho.addEventListener("change", function() {
//     switch(sltMolho.value) {
//         case("null"):
//             valorMolho = 0
//             break
        
//         case("maionese"):
//             valorMolho = 0.5
//             break
        
//         case("mostarda"):
//             valorMolho = 0.5
//             break

//         case("especial"):
//             valorMolho = 1.5
//             break
//     }
//     return valorMolho
// })

// const valorTotal = document.querySelector("#valorTotal")


// ---- Aula 3 ---- \\
// exercicio 01 \\

const btnCalcularPedido = document.querySelector("#btnCalcularPedido") 
const cupom = document.querySelector("#cupom") 

async function carregarCardapio() { 
    const resposta = await fetch("http://localhost:3000/cardapio")
    const itens = await resposta.json(); console.log(itens)
     
    popularSelect("selectPao", itens.filter((item => item.categoria === "pao"))) 
    popularSelect("selectRecheio", itens.filter((item => item.categoria === "recheio"))) 
    popularSelect("selectMolho", itens.filter((item => item.categoria === "molho")))
} 

carregarCardapio() 

const URL_API = "http://localhost:3000"

function popularSelect(idSelect, itens) { 
    const select = document.querySelector(`#${idSelect}`) 
    for( let i = 0; i < itens.length; i++) { 
        const item = itens[i] 
        const option = document.createElement("option") 
        option.value = item.nome 
        option.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}` 
        select.appendChild(option) 
    } 
} 

btnCalcularPedido.addEventListener("click", async() => { 
    const pedido = { 
        pao: document.querySelector("#selectPao").value,
        recheio: document.querySelector("#selectRecheio").value, 
        molho: document.querySelector("#selectMolho").value 
    } 

    try { 
        const resposta = await fetch (`${URL_API}/pedido`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(pedido) })
        const dados = await resposta.json() 
        cupom.textContent = dados.erro 
        ? dados.erro 
        : `Total: R$ ${dados.total.toFixed(2)}` 
    }
    catch (erro) { 
        cupom.textContent = "Não foi possível calcular o pedido." 
        console.error(erro) 
    } 
})
