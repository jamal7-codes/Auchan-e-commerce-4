import {getProducts} from './api.js';

 setTimeout(() =>{
     
    getProducts()
    .then(products =>{
        console.log(products);
    })
    .catch(error =>{
        console.error('Could not lead products:', error)
 });
    
 },5000)