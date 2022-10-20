let menu = [
  {
    code: 1001,
    product: "Super SMACH COMBO Programado – Hambúrguer + Fritas",
    price: 55,
  },
  {
    code: 1002,
    product: "SMACH VariavelBurguer – Hambúrguer com bacon",
    price: 45,
  },
  {
    code: 1003,
    product: "SMACH BUG EM PROD – Hambúrguer meio torto",
    price: 25,
  },
  {
    code: 1004,
    product: "Combo Econômico SMACH Char 1 – Pão com Carne",
    price: 15,
  },
  {
    code: 1005,
    product: "Especial SMACH CSS – Hambúrguer colorido e alinhado",
    price: 65,
  },
  {
    code: 2001,
    product: "Refrigerante 350 ml",
    price: 8,
  },
  {
    code: 2002,
    product: "Água 500 ml",
    price: 5,
  },
  {
    code: 2003,
    product: "Suco 350 ml",
    price: 7,
  },
  {
    code: 3001,
    product: "Sorvete 300 ml",
    price: 15,
  },
  {
    code: 3002,
    product: "Sobremesa doce SMACH ARRAY",
    price: 50,
  },
];

let sectionNewOrder = document.querySelector(".active");
let sectionRegisterProduct = document.querySelector(".inactive");
let btnNewOrder = document.querySelector(".newOrder");
let selectType = document.querySelector("#selectType");
let body = document.querySelector("#tableBody");
let trImage = document.querySelector(".imgBasket-0");

let inputRadio = document.getElementsByName("options");
let inputSearchProduct = document.querySelector("#inputSearch");
let btnSearch = document.querySelector(".search");
let inputQty = document.querySelector("#qty");
let inputProduct = document.querySelector("#product");
let inputPrice = document.querySelector("#price");
let btnAdd = document.querySelector("#add");
let tableBody = document.querySelector(".tableBody");
let tableFooter = document.querySelector(".tableFooter");
let trDefaultImage = document.querySelector(".imgBasket");
let btnCancel = document.querySelector("#cancel");
let btnSave = document.querySelector("#save");

let objectProduct = undefined;
let arrayMultiply = [];
let arrayItemsOrder = [];
let arrayOrders = [];
let numberOrder = 10000;
let sum = 0;

let newOrder = () => {
  arrayItemsOrder = [];
  sum = 0;
  sectionNewOrder.setAttribute("class", "inactive");
  sectionRegisterProduct.setAttribute("class", "active main");
};

let consumptionType = () => {
  for (i = 0; i < inputRadio.length; i++) {
    if (inputRadio[i].checked) {
      return inputRadio[i].value;
    }
  }
};

let valueInputSearch = () => {
  let valueInputSearchProduct = inputSearchProduct.value;
  objectProduct = menu.find(
    (product) => product.code == valueInputSearchProduct
  );

  if (objectProduct !== undefined) {
    inputProduct.setAttribute("placeholder", `${objectProduct.product}`);
    inputPrice.setAttribute(
      "placeholder",
      `${objectProduct.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`
    );
  } else {
    alert("Código inválido");
  }
};

let addProduct = () => {
  let valueInputQty = inputQty.value;
  let multiply = valueInputQty * objectProduct.price;
  arrayMultiply.push(multiply);
  sum = total();

  trDefaultImage.setAttribute("class", "inactive");

  cleanForm();
  arrayItemsOrder.push({
    code: objectProduct.code,
    product: objectProduct.product,
    qty: valueInputQty,
    price: multiply,
  });

  tableBody.innerHTML += `<tr>
                          <td>${objectProduct.code}</td>
                          <td>${objectProduct.product}</td>
                          <td>${valueInputQty}</td>
                          <td>${multiply.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}</td>
                          </tr>`;
  tableFooter.innerHTML = `TOTAL DO PEDIDO: <span>${sum.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  )}</span>`;

  tableBody.setAttribute("class", "tableBody active");
  tableFooter.setAttribute("class", "tableFooter active");
};

let total = () => {
  return arrayMultiply.reduce((inicial, atual) => inicial + atual, 0);
};

let cleanForm = () => {
  inputProduct.setAttribute("placeholder", "Nome do produto");
  inputPrice.setAttribute("placeholder", "R$00.00");
  inputSearchProduct.value = "";
  inputQty.value = "";
};

let cancelOrder = () => {
  tableBody.innerHTML = "";
  arrayItemsOrder = [];
  arrayMultiply = [];
  tableBody.setAttribute("class", "inactive");
  trDefaultImage.setAttribute("class", "imageBasket active");
  tableFooter.setAttribute("class", "inactive");
};

let saveOrder = () => {
  numberOrder += 1;
  arrayOrders.push({
    numberOrder: numberOrder,
    items: arrayItemsOrder,
    type: consumptionType(),
    total: total(),
    status: "Recebido",
  });

  sectionRegisterProduct.setAttribute("class", "inactive");
  sectionNewOrder.setAttribute("class", "active main");

  showOrders();
  cancelOrder();
};

let showOrders = () => {
  trImage.setAttribute("class", "inactive");
  arrayOrders.forEach((element) => {
    let row = `<tr id="order-${element.numberOrder}"> </tr>`;
    let qtyColumn = "";
    let columns = "";
    body.innerHTML += row;
    element.items.forEach((item, index) => {
      if (index === 0) {
        columns = `<td>${element.type}</td>
        <td>${element.total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}</td>
        <td>${element.status}</td>`;
        qtyColumn = qtyColumn + `<td>${item.qty} - ${item.product}`;
      } else if (index !== element.items.length - 1) {
        qtyColumn = qtyColumn + `${item.qty} - ${item.product}`;
      } else {
        qtyColumn = qtyColumn + `${item.qty} - ${item.product} </td>`;
      }
    });
    let idTr = document.getElementById(`order-${element.numberOrder}`);
    idTr.innerHTML = numberOrder + qtyColumn + columns;
  });
};

let updateSelect = () => {
  let opValue = selectType.options[selectType.selectedIndex];
  let value = opValue.value;
  console.log(value);
};

btnNewOrder.addEventListener("click", newOrder);
btnSearch.addEventListener("click", valueInputSearch);
btnAdd.addEventListener("click", addProduct);
btnCancel.addEventListener("click", cancelOrder);
btnSave.addEventListener("click", saveOrder);
selectType.addEventListener("change", updateSelect);
