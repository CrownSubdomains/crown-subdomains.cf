// --- Config --- //
var purecookieTitle = "Do you like Cookies?"; // Title
var purecookieDesc = "Did you say yes? Well, we do too! Feeling extra hungry? Click the button below to steal some of our cookies!"; // Description
var purecookieLink = '<a href="legal">Click to View our Cookie Policy.</a>'; // Cookiepolicy link
var purecookieButton = "Grab Our Cookies & Close"; // Button text
var purecookieButtonFake = "I Don't Want Your Cookies"; // Button text
// ---        --- //


function pureFadeIn(elem, display){
  var el = document.getElementById(elem);
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .02) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
function pureFadeOut(elem){
  var el = document.getElementById(elem);
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .02) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

function cookieConsent() {
  if (!getCookie('purecookieDismiss')) {
      document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieConsentContent" id="cookieConsentContent">    <img src="https://www.flaticon.com/svg/static/icons/svg/2913/2913782.svg" style="width: 62px" /> <br /><br /><div class="cookieTitle"><a>' + purecookieTitle + '</a></div><div class="cookieDesc"><p>' + purecookieDesc + ' ' + purecookieLink + '</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">' + purecookieButton + '</a></div><div class="cookieButtonFake"><a>' + purecookieButtonFake + '</a></div></div ></div > ';
	pureFadeIn("cookieConsentContainer");
  }
}

function purecookieDismiss() {
  setCookie('purecookieDismiss','1',7);
  pureFadeOut("cookieConsentContainer");
}

window.onload = function() { cookieConsent(); };

if (localStorage.getItem('cookieSeen') != 'shown') {
    $(".cookieConsentContainer").delay(2000).fadeIn();
    localStorage.setItem('cookieSeen', 'shown')
}

$('.cookieButton').click(function (e) {
    $('.cookieConsentContainer').fadeOut();
});