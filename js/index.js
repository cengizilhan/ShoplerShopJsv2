$(document).ready(function () {

    welcomeAlert();

    function welcomeAlert() {
        
        var sess = SessionRead();
        
        (sess != null) ? AlertWelcome(sess + " Hoş geldin!") : false;
    }

})


function NotBarFill() {
    var NotInt;
    NotInt = NotBarUpdater();
    htmlitem = `<span class="NotBar" id="hi">${NotInt}</span>`;
    var AppendSelector = $(".NotBarContainer");
    $(AppendSelector).empty();

    if (NotInt > 0) {


      $(htmlitem).appendTo('.NotBarContainer');
      $(".NotBar").addClass('flash');
      setTimeout(function () {
        $('.NotBar').removeClass('flash');
      }, 1000);
    }
    else {

    }

  }

  flag = 0;
  $(document).ready(function () {
    $(".checkboxicon").click(function () {


 


      if (flag == 0) {
        //alert("1");
        flag = 1;
        $(".verticalNavigation ul .categoryLi").css("display", "flow-root");
      }
      else if (flag == 1) {

        flag = 0;
        $(".verticalNavigation ul .categoryLi").css("display", "none");
      }

    });

  });


  $(document).ready(function () {
    $(".LoginCont").mouseover(function () {
      $(".loginLi").addClass("displaytest");
      setTimeout(function () { $(".loginLi").removeClass("displaytest"); }, 3000);

    });





  });


  $(document).on("click", ".addBasket", function () {
    var selectedItem = $(this).data('title');

    $.get("./js/products.json", function (data) {

      AddBasket(data[selectedItem - 1]);
      swal("Ürün sepete eklendi!", {
        buttons: {
          cancel: "Alışverişe devam et!",
          catch: {
            text: "Sepete git!",
            value: "sepet",
          },
          defeat:false,
        },
      })
      .then((value) => {
        switch (value) {
       
          case "sepet":
          window.location.href = "./basket.html";
      
            break;
       
       
        
        }
      });
      NotBarFill();



    });

  })


  $(document).on("click", ".owl-1 :not(.owl-dots)", function (e) {
    //var selectedItem = $(this).data('title');
    var selectedItem = $(this).parent().data('title');
  
    /*
    
    $(".server").on('click', ':not(.delete-server)', function (e) {
         e.stopPropagation()
         // Show edit dialog
    });*/

    //if ((state != 10) && (state != 15)
    if (($(e.target).is('span')) || ($(e.target).is('button'))) {


    } else {
    
     
      window.location.href = './productDetail.html?ProductId=' + selectedItem + '';
    }






  });

  function ProductFilter() {

    $.get("js/products.json", function (data) {

      var urlstring = window.location.href;
      var categoryParse = urlstring.substr(urlstring.indexOf("=") + 1, 1);
      var appendItem = $(".ShopItemsContainer");



      if (urlstring.indexOf("category") != -1) {

        for (i = 0; i < data.length; i++) {
          if (data[i].category_id == categoryParse) {
            
            var imageArr = data[i].image.split(",");
            var htmlItemOldie = '<div class="ShopItems" ><div class="ShopItem" data-title="' + data[i].id + '" style="background: url(' + imageArr[0] +
              ');background-size:150px 200px;"></div> ' + data[i].title + ' <p><b><i>' + data[i].price +
              ' TL</i></b></p><div class="addBasket"  data-title="' + data[i].id + '"><i class="fas fa-shopping-cart"></i> Add to Cart</div></div>';

              var htmlItem=`
      <div class="ShopItems">
        <div class="ShopItem" data-title="${data[i].id}">

          <div class="owl-carousel owl-1 owl-theme">
            <div class="item"><img class="ProductOwlImg" src="${imageArr[0]}"> </div>
            <div class="item"><img class="ProductOwlImg" src="${imageArr[1]}"> </div>
            <div class="item"><img class="ProductOwlImg" src="${imageArr[2]}"></div>
          </div>
      </div>
        ${data[i].title} <p><b><i>${data[i].price}TL</i></b></p>
        <div class="addBasket"  data-title="${data[i].id}" ><i class="fas fa-shopping-cart" aria-hidden="true"></i> Add to Cart
        </div>
      </div>

      `;
            $(appendItem).append(htmlItem);
            owlLoader();
          }
        }
      } /* Search */
      else if ((urlstring.indexOf("search") != -1)) {
        var brandParse = urlstring.substr(urlstring.indexOf("=") + 1);

        $('.slider').empty();
        $('.BrandNav').append(brandParse + ' aramasının sonuçları');
        $('.BrandNav').css("display", "block");

        var regex = new RegExp(brandParse, "i");
        
       filteredSearch = data.filter(x => x.brand.match(regex) || x.product_code.match(regex) || x.title.match(regex));

        var htmlitemsum = "";

        $.each(filteredSearch, function (index, value) {
          var imageArr = value.image.split(",");
          

          htmlitemsum +=`
      <div class="ShopItems">
        <div class="ShopItem" data-title="${value.id}">

          <div class="owl-carousel owl-1 owl-theme">
            <div class="item"><img class="ProductOwlImg" src="${imageArr[0]}"> </div>
            <div class="item"><img class="ProductOwlImg" src="${imageArr[1]}"> </div>
            <div class="item"><img class="ProductOwlImg" src="${imageArr[2]}"></div>
          </div>
      </div>
        ${value.title} <p><b><i>${value.price}TL</i></b></p>
        <div class="addBasket"  data-title="${value.id}" ><i class="fas fa-shopping-cart" aria-hidden="true"></i> Add to Cart
        </div>
      </div>

      `;
   
        });

        

        $(htmlitemsum).appendTo(appendItem);
        owlLoader();




      }
      else if ((urlstring.indexOf("brand") != -1)) {
        var brandParse = urlstring.substr(urlstring.indexOf("=") + 1);
        $('.slider').empty();
        $('.BrandNav').append(brandParse + ' Markasına Ait Ürünler');
        $('.BrandNav').css("display", "block");

        for (i = 0; i < data.length; i++) {
          if (data[i].brand == brandParse) {
            var imageArr = data[i].image.split(",");
            var htmlItem=`
      <div class="ShopItems">
        <div class="ShopItem" data-title="${data[i].id}">

          <div class="owl-carousel owl-1 owl-theme">
            <div class="item"><img class="ProductOwlImg" src="${imageArr[0]}"> </div>
            <div class="item"><img class="ProductOwlImg" src="${imageArr[1]}"> </div>
            <div class="item"><img class="ProductOwlImg" src="${imageArr[2]}"></div>
          </div>
      </div>
        ${data[i].title} <p><b><i>${data[i].price}TL</i></b></p>
        <div class="addBasket"  data-title="${data[i].id}" ><i class="fas fa-shopping-cart" aria-hidden="true"></i> Add to Cart
        </div>
      </div>

      `;
            $(appendItem).append(htmlItem);
            owlLoader();
          }
        }
      }
      else {

        for (i = 0; i < data.length; i++) {
          var imageArr = data[i].image.split(",");

          var htmlItem=`
      <div class="ShopItems" data-title="${data[i].id}">
        <div class="ShopItem" data-title="${data[i].id}">

          <div class="owl-carousel owl-1 owl-theme" data-title="${data[i].id}">
            <div class="item" ><img class="ProductOwlImg" data-title="${data[i].id}" src="${imageArr[0]}"> </div>
            <div class="item" ><img class="ProductOwlImg" data-title="${data[i].id}" src="${imageArr[1]}"> </div>
            <div class="item" ><img class="ProductOwlImg" data-title="${data[i].id}" src="${imageArr[2]}"></div>
          </div>
      </div>
        ${data[i].title} <p><b><i>${data[i].price}TL</i></b></p>
        <div class="addBasket"  data-title="${data[i].id}" ><i class="fas fa-shopping-cart" aria-hidden="true"></i> Add to Cart
        </div>
      </div>

      `;
          $(appendItem).append(htmlItem);
          owlLoader();


        }



      }

    });
  }

 
  function CategoryFill() {

    $.get("js/category.json", function (data) {
      var appendItem = $(".verticalNavigation ul");
      for (i = 0; i < data.length; i++) {
        var htmlItem = '<li class="categoryLi"><a  href="' + data[i].link + '">' + data[i].color + '<i class="fas fa-angle-double-right"></i></a></li>';
        $(appendItem).append(htmlItem);
      }
    });
  }