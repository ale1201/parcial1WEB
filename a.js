const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"

let carrito = []
let products = []
let totalProducts = 0

const carga = (callback) => {
    fetch(url).then((element) => {
      const x = element.json();
      x.then((el) => {
        callback(el);
      });
    });
};

fetch(url).then((resp) => resp.json()).then(function(data) {
  mostrarComida(data[0])
})
.catch(function(error) {
  console.log(error);
});

let burguer = document.getElementById("burguer");
burguer.addEventListener("click", ()=>{
  refrescar()
  carga((datos) => {
      mostrarComida(datos[0]);
    });
})

let taco = document.getElementById("taco");
taco.addEventListener("click", ()=>{
  refrescar()
  carga((datos) => {
      mostrarComida(datos[1]);
    });
})

let salad = document.getElementById("salad");
salad.addEventListener("click", ()=>{
  refrescar()
  carga((datos) => {
      mostrarComida(datos[2]);
    });
})

let dessert = document.getElementById("dessert");
dessert.addEventListener("click", ()=>{
  refrescar()
  carga((datos) => {
      mostrarComida(datos[3]);
    });
})

let drink = document.getElementById("drink");
drink.addEventListener("click", ()=>{
  refrescar()
  carga((datos) => {
      mostrarComida(datos[4]);
    });
})

let carrito = document.getElementById("carrito");
carrito.addEventListener("click", () =>{
  refrescar()
  mostrarTablaCarrito()
})

function mostrarTablaCarrito(){

}


function mostrarComida(comida){
    let nombre = document.getElementById("nombreProducto");
    let producto = document.getElementById("producto");
    let divRow = document.createElement("div");
    divRow.className = "row";

    let name = document.createElement("h1");
    name.innerText = comida.name;
    name.className = "text-center";

    nombre.appendChild(name);
    let eachProducts = comida.products
    for (let i = 0; i < eachProducts.length; i++) {
        let c = eachProducts[i];
        let card = document.createElement("div")
        card.className = "card";
        let body = document.createElement("div")
        body.className = "card-body";

        let title = document.createElement("h4");
        title.className = "card-title";
        title.innerText = c.name;

        let detail = document.createElement("p");
        detail.className = "card-text";
        detail.innerText = c.description;

        let price = document.createElement("p");
        price.className = "card-text";
        price.innerText = "$"+c.price;
        price.id = "precioCarta"

        let car = document.createElement("a");
        car.className = "btn btn-dark";
        car.innerText = "Add to car";
        car.id = "agregarCarrito"

        car.onclick = ()=>{
          totalProducts += 1
          document.getElementById("cantidad").innerHTML = totalProducts + " Items";
          if (carrito.includes(c.name)){
            products.forEach(element => {
              if(element["name"] === c.name){
                element["qty"] += 1
                element["amount"] = element["qty"]*element["price"]
              }
            });
          }
          else{
            carrito.push(c.name);
            let dicci = {
              "qty" : 1,
              "description" : c.name,
              "price" : c.price,
              "amount" : c.price
            }
            products.push(dicci)
          }
          console.log(products)
        }

        let im = document.createElement("img");
        im.src = c.image;
        im.className = "card-img-top"

        body.appendChild(im);
        body.appendChild(title);
        body.appendChild(detail);
        body.appendChild(price);
        body.appendChild(car);
        
        card.appendChild(body);

        divRow.appendChild(card);

        producto.appendChild(divRow);

    }
}

function refrescar() {
    var node = document.getElementById("producto");
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    var node = document.getElementById("nombreProducto");
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
}