<?php
include_once 'connection.php';
$conexion = new conexion(); 
$conexion->abrir();

/***************************************************
************** INICIAR SESION **********************
****************************************************/
if (isset($_REQUEST['Login'])) {


    $usuario=$_POST['username'];
    $password=sha1($_POST['password']);

    $sql = "SELECT * from sesion where Id_user = :id";
    $stmt = $conexion->consulta($sql);
    $stmt->bindParam(':id', $usuario);
    $stmt->execute();
    $cont = $stmt->rowCount();
    if($cont == 1){

      $sql="SELECT * from sesion,users where  Id_user = ident_user and Id_user = ? and password = ?";
      $result=$conexion->consulta($sql);
      $result->bindParam(1, $usuario);
      $result->bindParam(2, $password);

      $result->execute(); 
      $res=$result->fetchAll();
      if (!empty($res)) {
         foreach ($res as $row) {
            $_SESSION['codUsu']=$row['ident_user'];
            $_SESSION['idUsu']=$row['nombres'].' '.$row['apellidoA'];
            $_SESSION['rolUsu']=$row['tipo_user'];
            header('location:?option=home');
        }
    }else{
     echo "<script>alert('ERROR: usuario o Contraseña incorecta')</script>";
 }
}
else
{
    echo "<script>alert('El Usuario no se encuentra registrado en el sistema')</script>";
}
}


/*************************************************************
***************** NUMERO PAGOS PENDIENTES ********************
**************************************************************/
if (isset($_POST['tot_pag'])) {
    $stado = 'Activo';
    $sql="SELECT * FROM pagos WHERE estado_deuda = :deuda GROUP BY id_cliente";
    $stmt=$conexion->consulta($sql);
    $stmt->bindParam(':deuda',$stado);
    $stmt->execute();
    $cant = $stmt->rowCount();
    echo $cant;
    $conexion->cerrar();
}

/*************************************************************
***************** NUMERO MATERIAL PENDIENTE*******************
**************************************************************/
if (isset($_POST['tot_mat'])) {
    $num=0;
    $cant = $_POST['tot_mat'];
    $sql="SELECT sum(cantidad) AS total from materiales GROUP BY cod_invima;";
    $stmt=$conexion->consulta($sql);
    $stmt->execute();
    $tota_mat = $stmt->rowCount();
    $dat = $stmt->fetchAll();
    
    foreach ($dat as $key) {
        if (($key['total']) < 11) {
            $num++;
        }
    }
echo $num;
$conexion->cerrar();
}


/*************************************************************
***************** NUMERO EMPLADOS EMPRESA ********************
**************************************************************/
if (isset($_POST['tot_emp'])) {
    $rol = 'Medico';
    $rol2 = 'Administrador';
    $sql = "SELECT * FROM users  WHERE (tipo_user = :rol OR tipo_user = :rol2)";
    $stmt=$conexion->consulta($sql);
    $stmt->execute(array('rol' => $rol,'rol2' => $rol2));
$cant = $stmt->rowCount();
echo $cant;
$conexion->cerrar();
}

/*************************************************************
************* NUMERO CITAS HOY *******************************
**************************************************************/
if (isset($_POST['tot_cit'])) {
    $tot = $_POST['tot_cit'];
    $nmus = $_POST['doc'];
    $sqlr="SELECT tipo_user from users WHERE ident_user = ?";
    $result = $conexion->consulta($sqlr);
    $result->bindParam(1,$nmus);
    $result->execute();
    $dato=$result->FETCH(PDO::FETCH_ASSOC);
    extract($dato);
    $rol  = $tipo_user;
    if($rol == 'Administrador'){
        $sql = "SELECT * FROM citas WHERE fecha_cita = :tod";
        $stmt = $conexion->consulta($sql);
        $stmt->execute(array('tod' =>$tot));
    }
    elseif ($rol == 'Medico') {
        $sql = "SELECT * FROM citas WHERE fecha_cita = :tod AND id_medico = :med";
        $stmt = $conexion->consulta($sql);
        $stmt->execute(array('tod' =>$tot, 'med' =>$nmus));
    }

    $total = $stmt->rowCount();
    echo $total;
    $conexion->cerrar();
}

/*************************************************************
************** LISTAR CITAS GENERALES ************************
**************************************************************/
if (isset($_POST['citas'])) {
    $id=$_POST['doc'];
    $sqlr="SELECT tipo_user from users WHERE ident_user = ?";
    $result = $conexion->consulta($sqlr);
    $result->bindParam(1,$id);
    $result->execute();
    $dato=$result->FETCH(PDO::FETCH_ASSOC);
    extract($dato);
    $rol  = $tipo_user;
    if($rol == 'Administrador'){
        $sql = "SELECT * FROM citas ORDER BY estado";
        $stmt = $conexion->consulta($sql);
        $stmt->execute();
        $cnt = $stmt->rowCount();
        if($cnt >0){
            foreach ($stmt as $cit) {
                $med = $cit['id_medico'];
                $pac = $cit['id_paciente'];
                $estado_cit = $cit['estado'];
                $id_cit = $cit['id_cita'];
                
                $sql1="SELECT * FROM users WHERE ident_user = :pac";
                $state=$conexion->consulta($sql1);
                $state->execute(array('pac' => $pac));
                $cantidad=$state->rowCount();
                if ($cantidad>0) {
                    $nomb_pac = $state->FETCH(PDO::FETCH_ASSOC);
                    extract($nomb_pac);
                    $paci=$nombres.' '.$apellidoA;
                    $sql = "SELECT * FROM users WHERE ident_user = :med";
                    $result = $conexion->consulta($sql);
                    $result->bindParam(':med',$med);
                                #$result->bindParam('rolM',$rolMed);
                    $result->execute();
                    $cant = $result->rowCount();
                    if($cant>0){
                        $nomb = $result->FETCH(PDO::FETCH_ASSOC);
                        extract($nomb);
                        if ($estado_cit == 'cumplida') {
                            ?>
                            <tr class="success"> 
                               <th scope="row"><?php echo $pac; ?></th>
                               <td><?php echo $paci; ?></td>
                               <td><?php echo $cit['fecha_cita']; ?></td>
                               <td><?php echo $cit['hora_cita']; ?></td>
                               <td><?php echo $nombres.' '.$apellidoA; ?></td>
                               <!-- <td class="text-center"><button class="btn btn-info list" id="<?php echo $row['ident_user']; ?>"><em class="fa fa-list"></em></button></td> -->
                           </tr>
                           <?php
                       }
                       elseif ($estado_cit == 'cancelada') {
                            ?>
                            <tr class="danger"> 
                                <th scope="row"><?php echo $pac; ?></th>
                                <td><?php echo $paci; ?></td>
                                <td><?php echo $cit['fecha_cita']; ?></td>
                                <td><?php echo $cit['hora_cita']; ?></td>
                                <td><?php echo $nombres.' '.$apellidoA; ?></td>
                                <!-- <td class="text-center"><button class="btn btn-info list" id="<?php echo $row['ident_user']; ?>"><em class="fa fa-list"></em></button></td> -->
                            </tr>
                            <?php
                        }
                        else{
                            ?>
                            <tr> 
                                <th scope="row"><?php echo $pac; ?></th>
                                <td><?php echo $paci; ?></td>
                                <td><?php echo $cit['fecha_cita']; ?></td>
                                <td><?php echo $cit['hora_cita']; ?></td>
                                <td><?php echo $nombres.' '.$apellidoA; ?></td>
                                <td class="text-center" id="<?php echo $id_cit; ?>"><button class="ident_pac_odolist btn btn-primary"><em class="id_cita fa fa-check" id="<?php echo $id_cit; ?>"></em></button> <button class="delete_cita btn btn-danger" id="<?php echo $pac; ?>"><em class="glyphicon glyphicon-remove"></em></button></td>
                            </tr>
                            <?php        
                        }
                    }
                }
                else{
                    echo "Error, el paciente no fue encontrado en el sistema.";
                }

            }
        }
        else{
            ?>
            <tr class="info"> 
                <th scope="row" class="text-center" colspan="4">No hay citas asignadas para este día.</th>     

            </tr>
            <?php        
        }
    }
    elseif($rol == 'Medico'){
        $estado="asignada";
        $sql = "SELECT * FROM citas WHERE id_medico = :med AND estado = :estado";
        $stmt = $conexion->consulta($sql);
        $stmt->bindParam(':med',$id);        
        $stmt->bindParam(':estado',$estado);
        $stmt->execute();
        $cnt = $stmt->rowCount();
        if($cnt >0){
            foreach ($stmt as $cit) {
                $med = $cit['id_medico'];
                $pac = $cit['id_paciente'];
                $estado_cit = $cit['estado'];
                $id_cit = $cit['id_cita'];
                
                $sql1="SELECT * FROM users WHERE ident_user = :pac";
                $state=$conexion->consulta($sql1);
                $state->execute(array('pac' => $pac));
                $cantidad=$state->rowCount();
                if ($cantidad>0) {
                    $nomb_pac = $state->FETCH(PDO::FETCH_ASSOC);
                    extract($nomb_pac);
                    $paci=$nombres.' '.$apellidoA;
                    $sql = "SELECT * FROM users WHERE ident_user = :med";
                    $result = $conexion->consulta($sql);
                    $result->bindParam(':med',$med);
                                #$result->bindParam('rolM',$rolMed);
                    $result->execute();
                    $cant = $result->rowCount();
                    if($cant>0){
                        $nomb = $result->FETCH(PDO::FETCH_ASSOC);
                        extract($nomb);
                        ?>
                        <tr> 
                            <th scope="row"><?php echo $pac; ?></th>
                            <td><?php echo $paci; ?></td>
                            <td><?php echo $cit['fecha_cita']; ?></td>
                            <td><?php echo $cit['hora_cita']; ?></td>
                            <td><?php echo $nombres.' '.$apellidoA; ?></td>
                            <td class="text-center" id="<?php echo $id_cit; ?>"><button class="ident_pac_odolist btn btn-primary" id="<?php echo $pac; ?>" name="<?php echo $med; ?>"><em class="id_cita fa fa-check" id="<?php echo $id_cit; ?>"></em></button> <button class="delete_cita btn btn-danger" id="<?php echo $pac; ?>"><em class="glyphicon glyphicon-remove"></em></button></td>
                        </tr>
                        <?php  
                    }
                }
                else{
                    echo "Error, el paciente no fue encontrado en el sistema.";
                }

            }
        }
        else{
            ?>
            <tr class="info"> 
                <th scope="row" class="text-center" colspan="4">No hay citas asignadas para este día.</th>     

            </tr>
            <?php        
        }
    }   
    $conexion->cerrar();
} 


/*************************************************************
************** BUSCAR CITAS ADM ************************
**************************************************************/
if (isset($_POST['cit_search'])) {
    $word=$_POST['cit_search'];
    $id=$_POST['doc'];

    $sqlr="SELECT tipo_user from users WHERE ident_user = ?";
    $result = $conexion->consulta($sqlr);
    $result->bindParam(1,$id);
    $result->execute();
    $dato=$result->FETCH(PDO::FETCH_ASSOC);
    extract($dato);
    $rol  = $tipo_user;
    if($rol == 'Administrador'){
        $sql = "SELECT * FROM citas WHERE id_paciente = :word ORDER BY estado";
        $stmt = $conexion->consulta($sql);
        $stmt->execute(array('word' => $word));
        $cnt = $stmt->rowCount();
        if($cnt >0){
            foreach ($stmt as $cit) {
                $med = $cit['id_medico'];
                $pac = $cit['id_paciente'];
                $estado_cit = $cit['estado'];
                $id_cit = $cit['id_cita'];
                
                $sql1="SELECT * FROM users WHERE ident_user = :pac";
                $state=$conexion->consulta($sql1);
                $state->execute(array('pac' => $pac));
                $cantidad=$state->rowCount();
                if ($cantidad>0) {
                    $nomb_pac = $state->FETCH(PDO::FETCH_ASSOC);
                    extract($nomb_pac);
                    $paci=$nombres.' '.$apellidoA;
                    $sql = "SELECT * FROM users WHERE ident_user = :med";
                    $result = $conexion->consulta($sql);
                    $result->bindParam(':med',$med);
                                #$result->bindParam('rolM',$rolMed);
                    $result->execute();
                    $cant = $result->rowCount();
                    if($cant>0){
                        $nomb = $result->FETCH(PDO::FETCH_ASSOC);
                        extract($nomb);
                        if ($estado_cit == 'cumplida') {
                            ?>
                            <tr class="success"> 
                               <th scope="row"><?php echo $pac; ?></th>
                               <td><?php echo $paci; ?></td>
                               <td><?php echo $cit['fecha_cita']; ?></td>
                               <td><?php echo $cit['hora_cita']; ?></td>
                               <td><?php echo $nombres.' '.$apellidoA; ?></td>
                               <!-- <td class="text-center"><button class="btn btn-info list" id="<?php echo $row['ident_user']; ?>"><em class="fa fa-list"></em></button></td> -->
                           </tr>
                           <?php
                       }
                       elseif ($estado_cit == 'cancelada') {
                            ?>
                            <tr class="danger"> 
                                <th scope="row"><?php echo $pac; ?></th>
                                <td><?php echo $paci; ?></td>
                                <td><?php echo $cit['fecha_cita']; ?></td>
                                <td><?php echo $cit['hora_cita']; ?></td>
                                <td><?php echo $nombres.' '.$apellidoA; ?></td>
                                <!-- <td class="text-center"><button class="btn btn-info list" id="<?php echo $row['ident_user']; ?>"><em class="fa fa-list"></em></button></td> -->
                            </tr>
                            <?php
                        }
                        else{
                            ?>
                            <tr> 
                                <th scope="row"><?php echo $pac; ?></th>
                                <td><?php echo $paci; ?></td>
                                <td><?php echo $cit['fecha_cita']; ?></td>
                                <td><?php echo $cit['hora_cita']; ?></td>
                                <td><?php echo $nombres.' '.$apellidoA; ?></td>
                                <td class="text-center" id="<?php echo $id_cit; ?>"><button class="ident_pac_odolist btn btn-primary"><em class="id_cita fa fa-check" id="<?php echo $id_cit; ?>"></em></button> <button class="delete_cita btn btn-danger" id="<?php echo $pac; ?>"><em class="glyphicon glyphicon-remove"></em></button></td>
                            </tr>
                            <?php        
                        }
                    }
                }
                else{
                    echo "Error, el paciente no fue encontrado en el sistema.";
                }

            }
        }
        else{
            ?>
            <tr class="info"> 
                <th scope="row" class="text-center" colspan="4">No hay citas asignadas para este día.</th>     

            </tr>
            <?php        
        }
    }
    elseif($rol == 'Medico'){
        $estado="asignada";
        $sql = "SELECT * FROM citas WHERE id_paciente = :word AND id_medico = :med AND estado = :estado";
        $stmt = $conexion->consulta($sql);
        $stmt->execute(array('word' => $word, 'med' => $id, 'estado' => $estado,));
        $cnt = $stmt->rowCount();
        if($cnt >0){
            foreach ($stmt as $cit) {
                $med = $cit['id_medico'];
                $pac = $cit['id_paciente'];
                $estado_cit = $cit['estado'];
                $id_cit = $cit['id_cita'];
                
                $sql1="SELECT * FROM users WHERE ident_user = :pac";
                $state=$conexion->consulta($sql1);
                $state->execute(array('pac' => $pac));
                $cantidad=$state->rowCount();
                if ($cantidad>0) {
                    $nomb_pac = $state->FETCH(PDO::FETCH_ASSOC);
                    extract($nomb_pac);
                    $paci=$nombres.' '.$apellidoA;
                    $sql = "SELECT * FROM users WHERE ident_user = :med";
                    $result = $conexion->consulta($sql);
                    $result->bindParam(':med',$med);
                                #$result->bindParam('rolM',$rolMed);
                    $result->execute();
                    $cant = $result->rowCount();
                    if($cant>0){
                        $nomb = $result->FETCH(PDO::FETCH_ASSOC);
                        extract($nomb);
                        ?>
                        <tr> 
                            <th scope="row"><?php echo $pac; ?></th>
                            <td><?php echo $paci; ?></td>
                            <td><?php echo $cit['fecha_cita']; ?></td>
                            <td><?php echo $cit['hora_cita']; ?></td>
                            <td><?php echo $nombres.' '.$apellidoA; ?></td>
                            <td class="text-center" id="<?php echo $id_cit; ?>"><button class="ident_pac_odolist btn btn-primary" id="<?php echo $pac; ?>" name="<?php echo $med; ?>"><em class="id_cita fa fa-check" id="<?php echo $id_cit; ?>"></em></button> <button class="delete_cita btn btn-danger" id="<?php echo $pac; ?>"><em class="glyphicon glyphicon-remove"></em></button></td>
                        </tr>
                        <?php  
                    }
                }
                else{
                    echo "Error, el paciente no fue encontrado en el sistema.";
                }

            }
        }
        else{
            ?>
            <tr class="info"> 
                <th scope="row" class="text-center" colspan="4">No hay citas asignadas para este día.</th>     

            </tr>
            <?php        
        }
    }   
    $conexion->cerrar();
    
} 


/*************************************************************
************** LISTAR VERSIONES DEL HISTORIAL ****************
**************************************************************/
if (isset($_POST['lisdat'])) {
    $id_pac=$_POST['id_pac'];
    $sqlr="SELECT  Id_descripcion_historia, num_historia, fecha_historia, Id_medico_asignado from historia, descripcion_historia WHERE historia.num_historia = descripcion_historia.Id_num_historia AND Id_usuario = ? ";
    $result = $conexion->consulta($sqlr);
    $result->bindParam(1,$id_pac);
    $result->execute();
    $cant=$result->rowCount();
    if ($cant>0) {
        $data = $result->fetchAll();
        foreach($data as $row){
            $id_med = $row['Id_medico_asignado'];
            $sql="SELECT nombres, apellidoA, apellidoS from users WHERE ident_user = ?";
            $result = $conexion->consulta($sql);
            $result->bindParam(1,$id_med);
            $result->execute();
            $dat=$result->FETCH(PDO::FETCH_ASSOC);
            extract($dat);
            ?>
                <tr class="success"> 
                   <th scope="row"><?php echo $row['fecha_historia']; ?></th>
                   <td><?php echo $nombres.' '.$apellidoA.' '.$apellidoS; ?></td>
                   <td class="text-center"><button class="show_histo btn btn-info list" id="<?php echo $row['Id_descripcion_historia']; ?>" name="<?php echo $row['fecha_historia']; ?>"><em class="fa fa-list"></em></button></td>
                </tr>
            <?php
        }
    }
    else
    {
        ?>
        <tr class="info">
            <th scope="row" class="text-center" colspan="7">No se encontraron registros en el sistema.</th>
        </tr>
        <?php  
    }

$conexion->cerrar();
} 



/*************************************************************
************** LISTAR CITAS HOY ADMIN ************************
**************************************************************/
if (isset($_POST['adm_today'])) {
    $today = $_POST['adm_today'];
    $id=$_POST['rol'];
    $sqlr="SELECT tipo_user from users WHERE ident_user = ?";
    $result = $conexion->consulta($sqlr);
    $result->bindParam(1,$id);
    $result->execute();
    $dato=$result->FETCH(PDO::FETCH_ASSOC);
    extract($dato);
    $rol  = $tipo_user;
    if($rol =='Administrador'){
        $sql = "SELECT *, from_unixtime(hora_cita,'%H:%I:%p') as hora FROM citas WHERE fecha_cita = ?  ORDER BY hora_cita";
        $stmt = $conexion->consulta($sql);
        $stmt->bindParam(1,$today);
        $stmt->execute();
    }
    elseif($rol =='Medico'){
        $sql = "SELECT *, from_unixtime(hora_cita,'%h:%i:%p') as hora FROM citas WHERE fecha_cita = ? AND id_medico =? ORDER BY hora_cita";
        $stmt = $conexion->consulta($sql);
        $stmt->bindParam(1,$today);
        $stmt->bindParam(2,$id);
        $stmt->execute();
    }
    else{
        echo $rol;
    }
    
    $cnt = $stmt->rowCount();
    if($cnt >0){
        foreach ($stmt as $cit) {
            $med = $cit['id_medico'];
            $pac = $cit['id_paciente'];
            $estado_cit = $cit['estado'];
            #$rolMed='Medico';
            $sql1="SELECT * FROM users WHERE ident_user = :pac";
            $state=$conexion->consulta($sql1);
            $state->execute(array('pac' => $pac));
$cantidad=$state->rowCount();
if ($cantidad>0) {
    $nomb_pac = $state->FETCH(PDO::FETCH_ASSOC);
    extract($nomb_pac);
    $paci=$nombres.' '.$apellidoA;
    $sql = "SELECT * FROM users WHERE ident_user = :med";
    $result = $conexion->consulta($sql);
    $result->bindParam(':med',$med);
                #$result->bindParam('rolM',$rolMed);
    $result->execute();
    $cant = $result->rowCount();
    if($cant>0){
        $nomb = $result->FETCH(PDO::FETCH_ASSOC);
        extract($nomb);
        if ($estado_cit == 'cumplida') {
            ?>
            <tr class="success"> 
                <th scope="row"><?php echo $pac; ?></th>
                <td><?php echo $paci; ?></td>
                <td><?php echo $cit['hora']; ?></td>
                <td><?php echo $nombres.' '.$apellidoA; ?></td>
            </tr>
            <?php
        }
        elseif ($estado_cit == 'cancelada') {
            ?>
            <tr class="danger"> 
                <th scope="row"><?php echo $pac; ?></th>
                <td><?php echo $paci; ?></td>
                <td><?php echo $cit['hora']; ?></td>
                <td><?php echo $nombres.' '.$apellidoA; ?></td>
            </tr>
            <?php
        }
        else{
            ?>
            <tr> 
                <th scope="row"><?php echo $pac; ?></th>
                <td><?php echo $paci; ?></td>
                <td><?php echo $cit['hora']; ?></td>
                <td><?php echo $nombres.' '.$apellidoA; ?></td>
            </tr>
            <?php        
        }

    }
}

}
}
else{
    ?>
    <tr class="info"> 
        <th scope="row" class="text-center" colspan="4">No hay citas asignadas para este día.</th>     

    </tr>
    <?php        
}
$conexion->cerrar();
} 

/********************************************************************
************************* LISTAR CLIENTES **************************
*********************************************************************/
if (isset($_POST['cod_cli'])) {
    $user = 'cliente';
    $sql="SELECT * FROM users WHERE tipo_user = :tipo";
    $result=$conexion->consulta($sql);
    $result->execute(array('tipo' =>$user ));
    $cont = $result->rowCount();
    if($cont > 0){
        $dat = $result->fetchAll();
        foreach($dat as $row){

            ?>
            <tr>
                <th scope="row" class="text-center"><?php echo $row['ident_user']; ?></th>
                <td class="text-center"><?php echo $row['nombres']; ?></td>
                <td class="text-center"><?php echo $row['apellidoA']; ?></td>
                <td class="text-center"><?php echo $row['telefono']; ?></td>
                <td class="text-center"><?php echo $row['email']; ?></td>
                <td class="text-center"><?php echo $row['direccion']; ?></td>
                <td class="text-center"><button type="button" class="btn btn-primary upd" id="<?php echo $row['ident_user']; ?>" data-toggle="modal" data-target="#myModal2"><em class="fa fa-pencil"></em></button> <button onclick="detalle()" class="btn btn-info list" id="<?php echo $row['ident_user']; ?>"><em class="fa fa-list"></em></button></td>
            </tr>
            <?php 
        }
    } 
    else
    {
        ?>
        <tr class="info">
            <th scope="row" class="text-center" colspan="7">No se encontraron registros en el sistema.</th>
        </tr>
        <?php  
    }

    $conexion->cerrar();
}

/********************************************************************
****************** LISTAR PACIENTES BUSCADOR ************************
*********************************************************************/
if (isset($_POST['user_search'])) {
    $user = $_POST['tip_user'];
    $word = $_POST['user_search'];
    $sql="SELECT * FROM users WHERE ident_user = :word and tipo_user = :user";
    $result=$conexion->consulta($sql);
    $result->execute(array('word' =>$word, 'user' =>$user ));
    $cont = $result->rowCount();
    if($cont > 0){
        $dat = $result->fetchAll();
        foreach($dat as $row){

            ?>
            <tr>
                <th scope="row" class="text-center"><?php echo $row['ident_user']; ?></th>
                <td class="text-center"><?php echo $row['nombres']; ?></td>
                <td class="text-center"><?php echo $row['apellidoA']; ?></td>
                <td class="text-center"><?php echo $row['telefono']; ?></td>
                <td class="text-center"><?php echo $row['email']; ?></td>
                <td class="text-center"><?php echo $row['direccion']; ?></td>
                <td class="text-center"><button type="button" class="btn btn-primary upd" id="<?php echo $row['ident_user']; ?>" data-toggle="modal" data-target="#myModal2"><em class="fa fa-pencil"></em></button> <button onclick="detalle()" class="btn btn-info list" id="<?php echo $row['ident_user']; ?>"><em class="fa fa-list"></em></button></td>
            </tr>
            <?php 
        }
    } 
    else
    {
        ?>
        <tr class="info">
            <th scope="row" class="text-center" colspan="7">No se encontraron registros en el sistema.</th>
        </tr>
        <?php  
    }
    
    $conexion->cerrar();
}


/********************************************************************
****************** LISTAR ADMINISTRADORES BUSCADOR ************************
*********************************************************************/
if (isset($_POST['adm_search'])) {
    $user1 = $_POST['tip_user1'];
    $user2 = $_POST['tip_user2'];
    $word = $_POST['adm_search'];
    $sql="SELECT * FROM users WHERE ident_user = :word AND (tipo_user = :user1 OR tipo_user = :user2)";
    $result=$conexion->consulta($sql);
    $result->execute(array('word' =>$word, 'user1' =>$user1, 'user2' =>$user2 ));
    $cont = $result->rowCount();
    if($cont > 0){
    $dat = $result->fetchAll();
    foreach($dat as $row){
        ?>
        <tr>
            <th scope="row" class="text-center"><?php echo $row['ident_user']; ?></th>
            <td class="text-center"><?php echo $row['nombres']; ?></td>
            <td class="text-center"><?php echo $row['apellidoA']; ?></td>
            <td class="text-center"><?php echo $row['telefono']; ?></td>
            <td class="text-center"><?php echo $row['email']; ?></td>
            <td class="text-center"><?php echo $row['direccion']; ?></td>
            <td class="text-center"><button class="btn btn-primary upd_adm" id="<?php echo $row['ident_user'];?>" data-toggle="modal" data-target="#myModal2"><em class="fa fa-pencil"></em></button> <button class="btn btn-info list" id="<?php echo $row['ident_user']; ?>"><em class="fa fa-list"></em></button></td>
        </tr>
        <?php 
    }
}
else
{
 ?>
 <tr class="info">
    <th scope="row" class="text-center" colspan="7">No se encontraron registros en el sistema.</th>
</tr>
<?php  
}
    
    $conexion->cerrar();
}

/*****************************************************************************
******************************* LISTAR EMPLEADOS *****************************
******************************************************************************/
if (isset($_POST['cod_emp'])) {
    $user = 'Medico';
    $user2 = 'Administrador';
    $sql="SELECT * FROM users WHERE (tipo_user = :tipo || tipo_user = :tipo2)";
    $result=$conexion->consulta($sql);
    $result->execute(array('tipo'=>$user,'tipo2' =>$user2 ));
$cont = $result->rowCount();
if($cont > 0){
    $dat = $result->fetchAll();
    foreach($dat as $row){
        ?>
        <tr>
            <th scope="row" class="text-center"><?php echo $row['ident_user']; ?></th>
            <td class="text-center"><?php echo $row['nombres']; ?></td>
            <td class="text-center"><?php echo $row['apellidoA']; ?></td>
            <td class="text-center"><?php echo $row['telefono']; ?></td>
            <td class="text-center"><?php echo $row['email']; ?></td>
            <td class="text-center"><?php echo $row['direccion']; ?></td>
            <td class="text-center"><button class="btn btn-primary upd_adm" id="<?php echo $row['ident_user'];?>" data-toggle="modal" data-target="#myModal2"><em class="fa fa-pencil"></em></button> <button class="btn btn-info list" id="<?php echo $row['ident_user']; ?>"><em class="fa fa-list"></em></button></td>
        </tr>
        <?php 
    }
}
else
{
 ?>
 <tr class="info">
    <th scope="row" class="text-center" colspan="7">No se encontraron registros en el sistema.</th>
</tr>
<?php  
}

$conexion->cerrar();
}


/*****************************************************************************
******************************* LISTAR MATERIALES ****************************
******************************************************************************/

if(isset($_POST['prods'])){
    $sql="SELECT * FROM materiales ORDER BY descripcion";
    $result=$conexion->consulta($sql);
    $result->execute();
    $cont = $result->rowCount();
    if($cont > 0){
        $dat = $result->fetchAll();
        foreach($dat as $row){
            ?>
            <tr>
                <td class="text-center"><?php echo $row['cod_invima']; ?></td>
                <td class="text-center"><?php echo $row['descripcion']; ?></td>
                <td class="text-center"><?php echo $row['cantidad']; ?></td>
                <td class="text-center"><button class="btn btn-danger upd_material" id="<?php echo $row['cod_invima']; ?>" data-toggle="modal" data-target="#myModal2"><em class="fa fa-pencil"></em></button> <button class="btn btn-primary upd_material2" id="<?php echo $row['cod_invima']; ?>" data-toggle="modal" data-target="#myModal3"><em class="fa fa-pencil"></em></button></td>
            </tr>
            <?php 
        }
    }
    else
    {
       echo "No se encontraron registros";
   }
   $conexion->cerrar();
}


/*****************************************************************************
******************************* BUSCAR MATERIALES ****************************
******************************************************************************/

if(isset($_POST['mat_search'])){
    $word = "%".$_POST['mat_search']."%";
    $sql="SELECT * FROM materiales WHERE descripcion LIKE :word";
    $result=$conexion->consulta($sql);
    $result->execute(array('word' => $word));
    $cont = $result->rowCount();
    if($cont > 0){
        $dat = $result->fetchAll();
        foreach($dat as $row){
            ?>
            <tr>
                <td class="text-center"><?php echo $row['cod_invima']; ?></td>
                <td class="text-center"><?php echo $row['descripcion']; ?></td>
                <td class="text-center"><?php echo $row['cantidad']; ?></td>
                <td class="text-center"><button class="btn btn-danger upd_material" id="<?php echo $row['cod_invima']; ?>" data-toggle="modal" data-target="#myModal2"><em class="fa fa-pencil"></em></button> <button class="btn btn-primary upd_material2" id="<?php echo $row['cod_invima']; ?>" data-toggle="modal" data-target="#myModal3"><em class="fa fa-pencil"></em></button></td>
            </tr>
            <?php 
        }
    }
    else
    {
       echo "No se encontraron registros";
   }
   $conexion->cerrar();
}


/*****************************************************************************
******************************* BSCAR MATERIAL EDITAR ****************************
******************************************************************************/

if(isset($_POST['prodeditshow1'])){
    $idmat = $_POST['idmat'];
    $sql = "SELECT * FROM materiales WHERE cod_invima = :idmat";
    $result = $conexion->consulta($sql);
    $result->execute(array('idmat' => $idmat));
    $cont = $result->rowCount();
    if($cont > 0){
        $dat = $result->fetchAll();
        foreach($dat as $row){
            ?>
            <div class="form-group">
                <label class="control-label"  for="cod_invima">Código invima</label>
                <input type="number" name="cod_invima" id="cod_invima" class="form-control" value="<?php echo $row['cod_invima']; ?>" disabled>
            </div>
            <div class="form-group">
                <label class="control-label" for="descripcion">Descripción</label>
                <input type="text" name="descripcion" id="descripcion" class="form-control" value="<?php echo $row['descripcion']; ?>" disabled>
            </div>
            <div class="form-group">
                <label class="control-label" for="descripcion">Cantidad de Entrada</label>
                <input type="text" name="cantidad" id="cantidad" class="form-control">
            </div>
            <?php 
        }
    }
    else
    {
       echo "No se encontraron registros";
   }
   $conexion->cerrar();
}


/***************************************************************
********** BUSCAR EDITAR CANTIDAD MATERIAL SUMA ****************
****************************************************************/

if(isset($_POST['sumas_edi_cant_prod'])){
    $cod= $_POST['cod'];
    $cant= $_POST['cant'];
    $sql = "SELECT * FROM materiales WHERE cod_invima = :cod";
    $result = $conexion->consulta($sql);
    $result->execute(array('cod' => $cod));
    $cont = $result->rowCount();
    if($cont > 0){
        $cant_mat = $result->FETCH(PDO::FETCH_ASSOC);
        extract($cant_mat); 
        $cnt2 = $cantidad; 
        $can = $cant+$cnt2;          
        echo $can;  
    }
    else
    {
        echo "No se encontraron registros";
    }
    $conexion->cerrar();
}


/***************************************************************
********** BUSCAR EDITAR CANTIDAD MATERIAL RESTA ***************
****************************************************************/

if(isset($_POST['rest_edi_cant_prod'])){
    $cod= $_POST['cod'];
    $cant= $_POST['cant'];
    $sql = "SELECT * FROM materiales WHERE cod_invima = :cod";
    $result = $conexion->consulta($sql);
    $result->execute(array('cod' => $cod));
    $cont = $result->rowCount();
    if($cont > 0){
         $cant_mat = $result->FETCH(PDO::FETCH_ASSOC);
        extract($cant_mat); 
        $cnt2 = $cantidad; 
        $can = $cnt2-$cant;          
        echo $can;  
    }
    else
    {
        echo "No se encontraron registros";
    }
    $conexion->cerrar();
}



/***************************************************************
********** EDITAR ENTRADA MATERIAL *****************************
****************************************************************/

if(isset($_POST['edi_cant_prod'])){
    $cod= $_POST['cod'];
    $descr= $_POST['desc'];
    $cant= $_POST['cant'];
    $cant2= $_POST['cant2'];
    if ($cant2 >= 1) {
        $sql = 'UPDATE materiales SET descripcion = :descr, cantidad = :cant where cod_invima = :cod';
        $stmt = $conexion->consulta($sql);
        $stmt->execute(array('cod' => $cod,'descr'=>$descr,'cant'=>$cant));
        $cant = $stmt->rowCount();
        if($cant == 1){
            echo 3;
        }
        else{
            echo 2;
        }
        $conexion->cerrar();
    }else{
        echo 1;
    }
    
}

/*****************************************************************************
******************************* BSCAR MATERIAL EDITAR ****************************
******************************************************************************/

if(isset($_POST['prodeditshow2'])){
    $idmat = $_POST['idmat'];
    $sql = "SELECT * FROM materiales WHERE cod_invima = :idmat";
    $result = $conexion->consulta($sql);
    $result->execute(array('idmat' => $idmat));
    $cont = $result->rowCount();
    if($cont > 0){
        $dat = $result->fetchAll();
        foreach($dat as $row){
            ?>
            <div class="form-group">
                <label class="control-label"  for="cod_invima">Código invima</label>
                <input type="number" name="cod_invima" id="cod_invima" class="form-control" value="<?php echo $row['cod_invima']; ?>" disabled>
            </div>
            <div class="form-group">
                <label class="control-label" for="descripcion">Descripción</label>
                <input type="text" name="descripcion" id="descripcion" class="form-control" value="<?php echo $row['descripcion']; ?>" disabled>
            </div>
            <div class="form-group">
                <label class="control-label" for="descripcion">Cantidad de Salida</label>
                <input type="text" name="cantidad" id="cantidad" class="form-control">
            </div>
            <?php 
        }
    }
    else
    {
       echo "No se encontraron registros";
   }
   $conexion->cerrar();
}





/*****************************************************************************
************************ ACTUALIZAR DATOS DEL PACIENTE ***********************
******************************************************************************/

if (isset($_POST['cod_emp2'])) {
    $doc=$_POST['doc'];
    $sql="SELECT * FROM users, acudientes WHERE ident_user=:doc";
    $result=$conexion->consulta($sql);
    $result->execute(array(':doc' =>$doc));
$cont = $result->rowCount();
if($cont > 0){
    $dat = $result->fetchAll();
    foreach($dat as $row){
        $source = $row['fecha_Nacimiento'];
        $date = date("d-m-Y", strtotime($source));

        ?>

        <!-- content goes here -->
        <form>
            <div class="form-group">
                <label class="control-label"  for="tipo_doc">Tipo documento</label>
                <select name="tipo_doc" id="tipo_doc" class="form-control" required="true" disabled="disabled">
                    <option value="-1">Seleccionar</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="CC" selected>Cédula de Ciudadania</option>
                </select>
            </div>
            <div class="form-group">
                <label class="control-label"  for="identificacion">Identificación</label>
                <input type="integer" name="identificacion" id="identificacion" class="form-control" required disabled="disabled" value="<?php echo $row['ident_user']; ?>">
            </div>
            <div class="form-group">
                <label class="control-label" for="nombres">Nombres</label>
                <input type="text" name="nombres" id="nombres" class="form-control" required value="<?php echo $row['nombres']; ?>">
            </div>
            <div class="form-group">
                <label class="control-label" for="apellido1">Primer Apellido</label>
                <input type="text" name="apellido1" id="apellido1" class="form-control" required value="<?php echo $row['apellidoA']; ?>">
            </div>
            <div class="form-group">
                <label class="control-label" for="apellido2">Segundo Apellido</label>
                <input type="text" name="apellido2" id="apellido2" class="form-control" value="<?php echo $row['apellidoS']; ?>">
            </div>
            <div class="form-group">
                <label class="control-label"  for="fecha_na">Fecha de Nacimiento</label>
                <input type="date" name="fecha_na" id="fecha_na" class="form-control" required value="<?php echo $date; ?>">
            </div>
            <div class="form-group">
                <label class="control-label"  for="direccion">Dirección vivienda:</label>
                <input type="text" name="direccion" id="direccion" class="form-control" required value="">
            </div>
            <div class="form-group">
                <label for="Género" class="control-label">Género</label>
                <input type="radio" id="MASCULINO" value="M" name="Genero"> Masculino
                <input type="radio" id="FEMENINO" value="F" name="Genero"> Femenino
            </div>
            <div class="form-group">
                <label for="Ocupacion" class="control-label">Ocupación</label>
                <input type="text" class="form-control" id="Ocupacion" name="Ocupacion" class="form-control">
            </div>
            <div class="form-group">
                <label class="control-label"  for="telefono">Estado Civil</label>
                <select name="estado_cvl" id="estado_cvl" class="form-control">
                    <option value="">Seleccionar</option>
                    <option value="SOLTERO(A)">Soltero(a)</option>
                    <option value="CASADO(a)">Casado(a)</option>
                    <option value="UNION LIBRE">Unión lobre</option>
                    <option value="VIUDO(A)">Viudo(a)</option>
                </select>
            </div>                    
            <div class="form-group">
              <label class="control-label"  for="telefono">Telefono</label>
              <input type="integer" name="telefono" id="telefono" class="form-control" value="<?php echo $row['telefono']; ?>">
          </div>
          <div class="form-group">
              <label class="control-label"  for="email">Email</label>
              <input type="integer" name="email" id="email" class="form-control" value="<?php echo $row['email']; ?>">
          </div>
          <div class="form-group">
            <label class="control-label" for="nomb_acu">Nombre acudiente</label>
            <input type="text" name="nomb_acu" id="nomb_acu" class="form-control" required>
        </div>
        <div class="form-group">
            <label class="control-label" for="tel_acu">Telefono acudiente</label>
            <input type="text" name="tel_acu" id="tel_acu" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="Cargo" class="control-label">Cargo</label>
            <input type="radio" id="ADMINISTRATIVO" value="Administrador" name="Cargo"> Administrativo
            <input type="radio" id="MEDICO" value="Medico" name="Cargo"> Medico
        </div>
    </form>
    <?php 
}
}
else
{
 echo "No se encontraron registros";
}

$conexion->cerrar();
}



/********************************************************************
************************* BUSCAR NOMBRE DEL PACIENTE **************************
*********************************************************************/
if (isset($_POST['lisnom'])) {
    $numide = $_POST['numide'];
    $id_pac = $_POST['id_pac'];
    $id_med = $_POST['id_med'];
    $sql="SELECT * FROM users WHERE ident_user = :id_pac";
    $result=$conexion->consulta($sql);
    $result->execute(array('id_pac' =>$id_pac ));
    $cont = $result->rowCount();
    if($cont > 0){
        $nomb_pac = $result->FETCH(PDO::FETCH_ASSOC);
        extract($nomb_pac);
        $paci=$nombres.' '.$apellidoA.' '.$apellidoS;
        if ($numide==1) {
            ?>
                <!-- <div class="col-md-2"><button type="button" class="btn btn_5 btn-lg btn-primary" id="">Volver</button></div> -->
                <div class="col-md-6"><h3>Nombre: <?php echo $paci ?></h3></div>
                <div class="col-md-6 nombrepac" name="<?php echo $id_med ?>" id="<?php echo $ident_user ?>"><h3>Cedula: <?php echo $ident_user ?></h3></div> 
            <?php
            // echo "<h3>Nombre: <span id='".$ident_user."'>$paci</span></h3>";
        }
        else
        {
            ?>
                <div class="col-md-1"><button type="button" class="vol_btn btn btn_5 btn-lg btn-primary" id="">Volver</button></div>
                <div class="col-md-6"><h3>Nombre: <?php echo $paci ?></h3></div>
                <div class="col-md-5 nombrepac" name="<?php echo $id_med ?>" id="<?php echo $ident_user ?>"><h3>Cedula: <?php echo $ident_user ?></h3></div> 
            <?php
        }
        
    } 
    else
    {
        echo "ERROR, algo salio mal"; 
    }

    $conexion->cerrar();
}


/********************************************************************
******* BUSCAR NOMBRE DEL PACIENTE PARA CONSULTAR HISTORIA **********
*********************************************************************/
if (isset($_POST['lisnomB'])) {
    $id_pac = $_POST['id_pac'];
    $sql="SELECT * FROM users WHERE ident_user = :id_pac";
    $result=$conexion->consulta($sql);
    $result->execute(array('id_pac' =>$id_pac ));
    $cont = $result->rowCount();
    if($cont > 0){
        $nomb_pac = $result->FETCH(PDO::FETCH_ASSOC);
        extract($nomb_pac);
        $paci=$nombres.' '.$apellidoA.' '.$apellidoS;
        ?>
            <div class="col-md-1"><button type="button" class="vol_btn btn btn_5 btn-lg btn-primary" id="">Volver</button></div>
            <div class="col-md-6"><h3>Nombre: <?php echo $paci ?></h3></div>
            <div class="col-md-5 nombrepac" name="<?php echo $id_med ?>" id="<?php echo $ident_user ?>"><h3>Cedula: <?php echo $ident_user ?></h3></div> 
        <?php
        
    } 
    else
    {
        echo "ERROR, algo salio mal"; 
    }

    $conexion->cerrar();
}









?>

