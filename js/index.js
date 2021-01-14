$(document).ready(function () {

    welcomeAlert();

    function welcomeAlert() {
        
        var sess = SessionRead();
        
        (sess != null) ? AlertWelcome(sess + " Hoş geldin!") : false;
    }

})

