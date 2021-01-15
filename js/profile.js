
    
    if (SessionRead()==null)
    {  
   
   window.location = "./login.html";
   AlertSessionEmpty();
    }
    else{

    }

    $(document).ready(function () {



})




function AlertSessionEmpty() {
    if (!$(".alert-box").length) {
        $(
            '<div class="alert-box success" ><div>Giriş yapmanız için yönlendiriliyorsunuz. </div></div>'
        )
            .prependTo("body")
            .delay(3000)
            .fadeOut(1000, function () {
                $(".alert-box").remove();
            });
    }
}