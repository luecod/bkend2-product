//? Dependencies
const express = require('express')

//? Initial configs
const app = express()

app.use(express.json()) //nos permite recibir informacion

const productDB = [
  {
    id: 1,
    title: 'Xbox serie X',
    price: '600 USD'
  },
  {
    id: 2,
    title: 'Play station 5',
    price: '600 USD'
  }
]
let baseId = 3

//como nosotros podemos recibir info o data del cliente 
app.get('/', (req, res) => {
  res.json({
    message: 'My server is ok'
  })
})

// Crear una ruta que muestre los productos
app.get('/products', (req, res) => {
  res.json(productDB)
})

// Crear una ruta que muestre un producto dependiendo el ID
app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id)

  const data = productDB.find((item) => id === item.id)

  if (data) {
    res.json(data)
  } else {
    res.status(404).json({
      message: 'Invalid ID'
    })
  }
})


// Crear una ruta que agregue un producto nuevo

app.post('/products', (req, res) => {
  const data = req.body

  const newProduct = {
    id: baseId++,
    title: data.title,
    price: data.price,
  }
  productDB.push(newProduct)
  res.json(newProduct)
})


app.listen(9000, () => {
  console.log('Server started at port 9000')
})
