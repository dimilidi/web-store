
import path from 'path';
import express from "express";
import cors from "cors";
import { sample_products, sample_tags, sample_users } from './data';
import jwt from 'jsonwebtoken'


const app = express();
// get requests with json body inside the api
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));


app.use(express.static('public'));
app.get('/products', (req, res) => {
    res.send(sample_products)
});

app.get('/products/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm;
    const products = sample_products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(products)
});

app.get('/products/tags', (req, res) => {
    res.send(sample_tags)
});

app.get('/products/tags/:tagName', (req, res) => {
    const tagName = req.params.tagName;
    const products = sample_products
    .filter((product) => product.tags?.includes(tagName));
    res.send(products)
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = sample_products
    .find((product) => product.id == productId);
    res.send(product);
});

app.post("/users/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);

    if(user) {
        res.send(generateTokenResponse(user))
    } else {
        res.status(400).send('Username or password is not valid!')
    }
})

const generateTokenResponse = (user:any) =>{
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "MyTokenSecret", {
        expiresIn:"30d"
    });

    user.token = token;
    return user;
}






const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Surver running on http://localhost:" + port);
})