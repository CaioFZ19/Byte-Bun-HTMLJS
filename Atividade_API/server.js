const express = require("express")
const app = express()
const cors = require ("cors")

app.use(cors())
app.use(express.json())

function buscarPreco(categoria, tipo) {
    const tipoArray = cardapio.filter(
        x => x.nome === tipo
    )
    const preco = tipoArray[0].preco
    return preco
}

const cardapio = [
    {categoria: "pao", nome: "Frances", preco: 1.5}, 
    {categoria: "pao", nome: "Integral", preco: 2}, 
    {categoria: "pao", nome: "Ciabatta", preco: 2.5},

    {categoria: "recheio", nome: "Frango", preco: 5}, 
    {categoria: "recheio", nome: "Carne", preco: 6.5}, 
    {categoria: "recheio", nome: "Vegetariano", preco: 4}, 
    
    {categoria: "molho", nome: "Maionese", preco: 0.5}, 
    {categoria: "molho", nome: "Mostarda", preco: 0.5}, 
    {categoria: "molho", nome: "Especial", preco: 1.5}
]

app.get("/", (req, res) => {
    res.send("Byte e Bun API no ar!")
})

app.get("/cardapio", (req, res) => [
    res.json(cardapio)
])

app.get("/cardapio/:categoria", (req, res) => {
    const categoria = req.params.categoria
    const filtrados = cardapio.filter((item) => item.categoria === categoria)
    res.json(filtrados)
})

app.post("/pedido", (req, res) => {
    const {pao, recheio, molho} = req.body

    if (!pao || !recheio || !molho) {
        return res.json({
            erro: "Item faltando, envie pão, recheio e molho"
        })
    }
    const precoPao = buscarPreco("pao", pao)
    const precoRecheio = buscarPreco("recheio", recheio)
    const precoMolho = buscarPreco("molho", molho)
    const total = precoPao + precoRecheio + precoMolho

    res.json({
    itens: {pao, recheio, molho},
    total: Number(total.toFixed(2))
})
})


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})

