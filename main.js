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

let carritoImagen = document.getElementById("carrito");
carritoImagen.addEventListener("click", () =>{
  refrescar()
  mostrarTablaCarrito(false)
})

function mostrarTablaCarrito(title){
  if (title === false){
    let titulo = document.getElementById("nombreProducto");
    let name = document.createElement("h1");
    name.id = "Orden"
    name.innerText = "Order detail";
    name.className = "text-center";
    titulo.appendChild(name);
  }
  
  let info = document.getElementById("producto");
  let divRow = document.createElement("div");
  divRow.className = "row";

  

  var tbl = document.createElement("table");
  var thead = document.createElement("thead");
  tbl.setAttribute("class", "table table-striped");
  temp = "";
  temp += "<tr>";
  temp += "<th scope='col'> Item </th>";
  temp += "<th scope='col'> quantity. </th>";
  temp += "<th scope='col'> Description </th>";
  temp += "<th scope='col'> Unit unitPrice </th>";
  temp += "<th scope='col'> Amount </th>";
  temp += "<th scope='col'> Modify </th></tr>";
  thead.innerHTML = temp
  tbl.appendChild(thead)
  i=1
  var precioFinal = 0;
  var tbody = document.createElement("tbody");
  products.forEach(element => {
    if(element["quantity"]!==0){
      var tr = document.createElement("tr");
      temp = "<th scope='row'>" + (i) + "</th>"
      temp += "<td scope='row'>" + element["quantity"] + "</td>";
      temp += "<td>" + element["description"] + "</td>";
      temp += "<td>" + element["unitPrice"] + "</td>";
      temp += "<td>" + round2(element["amount"]) + "</td>";
      temp += "<td> <button type='button' class='btn btn-dark' onclick='aumentar(this)'> + </button> <button type='button' class='btn btn-dark' onclick='disminuir(this)'> - </button> </td>";
      tr.innerHTML = temp
      tbody.appendChild(tr)
      precioFinal += round2(element["amount"]);
      i+=1
    }
    
  });
  
  tbl.appendChild(tbody)

  let con1 = document.createElement("div");
  con1.className = "row";
  con1.appendChild(tbl);

  let con2 = document.createElement("div");
  con2.className = "row";

  let con21 = document.createElement("div")
  con21.className = ("col-9")

  let con22 = document.createElement("div")
  con22.className = ("col-1")

  let con23 = document.createElement("div")
  con23.className = ("col-1.5")

  let pr = document.createElement("p");
  pr.id = "precioFinal"
  pr.innerHTML = "Total: $" + round2(precioFinal);
  con21.appendChild(pr)

  let botCancel = document.createElement("button");
  botCancel.className = "btn btn-danger"
  botCancel.innerHTML = "Cancel"
  con22.appendChild(botCancel)

  botCancel.onclick = () => {
    cancelPedido()
  };
  
  let botConfir = document.createElement("button");
  botConfir.className = "btn btn-light"
  botConfir.innerHTML = "Confirm Order"
  con23.appendChild(botConfir)

  botConfir.onclick = () => {
    console.log(products)
    refrescarCarrito();
    carrito = [];
    products = [];
    totalProducts = 0;
    document.getElementById("cantidad").innerHTML = totalProducts + " items";
    mostrarTablaCarrito()
  };
  
  con2.appendChild(con21);
  con2.appendChild(con22);
  con2.appendChild(con23);

  info.appendChild(con1);
  info.appendChild(con2);
}


function mostrarComida(comida){
    let nombre = document.getElementById("nombreProducto");
    let producto = document.getElementById("producto");
    let divRow = document.createElement("div");
    divRow.className = "row";

    let name = document.createElement("h1");
    name.id = ("comidaTitle")
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
        title.id = "comidaT"
        title.className = "card-title";
        title.innerText = c.name;

        let detail = document.createElement("p");
        detail.className = "card-text";
        detail.innerText = c.description;

        let unitPrice = document.createElement("p");
        unitPrice.className = "card-text";
        unitPrice.innerText = "$"+c.price;
        unitPrice.id = "precioCarta"

        let car = document.createElement("a");
        car.className = "btn btn-dark";
        car.innerText = "Add to car";
        car.id = "agregarCarrito"

        car.onclick = ()=>{
          totalProducts += 1
          document.getElementById("cantidad").innerHTML = totalProducts + " items";
          if (carrito.includes(c.name)){
            products.forEach(element => {
              if(element["description"] === c.name){
                element["quantity"] += 1
                element["amount"] = round2(element["quantity"]*element["unitPrice"]);
              }
            });
          }
          else{
            carrito.push(c.name);
            let dicci = {
              "item" : products.length+1,
              "quantity" : 1,
              "description" : c.name,
              "unitPrice" : c.price,
              "amount" : c.price 
            }
            products.push(dicci)
          }
        }

        let im = document.createElement("img");
        im.src = c.image;
        im.className = "card-img-top"

        body.appendChild(im);
        body.appendChild(title);
        body.appendChild(detail);
        body.appendChild(unitPrice);
        body.appendChild(car);
        
        card.appendChild(body);

        divRow.appendChild(card);

        producto.appendChild(divRow);

    }
}

function aumentar(pedido) {
  var name = pedido.parentNode.previousSibling.previousSibling.previousSibling
  products.forEach(element => {
    if(element["description"] === name.textContent){
      element["quantity"] +=1 ;
      element["amount"] += round2(element["unitPrice"]);
    }
  });
  totalProducts +=1;
  document.getElementById("cantidad").innerHTML = totalProducts + " Items";
  refrescarCarrito();
  mostrarTablaCarrito(true);
}

function disminuir(pedido) {
  var name = pedido.parentNode.previousSibling.previousSibling.previousSibling
  products.forEach(element => {
    if(element["description"] === name.textContent){
      element["quantity"] -=1 ;
      element["amount"] -= round2(element["unitPrice"]);
      if(element["quantity"]===0){
        carrito = carrito.filter(function(car) {
          return car !== name.textContent; 
      });
        products = products.filter(function(car) {
        return car.description !== name.textContent; 
    });
      }
    }
  });
  totalProducts -=1;
  document.getElementById("cantidad").innerHTML = totalProducts + " items";
  refrescarCarrito();
  mostrarTablaCarrito(true);
}

function refrescarCarrito(){
  var node = document.getElementById("producto");
  while(node.firstChild){
    node.removeChild(node.firstChild);
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

function round2(num) {
  return +(Math.round(num + "e+2") + "e-2");
}


function cancelPedido(){
  var modal = document.createElement("div");
  modal.id = "myModal";
  modal.className = "modal";

  var content = document.createElement("div");
  content.className = "modal-content";

  var header = document.createElement("div");
  header.className = 'modal-header';

  var span = document.createElement("span");
  span.className = "close";
  span.innerHTML = "&times;"

  var h2 = document.createElement("h5");
  h2.id = "titleModal"
  h2.innerHTML  = "Cancel the order";

  header.appendChild(h2);
  header.appendChild(span);
  

  var body = document.createElement("div");
  body.className = "modal-body";

  var tex = document.createElement("p");
  tex.innerHTML = "Are you sure about cancelling the order?";

  body.appendChild(tex);

  var foot = document.createElement("div");
  foot.className = "modal-footer";

  var botones = document.createElement("div");
  botones.className = "container";

  var div1 = document.createElement("div");
  div1.className = "row-2 botones";

  var div2 = document.createElement("div");
  div2.className = "row-2 botones";

  var bt1 = document.createElement("button");
  bt1.innerHTML = "Yes, I want to cancel the order"
  bt1.className = "btn btn-light"
  div1.appendChild(bt1);
  var bt2 = document.createElement("button");
  bt2.innerHTML = "No, I want to continue adding products"
  bt2.className = "btn btn-danger"
  div2.appendChild(bt2);
  bt1.onclick = () => {
    carrito = [];
    products = [];
    totalProducts = 0;
    refrescarCarrito();
    mostrarTablaCarrito(true);
    document.getElementById("cantidad").innerHTML = totalProducts + " items";
    modal.style.display = "none";
  };

  bt2.onclick = () => {
    modal.style.display = "none";
  };

  botones.appendChild(div1);
  botones.appendChild(div2);
  foot.appendChild(botones);

  content.appendChild(header);
  content.appendChild(body);
  content.appendChild(foot);

  modal.appendChild(content);

  document.body.appendChild(modal)

  var modal2 = document.getElementById("myModal");

  var span = document.getElementsByClassName("close")[0];

  modal2.style.display = "block";

  span.onclick = function() {
    modal2.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal2) {
      modal2.style.display = "none";
    }
  }

}