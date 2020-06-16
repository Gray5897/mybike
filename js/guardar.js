$(document).ready(function() {
    /*****************************************************************/
    /*************************   ANTERIOR   *************************/
    /*****************************************************************/

    $('.segw2').on('click', '#anteriorasfige', function(){

        $('.widget_1').show();
        $('.widget_2').hide();
        $('.widget_3').hide();
        $('.widget_4').hide();

    }); 

    $('.w3sep').on('click', '#anteriordiagcli', function(){

        $('.widget_1').hide();
        $('.widget_2').show();
        $('.widget_3').hide();
        $('.widget_4').hide();

    }); 

    $('.w4ter').on('click', '#anteriortrare', function(){

        $('.widget_1').hide();
        $('.widget_2').hide();
        $('.widget_3').show();
        $('.widget_4').hide();
    });

    /*****************************************************************/
    /*************************   SIGUIENTE   *************************/
    /*****************************************************************/

    $('.w1sext').on('click', '#siguienteana', function(){

        $selected=[];  
        $i=0;
        $('.widget_1').hide();
        $('.widget_2').show();
        $('.widget_3').hide();
        $('.widget_4').hide();

        formw1pri(); 

    });  

    $('.segw2').on('click', '#sigienteasfige', function(){

        $selected2=[];    
        $j=0;
        $('.widget_1').hide();
        $('.widget_2').hide();
        $('.widget_3').show();
        $('.widget_4').hide();

        formw2pri();

        disabled_input();
        

    }); 

    $('.w3sep').on('click', '#siguientediagcli', function(){

        $selected3=[];   
        $selected33=[];     
        $selected34=[];    
        $m=0;
        $m33=0;
        $m333=0;
        $m34=0;
        $('.widget_1').hide();
        $('.widget_2').hide();
        $('.widget_3').hide();
        $('.widget_4').show();

       formw3pri();
        

    }); 

    $('.w4ter').on('click', '#siguientetrare', function(){

        $id_pac=$("#nombrepac .nombrepac").attr("id");
        $id_med=$("#nombrepac .nombrepac").attr("name");
        console.log('el valor  del id q extraigo es: => '+$id_pac)
        console.log('el valor  del name q extraigo es: => '+$id_med)
        $selected4=[];    
        $l=0;

        // formw1pri();
        // formw2pri();
        // formw3pri();
        formw4pri();
    });  

        
});  

/*****************************************************************/
/*******************   DISABLED INPUT TEXT   *********************/
/*****************************************************************/

function disabled_input(){
    $('.contenido').on('click','.posie',function(){
       if ($(".check1").prop('checked')){
            $('.contenido .posi').prop('disabled', 'disabled');
            $('.contenido .posi').prop('value', '');
       }else{
            $('.contenido .posi').attr('disabled', false);
        }
    })
    $('.contenido').on('click','.numee',function(){
       if ($(".check2").prop('checked')){
            $('.contenido .nume').prop('disabled', 'disabled');
            $('.contenido .nume').prop('value', '');
       }else{
            $('.contenido .nume').attr('disabled', false);
        }
    })
    $('.contenido').on('click','.tafoe',function(){
       if ($(".check3").prop('checked')){
            $('.contenido .tafo').prop('disabled', 'disabled');
            $('.contenido .tafo').prop('value', '');
       }else{
            $('.contenido .tafo').attr('disabled', false);
        }
    })
    $('.contenido').on('click','.erupe',function(){
       if ($(".check4").prop('checked')){
            $('.contenido .erup').prop('disabled', 'disabled');
            $('.contenido .erup').prop('value', '');
       }else{
            $('.contenido .erup').attr('disabled', false);
        }
    })
    $('.contenido').on('click','.coloe',function(){
       if ($(".check5").prop('checked')){
            $('.contenido .colo').prop('disabled', 'disabled');
            $('.contenido .colo').prop('value', '');
       }else{
            $('.contenido .colo').attr('disabled', false);
        }
    })
    $('.contenido').on('click','.pulpe',function(){
       if ($(".check6").prop('checked')){
            $('.contenido .pulp').prop('disabled', 'disabled');
            $('.contenido .pulp').prop('value', '');
       }else{
            $('.contenido .pulp').attr('disabled', false);
        }
    })
   
}

/*****************************************************************/
/***************   RECOLECCION DE DATOS DEL W1   *****************/
/*****************************************************************/

function formw1pri(){  
        $('#formw1pri input[type=checkbox]').each(function(){
            if (this.checked) {               
                $selected[$i] = $(this).val();  
                // console.log('el valor este es de: '+$selected[$i])           
                $i=$i+1;      
            }
        }); 
        fromw1seg();

        // if (selected.length>0) 
        //     alert('Has seleccionado: '+selected);
        // else
        //     alert('Debes seleccionar al menos una opción.');

}

function fromw1seg(){   
        $('#fromw1seg input[type=checkbox]').each(function(){
            if (this.checked) {                
                $selected[$i] = $(this).val();   
                // console.log('el valor este es de: '+$selected[$i])           
                $i=$i+1;  
            }
        }); 
        fromw1ter();

        // if (selected != '') 
        //     alert('Has seleccionado: '+selected);  
        // else
        //     alert('Debes seleccionar al menos una opción.');

        // return false;
}

function fromw1ter(){ 
        $('#fromw1ter input[type=checkbox]').each(function(){
            if (this.checked) {
                $selected[$i] = $(this).val();      
                // console.log('el valor este es de: '+$selected[$i])        
                $i=$i+1;  
            }
        });         
        fromw1cuarb();

        // if (selected != '') 
        //     alert('Has seleccionado: '+selected);  
        // else
        //     alert('Debes seleccionar al menos una opción.');

        // return false;
}

function fromw1cuarb(){  
        $('#fromw1cuarb input[type=checkbox]').each(function(){
            if (this.checked) {
                $selected[$i] = $(this).val();    
                // console.log('el valor este es de: '+$selected[$i])          
                $i=$i+1;  
            }
        }); 
        fromw1quin();

        // if (selected != '') 
        //     alert('Has seleccionado: '+selected);  
        // else
        //     alert('Debes seleccionar al menos una opción.');

        // return false;
}

function fromw1quin(){   
        $('#fromw1quin input[type=checkbox]').each(function(){
            if (this.checked) {
                $selected[$i] = $(this).val();                
                // console.log('en la prueba esta: '+$selected[$i]);
                $i=$i+1;  
            }
        }); 
        $iden=1;
        varis();

        // formw2pri();
        
}

/*****************************************************************/
/***************   RECOLECCION DE DATOS DEL W2   *****************/
/*****************************************************************/

function formw2pri(){  
        $('#formpriw2 input[type=checkbox]').each(function(){
            if (this.checked) {               
                $selected2[$j] = $(this).val();  
                // console.log('el valor este es de: '+$selected2[$j])           
                $j=$j+1;      
            }
        }); 
        $iden=2;
        varis();

        // formw3pri();

}

/*****************************************************************/
/***************   RECOLECCION DE DATOS DEL W3   *****************/
/*****************************************************************/

function formw3pri(){  
        $('#formw3pri input[type=checkbox]').each(function(){
            if (this.checked) {               
                $selected3[$m] = $(this).val();  
                // console.log('el valor este tercer es de: '+$selected3[$m])           
                $m=$m+1;      
            }
        }); 
        formw3seg();
}

function formw3seg(){   
        $('#formw3seg input[type=checkbox]').each(function(){
            if (this.checked) {                
                $selected3[$m] = $(this).val();   
                // console.log('el valor este es de: '+$selected3[$m])           
                $m=$m+1;  
            }
        }); 
        formw3ter();
}

function formw3ter(){ 
        $('#formw3ter input[type=checkbox]').each(function(){
            if (this.checked) {
                $selected3[$m] = $(this).val();              
                $m=$m+1;  
            }
        });  

        // varis(); 

        formw3cuar();
}

function formw3cuar(){  
        $('#formw3cuar input[type=text]').each(function(){
            if ($(this).val()!="") {
                $selected33[$m33] = $(this).attr("id")+","+$(this).val();    
                console.log('el valor de la caja es este yolo =>: '+$selected33[$m33])      
                $m33=$m33+1;  
            }
        }); 

        $('#formw3cuar input[type=checkbox]').each(function(){
            if (this.checked) {
                $selected33[$m33] = $(this).val();          
                console.log('este yolo =>: '+$selected33[$m33])       
                $m33=$m33+1;  
            }
        }); 

        // $yolo=$selected33.length;

        // for ($i = 0; $i >=$yolo; $i++) {
        //     // console.log('el valor de la caja en el for es este yolo =>: '+$selected33[$i])
        // };

        formw3quin();
}

function formw3quin(){   
        $('#formw3quin input[type=text]').each(function(){
            if ($(this).val()!="") {
                $selected34[$m34] = $(this).attr("id")+","+$(this).val();    
                // console.log('el valor de la caja 2 es: '+$selected34[$m])          
                $m34=$m34+1;  
            }
        }); 
        // $iden=3;
        // $iden=33;
        $iden=34;
        varis();

        // formw4pri();
}

// /*****************************************************************/
// /***************   RECOLECCION DE DATOS DEL W4   *****************/
// /*****************************************************************/

function formw4pri(){  
        $('#formw4pri input[type=checkbox]').each(function(){
            if (this.checked) {               
                $selected4[$l] = $(this).val();  
                // console.log('el valor este cuarto es de: '+$selected4[$l])           
                $l=$l+1;      
            }
        }); 

        $iden=4;
        varis();
}

/*****************************************************************/
/***************   Identificacion de los datos   *****************/
/*****************************************************************/

function varis(){  
        $antmed=[];
        $antsic=[];
        $antodo=[];
        $asfige=[];
        $diaext=[];
        $diaint=[];
        $diaocl=[];
        $platra=[];
        $anoden=[];
        $diarad=[];
        if ($iden==1) {
            $can=$selected.length;
            if ($can>0) {
                for ($j = 0; $j < $can; $j++) {
                    $res = $selected[$j].substring(0, 4);
                    if ($res=='emba') {
                        $k=0;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='hema') {
                        $k=1;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='sire') {
                        $k=2;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='siin') {
                        $k=3;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='vaap') {
                        $k=4;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='poli') {
                        $k=5;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='dptt') {
                        $k=6;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='genu') {
                        $k=7;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='neur') {
                        $k=8;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='enme') {
                        $k=9;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='gast') {
                        $k=10;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='orse') {
                        $k=11;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='catu') {
                        $k=12;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='aler') {
                        $k=13;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='otan') {
                        $k=14;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antmed[$k]==null) {
                                $antmed[$k]=$dato;
                            }else{
                                $antmed[$k]=$antmed[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='coge') {
                        $k=0;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='esco') {
                        $k=1;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='rend') {
                        $k=2;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='trme') {
                        $k=3;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='trod') {
                        $k=4;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antsic[$k]==null) {
                                $antsic[$k]=$dato;
                            }else{
                                $antsic[$k]=$antsic[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='tran') {
                        $k=0;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='hahi') {
                        $k=1;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='hanu') {
                        $k=2;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='haca') {
                        $k=3;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='hade') {
                        $k=4;
                        $lon=$selected[$j].length;
                        $dato = $selected[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected[$j].substring($lon-1, $lon);
                            if ($antodo[$k]==null) {
                                $antodo[$k]=$dato;
                            }else{
                                $antodo[$k]=$antodo[$k]+'-'+$dato;
                            }
                        }
                    };
                };
                for ($i = 0; $i <= 14; $i++) {
                    if ($antmed[$i]==null) {
                        $antmed[$i]="";
                        // console.log('el valor de antmed en '+$i+' es: '+$antmed[$i]);
                    }
                };
                for ($i = 0; $i <= 4; $i++) {
                    if ($antsic[$i]==null) {
                        $antsic[$i]="";
                        // console.log('el valor de antsic en '+$i+' es: '+$antsic[$i]);
                    }
                };
                for ($i = 0; $i <= 4; $i++) {
                    if ($antodo[$i]==null) {
                        $antodo[$i]="";
                        // console.log('el valor de antodo en '+$i+' es: '+$antodo[$i]);
                    }
                };
                // localStorage['antmed']=$antmed;
                localStorage.setItem('antmed', JSON.stringify($antmed));
                // localStorage['antsic']=$antsic;
                localStorage.setItem('antsic', JSON.stringify($antsic));
                // localStorage['antodo']=$antodo;
                localStorage.setItem('antodo', JSON.stringify($antodo));
            };
        };
        if ($iden==2) {
            $can2=$selected2.length;
            if ($can2>0) {
                for ($j = 0; $j < $can2; $j++) {
                    $res2 = $selected2[$j].substring(0, 4);
                    if ($res2=='asfi') {
                        $k=0;
                        $lon=$selected2[$j].length;
                        $dato = $selected2[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($asfige[$k]==null) {
                                $asfige[$k]=$dato;
                            }else{
                                $asfige[$k]=$asfige[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected2[$j].substring($lon-1, $lon);
                            if ($asfige[$k]==null) {
                                $asfige[$k]=$dato;
                            }else{
                                $asfige[$k]=$asfige[$k]+'-'+$dato;
                            }
                        }
                    }; 
                };
                for ($i = 0; $i <= 0; $i++) {
                    if ($asfige[$i]==null) {
                        $asfige[$i]="";
                        // console.log('el valor de asfige en '+$i+' es: '+$asfige[$i]);
                    }
                };
                // localStorage['asfige']=$asfige;
                localStorage.setItem('asfige', JSON.stringify($asfige));
            };
        };
        if ($iden==34) {
            $can3=$selected3.length;
            if ($can3>0) {
                // console.log('si continua a imprimir el arreglo 3')
                for ($j = 0; $j < $can3; $j++) {
                    $res3 = $selected3[$j].substring(0, 4);
                    // console.log('impresion de identificacion '+$res3)

                    if ($res3=='exfr') {
                        $k=0;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='exna') {
                        $k=1;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='exla') {
                        $k=2;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='exat') {
                        $k=3;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='expe') {
                        $k=4;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='exad') {
                        $k=5;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaext[$k]==null) {
                                $diaext[$k]=$dato;
                            }else{
                                $diaext[$k]=$diaext[$k]+'-'+$dato;
                            }
                        }
                    };

                    if ($res3=='inor') {
                        $k=0;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='inpa') {
                        $k=1;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='inle') {
                        $k=2;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='inmu') {
                        $k=3;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='inpb') {
                        $k=4;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='inec') {
                        $k=5;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaint[$k]==null) {
                                $diaint[$k]=$dato;
                            }else{
                                $diaint[$k]=$diaint[$k]+'-'+$dato;
                            }
                        }
                    };
                    
                    if ($res3=='rmpt') {
                        $k=0;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='rmem') {
                        $k=1;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='rmed') {
                        $k=2;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='pcla') {
                        $k=3;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='pclb') {
                        $k=4;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='pcba') {
                        $k=5;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='pcbb') {
                        $k=6;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='pclc') {
                        $k=7;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='rmca') {
                        $k=8;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='rmcb') {
                        $k=9;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='rmcc') {
                        $k=10;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='aple') {
                        $k=11;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='apmo') {
                        $k=12;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='apse') {
                        $k=13;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='somo') {
                        $k=14;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='rtls') {
                        $k=15;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='rtli') {
                        $k=16;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res3=='rtmc') {
                        $k=17;
                        $lon=$selected3[$j].length;
                        $dato = $selected3[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected3[$j].substring($lon-1, $lon);
                            if ($diaocl[$k]==null) {
                                $diaocl[$k]=$dato;
                            }else{
                                $diaocl[$k]=$diaocl[$k]+'-'+$dato;
                            }
                        }
                    };
                };
                for ($i = 0; $i <= 5; $i++) {
                    if ($diaext[$i]==null) {
                        $diaext[$i]="";
                        // console.log('el valor de diaext en '+$i+' es: '+$diaext[$i]);
                    }
                };
                for ($i = 0; $i <= 5; $i++) {
                    if ($diaint[$i]==null) {
                        $diaint[$i]="";
                        // console.log('el valor de diaint en '+$i+' es: '+$diaint[$i]);
                    }
                };
                for ($i = 0; $i <= 17; $i++) {
                    if ($diaocl[$i]==null) {
                        $diaocl[$i]="";
                        // console.log('el valor de diaocl en '+$i+' es: '+$diaocl[$i]);
                    }
                };
                // localStorage['diaext']=$diaext;
                localStorage.setItem('diaext', JSON.stringify($diaext));
                // localStorage['diaint']=$diaint;
                localStorage.setItem('diaint', JSON.stringify($diaint));
                // localStorage['diaocl']=$diaocl;
                localStorage.setItem('diaocl', JSON.stringify($diaocl));
            };
        // };
        // if ($iden==33) {
            $can33=$selected33.length;
            if ($can33>0) {
                // console.log('si continua a imprimir el arreglo 3')
                for ($j = 0; $j < $can33; $j++) {
                    // console.log('tiene =>'+$selected33[$j])
                    $res33 = $selected33[$j].substring(0, 4);
                    // console.log('impresion de identificacion '+$res3)

                    if ($res33=='estr') {
                        $k=0;
                        $lon=$selected33[$j].length;
                        $dato = $selected33[$j].substring(4, $lon);                        
                        if ($anoden[$k]==null) {
                            $anoden[$k]=$dato;
                        }else{
                            $anoden[$k]=$anoden[$k]+'-'+$dato;
                        }                        
                    };
                    if ($res33=='posi') {
                        $k=1;
                        $lon=$selected33[$j].length;
                        $dato = $selected33[$j].substring(4, $lon);                        
                        if ($anoden[$k]==null) {
                            $anoden[$k]=$dato;
                        }else{
                            $anoden[$k]=$anoden[$k]+'-'+$dato;
                        } 
                    };
                    if ($res33=='nume') {
                        $k=2;
                        $lon=$selected33[$j].length;
                        $dato = $selected33[$j].substring(4, $lon);                        
                        if ($anoden[$k]==null) {
                            $anoden[$k]=$dato;
                        }else{
                            $anoden[$k]=$anoden[$k]+'-'+$dato;
                        } 
                    };
                    if ($res33=='tafo') {
                        $k=3;
                        $lon=$selected33[$j].length;
                        $dato = $selected33[$j].substring(4, $lon);                        
                        if ($anoden[$k]==null) {
                            $anoden[$k]=$dato;
                        }else{
                            $anoden[$k]=$anoden[$k]+'-'+$dato;
                        } 
                    };
                    if ($res33=='erup') {
                        $k=4;
                        $lon=$selected33[$j].length;
                        $dato = $selected33[$j].substring(4, $lon);                        
                        if ($anoden[$k]==null) {
                            $anoden[$k]=$dato;
                        }else{
                            $anoden[$k]=$anoden[$k]+'-'+$dato;
                        }
                    };
                    if ($res33=='colo') {
                        $k=5;
                        $lon=$selected33[$j].length;
                        $dato = $selected33[$j].substring(4, $lon);                        
                        if ($anoden[$k]==null) {
                            $anoden[$k]=$dato;
                        }else{
                            $anoden[$k]=$anoden[$k]+'-'+$dato;
                        }
                    };
                    if ($res33=='pulp') {
                        $k=6;
                        $lon=$selected33[$j].length;
                        $dato = $selected33[$j].substring(4, $lon);                        
                        if ($anoden[$k]==null) {
                            $anoden[$k]=$dato;
                        }else{
                            $anoden[$k]=$anoden[$k]+'-'+$dato;
                        }
                    };
                };
                for ($i = 0; $i <= 6; $i++) {
                    if ($anoden[$i]==null) {
                        $anoden[$i]="";
                        // console.log('el valor de anoden en '+$i+' es: '+$anoden[$i]);
                    }
                };
                // localStorage['anoden']=$anoden;
                localStorage.setItem('anoden', JSON.stringify($anoden));
            };
        // };
        // if ($iden==34) {
            $can34=$selected34.length;
            if ($can34>0) {
                $k=0;
                for ($j = 0; $j < $can34; $j++) {
                    if ($diarad[$k]==null) {
                        $diarad[$k]=$selected34[$j];
                    }else{
                        $diarad[$k]=$diarad[$k]+'-'+$selected34[$j];
                    }
                    // console.log('en este arreglo se immprime diarad'+$j+'='+$diarad[$j])                  
                };
                for ($i = 0; $i <= 0; $i++) {
                    if ($diarad[$i]==null) {
                        $diarad[$i]="";
                        // console.log('el valor de diarad en '+$i+' es: '+$diarad[$i]);
                    }
                };
                // localStorage['diarad']=$diarad;
                localStorage.setItem('diarad', JSON.stringify($diarad));
            };
        };
        if ($iden==4) {
            $can=$selected4.length;
            if ($can>0) {
                for ($j = 0; $j < $can; $j++) {
                    $res = $selected4[$j].substring(0, 4);
                    if ($res=='pltr') {
                        $k=0;
                        $lon=$selected4[$j].length;
                        $dato = $selected4[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($platra[$k]==null) {
                                $platra[$k]=$dato;
                            }else{
                                $platra[$k]=$platra[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected4[$j].substring($lon-1, $lon);
                            if ($platra[$k]==null) {
                                $platra[$k]=$dato;
                            }else{
                                $platra[$k]=$platra[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='remi') {
                        $k=1;
                        $lon=$selected4[$j].length;
                        $dato = $selected4[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($platra[$k]==null) {
                                $platra[$k]=$dato;
                            }else{
                                $platra[$k]=$platra[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected4[$j].substring($lon-1, $lon);
                            if ($platra[$k]==null) {
                                $platra[$k]=$dato;
                            }else{
                                $platra[$k]=$platra[$k]+'-'+$dato;
                            }
                        }
                    };
                    if ($res=='ppod') {
                        $k=2;
                        $lon=$selected4[$j].length;
                        $dato = $selected4[$j].substring($lon-2, $lon);
                        if ($dato>0) {
                            if ($platra[$k]==null) {
                                $platra[$k]=$dato;
                            }else{
                                $platra[$k]=$platra[$k]+'-'+$dato;
                            }
                        }else{
                            $dato = $selected4[$j].substring($lon-1, $lon);
                            if ($platra[$k]==null) {
                                $platra[$k]=$dato;
                            }else{
                                $platra[$k]=$platra[$k]+'-'+$dato;
                            }
                        }
                    };
                };
                for ($i = 0; $i <= 2; $i++) {
                    if ($platra[$i]==null) {
                        $platra[$i]="";
                        // console.log('el valor de platra en '+$i+' es: '+$platra[$i]);
                    }
                };
                // localStorage['platra']=$platra;
                localStorage.setItem('platra', JSON.stringify($platra));
            };
            guardar();
        };

}

function guardar(){
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    // console.log('yolo')
    $antmed = localStorage.getItem('antmed');
    $antmed = JSON.parse($antmed);
    localStorage.removeItem("antmed");
    $antsic = localStorage.getItem('antsic');
    $antsic = JSON.parse($antsic);
    localStorage.removeItem("antsic");
    $antodo = localStorage.getItem('antodo');
    $antodo = JSON.parse($antodo);
    localStorage.removeItem("antodo");
    $asfige = localStorage.getItem('asfige');
    $asfige = JSON.parse($asfige);
    localStorage.removeItem("asfige");
    $diaext = localStorage.getItem('diaext');
    $diaext = JSON.parse($diaext);
    localStorage.removeItem("diaext");
    $diaint = localStorage.getItem('diaint');
    $diaint = JSON.parse($diaint);
    localStorage.removeItem("diaint");
    $diaocl = localStorage.getItem('diaocl');
    $diaocl = JSON.parse($diaocl);
    localStorage.removeItem("diaocl");
    $anoden = localStorage.getItem('anoden');
    $anoden = JSON.parse($anoden);
    localStorage.removeItem("anoden");
    $diarad = localStorage.getItem('diarad');
    $diarad = JSON.parse($diarad);
    localStorage.removeItem("diarad");
    $platra = localStorage.getItem('platra');
    $platra = JSON.parse($platra);
    localStorage.removeItem("platra");
        // $num=$antmed.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de antmed en '+$i+' es: '+$antmed[$i]);
        // };
        // $num=$antsic.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de antsic en '+$i+' es: '+$antsic[$i]);
        // };
        // $num=$antodo.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de antodo en '+$i+' es: '+$antodo[$i]);
        // };
        // $num=$asfige.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de asfige en '+$i+' es: '+$asfige[$i]);
        // };
        // $num=$diaext.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de diaext en '+$i+' es: '+$diaext[$i]);
        // };
        // $num=$diaint.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de diaint en '+$i+' es: '+$diaint[$i]);
        // };
        // $num=$diaocl.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de diaocl en '+$i+' es: '+$diaocl[$i]);
        // };
        // $num=$anoden.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de anoden en '+$i+' es: '+$anoden[$i]);
        // };
        // $num=$diarad.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de diarad en '+$i+' es: '+$diarad[$i]);
        // };
        // $num=$platra.length;
        // for ($i = 0; $i < $num; $i++) {
        //     console.log('el valor de platra en '+$i+' es: '+$platra[$i]);
        // };
        
    // $tiempo = new Date();
    // $year = $tiempo.getYear();
    // $month = $tiempo.getMonth();
    // $day = $tiempo.getDay();
    // $fecha = $year+'-'+$month+'-'+$day;
    // // $fecha=date('Y-m-d');
    // alert('la fecha es: '+$fecha);
        
    $.ajax({
        url: 'php/save_histo.php',
        type: 'POST',
        data: {reg_histo: 1, id_pac:$id_pac, id_med:$id_med, antmed:$antmed,  antsic:$antsic, antodo:$antodo, asfige:$asfige, diaext:$diaext, diaint:$diaint, diaocl:$diaocl, anoden:$anoden, diarad:$diarad, platra:$platra},
        beforeSend:function(){

        },
        success:function(html){
            console.log("el html del histo: "+html)
            $resul=html;
            if ($resul.length > 1 ) {
                console.log("venia mas q el numero")
                $lon=$resul.length;
                console.log("el valor de lo q se extrae es del lon: "+$lon)
                $resul = $resul.substring($lon-1, $lon);
                console.log("el valor de lo q se extrae es: "+$resul)
            }                
            console.log("el resul es: "+$resul)
            if ($resul == 1) {
                list_histo();
                $('#cancel_histo').click();
                $('div.histo_msj').html("");
            }else{
                if ($resul == 3) {
                    $('div.histo_msj').html("<div class='alert alert-danger'><h2>ERROR, El formulario esta totalmente vacio</h2></div>");
                }else{
                    $('div.histo_msj').html("<div class='alert alert-danger'><h2>ERROR, Obligatorio llenar: </br> Aspecto Fisico General </br> Diacnostico Extraoral </br> Diacnostico intraoral </br> Anomalias Dentales </br> Plan de Tratamiento </h2></div>");
                }                
            }
        },
        error:function(html){

        }
    })
}