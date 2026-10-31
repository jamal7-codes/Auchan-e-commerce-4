export  function getProducts(){
    
    return fetch('data/data.json')
    .then(response =>{
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
 } )
 
 }
     
