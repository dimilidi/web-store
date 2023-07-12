
import path from 'path';
import express from "express";
import cors from "cors";
import { sample_products, sample_tags } from './data';



const app = express();
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
})




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Surver running on http://localhost:" + port);
})