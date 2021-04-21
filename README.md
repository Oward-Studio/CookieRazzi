# CookieRazzi : A Cookie Concent Management Plateform (CMP)

![CookieRazzi](https://gitlab.com/Eonalias/cookierazzi/-/raw/main/src/cover.png)

![Support IE11](https://shields.io/badge/Browser%20support-Modern%20%26%20IE11-green) ![npm](https://img.shields.io/npm/dw/cookierazzi) ![NPM](https://img.shields.io/npm/l/cookierazzi)

## Features

- Written in vanilla javascript, no dependencies needed
- Clean UI with some customisable style (CSS custom properties)
- Change the markup of RGPD-sensitive JavaScript script tags to run only if the user has given consent.
- The expiration time of the cookie storing user consent preferences is configurable. By default it is one month.

## How to use

```html
<link rel="stylesheet" href="cookierazzi.css">
<script src="cookierazzi.js"></script>
<script type="text/javascript">
    var cmp = new cookieRazzi;

    cmp.setExpire(2);
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

<script type="text/plain" cookie-consent="tracking">
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
| reject_all | "Tout refuser" |
| accept | "Valider la sélection" |
| accept_all | "J'accepte tout" |

## Methods

| Method | Type | Description |
| -----:  | ----- | ----- |
| init() | | Initialize the CMP |
| debug() | | Log settings and CMP cookie |
| showPopup() | | Show CMP popup |
| hidePopup() | | Hide CMP Popup |
| setSeed() | string | Change the seed if consents are added or modified to reset the cookie |
| setExpire() | int | Set the expiration time for the cookie that retains user consent preferences. By default it is one month. |
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

## Customise

the CMP can be customised using a few CSS variables. Here are the default values:

```css
:root{
	--cmp-sun-color: #fff6a2;
	--cmp-btn-bg-hover: #fff6a2;
	--cmp-btn-color-hover: #333333;
	--cmp-radius: 8px;
}
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

------------------

## Legal information

[Visuel de Cookie créé par freepik - fr.freepik.com](https://fr.freepik.com/vecteurs/fond)