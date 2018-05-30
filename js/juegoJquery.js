{
    let $cCheck;
    let $cPintar;
    let $juegoDiv;
    let $mensajeG;
    let contadorLinea;

    let removeEventIntento = function () {
        $cPintar.off("click");
    }

    let nuevoIntento = function () {
        removeEventIntento();

        let contenido = "<div class='intento intento" + contadorLinea + "'>"

        contenido +="<div id='csPintar'>";

        for (let i = 0; i < 4; i++) {
            contenido += "<div class='cPintar cPintar" + contadorLinea + "' coloreado='false'></div>";
        }

        contenido += "</div> <div id='csCheck'>";

        for (let i = 0; i < 4; i++) {
            contenido += "<div class='cCheck cCheck" + contadorLinea + "'></div>";
        }

        contenido += "</div> </div>";

        $juegoDiv.append(contenido);

        $cPintar = $(".cPintar" + contadorLinea).click(removeColor);

        $cCheck = $(".cCheck" + contadorLinea);

        contadorLinea++;
    }

    let removeColor = function () {
        $(this).css("backgroundColor", "transparent").attr('coloreado', 'false');
    }

    let nuevoC = function () {
        let $cSin = getcSin();
        $cSin.attr('coloreado', 'true').css('backgroundColor', this.id);
    }
    let getcSin = function(){
       return $("[coloreado='false']:first"); 
    }

    let getTexto = function(id){
        switch (id) {
            case  'rgb(255, 0, 0)':
                id='red';
                break;
            case  'rgb(255, 255, 255)':
                id='white';
                break;
            case  'rgb(0, 0, 0)':
                id='black';
                break;
            case  'rgb(255, 255, 0)':
                id='yellow';
                break;
            case  'orange':
                id='orange';
                break;
            case  'brown':
                id='brown';
                break;
            case  'rgb(0, 0, 255)':
                id='blue';
                break;
            case  'rgb(0, 128, 0)':
                id='green';
                break;
        }
        return id;
    }

    let checkear = function () {
        let coloresCheckear = [];
        let contador2 = 0;

        $cPintar.each(function (indice, c) {
            if (getcSin().length==0)
                coloresCheckear.push(getTexto(c.style.backgroundColor));
        });
        if (coloresCheckear.length >= 4) {
            objetoC = mastermind.checkear(coloresCheckear);
            if (objetoC.negra > 0) {
                while (contador2 < objetoC.negra) {
                    $cCheck[contador2].style.backgroundColor = "black";
                    contador2++;
                }
            }

            if (contador2 == 4) {
                $mensajeG.dialog("open");
                return;
            }

            if (objetoC.blanca > 0) {
                for (let i = 0; i < objetoC.blanca; i++) {
                    $cCheck[contador2].style.backgroundColor = "white";
                    contador2++;
                }
                contador2 = 0;
            }

            if (contador2 != 4) {
                nuevoIntento();
            }

            $juegoDiv.scrollTop(0,0);

        }

    }

    $(function () {
        mastermind.init();
        mastermind.verPorConsola();

        contadorLinea = 0;

        $cPintar = $(".cPintar");
        $cCheck = $(".cCheck");

        $juegoDiv = $("#juego");
        $mensajeG = $("#mensaje");

        $mensajeG.dialog({
            modal: true,
            closeOnEscape: false,
            autoOpen: false,
            open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); },
            buttons: {
                "Reiniciar": function () {
                    $(this).dialog("close");
                    setTimeout(function () {
                        window.location.reload();
                    }, 500)

                },
                "Salir": function () {
                    window.close();
                }
            }
        });
        $(".C").click(nuevoC);

        $("#check").click(checkear);

        nuevoIntento();
    })
}