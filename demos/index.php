<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CookieRazzi Démo</title>
    <link rel="stylesheet" href="../dist/cookierazzi.css">
</head>
<body>
    <?php 
    var_dump(json_decode($_COOKIE['cmp'])->userConsents->tracking);
    ?>
    <div class="wrap" style="width: 960px; max-width:calc(100vw - 2em); margin:3rem auto; font-family: sans-serif; color:#666; font-size: 17px; line-height: 1.5;">
        <h1 class="show-cmp" style="text-align: center;">Lorem ipsum dolor</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos aut, voluptates quia sequi quod ipsam dolor possimus velit, quo mollitia consequuntur fugiat sit. Fugiat placeat labore, maxime explicabo fuga adipisci voluptates est quos veritatis modi velit tempore distinctio saepe blanditiis accusantium, ut optio cupiditate magni laudantium officia dolore unde officiis!</p>
        <p>Autem non possimus ut quae recusandae aliquam consequatur illum quam necessitatibus, facere excepturi doloribus, fugiat id nam reprehenderit modi sit, quasi minima sed ex vero reiciendis. Ullam veritatis at adipisci impedit, eveniet neque voluptas similique! Quasi saepe alias consequuntur veniam laboriosam. Eius veritatis suscipit magnam modi, ad eligendi. Quis, eos?</p>
        <p>At fugit libero corporis rem dolorum hic saepe beatae minima eligendi illo dignissimos animi sequi asperiores error aut, eaque culpa, id amet explicabo veritatis ex ab, sit architecto? Adipisci perspiciatis commodi nam, ipsum sapiente nesciunt. Blanditiis delectus, ut accusamus facere quae libero quibusdam dignissimos aliquid adipisci dolore exercitationem sit corporis.</p>
        <p>Quasi ea facere labore sint ab in excepturi accusantium quaerat culpa aliquid officia nulla eligendi dolor ipsum harum non porro praesentium ipsam quo rem amet, quibusdam veniam architecto maiores. Quibusdam cupiditate nam ut expedita dolore quaerat, perferendis sint asperiores eligendi ea quo porro autem eius saepe recusandae maxime ipsam. Eos?</p>
        <p>Officiis vel cupiditate ipsa suscipit? Placeat neque laborum sapiente, assumenda atque blanditiis, praesentium reiciendis numquam commodi veniam autem eum voluptatibus nobis fugit? Sint doloremque nisi tempora at voluptatem numquam quasi delectus dignissimos consequuntur, perspiciatis minima nihil consequatur necessitatibus? Rem ad quo ea maxime, illum ipsa officiis tenetur iure quia cumque.</p>
        <p>Consequuntur aspernatur veritatis repellendus quia error repudiandae, minima totam quis eum porro adipisci sint cum non suscipit molestiae doloremque optio eveniet commodi ad voluptate dolore aperiam mollitia recusandae. Nam repellendus beatae porro facere minima! Ipsam fugit laboriosam ducimus ratione iste ab placeat modi repudiandae, nostrum deleniti quam tempore, eveniet rerum!</p>
        <p>Ullam mollitia perspiciatis, eaque eius odit architecto reprehenderit maiores ipsum porro delectus blanditiis sint dignissimos a neque. Unde laboriosam tempora facere? Doloremque ducimus sint aspernatur a cumque accusantium voluptatem velit placeat, eaque cupiditate numquam ullam autem vel voluptates, veritatis eum! Delectus aliquid magnam blanditiis quam! Sint commodi ducimus doloremque repudiandae!</p>
        <p>Ad unde cumque inventore sequi, vitae perspiciatis reprehenderit corrupti maxime asperiores accusantium corporis consequuntur. Sed saepe eaque veritatis quis odio, cupiditate deserunt cumque molestias optio quidem hic fuga quaerat asperiores aspernatur rem ipsam! Doloribus autem tempora alias incidunt dolorem sequi, corporis mollitia non nisi assumenda dicta vero quo dignissimos commodi.</p>
        <p>Impedit debitis suscipit alias culpa tenetur doloremque doloribus nemo ullam aspernatur earum provident minus fuga, consequuntur quas cupiditate, dicta accusamus, ducimus dolorum consectetur! Voluptatibus animi obcaecati fugiat pariatur! Odit minima veniam reiciendis recusandae quia laborum doloribus libero repellat nam nobis, corporis nostrum officia perferendis ducimus eum voluptatibus sit soluta quasi?</p>
        <p>Autem aliquid fugit cupiditate sunt! Quo sapiente dolor officiis nihil ipsum aspernatur, accusamus, doloremque dolores voluptas cupiditate maxime et ab, qui non laudantium corporis praesentium nobis? Ipsam consequatur magni illum animi velit iste culpa consequuntur magnam voluptas. Ex nobis excepturi eveniet placeat soluta delectus quae, voluptatem, dolorum rerum, provident cupiditate.</p>
    </div>
    <script src="../dist/cookierazzi.js"></script>
    <script type="text/javascript">
        var cmp = new cookieRazzi;
        cmp.setSeed('123456789');
        cmp.setText({
            title : 'test'
        });
        cmp.updateConsent('necessary', {disabled: true, value: true});
        cmp.addConsent('tracking', {
                disabled : false,
                value : true,
                icon : "https://www.google.com/s2/favicons?domain=analytics.google.com",
                title : "Tracking and Performance",
                text :  "Ces cookies sont utilisés pour collecter anonymement des informations permettant d'analyser le trafic sur notre site et la manière dont les visiteurs naviguent. Par exemple, ces cookies peuvent déterminer le temps que vous passez sur le site ou les pages que vous visitez, ce qui nous aide à comprendre comment nous pouvons améliorer votre expérience. Les informations collectées via ces cookies de suivi et de performance n' identifient aucun visiteur en particulier.",
                callback: function(consentValue){
                    console.log('Consent tracking : '+consentValue);
                }
            }
        );
        cmp.addConsent('targeting', {
                disabled : false,
                value : true,
                icon : "https://www.google.com/s2/favicons?domain=analytics.google.com",
                title : "Targeting and Advertising",
                text :  "Nous utilisons des cookies et d'autres technologies de suivi pour améliorer votre expérience de navigation sur notre site, pour vous montrer un contenu personnalisé et des publicités ciblées, pour analyser le trafic de notre site et pour comprendre la provenance de nos visiteurs.",
            }
        );
        document.addEventListener("DOMContentLoaded", function() {
            cmp.init();
        });
    </script>


<script type="text/plain" cookie-consent="targeting">
    console.log('Consent targeting : true. Active inline script text/plain to text/javascript');
</script>

</body>
</html>