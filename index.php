<?php
  session_start();
  extract($_REQUEST);

include_once 'php/connection.php';
include_once 'php/entrar.php';
include_once 'php/consults.php';

switch (@$_REQUEST['option']) {
	case 'home':
	if (isset($_SESSION['idUsu'])) {
		$include='home.php';
	}else{
        header("location:?option=login.php");
      }
		break;
	case 'logout': 
		session_unset();
        session_destroy();
        header('location:?option=login.php');
		break;
	default:

		$include='login.php';
		break;
}
 ?> 

<!DOCTYPE html>
<html lang="es">
<head id="wrapper">
	<title>MyBike</title>
</head>
<body>

		<?php include ($include); ?>


</body>
</html>





