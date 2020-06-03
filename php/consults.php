<?php 
include_once 'connection.php';
$conexion = new conexion();
$conexion->abrir();


	/***************************************************************
	********** REGISTRAR USUARIO CLIENTE **************************
	****************************************************************/

	if(isset($_POST['reg_pac'])){ 
		$tipo= $_POST['tipo']; 
		$id= $_POST['id'];
		$nomb= $_POST['nomb'];
		$ape1= $_POST['ape1'];
		$ape2= $_POST['ape2'];
		$f_nac= $_POST['f_nac'];
		$direc= $_POST['direccion'];
		$sexo= $_POST['sexo'];
		$email= $_POST['email'];
		$phone = $_POST['phone'];
		$user_tipo = 'Cliente';
		$conf = "SELECT iden_user from users WHERE ident_user = :doc";
		$res = $conexion->consulta($conf);
		$res->execute(array('doc' => $id));
		$d=$res->rowCount();
		if($d == 1){
			echo 1;
		}
		else{
			$sql = 'INSERT INTO users(tipo_doc,ident_user,nombres,apellidoA,apellidoS,fecha_Nacimiento, telefono,email,direccion,tipo_user,genero) VALUES (:tip,:doc,:nom,:ape1,:ape2,:fecha_nac,:tel,:email,:direc,:tip_user,:gen)';
			$stmt = $conexion->consulta($sql);
			$stmt->execute(array('tip' => $tipo,'doc'=>$id,'nom'=>$nomb,'ape1'=>$ape1,'ape2'=>$ape2,'fecha_nac'=>$f_nac,'tel'=>$phone,'email'=>$email,'direc'=>$direc,'tip_user'=>$user_tipo,'gen'=>$sexo ));
			$cant = $stmt->rowCount();
			if($cant == 1){
				echo 2;
			}
		}
		$conexion->cerrar();
	}

	/***************************************************************
	********** REGISTRAR USUARIO ADMINISTRADOR **************************
	****************************************************************/

	if(isset($_POST['reg_adm'])){ 
		$tipo= $_POST['tipo']; 
		$id= $_POST['id'];
		$nomb= $_POST['nomb'];
		$ape1= $_POST['ape1'];
		$ape2= $_POST['ape2'];
		$f_nac= $_POST['f_nac'];
		$direc= $_POST['direccion'];
		$sexo= $_POST['sexo'];
		$email= $_POST['email'];
		$phone = $_POST['phone'];
		$user_tipo = $_POST['tip_user'];
		$conf = "SELECT iden_user from users WHERE ident_user = :doc";
		$res = $conexion->consulta($conf);
		$res->execute(array('doc' => $id));
		$d=$res->rowCount();
		if($d == 1){
			echo 1;
		}
		else{
			$sql = 'INSERT INTO users(tipo_doc,ident_user,nombres,apellidoA,apellidoS,fecha_Nacimiento, telefono,email,direccion,tipo_user,genero) VALUES (:tip,:doc,:nom,:ape1,:ape2,:fecha_nac,:tel,:email,:direc,:tip_user,:gen)';
			$stmt = $conexion->consulta($sql);
			$stmt->execute(array('tip' => $tipo,'doc'=>$id,'nom'=>$nomb,'ape1'=>$ape1,'ape2'=>$ape2,'fecha_nac'=>$f_nac,'tel'=>$phone,'email'=>$email,'direc'=>$direc,'tip_user'=>$user_tipo,'gen'=>$sexo ));
			$cant = $stmt->rowCount();
			if($cant == 1){
				echo 2;
			}
		}
		$conexion->cerrar();
	}


	/***************************************************************
	********** REGISTRAR PRODUCTO  *********************************
	****************************************************************/

	if(isset($_POST['reg_prod'])){ 
		$id= $_POST['cod']; 
		$des= $_POST['desc'];
		$cant= $_POST['cant'];
		
		$sql = 'SELECT * FROM materiales WHERE cod_invima = :id';
		$stmt = $conexion->consulta($sql);
		$stmt->execute(array('id' => $id));
		$cant = $stmt->rowCount();
		if($cant == 1){
			echo 1;			
		}
		else{
			$sql = 'INSERT INTO materiales(cod_invima,descripcion,cantidad) VALUES (:id,:descr,:cant)';
			$stmt = $conexion->consulta($sql);
			$stmt->execute(array('id' => $id,'descr'=>$des,'cant'=>$cant));
			$cant = $stmt->rowCount();
			if($cant == 1){
				echo 3;			
			}
			else{
				echo 2;
			}
		}			
		$conexion->cerrar();
	}


	/***************************************************************
	*********** MOSTRAR DATOS ACTUALIZAR DATOS CLIENTE ************
	****************************************************************/
	if(isset($_POST['user_update_dat'])){
		$id = $_POST['user_update_dat'];
		$sql = "SELECT * FROM users WHERE ident_user = :dat";
		$stmt = $conexion->consulta($sql);
		$stmt->execute(array('dat' => $id));
		$n = $stmt->rowCount();
		if ($n == 1) {
			$pers = $stmt->FETCH(PDO::FETCH_ASSOC);
			extract($pers);
				?>
				<div class="form-group">
					<label class="control-label"  for="tipo_doc">Tipo documento</label>
					<select name="tipo_doc" id="tipo_doc" class="form-control" required>
						<option value="">Seleccionar</option>
						<option value="TI" <?php if ( $tipo_doc == "TI") { echo "selected='selected'";} ?>>Tarjeta de Identidad</option>
						<option value="CC" <?php if ( $tipo_doc == "CC") { echo "selected='selected'";} ?>>Cédula de Ciudadania</option>
					</select>
				</div>
				<div class="form-group">
					<label class="control-label"  for="identificacion">Identificación</label>
					<input type="number" name="identificacion" id="identificacion" class="form-control" value="<?php echo $ident_user; ?>" disabled>
				</div>
				<div class="form-group">
					<label class="control-label" for="nombres">Nombres</label>
					<input type="text" name="nombres" id="nombres" class="form-control" value="<?php echo $nombres; ?>" required>
				</div>
				<div class="form-group">
					<label class="control-label" for="apellido1">Primer Apellido</label>
					<input type="text" name="apellido1" id="apellido1" class="form-control" value="<?php echo $apellidoA; ?>" required>
				</div>
				<div class="form-group">
					<label class="control-label" for="apellido2">Segundo Apellido</label>
					<input type="text" name="apellido2" id="apellido2" value="<?php echo $apellidoS; ?>" class="form-control">
				</div>
				<div class="form-group">
					<label class="control-label" for="apellido2">Correo electronico</label>
					<input type="email" name="email" id="email" class="form-control" value="<?php echo $email; ?>" required>
				</div>
				<div class="form-group">
					<label class="control-label"  for="fecha_na">Fecha de Nacimiento</label>
					<input type="date" name="fecha_na" id="fecha_na" class="form-control" value="<?php echo $fecha_Nacimiento; ?>" required>
				</div>
				<div class="form-group">
					<label class="control-label"  for="direccion">Dirección vivienda:</label>
					<input type="text" name="direccion" id="direccion" class="form-control" value="<?php echo $direccion; ?>" required>
				</div>
				<div class="form-group">
					<label for="Género" class="control-label">Género</label>
					<?php if($genero == 'M'){ ?>
					<input type="radio" id="MASCULINO" value="M" name="Genero" checked> Masculino
					<input type="radio" id="FEMENINO" value="F" name="Genero"> Femenino
					<?php
				}
				else{
					?>
					<input type="radio" id="MASCULINO" value="M" name="Genero"> Masculino
					<input type="radio" id="FEMENINO" value="F" name="Genero" checked> Femenino
					<?php
				}
				?>
				</div>                   
				<div class="form-group">
					<label class="control-label"  for="telefono">Telefono</label>
					<input type="number" name="telefono" id="telefono" class="form-control" value="<?php echo $telefono; ?>" required>
				</div>
				<?php
		}
		$conexion->cerrar();
	}



	/***************************************************************
	*********** MOSTRAR DATOS ACTUALIZAR DATOS ADMIN ************
	****************************************************************/
	if(isset($_POST['user_update_dat_adm'])){
		$id = $_POST['user_update_dat_adm'];
		$sql = "SELECT * FROM users WHERE ident_user = :dat";
		$stmt = $conexion->consulta($sql);
		$stmt->execute(array('dat' => $id));
		$n = $stmt->rowCount();
		if ($n == 1) {
			$pers = $stmt->FETCH(PDO::FETCH_ASSOC);
			extract($pers);
			
			?>

				<div class="form-group">
					<label class="control-label"  for="tipo_doc">Tipo documento</label>
					<select name="tipo_doc" id="tipo_doc" class="form-control" required>
						<option value="">Seleccionar</option>
						<option value="TI" <?php if ( $tipo_doc == "TI") { echo "selected='selected'";} ?>>Tarjeta de Identidad</option>
						<option value="CC" <?php if ( $tipo_doc == "CC") { echo "selected='selected'";} ?>>Cédula de Ciudadania</option>
					</select>
				</div>
				<div class="form-group">
					<label class="control-label"  for="identificacion">Identificación</label>
					<input type="number" name="identificacion" id="identificacion" class="form-control" value="<?php echo $ident_user; ?>" disabled>
				</div>
				<div class="form-group">
					<label class="control-label" for="nombres">Nombres</label>
					<input type="text" name="nombres" id="nombres" class="form-control" value="<?php echo $nombres; ?>" required>
				</div>
				<div class="form-group">
					<label class="control-label" for="apellido1">Primer Apellido</label>
					<input type="text" name="apellido1" id="apellido1" class="form-control" value="<?php echo $apellidoA; ?>" required>
				</div>
				<div class="form-group">
					<label class="control-label" for="apellido2">Segundo Apellido</label>
					<input type="text" name="apellido2" id="apellido2" value="<?php echo $apellidoS; ?>" class="form-control">
				</div>
				<div class="form-group">
					<label class="control-label" for="apellido2">Correo electronico</label>
					<input type="email" name="email" id="email" class="form-control" value="<?php echo $email; ?>" required>
				</div>
				<div class="form-group">
					<label class="control-label"  for="fecha_na">Fecha de Nacimiento</label>
					<input type="date" name="fecha_na" id="fecha_na" class="form-control" value="<?php echo $fecha_Nacimiento; ?>" required>
				</div>
				<div class="form-group">
					<label class="control-label"  for="direccion">Dirección vivienda:</label>
					<input type="text" name="direccion" id="direccion" class="form-control" value="<?php echo $direccion; ?>" required>
				</div>
				<div class="form-group">
					<label for="Género" class="control-label">Género</label>
					<?php if($genero == 'M'){ ?>
					<input type="radio" id="MASCULINO" value="M" name="Genero" checked> Masculino
					<input type="radio" id="FEMENINO" value="F" name="Genero"> Femenino
					<?php
					}
					else{
						?>
						<input type="radio" id="MASCULINO" value="M" name="Genero"> Masculino
						<input type="radio" id="FEMENINO" value="F" name="Genero" checked> Femenino
						<?php
					}
					?>
				</div>
			                    
			<div class="form-group">
				<label class="control-label"  for="telefono">Telefono</label>
				<input type="number" name="telefono" id="telefono" class="form-control" value="<?php echo $telefono; ?>" required>
			</div>
			<div class="form-group">
	            <label class="control-label"  for="tipo_user">Tipo de Usuario</label>
	            <select name="tipo_user" id="tipo_user" class="form-control" required>
	              <option value="">Seleccionar</option>
	              <option value="Medico" <?php if ($tipo_user == "Medico") {echo "selected='selected'";} ?> >Medico</option>
	              <option value="Administrador" <?php if ($tipo_user == "Administrador") {echo "selected='selected'";} ?> >Administrador</option>
	          </select>
	        </div>
			<?php 
		}

		$conexion->cerrar();
	}








	// if(isset($_POST['reg_emp'])){
	// 	$tipo= $_POST['tipo'];
	// 	$id= $_POST['id'];
	// 	$nomb= $_POST['nomb'];
	// 	$ape1= $_POST['ape1'];
	// 	$ape2= $_POST['ape2'];
	// 	$f_nac= $_POST['f_nac'];
	// 	$direc= $_POST['direccion'];
	// 	$sexo= $_POST['sexo'];
	// 	$ocp= $_POST['ocp'];
	// 	$std= $_POST['std'];
	// 	$phone = $_POST['phone'];
	// 	$email = $_POST['email'];
	// 	$acu_n = $_POST['acu_n'];
	// 	$acu_phone = $_POST['acu_phone'];
	// 	$user_tipo = $_POST['cargo'];
	// 	$pass= sha1($_POST['id']);
	// 	$sql = 'INSERT INTO users(tipo_doc,ident_user,nombres,apellidoA,apellidoS,fecha_Nacimiento, telefono,email,direccion,tipo_user,genero) VALUES (:tip,:doc,:nom,:ape1,:ape2,:fecha_nac,:tel,:email,:direc,:tip_user,:gen)';
	// 	$stmt = $conexion->consulta($sql);
	// 	$stmt->execute(array(':tip' => $tipo,':doc'=>$id,':nom'=>$nomb,':ape1'=>$ape1,':ape2'=>$ape2,':fecha_nac'=>$f_nac,':tel'=>$phone,':email'=>$email,':direc'=>$direc,':tip_user'=>$user_tipo,':gen'=>$sexo ));
	// 	$cant = $stmt->rowCount();
	// 	if($cant == 1){
	// 		$sql="INSERT INTO acudientes(nombre_acudiente,telefono_acudiente,user_acu) VALUES (:nom_acu, :tel_ac,:us)";
	// 		$result = $conexion->consulta($sql);
	// 		$result->execute(array(':nom_acu' => $acu_n,':tel_ac'=>$acu_phone,':us'=>$id));
	// 		$cont = $result->rowCount();
	// 		if($cont == 1){
	// 			$sql="INSERT INTO sesion(id_user,password) VALUES (:id, :pass)";
	// 			$result = $conexion->consulta($sql);
	// 			$result->execute(array('id' => $id,'pass'=>$pass));
	// 			$cont = $result->rowCount();
	// 			if ($cont == 1) {
	// 				echo "Usuario registrado con éxito";
	// 			}
	// 			else{
	// 				echo "ERROR al crear el usuario";
	// 			}

	// 		}
	// 		else
	// 		{
	// 			echo "no se inserto";
	// 		}

	// 	}
	// 	else{
	// 		echo "Error en el registro";
	// 	}
	// }
	// 
	
	/**********************************************************************************************
	************************* ACTUALIZAR DATOS DE CLIENTE GUARDAR ************************************
	**********************************************************************************************/

	if(isset($_POST['upd_user'])){
		$id= $_POST['id'];
		$nomb= $_POST['nomb'];
		$ape1= $_POST['ape1'];
		$ape2= $_POST['ape2'];
		$f_nac= $_POST['f_nac'];
		$direc= $_POST['direccion'];
		$sexo= $_POST['sexo'];
		$phone = $_POST['phone'];
		$email = $_POST['email'];
		$user_tipo = "Cliente";
			 
        $var1=0;
		$sql = 'UPDATE users SET nombres=:nom, apellidoA=:ape1, apellidoS=:ape2, fecha_Nacimiento=:fecha_nac, telefono=:tel, email=:email, direccion=:direc, tipo_user=:tip_user, genero=:gen where ident_user=:doc';
		$stmt = $conexion->consulta($sql);
		$stmt->execute(array(':doc'=>$id,':nom'=>$nomb,':ape1'=>$ape1,':ape2'=>$ape2,':fecha_nac'=>$f_nac,':tel'=>$phone,':email'=>$email,':direc'=>$direc,':tip_user'=>$user_tipo,':gen'=>$sexo ));
		$cant = $stmt->rowCount();
		if($cant == 1){
			$var1=9;
		}
		echo $var1;
	}

	
	/**********************************************************************************************
	************************* ACTUALIZAR DATOS DE ADMINISTRADOR GUARDAR ************************************
	**********************************************************************************************/

	if(isset($_POST['upd_adm'])){
		$id= $_POST['id'];
		$nomb= $_POST['nomb'];
		$ape1= $_POST['ape1'];
		$ape2= $_POST['ape2'];
		$f_nac= $_POST['f_nac'];
		$direc= $_POST['direccion'];
		$sexo= $_POST['sexo'];
		$phone = $_POST['phone'];
		$email = $_POST['email'];
		$user_tipo = $_POST['tip_user'];
			 
        $var1=0;
		$sql = 'UPDATE users SET nombres=:nom, apellidoA=:ape1, apellidoS=:ape2, fecha_Nacimiento=:fecha_nac, telefono=:tel, email=:email, direccion=:direc, tipo_user=:tip_user, genero=:gen where ident_user=:doc';
		$stmt = $conexion->consulta($sql);
		$stmt->execute(array(':doc'=>$id,':nom'=>$nomb,':ape1'=>$ape1,':ape2'=>$ape2,':fecha_nac'=>$f_nac,':tel'=>$phone,':email'=>$email,':direc'=>$direc,':tip_user'=>$user_tipo,':gen'=>$sexo ));
		$cant = $stmt->rowCount();
		if($cant == 1){
			$var1=9;
		}
		echo $var1;
	}




	/***************************************************************
	********** REGISTRAR historia  *********************************
	****************************************************************/

	if(isset($_POST['reg_histo'])){ 
		$antmed=$_POST['antmed'];
        $antsic=$_POST['antsic'];
        $antodo=$_POST['antodo'];
        $asfige=$_POST['asfige'];
        $diaext=$_POST['diaext'];
        $diaint=$_POST['diaint'];
        $diaocl=$_POST['diaocl'];
        $platra=$_POST['platra'];
        $anoden=$_POST['anoden'];
        $diarad=$_POST['diarad'];
		
		$sql = 'INSERT INTO antecedentes_medicos(cod_invima,descripcion) VALUES (:id,:descr)';
		$stmt = $conexion->consulta($sql);
		$stmt->execute(array('id' => $id,'descr'=>$des));
		$cant = $stmt->rowCount();
		if($cant == 1){
			echo "historia registrada con éxito";
			
		}
		else{
			echo "Error en el registro";
		}
		$conexion->cerrar();
	}



	?>
