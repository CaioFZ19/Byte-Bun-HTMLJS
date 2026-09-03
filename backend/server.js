require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const FRONTEND_URL = "https://byte-bun-htmljs.onrender.com"

const cardapio = [
    { categoria: "pao", nome: "Frances", preco: 1.5 },
    { categoria: "pao", nome: "Integral", preco: 2 },
    { categoria: "pao", nome: "Ciabatta", preco: 2.5 },

    { categoria: "recheio", nome: "Frango", preco: 5 },
    { categoria: "recheio", nome: "Carne", preco: 6.5 },
    { categoria: "recheio", nome: "Vegetariano", preco: 4 },

    { categoria: "molho", nome: "Maionese", preco: 0.5 },
    { categoria: "molho", nome: "Mostarda", preco: 0.5 },
    { categoria: "molho", nome: "Especial", preco: 1.5 }
]

function buscarPreco(categoria, tipo) {
    const item = cardapio.find(
        x => x.categoria === categoria && x.nome === tipo
    )

    return item ? item.preco : null
}

app.get("/", (req, res) => {
    res.send("Byte e Bun API no ar!")
})

app.get("/cardapio", (req, res) => {
    res.json(cardapio)
})

app.get("/cardapio/:categoria", (req, res) => {
    const categoria = req.params.categoria

    const filtrados = cardapio.filter(
        item => item.categoria === categoria
    )

    res.json(filtrados)
})

app.post("/pedido", (req, res) => {
    const { pao, recheio, molho } = req.body

    if (!pao || !recheio || !molho) {
        return res.status(400).json({
            erro: "Item faltando, envie pão, recheio e molho"
        })
    }

    const precoPao = buscarPreco("pao", pao)
    const precoRecheio = buscarPreco("recheio", recheio)
    const precoMolho = buscarPreco("molho", molho)

    if (precoPao === null || precoRecheio === null || precoMolho === null) {
        return res.status(400).json({
            erro: "Um ou mais itens não existem no cardápio"
        })
    }

    const total = precoPao + precoRecheio + precoMolho

    res.json({
        itens: {
            pao,
            recheio,
            molho
        },
        total: Number(total.toFixed(2))
    })
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})
