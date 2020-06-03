<?php 
switch (@$_REQUEST['opc']) {
    case '1':
        $temp='user.php';
        break;
    default:

        $temp='cont-home.php';
        break; 
}

 ?>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel='stylesheet' type='text/css' /> 
    <!-- Custom CSS -->
    <link href="css/style.css" rel='stylesheet' type='text/css' />
    <!-- Graph CSS -->
    <link href="css/lines.css" rel='stylesheet' type='text/css' />
    <!-- <link href="css/com.css" rel='stylesheet' type='text/css' /> -->
    <link href="css/font-awesome.css" rel="stylesheet"> 
    <!-- jQuery -->
    <script src="js/jquery.min.js"></script>
    <!--webfonts-->
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
    <!--//webfonts-->  
    <!-- Nav CSS -->
    <link href="css/custom.css" rel="stylesheet">
    <!-- Metis Menu Plugin JavaScript -->
    <script src="js/metisMenu.min.js"></script>
    <script src="js/custom.js"></script>
    <!-- Graph JavaScript -->
    <script src="js/d3.v3.js"></script>
    <script src="js/rickshaw.js"></script>
    <script src="js/edited.js"></script>
</head>
<body>
    <div id="wrapper">
       <?php include 'menu.php'; ?>
        <div id="page-wrapper">
            <div class="graphs contenido">
    <!--<?php include $temp; ?>-->

    
</div>
<?php include 'footer.php'; ?>
</div>

<!-- /#page-wrapper -->
</div>
<!-- /#wrapper -->
<!-- Bootstrap Core JavaScript -->
<script src="js/bootstrap.min.js"></script>
    <script src="js/code.js"></script>
    <script src="js/guardar.js"></script>
    <script src="js/code2.js"></script>
</body>
</html>
