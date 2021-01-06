function notifyBar() {
  if (!$(".alert-box").length) {
    $(
      '<div class="alert-box success" ><div>Ürün sepete eklendi! <a href="./basket.html">Sepete gitmek için tıklayın.</a></div></div>'
    )
      .prependTo("body")
      .delay(3000)
      .fadeOut(1000, function () {
        $(".alert-box").remove();
      });
  }
}

function NotBarUpdater() {
  var storedNames = JSON.parse(localStorage.getItem("products"));
  var pieceSum = 0;

  for (x = 0; x < storedNames.length; x++) {
    pieceSum += storedNames[x].basket_piece;
  }

  return pieceSum;
}

function PriceSum() {
  var storedNames = JSON.parse(localStorage.getItem("products"));
  var price = 0;

  for (x = 0; x < storedNames.length; x++) {
    price += storedNames[x].basket_piece * storedNames[x].price;
  }

  var data = getFromStorage("products");

  return price.toFixed(2);
}

function CountChanger(id, operation) {

  var storedNames = JSON.parse(localStorage.getItem("products"));

  var i = null;
  for (x = 0; x < storedNames.length; x++) {
    if (storedNames[x].id == id) {
      i = x;
    }
  }

  if (operation == "+") {

    storedNames[i].basket_piece++;
    localStorage.setItem("products", JSON.stringify(storedNames));


    var storedNames = JSON.parse(localStorage.getItem("products"));
  } else if (operation == "remove") {
    storedNames.splice(i, 1);

    setToStorage("products", JSON.stringify(storedNames));
  } else if (operation == "-") {
    /* burda kaldık. eksilirken 1'den 0a geçiyor. 1'de tutup silmeklazım.*/

    if (storedNames[i].basket_piece == 1) {
      storedNames.splice(i, 1);

      setToStorage("products", JSON.stringify(storedNames));
    } else {
      storedNames[i].basket_piece--;

      setToStorage("products", JSON.stringify(storedNames));
    }
  }
}




function AddBasket(pushItem) {
  if ("products" in localStorage) {
    var storedNames = JSON.parse(localStorage.getItem("products"));
    if (typeof storedNames === 'undefined' || storedNames.length > 0) {
      flag = null;
      for (i = 0; i < storedNames.length; i++) {
        if (storedNames[i].id == pushItem.id) {

          storedNames[i].basket_piece++;
          setToStorage("products", JSON.stringify(storedNames));
          flag = 1;
          break;
        }
      }
      if (flag == null) {

        storedNames.push(pushItem);
        setToStorage("products", JSON.stringify(storedNames));
      }


    }

    else {

      setToStorage("products", JSON.stringify([pushItem]));

    }
  }
  else {
    //if localstorage is null(first step)
    setToStorage("products", JSON.stringify([pushItem]));

  }
}




function setToStorage(itemKey, json) {

  localStorage.setItem(itemKey, json);



}

function getFromStorage(itemKey) { //session-localstorage-cache//
  var storedNames = JSON.parse(localStorage.getItem(itemKey));
  return storedNames;
}

function FillProductToOwl() {

  var htmlitemsum = "";
  $.get("js/products.json", function (data) {

    $.each(data, function (index, value) {
      var imageArr = value.image.split(",");

      htmlitemsum += `
<div  onclick="location.href='./productDetail.html?ProductId=${index + 1}','mywindow'" ><div class="ProdImg"   style="background: url('${imageArr[0]}');  background-size:100px 150px;" > </div>
        <div>
          <h2>${value.title}</h2> 
          <h3>${value.price}</h3>
        </div>
      </div>`;
    });


    $(htmlitemsum).appendTo('#owlcontainer');

    var owl = $('.owl-carousel');
    owl.owlCarousel({

      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      navText: ["<i class='fa fa-angle-left' ></i>", "<i class='fa fa-angle-right' ></i>"],
      nav: true,
      responsive: {
        0: {
          items: 1
        },
        // breakpoint from 600 up
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      }
    });
    $(".owl-carousel").owlCarousel();



    //$('.owl-carousel').trigger('add.owl.carousel', [htmlitemsum]);


  });




}

function CategoryNameFinder(id) {

  $.get("js/category.json", function (data) {

    $.each(data, function (index, value) {
      (id == value.ID) ? $(`<a href="${value.link}">${value.color}</a>`).appendTo('.navMap') : false;
    })

  })

}
