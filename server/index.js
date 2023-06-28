const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const mysql = require('mysql')
const multer = require('multer') 
const path = require('path')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyparser.json());
app.use(
  cors(),
  bodyparser.json(),
  bodyparser.urlencoded({
    extended: true
  })
);

const config = mysql.createConnection({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
})

app.post('/user', async (request, response) => {
  const { email, password } = request.body
  await config.query(`SELECT * FROM user where email = '${email}' and password = MD5('${password}')`, (err, result) => {
    if (err) {
      response.status(500).send(err.message)
    } else {
      response.status(200).send(result)
    }
  })
})

app.use(express.static("./public"))
var storageEngine = multer.diskStorage({
  destination: './public/images_product',
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})

var upload = multer({
  storage: storageEngine,
  limits:{fieldSize:10000}
});

app.get('/product', async (request, response) => {
  const data = await config.query(`SELECT * FROM products where flag = 'active' ORDER BY id DESC `, (err, result) => {
    if (err) {
      response.status(500).send(err.message)
    } else {
      response.status(200).send(result)
    }
  })
})

app.post('/product', upload.single("image"), async (request, response) => {
  const data = request.body
  const file = request.file
  const image = file ? `images_product/${file.filename}` : null
  await config.query(`INSERT INTO products (name, price, code, amount, image) VALUES ('${data.name}',${data.price},'${data.code}',${data.amount},'${image}')`, (err) => {
    if (err) {
      response.status(500).send(err.message)
    } else {
      response.status(200).send("เพิ่มข้อมูลสำเร็จ")
    }
  })
})

app.get('/product/:id', async (request, response) => {
  const id = request.params.id
  await config.query(`SELECT * FROM products where flag = 'active' AND id = ${id}`, (err, result) => {
    if (err) {
      console.log(err.code);
      response.status(500).send(err.message)
    } else {
      response.status(200).send(result)
    }
  })
})

app.patch('/product/:id', upload.single("image"), async (request, response) => {
  const id = request.params.id
  const data = request.body
  const file = request.file
  const image = file ? `images_product/${file.filename}` : data.image
  await config.query(`UPDATE products SET name  = '${data.name}',
    price=${data.price},
    code='${data.code}',
    amount=${data.amount},
    image='${image}' WHERE flag = 'active' AND id = ${id}`, (err) => {
    if (err) {
      response.status(500).send(err.message)
    } else {
      response.status(200).send("แก้ไขข้อมูลสำเร็จ")
    }
  })
})

app.delete('/product/:id', upload.single("image"), async (request, response) => {
  const id = request.params.id
  await config.query(`UPDATE products SET flag = 'delete' WHERE flag='active' AND id =  ${id}`, (err) => {
    if (err) {
      response.status(500).send(err.message)
    } else {
      response.status(200).send("ลบข้อมูลสำเร็จ")
    }
  })
})

app.listen(process.env.DB_PORT);