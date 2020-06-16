 
    var arrayPuente = [];
    $(document).ready(function() {
        createOdontogram();
        $(".click").click(function(event) {
            var control = $("#controls").children().find('.active').attr('id');
            var cuadro = $(this).find("input[name=cuadro]:hidden").val();
            console.log($(this).attr('id'))
            switch (control) {
                case "fractura":
                    if ($(this).hasClass("click-blue")) {
                        $(this).removeClass('click-blue');
                        $(this).addClass('click-red');
                    } else {
                        if ($(this).hasClass("click-red")) {
                            $(this).removeClass('click-red');
                        } else {
                            $(this).addClass('click-red');
                        }
                    }
                    break;
                case "restauracion":
                    if ($(this).hasClass("click-red")) {
                        $(this).removeClass('click-red');
                        $(this).addClass('click-blue');
                    } else {
                        if ($(this).hasClass("click-blue")) {
                            $(this).removeClass('click-blue');
                        } else {
                            $(this).addClass('click-blue');
                        }
                    }
                    break;
                case "extraccion":
                    var dientePosition = $(this).position();
                    console.log($(this))
                    console.log(dientePosition)
                    $(this).parent().children().each(function(index, el) {
                        if ($(el).hasClass("click")) {
                        	if ($(el).hasClass("click-delete")) {
                            	$(el).removeClass('click-delete');               		
                        	} else{
                        		$(el).addClass('click-delete');
                        	}
                        }
                    });
                    break;
                case "extraer":
                    var dientePosition = $(this).position();
                    console.log($(this))
                    console.log(dientePosition)
                    ht="<img class='errdi' src='images/X.png' alt=''>";
                    $(this).parent().children().each(function(index, el) {
                        if ($(el).hasClass("centro") || $(el).hasClass("centro-leche")) {
                        	if ($(el).children().hasClass("errdi")) {
                        		$('img').remove('.errdi');
                        	} else {
                        		$(this).append(ht);
                        	}
                        }
                    });
                    break;
                case "s":
                    var dientePosition = $(this).position();
                    console.log($(this))
                    console.log(dientePosition)
                    ht="<img class='eses' src='images/S.png' alt=''>";
                    $(this).parent().children().each(function(index, el) {
                        if ($(el).hasClass("centro") || $(el).hasClass("centro-leche")) {
                        	if ($(el).children().hasClass("eses")) {
                        		$('img').remove('.eses');
                        	} else {
                        		$(this).append(ht);
                        	}
                        }
                    });
                    break;
                case "ei":
                    var dientePosition = $(this).position();
                    console.log($(this))
                    console.log(dientePosition)
                    ht="<img class='ei' src='images/ei.png' alt=''>";
                    $(this).parent().children().each(function(index, el) {
                        if ($(el).hasClass("centro") || $(el).hasClass("centro-leche")) {
                        	if ($(el).children().hasClass("ei")) {
                        		$('img').remove('.ei');
                        	} else {
                        		$(this).append(ht);
                        	}
                        }
                    });
                    break;
                case "--":
                    var dientePosition = $(this).position();
                    console.log($(this))
                    console.log(dientePosition)
                    ht="<img class='--' src='images/-.png' alt=''>";
                    $(this).parent().children().each(function(index, el) {
                        if ($(el).hasClass("centro") || $(el).hasClass("centro-leche")) {
                        	if ($(el).children().hasClass("--")) {
                        		$('img').remove('.--');
                        	} else {
                        		$(this).append(ht);
                        	}
                        }
                    });
                    break;
                case "puente":
                    var dientePosition = $(this).position();
                    console.log($(this))
                    console.log(dientePosition)
                    $(this).parent().children().each(function(index, el) {
                        if ($(el).hasClass("click")) {
                        	if ($(el).hasClass("click-puente")) {
                            	$(el).removeClass('click-puente');               		
                        	} else{
                        		$(el).addClass('click-puente');
                        	}
                        }
                    });

                    break;
                default:
                    console.log("borrar case");
            }
            return false;
        });
        return false;
    });

    function replaceAll(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    function createOdontogram() {
        var htmlLecheLeft = "",
            htmlLecheRight = "",
            htmlLeft = "",
            htmlRight = "",
            a = 1;
        for (var i = 8; i >= 1; i--) {
            //Dientes Definitivos Cuandrante Derecho (Superior/Inferior)
            htmlRight += '<div data-name="value" id="dienteindex' + i + '" class="diente">' +
                '<span style="margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + i + '</span>' +
                '<div id="tindex' + i + '" class="cuadro click">' +
                '</div>' +
                '<div id="lindex' + i + '" class="cuadro izquierdo click">' +
                '</div>' +
                '<div id="bindex' + i + '" class="cuadro debajo click">' +
                '</div>' +
                '<div id="rindex' + i + '" class="cuadro derecha click click">' +
                '</div>' +
                '<div id="cindex' + i + '" class="centro click">' +
                '</div>' +
                '</div>';
            //Dientes Definitivos Cuandrante Izquierdo (Superior/Inferior)
            htmlLeft += '<div id="dienteindex' + a + '" class="diente2">' +
                '<span style="margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + a + '</span>' +
                '<div id="tindex' + a + '" class="cuadro click">' +
                '</div>' +
                '<div id="lindex' + a + '" class="cuadro izquierdo click">' +
                '</div>' +
                '<div id="bindex' + a + '" class="cuadro debajo click">' +
                '</div>' +
                '<div id="rindex' + a + '" class="cuadro derecha click click">' +
                '</div>' +
                '<div id="cindex' + a + '" class="centro click">' +
                '</div>' +
                '</div>';
            if (i <= 5) {
                //Dientes Temporales Cuandrante Derecho (Superior/Inferior)
                htmlLecheRight += '<div id="dienteLindex' + i + '" style="left: -25%;" class="diente-leche">' +
                    '<span style="margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + i + '</span>' +
                    '<div id="tlecheindex' + i + '" class="cuadro-leche top-leche click">' +
                    '</div>' +
                    '<div id="llecheindex' + i + '" class="cuadro-leche izquierdo-leche click">' +
                    '</div>' +
                    '<div id="blecheindex' + i + '" class="cuadro-leche debajo-leche click">' +
                    '</div>' +
                    '<div id="rlecheindex' + i + '" class="cuadro-leche derecha-leche click click">' +
                    '</div>' +
                    '<div id="clecheindex' + i + '" class="centro-leche click">' +
                    '</div>' +
                    '</div>';
            }
            if (a < 6) {
                //Dientes Temporales Cuandrante Izquierdo (Superior/Inferior)
                htmlLecheLeft += '<div id="dienteLindex' + a + '" class="diente-leche2">' +
                    '<span style="margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + a + '</span>' +
                    '<div id="tlecheindex' + a + '" class="cuadro-leche top-leche click">' +
                    '</div>' +
                    '<div id="llecheindex' + a + '" class="cuadro-leche izquierdo-leche click">' +
                    '</div>' +
                    '<div id="blecheindex' + a + '" class="cuadro-leche debajo-leche click">' +
                    '</div>' +
                    '<div id="rlecheindex' + a + '" class="cuadro-leche derecha-leche click click">' +
                    '</div>' +
                    '<div id="clecheindex' + a + '" class="centro-leche click">' +
                    '</div>' +
                    '</div>';
            }
            a++;
        }
        $("#tr").html(replaceAll('index', '1', htmlRight));
        $("#tl").html(replaceAll('index', '2', htmlLeft));
        $("#tlr").html(replaceAll('index', '5', htmlLecheRight));
        $("#tll").html(replaceAll('index', '6', htmlLecheLeft));


        $("#bl").html(replaceAll('index', '3', htmlLeft));
        $("#br").html(replaceAll('index', '4', htmlRight));
        $("#bll").html(replaceAll('index', '7', htmlLecheLeft));
        $("#blr").html(replaceAll('index', '8', htmlLecheRight));
    }