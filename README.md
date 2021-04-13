# CookieRazzi : A Cookie Concent Management Plateform (CMP)

## How to use

```html
<link rel="stylesheet" href="cookierazzi.css">
<script src="cookierazzi.js"></script>
<script type="">
    var cmp = new cookieRazzi;

    cmp.setSeed(2); 
    cmp.setText({title : 'Cookie policy'});
    cmp.updateConsent('necessary', {title: "Lorem ipsum"});
    cmp.addConsent( 'tracking' : {
        disabled : false,
        value : true,
        icon : "https://www.google.com/s2/favicons?domain=analytics.google.com",
        title : "",
        text :  "Description",
        callback: function(consentValue){
            //...
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        cmp.init();
    });
</script>

<script type="text/plain" cookie-consent="targeting">
    console.log('Eval script text/plain if consent');
</script>
```

## Customise sentences

### Texts parameters

| key | Default Sentences (string) |
| -----:  | ----- |
| title | "Nous respectons votre vie privée" |
| intro | "Nous utilisons des cookies pour améliorer et personnaliser votre expérience." |
| desc | "Vous pouvez à tout moment revenir sur vos choix en utilisant le lien « paramétrer les cookies sur ce site » disponible dans notre politique de confidentialité" |
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
| setSeed() | string | Change the seed if consents are added or modified to reset the cookie |
| setText() | object | Customise popup sentences |
| addConsent() | (string,object) | Add consent with a named key and object with its value |
| updateConsent() | (string,object) | Update consent with the named key of the consent to be updated and an object containing the new values |

## Consents

| key | Type | Description |
| -----:  | ----- | ----- |
| disabled | bool | Disabled the checkbox of the consent |
| value | bool | Default value of the consent |
| icon | url, base64 image, false | For better acceptance, accompany the consent with an icon. (16x16) |
| title | string | Title of the consent |
| text | string | Description of the consent |
| callback | function | Function used if consent is approved |

## Toggle popup

In order to open the popup again, add the class ```show-cmp``` on a link, button, or other. When clicked, the popup will appear.

```html
<a href="#" class="show-cmp">Manage cookies</a>
```

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
<script src="cookierazzi.js" type=""></script>
<script>
    var cmp = new cookieRazzi;
    cmp.addConsent('tracking', {
        disabled : false,
        value : true,
        icon : "https://www.google.com/s2/favicons?domain=analytics.google.com",
        title : "Tracking",
        text :  "Description",
        callback: function(consentValue){
            updateConsent(consentValue, consentValue)
        }
    });
    document.addEventListener("DOMContentLoaded", function() {
        cmp.init();
    });
</script>
```