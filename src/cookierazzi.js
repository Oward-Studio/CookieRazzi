// IE11 Foreah babel transpile polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

class cookieRazzi {
  constructor() {
    this.initiated = false; 
    this.popup; 
    this.popupDisplayed = false;
    this.cname = "cmp";

    // Si true, définit le cookies sur le domain de premier niveau
    // this.tld = true;

    // Changer cette valeur lorsque la politique de confidentialité évolue
    // afin de réinitialiser l'affichage de la popup pour tous les utilisateurs
    this.seed = 1; 

    this.text = {
      title : "Nous respectons votre vie privée",
      intro : "Nous utilisons des cookies pour améliorer et personnaliser votre expérience.",
      desc : "Vous pouvez à tout moment revenir sur vos choix en utilisant le lien « paramétrer les cookies sur ce site » disponible dans notre politique de gestion des cookies.",
      accept : "Je valide",
      reject_all : "Non merci",
      accept_all : "J'accepte tout",
    }

    this.consents = {
      necessary : {
        disabled : true,
        value : true,
        icon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAJUWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wNC0wOFQxNjowNjoyMSswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNC0wOFQxNjoxNzowNSswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDQtMDhUMTY6MTc6MDUrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxZDgyOTMyLTYwZTYtNzA0Yi1hYzMyLTI5ODYyODhhYWRmMSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmExMjUxYWU4LTYwYWItYzM0Mi04MDA5LWU0Y2QxMTJlOGMyNCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjQ0ZjE2ODk2LTI3MzYtZDQ0NS1hNGQ0LWY3MTQxMmJmZWQxMyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NDRmMTY4OTYtMjczNi1kNDQ1LWE0ZDQtZjcxNDEyYmZlZDEzIiBzdEV2dDp3aGVuPSIyMDIxLTA0LTA4VDE2OjA2OjIxKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjg4YTg5MTQ0LTVjY2EtYjU0NS1hMDQ2LTQyNjZmY2FmOWNiOCIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0wOFQxNjoxNyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4YzYwZjNiMS1kOTQwLTM2NGYtYmMxMi1lZTUxYzVjNjgwZTUiIHN0RXZ0OndoZW49IjIwMjEtMDQtMDhUMTY6MTc6MDUrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTFkODI5MzItNjBlNi03MDRiLWFjMzItMjk4NjI4OGFhZGYxIiBzdEV2dDp3aGVuPSIyMDIxLTA0LTA4VDE2OjE3OjA1KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhjNjBmM2IxLWQ5NDAtMzY0Zi1iYzEyLWVlNTFjNWM2ODBlNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NGYxNjg5Ni0yNzM2LWQ0NDUtYTRkNC1mNzE0MTJiZmVkMTMiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0NGYxNjg5Ni0yNzM2LWQ0NDUtYTRkNC1mNzE0MTJiZmVkMTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6/fS8rAAAAvklEQVQ4y62TsQ3EIAxFKa5FV1y6SFezDAtkjKRKRoGWIWhPaVKRleJIH8myTHEixZPAfIz9AeO9Nw0icYDY0vGJJTbCYf5ja3XsoLEywR3YiZk4iUwkliAhdkKz1yRVsBILxh9iVModsWagXXkCh+yD2PQCPDZA66QHmZ38RtkFJMRqJZl7EGGS7Hli80lZv/cEg2uSZRfFg6K0czySIPS2oJloFRNty8RHrlE+pO+/D6n7KXd/Jo3AvnNo6S4AYiReJHwqjgAAAABJRU5ErkJggg==",
        title : "Strictement nécessaires",
        text :  "Il s'agit de cookies nécessaires au fonctionnement de la plateforme et de notre entreprise. Ils vous permettent de vous connecter et de rester connecté au site. Grâce à ces cookies, nous pouvons également mesurer anonymement le trafic du site et assurer sa sécurité. Sans cette technologie, nos services ne pourraient pas fonctionner convenablement et/ou nous ne serions pas en mesure de vous proposer certaines fonctionnalités.",
        callback: false
      },
    }

  }

  addConsent(consentKey,newConsent){
    if(this.initiated) return;

    let consentKeyCleaned = consentKey.toLowerCase();
    if(typeof(consentKeyCleaned) === 'string' && typeof(newConsent) === 'object'){
      Object.assign(this.consents, { [consentKeyCleaned] : newConsent });
    }
  }

  updateConsent(consentKey,newValues){
    if(this.initiated) return;

    let consentKeyCleaned = consentKey.toLowerCase();
    if(typeof(consentKeyCleaned) === 'string' && typeof(newValues) === 'object'){
      this.consents[consentKeyCleaned] = {...this.consents[consentKeyCleaned], ...newValues}
    }
  }

  // getDomain(){
  //   if(this.tld){
  //     return window.location.hostname.split('.').slice(-2).join('.');
  //   }
  //   return window.location.hostname;
  // }

  // getDomainRef(){
  //   return this.tld ? this.getDomain().substring(0,3) : window.location.hostname.substring(0,1) + '_' + this.getDomain().substring(0,3);
  // }

  stringToSlug(str){
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  // public methods
  setSeed(seed){
    this.seed = seed;
    
  }

  setText(newText){
    this.text = Object.assign({}, this.text, newText);
    
  }

  debug(){
    var debug = {
      "Consents": this.consents,
      "Cookie": this.getCookie(),
      "Seed": this.seed,
      // "TLD": this.tld,
      "Popup": this.popup,
      "Texts": this.text,
      // "DomainRef": this.getDomainRef(),
    }
    console.log(debug);
  }

  // setTld(value){
  //   this.tld = !!value;
  // }

  getCookie() {
    let cookie = {};
    document.cookie.split(';').forEach(el => {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    });
    if(cookie[this.cname]){
      return JSON.parse(cookie[this.cname]);
    }
    return false;
  }

  setCookie(data){
    let expires = new Date();
    if(data == ''){
      expires.setMonth( expires.getMonth() - 1 );
    }else{
      expires.setMonth( expires.getMonth() + 1 );
    }
    document.cookie = this.cname+"="+data+"; path=/; expires="+expires.toGMTString()+"; Secure";
  }

  init(forceShow){
    this.initiated = true;
    const cookie = this.getCookie();

    this.setPopup();
    
    // Si le seed est présent dans la cookie et qu'il est identique à l'instance
    if(!!cookie.seed && cookie.seed == this.seed){
      this.setUserConsents();
    }else{
      // Sinon on vide le cookie
      this.setCookie('');
    }
    
    // On lance les callbacks à l'init si le cookie existe
    for (var key in this.consents) {

      this.evalScript(key);

      if(typeof(this.consents[key].callback) == 'function'){
        // Si il n'y a pas de cookie de définit, la valeur par default transmise au callback est false
        let consentValue = false;
        if(cookie && cookie.userConsents[key]){
          consentValue = cookie.userConsents[key];
        }
        this.consents[key].callback(consentValue);
      }
    }

    // Si la popup n'a jamais été affichée ou qu'on la force
    if(!cookie.popupDisplayed || forceShow){
      this.showPopup();
    }

    this.setPopupDisplayedTime(cookie);

    // Permet ré-afficher la popup simplement
    const popupBtn = document.querySelectorAll('.show-' + this.cname);
    popupBtn.forEach((el) => {
      el.addEventListener('click',(e) => {
        e.preventDefault();
        this.showPopup() 
      });
    });
  }



  setPopupDisplayedTime(cookie){
    if(!!cookie.popupDisplayed){
      this.popupDisplayed = cookie.popupDisplayed;
    }else{
      this.popupDisplayed = new Date();
    }
  }

  evalScript(consentKey){
    const consentScripts = document.querySelectorAll('[cookie-consent="'+consentKey+'"]');

    consentScripts.forEach(el => {
      let data = (el.text || el.textContent || el.innerHTML || "" ),
          s = document.getElementsByTagName("script")[0],
          b = document.createElement("script");

      b.type = "text/javascript";b.async = true;
      try {
          // doesn't work on ie...
          b.appendChild(document.createTextNode(data));      
      } catch(e) {
          // IE has funky script nodes
          b.text = data;
      }
      s.parentNode.insertBefore(b, s);

      // el.remove(); // IE11 not compatible
      el.parentNode.removeChild(el);
    });
  }

  getData(){
    const data = {
      'seed' : this.seed,
      'popupDisplayed' : this.popupDisplayed,
      'userConsents': this.getUserConsents()
    }
    return JSON.stringify(data);
  }

  setUserConsents(){
    let cookie = this.getCookie();
    if(cookie.userConsents){
      let consents = cookie.userConsents;
      for (var key in consents) {
        if(!!document.getElementById(key)){
          document.getElementById(key).checked = consents[key];
        }
      }
    }
  }

  getUserConsents(){
    const form = document.getElementById("cmp_"+this.seed);
    var consentsChoosed = {};
    var field = [];
    if (!!form && typeof form === 'object' && form.nodeName === "FORM") {
      var len = form.elements.length;
      for (var i=0; i<len; i++) {
        field = form.elements[i];
        if (field.type == 'checkbox' && field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
          consentsChoosed[encodeURIComponent(field.name)] = field.checked;

          this.evalScript(field.name);

          if(this.consents[field.name].callback != undefined){
            this.consents[field.name].callback(field.checked);
          }
        }
      }
    }
	  return consentsChoosed;
  }

  setPopup(){
    if(document.getElementById("cmp_"+this.seed)){}

    let popup = this.popup;
    let consents = this.consents;
    let contentHtml = '';
    let consentToChooseCount = 0;

    contentHtml = `
      <div class="cmp-box">
      <p class="cmp-title">${this.text.title}</p>`;
      if(this.text.intro && this.text.intro != ''){contentHtml += `<p>${this.text.intro}</p>`;}
      if(this.text.desc && this.text.desc != ''){contentHtml += `<p>${this.text.desc}</p>`;}
    contentHtml += `<div class="cmp-list">`;

    for (var key in consents) {
      if (!consents.hasOwnProperty(key)) continue;
      let consent = consents[key];
      contentHtml += `<div class="cmp-consent"><div class="cmp-label">`;
      if(consent.icon){
        contentHtml += `<img src="${consent.icon}" width="16" height="16">`;
      }
      contentHtml += `
          <label>
            <input type="checkbox" name="${ this.stringToSlug(key) }" id="${ this.stringToSlug(key) }" ${ consent.disabled ? 'required disabled' : ''} ${consent.value ? 'checked' : ''}>
            <span>${consent.title}</span>
          </label>
          <div class="cmp-arrow"></div>
        </div>
        <div class="cmp-desc">
          <p>${consent.text}</p>
        </div>
      </div>`;

      if(!consent.disabled) consentToChooseCount++;
    }
    contentHtml += `</div>`; // .cmp-list

    contentHtml += `</div>`; // .cmp-box


    contentHtml += `<div class="cmp-btns">`;
    contentHtml += `<button class="button" id="cmp_reject_all">${this.text.reject_all}</button>`;
    contentHtml += `<button class="button" id="cmp_choose">${this.text.accept}</button>`;
    if(consentToChooseCount > 1){
      contentHtml += `<button class="button" id="cmp_accept_all">${this.text.accept_all}</button>`;
    }
    contentHtml += `</div>`;

    popup = document.createElement( "form" );
    popup.id = "cmp_"+this.seed;
    popup.classList.add("cmp");
    popup.classList.add("hidden");
    popup.innerHTML = contentHtml;
    document.body.appendChild( popup );

    
    const consentDropdown = document.querySelectorAll('.cmp-arrow');
    consentDropdown.forEach(el => {
      el.addEventListener('click', () => {
        el.closest('.cmp-consent').classList.toggle('active');
      });
    });
    
    const btnRejectAll = document.getElementById("cmp_reject_all");
    if(!!btnRejectAll){
      btnRejectAll.addEventListener('click',(e) => {
        e.preventDefault();
        
        const consents = this.consents;
        for (var key in consents) {
          if (!consents.hasOwnProperty(key)) continue;
          const consent = consents[key];
          this.setCheckbox(this.stringToSlug(key),false)
        }
        // On reset la date d'affichage de la popup
        this.popupDisplayed = new Date();
        // On créé le cookie avec les nouvelles valeur
        this.setCookie(this.getData());
        this.hidePopup();
      });
    }

    let btnChoose = document.getElementById("cmp_choose");
    if(!!btnChoose){
      btnChoose.addEventListener('click',(e) => {
        e.preventDefault();
        // On reset la date d'affichage de la popup
        this.popupDisplayed = new Date();
        // On créé le cookie avec les nouvelles valeur
        this.setCookie(this.getData());
        this.hidePopup();
      });
    }

    let btnAcceptAll = document.getElementById("cmp_accept_all");
    if(!!btnAcceptAll){
      btnAcceptAll.addEventListener('click',(e) => {
        e.preventDefault();
  
        let consents = this.consents;
        for (var key in consents) {
          if (!consents.hasOwnProperty(key)) continue;
          let consent = consents[key];
          this.setCheckbox(this.stringToSlug(key),true)
        }
        // On reset la date d'affichage de la popup
        this.popupDisplayed = new Date();
        // On créé le cookie avec les nouvelles valeur
        this.setCookie(this.getData());
        this.hidePopup();
      });
    }
  }

  setCheckbox(id,value){
    const checkbox = document.getElementById(id);
    if(!checkbox.disabled){
      checkbox.checked = !!value;
    }
    
  }

  showPopup(){
    document.getElementById("cmp_"+this.seed).classList.remove('hidden');
    
  }
  
  hidePopup(){
    document.getElementById("cmp_"+this.seed).classList.add('hidden');
    
  }
}

// export default cookieRazzi;
