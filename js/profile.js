$(document).ready(function () {
    
    if (SessionRead()==null)
    {  
    AlertSessionEmpty();
   setTimeout(function () { window.location = "../login.html"; }, 3000);
    }
    else{

    }





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