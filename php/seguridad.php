<?php
session_start();
if (!isset($_SESSION['idUsu'])) 
{
	$deb="Debe Iniciar Sesion";
	header("location:?option=registro");
	exit();
}
?>