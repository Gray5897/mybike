<!DOCTYPE HTML>
<html>
<head>
<title>MYBIKE</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
 <!-- Bootstrap Core CSS --> 
<link href="css/bootstrap.min.css" rel='stylesheet' type='text/css' />
<!-- Custom CSS -->
<link href="css/style.css" rel='stylesheet' type='text/css' />
<link href="css/font-awesome.css" rel="stylesheet"> 
<!-- jQuery --> 
<script src="js/jquery.min.js"></script>
<!--webfonts-->
<link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
<!--//webfonts-->  
<!-- Bootstrap Core JavaScript -->
<script src="js/bootstrap.min.js"></script>
</head> 
<body id="login">
  <div class="login-logo">
    <!-- <a href="index.html"><img src="images/logo.png" alt=""/></a> -->
   <h1 class="hd">Bienvenido</h1>
  </div>
  <h2 class="form-heading">Inicia sesion</h2>
  <div class="app-cam">
	  <form method="post">
		<input type="text" class="text" name="username" value="USUARIO" onfocus="if(this.value =='USUARIO'){this.value = ''};" onblur="if (this.value == '') {this.value = 'USUARIO';}">
		<input type="password" name="password" value="CONTRASEÑA" onfocus="if(this.value =='CONTRASEÑA'){this.value = ''};" onblur="if (this.value == '') {this.value = 'CONTRASEÑA';}">
		<div class="submit"><input type="submit" name="Login" value="Ingresar"></div>
		<!-- <div class="login-social-link">
          <a href="index.html" class="facebook">
              Facebook
          </a>
          <a href="index.html" class="twitter">
              Twitter
          </a>
        </div> -->
		<ul class="new">
			<li class="new_left"><p><a href="#">Olvido su contraseña?</a></p></li>
			<!-- <li class="new_right"><p class="sign">New here ?<a href="register.html"> Sign Up</a></p></li> -->
			<!-- <div class="clearfix"></div> -->
		</ul>
	</form>
  </div>
   <div class="copy_layout login">
      <p>Copyright &copy; 2017 | Diseñado por <a href="" target="_blank">MYBIKE</a> </p>
   </div>
</body>
</html>
