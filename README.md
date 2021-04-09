# CookieRazzi : A Cookie Concent Management Plateform (CMP)

## How to use

```html
<link rel="stylesheet" href="cookierazzi.css">
<script src="cookierazzi.js"></script>
<script type="">
    var cmp = new cookieRazzi;

    cmp.setSeed(2); 
    cmp.setText({title : 'Cookie policy'});
    cmp.addConsent({
        'tracking' : {
            forced : false,
            value : true,
            icon : "https://www.google.com/s2/favicons?domain=analytics.google.com",
            title : "",
            text :  "Description",
            callback: function(consentValue){ 
                //...
            }
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        cmp.init();
    });
</script>
```

## Customise sentences

### Texts parameters

| key | Default Sentences (string) |
| -----:  | ----- |
| title | "Nous respectons votre vie privée" |
| intro | "Nous utilisons des cookies pour améliorer et personnaliser votre expérience." |
| desc | "Vous pouvez à tout moment revenir sur vos choix en utilisant le lien « paramétrer les cookies sur ce site » disponible dans notre | |politique |e gestion des cookies." |
| accept | "Je valide" |
| reject_all | "Non merci" |
| accept_all | "J'accepte tout" |

## Methods

| Method | Type | Description |
| -----:  | ----- | ----- |
| init() | | Initialize the CMP |
| debug() | | Log settings and CMP cookie |
| showPopup() | | Show CMP popup |
| hidePopup() | | Hide CMP Popup |
| setSeed() | string | optional. Change the seed if consents are added or modified |
| setText() | object | Customise popup sentences |
| addConsent() | object | Add consent |

## Consents

| key | Type | Description |
| -----:  | ----- | ----- |
| forced | bool |  |
| value | bool |  |
| icon | url, base64 image, false |  |
| title | string |  |
| text | string |   |
| callback | function |  |

## Example : Gtag setup

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-X"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        wait_for_update: 1000 // ms
    });
    
    gtag("set", "ads_data_redaction", true);
    gtag('js', new Date());
    gtag('config', 'UA-XXXXX-X');
    
    function updateConsent(ad_storage, analytics_storage) {
        gtag("consent", "update", {
            analytics_storage: analytics_storage ? "granted" : "denied"
        });
    }
</script>
```

```html
<link rel="stylesheet" type="text/css" href="cookierazzi.css"/>
<script src="cookierazzi.js"></script>
<script>
    var cmp = new cookieRazzi;
    cmp.addConsent({
        'tracking' : {
            forced : false,
            value : true,
            icon : "https://www.google.com/s2/favicons?domain=analytics.google.com",
            title : "Tracking",
            text :  "Description",
            callback: function(consentValue){
                updateConsent(consentValue, consentValue)
            }
        }
    });
    document.addEventListener("DOMContentLoaded", function() {
        cmp.init();
    });
</script>
```