$(document).ready(function() {
	NumEmp();
	Material_P();
	

    user();
    personal();
    material();


 
    

});

/************************************************************
****************** HORA DEL SISTEMA *************************
*************************************************************/
function Reloj() {
	var tiempo = new Date();
	var hora = tiempo.getHours();
	var minuto = tiempo.getMinutes();
	var segundo = tiempo.getSeconds();
	$('#hora').text(hora);
	$('#minuto').text(minuto);
	$('#segundo').text(segundo);
	setTimeout('Reloj()', 1000);
	str_hora = new String(hora);
	if (str_hora.length == 1) {
		$('#hora').text('0' + hora);
	}
	str_minuto = new String(minuto);
	if (str_minuto.length == 1) {
		$('#minuto').text('0' + minuto);
	}
	str_segundo = new String(segundo);
	if (str_segundo.length == 1) {
		$('#segundo').text('0' + segundo);
	}
}


/*********************************************************************
********************** NUMERO DE EMPLEADOS ***************************
**********************************************************************/
function NumEmp(){
	$.ajax({
		url: 'php/entrar.php',
		type: 'POST',
		data: {tot_emp: 5},
		beforeSend:function(){

		},
		success:function(html){
			$('div#num_empleados').html(html);
			Reloj();
		},
		error:function(html){

		}
	})
}


/*********************************************************************
********************** MATERIAL POR ACABARSE *************************
**********************************************************************/

function Material_P(){
	$.ajax({
		url: 'php/entrar.php',
		type: 'POST',
		data: {tot_mat: 10},
		beforeSend:function(){

		},
		success:function(html){
			$('div#num_material').html(html);
		},
		error:function(html){

		}
	})
}


/*********************************************************************
********************** CARGAR DOM USUARIOS **************************
**********************************************************************/
function user(){
	$('.user').on('click',function(event){
		event.preventDefault();
		$.ajax({
         url: 'user.php',
         type: 'POST',
         data: {user: 1},
         beforeSend:function(){

         },
         success:function(html){
             $('.contenido').html(html);
             listarC();
             $('div#menores').hide();
         },
         error:function(html){

         }
     })
	})


}

/*********************************************************************
********************** CARGAR DOM PERSONAL ***************************
**********************************************************************/
function personal(){
    $('.personal').on('click',function(event){
        event.preventDefault();
        $.ajax({
         url: 'personal.php',
         type: 'POST',
         data: {user: 1},
         beforeSend:function(){

         },
         success:function(html){
             $('.contenido').html(html);
             listarEmp();
             $('div#menores').hide();
         },
         error:function(html){

         }
     })
    })


}

/*********************************************************************
********************** CARGAR DOM MATERIALES *************************
**********************************************************************/
function material(){
    $('.product').on('click',function(event){
        event.preventDefault();
        $.ajax({
         url: 'material.php',
         type: 'POST',
         data: {product: 1},
         beforeSend:function(){

         },
         success:function(html){
             $('.contenido').html(html);
             listarProd();
         },
         error:function(html){

         }
     })
    })


}



/*********************************************************************
********************** LISTAR CLIENTES ******************************
**********************************************************************/
function listarC(){
  $.ajax({
    url: 'php/entrar.php',
    type: 'POST',
    data: {cod_cli: 1},
    beforeSend:function(){

    },
    success:function(html){
        $('.user_list').html(html)
        console.log 
        search_pac();
        new_user();
        list_update();
    },
    error:function(html){

    }
})

}

/*********************************************************************
********************** LISTAR EMPLEADOS ******************************
**********************************************************************/
function listarEmp(){
  $.ajax({
    url: 'php/entrar.php',
    type: 'POST',
    data: {cod_emp: 1},
    beforeSend:function(){

    },
    success:function(html){
        $('.user_list').html(html)
        search_adm();
        new_user_adm();
        list_update_adm();
    },
    error:function(html){

    }
})

}

/*********************************************************************
********************** LISTAR MATERIALES *****************************
**********************************************************************/
function listarProd(){
  $.ajax({
    url: 'php/entrar.php',
    type: 'POST',
    data: {prods: 1},
    beforeSend:function(){

    },
    success:function(html){
        $('.product_list').html(html)
        search_mat();
        editshowinput();
        editshowoutput();
    },
    error:function(html){

    }
})

}

/*********************************************************************
********************** SHOW EDITAR MATERIALES ENTRADA ****************
**********************************************************************/
function editshowinput(){
    $('.product_list').on('click','.upd_material',function(){
        $idmat = $(this).attr('id'); 
        $.ajax({
            url: 'php/entrar.php',
            type: 'POST',
            data: {prodeditshow1:1, idmat:$idmat},
            beforeSend:function(){

            },
            success:function(html){
                $('.contact2').html(html)
                save_ent_prod();
            },
            error:function(html){
                console.log(html)
            }
        })
    });
}

/***********************************************************************
************************* GUARDAR ENTRADA MATERIAL**********************
***********************************************************************/

function save_ent_prod(){

    $('.modal-footer').on('click', '#save_ent_prod', function(event) {
        event.preventDefault();

        $cod = $('.contact2 #cod_invima').val(); 
        $desc = $('.contact2 #descripcion').val();
        $cant = $('.contact2 #cantidad').val();        
        $cant2 = $('.contact2 #cantidad').val();
        console.log("extraccion del cant del formmulario es: "+$cant)
        $.ajax({
            url: 'php/entrar.php',
            type: 'POST',
            data: {sumas_edi_cant_prod:1, cod:$cod, cant:$cant},
            beforeSend:function(){

            },
            success:function(html){
                $cant = html;
                console.log("esto es: "+$cant)
                save_ent_prod1();
            },
            error:function(html){
                console.log(html);

            }
        })
        
            
    });
  
}

/**********************************************************************
************************* GUARDAR LA ENTRADA SUMADA *******************
***********************************************************************/

function save_ent_prod1(){
    $.ajax({
        url: 'php/entrar.php',
        type: 'POST',
        data: {edi_cant_prod:1, cod:$cod, desc:$desc, cant:$cant, cant2:$cant2},
        beforeSend:function(){

        },
        success:function(html){
            console.log(html);            
            $resul=html;
            if ($resul == 3) {
                listarProd();
                $('#myModal2 #cancel_prod').click();
                $('div.mat_msj').html("");
            }else{
                if ($resul == 2) {
                    $('div.mat_msj').html("<div class='alert alert-danger'><h2>ERROR, El registro no se creo correctamente</h2></div>");
                }else{
                    $('div.mat_msj').html("<div class='alert alert-danger'><h2>ERROR, la cantidad es menor a UNO</h2></div>");
                }
            } 
        },
        error:function(html){
            console.log(html);
        }
    })
    
}

/*********************************************************************
********************** SHOW EDITAR MATERIALES SALIDA ****************
**********************************************************************/
function editshowoutput(){
    $('.product_list').on('click','.upd_material2',function(){
        $idmat = $(this).attr('id'); 
        $.ajax({
            url: 'php/entrar.php',
            type: 'POST',
            data: {prodeditshow2:1, idmat:$idmat},
            beforeSend:function(){

            },
            success:function(html){
                $('.contact3').html(html)
                save_sali_prod();
            },
            error:function(html){
                console.log(html)
            }
        })
    });
}

/***********************************************************************
************************* GUARDAR SALIDA MATERIAL**********************
***********************************************************************/

function save_sali_prod(){

    $('.modal-footer').on('click', '#save_sali_prod', function(event) {
        event.preventDefault();

        $cod = $('.contact3 #cod_invima').val(); 
        $desc = $('.contact3 #descripcion').val();
        $cant = $('.contact3 #cantidad').val();
        $cant2 = $('.contact3 #cantidad').val();
        console.log("extraccion del cant del formmulario es: "+$cant)
        $.ajax({
            url: 'php/entrar.php',
            type: 'POST',
            data: {rest_edi_cant_prod:1, cod:$cod, cant:$cant},
            beforeSend:function(){

            },
            success:function(html){
                $cant = html;
                console.log("esto es: "+$cant)
                save_sali_prod1();
            },
            error:function(html){
                console.log(html);

            }
        })
        
            
    });
  
}

/**********************************************************************
************************* GUARDAR LA SALIDA SUMADA *******************
***********************************************************************/

function save_sali_prod1(){
    $.ajax({
        url: 'php/entrar.php',
        type: 'POST',
        data: {edi_cant_prod:1, cod:$cod, desc:$desc, cant:$cant, cant2:$cant2},
        beforeSend:function(){

        },
        success:function(html){            
            $resul=html;
            if ($resul == 3) {
                listarProd();
                $('#myModal3 #cancel_prod').click();
                $('div.mat_msj2').html("");
            }else{
                if ($resul == 2) {
                    $('div.mat_msj2').html("<div class='alert alert-danger'><h2>ERROR, El registro no se creo correctamente</h2></div>");
                }else{
                    $('div.mat_msj2').html("<div class='alert alert-danger'><h2>ERROR, la cantidad es menor a UNO</h2></div>");
                }
            }
        },
        error:function(html){
            console.log(html);
        }
    })
    
}



/***********************************************************************
************* BUSCAR ALGUN CLIENTE EN LA LISTA ************************
***********************************************************************/
function search_pac(){
    $('#search_pac').change(function() {
        $word = $('#search_pac').val();
        $tip_user = "Paciente";
        if ($word != "") {
            $.ajax({
                url: 'php/entrar.php',
                type: 'POST',
                data: {user_search:$word, tip_user:$tip_user},
                beforeSend:function(){

                },
                success:function(html){
                    console.log(html);
                    $('.user_list').html(html)
                },
                error:function(html){

                }
            })
        }else{
            listarC();
        }        
    });
}





/***********************************************************************
************* BUSCAR ALGUN PRODUCTO EN LA LISTA ************************
***********************************************************************/
function search_mat(){
    $('#search_mat').change(function() {
        $word = $('#search_mat').val();
        if ($word != "") {
            $.ajax({
                url: 'php/entrar.php',
                type: 'POST',
                data: {mat_search:$word},
                beforeSend:function(){

                },
                success:function(html){
                    $('.product_list').html(html)
                },
                error:function(html){

                }
            })
        }else{
            listarProd();
        }        
    });
}


/***********************************************************************
************* BUSCAR ALGUN ADMINISTRADOR EN LA LISTA ************************
***********************************************************************/
function search_adm(){
    $('#search_adm').change(function() {
        $word = $('#search_adm').val();
        $tip_user1 = "Medico";
        $tip_user2 = "Administrador";
        if ($word != "") {
            $.ajax({
                url: 'php/entrar.php',
                type: 'POST',
                data: {adm_search:$word, tip_user1:$tip_user1, tip_user2:$tip_user2},
                beforeSend:function(){

                },
                success:function(html){
                    console.log(html);
                    $('.user_list').html(html)
                },
                error:function(html){

                }
            })
        }else{
            listarEmp();
        }        
    });
}


/***********************************************************************
************* LIMPIAR FORMULARIO REGISTRO USUARIO **********************
***********************************************************************/

function clean_user(){
    $tipo = $('#tipo_doc').val('');  
    $ident = $('#identificacion').val(''); 
    $nomb = $('#nombres').val(''); 
    $ape1 = $('#apellido1').val(''); 
    $ape2 = $('#apellido2').val('');
    $email = $('#email').val(''); 
    $nac = $('#fecha_na').val(''); 
    $direccion = $('#direccion').val(''); 
    $genero = $('input:radio[name=Genero]:checked').prop('checked', false); 
    $ocupacion = $('#Ocupacion').val(''); 
    $estado = $('#estado_cvl').val(''); 
    $tel = $('#telefono').val(''); 
    $nomb_acu = $('#nomb_acu').val(''); 
    $tel_acu = $('#tel_acu').val(''); 
    $nom_pad = $('#nomb_pad').val(''); 
    $ocp_pad = $('#ocp_pad').val(''); 
    $tel_pad = $('#tel_pad').val(''); 
    $nom_mad = $('#nomb_mad').val(''); 
    $ocp_mad = $('#ocp_mad').val('');  
    $tel_mad = $('#tel_mad').val(''); 
}

/***********************************************************************
************* LIMPIAR FORMULARIO REGISTRO MATERIAL**********************
***********************************************************************/

function clean_Prod(){
    $ident = $('#cod_invima').val('');  
    $desc = $('#descripcion').val(''); 
    $cant = $('#cantidad').val(''); 
}


/***********************************************************************
************************* REGISTRAR NUEVO CLIENTE **********************
***********************************************************************/

function new_user(){
  $('.modal-footer').on('click', '#save', function(event) {
    event.preventDefault();
    /* Act on the event */

    $tipo = $('#tipo_doc').val();  
    $ident = $('#identificacion').val(); 
    $nomb = $('#nombres').val(); 
    $ape1 = $('#apellido1').val(); 
    $ape2 = $('#apellido2').val(); 
    $email = $('#email').val();
    $nac = $('#fecha_na').val(); 
    $direccion = $('#direccion').val(); 
    $genero = $('input:radio[name=Genero]:checked').val(); 
    $tel = $('#telefono').val(); 


    $.ajax({
        url: 'php/consults.php',
        type: 'POST',
        data: {reg_pac: 1,tipo: $tipo, id: $ident, nomb: $nomb, ape1: $ape1, ape2: $ape2,email:$email, f_nac: $nac,direccion:$direccion, sexo: $genero, phone: $tel},
        beforeSend:function(){

        },
        success:function(html){
            console.log(html)       
            $resul=html;
            if ($resul == 2) {
                listarC();
                $('#cancel').click();
                $('div.pac_msj').html("");
            }else{
                $('div.pac_msj').html("<div class='alert alert-danger'><h2>ERROR, El ususario con número de identificacion "+$ident+" ya se encuentra registrado</h2></div>");
            }
        },
        error:function(html){

        }
    })

});
}


/***********************************************************************
************************* REGISTRAR NUEVO ADMINISTRADOR **********************
***********************************************************************/

function new_user_adm(){
  $('.modal-footer').on('click', '#save_adm', function(event) {
    event.preventDefault();
    /* Act on the event */

    $tipo = $('#tipo_doc').val();  
    $ident = $('#identificacion').val(); 
    $nomb = $('#nombres').val(); 
    $ape1 = $('#apellido1').val(); 
    $ape2 = $('#apellido2').val(); 
    $email = $('#email').val();
    $nac = $('#fecha_na').val(); 
    $direccion = $('#direccion').val(); 
    $genero = $('input:radio[name=Genero]:checked').val(); 
    $tel = $('#telefono').val(); 
    $tip_user = $('#tipo_user').val(); 


    $.ajax({
        url: 'php/consults.php',
        type: 'POST',
        data: {reg_adm: 1,tipo: $tipo, id: $ident, nomb: $nomb, ape1: $ape1, ape2: $ape2,email:$email, f_nac: $nac,direccion:$direccion, sexo: $genero, phone: $tel, tip_user:$tip_user},
        beforeSend:function(){

        },
        success:function(html){
            console.log(html)       
            $resul=html;
            if ($resul == 2) {
                listarEmp();
                $('#cancel_adm').click();
                $('div.adm_msj').html("");
            }else{
                $('div.adm_msj').html("<div class='alert alert-danger'><h2>ERROR, El ususario con número de identificacion "+$ident+" ya se encuentra registrado</h2></div>");
            }
        },
        error:function(html){

        }
    })

});
}


/***********************************************************************
************************* REGISTRAR NUEVO PRODUCTO *********************
***********************************************************************/

function new_Prod(){

  $('.modal-footer').on('click', '#save_prod', function(event) {
    event.preventDefault();
    /* Act on the event */

    $cod = $('#cod_invima').val();  
    $desc = $('#descripcion').val();
    $cant = $('#cantidad').val();

    $.ajax({
        url: 'php/consults.php',
        type: 'POST',
        data: {reg_prod: 1, cod:$cod, desc:$desc, cant:$cant},
        beforeSend:function(){

        },
        success:function(html){
            $resul=html;
            if ($resul == 3) {
                listarProd();
                $('#cancel_prod').click();
                $('div.mat_msjr').html("");
            }else{
                if ($resul == 2) {
                    $('div.mat_msjr').html("<div class='alert alert-danger'><h2>ERROR, EL material no se ha podido registrar</h2></div>");
                }else{
                    $('div.mat_msjr').html("<div class='alert alert-danger'><h2>ERROR, El material con codigo de identificacion "+$cod+" ya se encuentra registrado</h2></div>");
                }                
            }
        },
        error:function(html){

        }
    })

});
  
}


/****************************************************************************
******************* LISTAR DATOS PARA ACTUALIZAR CLIENTE ********************
****************************************************************************/

function list_update(){
    $('.user_list').on('click','.upd',function(){
        $id = $(this).attr('id'); 
        $.ajax({
            url: 'php/consults.php',
            type: 'POST',
            data: {user_update_dat: $id},
            beforeSend:function(){

            },
            success:function(html){
                $('#myModal2 .contact').html(html);
                save_edit_user();
           },
           error:function(html){

           }
       })    

    });
}


/****************************************************************************
******************* LISTAR DATOS PARA ACTUALIZAR ADMINISTRADOR ********************
****************************************************************************/

function list_update_adm(){
    $('.user_list').on('click','.upd_adm',function(){
        $id = $(this).attr('id'); 
        $.ajax({
            url: 'php/consults.php',
            type: 'POST',
            data: {user_update_dat_adm: $id},
            beforeSend:function(){

            },
            success:function(html){
                $('#myModal2 .contact').html(html);
                save_edit_adm();
           },
           error:function(html){

           }
       })    

    });
}

/****************************************************************************
******************* GUARDAR ACTUALIZACION DE DATOS CLIENTE ********************
****************************************************************************/

function save_edit_user(){
    $('#myModal2 .modal-footer').on('click','#save_pac_edit',function(){
            
            $id = $('#myModal2 #identificacion').val(); 
            $nomb = $('#myModal2 #nombres').val(); 
            $ape1 = $('#myModal2 #apellido1').val(); 
            $ape2 = $('#myModal2 #apellido2').val();
            $email = $('#myModal2 #email').val(); 
            $f_nac = $('#myModal2 #fecha_na').val(); 
            $direccion = $('#myModal2 #direccion').val(); 
            $sexo = $('input:radio[name=Genero]:checked').val();
            $phone = $('#myModal2 #telefono').val();   

            $.ajax({
                url: 'php/consults.php',
                type: 'POST',
                data: {upd_user:1, id:$id,nomb:$nomb,ape1:$ape1,ape2:$ape2,email:$email,f_nac:$f_nac,direccion:$direccion,sexo:$sexo,phone:$phone},
                beforeSend:function(){

                },
                success:function(html){
                    console.log(html)
                    $resul=html;
                    if ($resul == 9) {
                        listarC();
                        $('#myModal2 #cancel_act_pac').click(); 
                        $('div.pac_msj2').html("");
                    }else{
                        $('div.pac_msj2').html("<div class='alert alert-danger'><h2>ERROR, Los datos no se han actualizado o no se han realizado cambios</h2></div>");
                    }
               },
               error:function(html){

               }
            })    

    });
}


/****************************************************************************
******************* GUARDAR ACTUALIZACION DE DATOS ADMINISTRADOR ********************
****************************************************************************/

function save_edit_adm(){
    $('#myModal2 .modal-footer').on('click','#save_adm_edit',function(){
            
            $id = $('#myModal2 #identificacion').val(); 
            $nomb = $('#myModal2 #nombres').val(); 
            $ape1 = $('#myModal2 #apellido1').val(); 
            $ape2 = $('#myModal2 #apellido2').val();
            $email = $('#myModal2 #email').val(); 
            $f_nac = $('#myModal2 #fecha_na').val(); 
            $direccion = $('#myModal2 #direccion').val(); 
            $sexo = $('input:radio[name=Genero]:checked').val(); 
            $phone = $('#myModal2 #telefono').val();
            $tip_user = $('#myModal2 #tipo_user').val();    

            $.ajax({
                url: 'php/consults.php',
                type: 'POST',
                data: {upd_adm:1, id:$id,nomb:$nomb,ape1:$ape1,ape2:$ape2,email:$email,f_nac:$f_nac,direccion:$direccion,sexo:$sexo,phone:$phone,tip_user:$tip_user},
                beforeSend:function(){

                },
                success:function(html){
                    console.log(html)
                    $resul=html;
                    if ($resul == 9) {
                        listarEmp();
                        $('#myModal2 #cancel_act_adm').click(); 
                        $('div.adm_msj2').html("");
                    }else{
                        $('div.adm_msj2').html("<div class='alert alert-danger'><h2>ERROR, Los datos no se han actualizado o no se han realizado cambios</h2></div>");                  
                    }
               },
               error:function(html){

               }
            })    

    });
}


/****************************************************************************
********************** DETALLE INFORMACION USUARIO **************************
****************************************************************************/

function detalle(){
    $('.user_list').on('click','.list',function(){
        $id = $(this).attr('id');
        console.log($id); 

    });
    
}

