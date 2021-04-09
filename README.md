# CookieRazzi : A Cookie Concent Management Plateform (CMP)

## How to use

```html
<link rel="stylesheet" href="../dist/cookierazzi.css">
<script src="../dist/cookierazzi.js"></script>
<script type="">
    var cmp = new cookieRazzi;
    cmp.setSeed(2); // optional. Change the seed if consents are added or modified
    cmp.addConsent({
        'tracking' : {
            forced : false,
            value : true,
            icon : "https://www.google.com/s2/favicons?domain=analytics.google.com",
            title : "Suivi statistique et performance",
            text :  "Ces cookies sont utilisés pour collecter des informations permettant d'analyser le trafic sur notre site et la manière dont les visiteurs utilisent notre site. Par exemple, ces cookies peuvent suivre des choses telles que le temps que vous passez sur le site Web ou les pages que vous visitez, ce qui nous aide à comprendre comment nous pouvons améliorer notre site Web pour vous. Les informations collectées via ces cookies de suivi et de performance n' identifient aucun visiteur en particulier.",
            callback: function(consentValue){ 
                //...
            }
        }
    })
    document.addEventListener("DOMContentLoaded", function() {
        cmp.init();
    });
</script>
```