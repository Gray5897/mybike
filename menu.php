<!-- Navigation -->
<nav class="top1 navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="?option=home">MYBIKE</a>
    </div>
    <!-- /.navbar-header -->
    <ul class="nav navbar-nav navbar-right">

        <li class="dropdown">
           <a href="#" class="dropdown-toggle avatar" data-toggle="dropdown"><img src="images/<?php echo strtoupper(substr($_SESSION['idUsu'], 0, 1)); ?>.png"><!-- <span class="badge">2</span> --></a>
           <ul class="dropdown-menu">
              <li class="dropdown-menu-header text-center">
               <strong class="nomb_doc" id='<?php echo $_SESSION['codUsu']; ?>'><?php echo $_SESSION['idUsu']; ?></strong>
           </li>
           <li class="m_2"><a href="?option=logout"><i class="fa fa-lock"></i>Cerrar sesion</a></li>	
       </ul>
   </li>
</ul>
<!-- <form class="navbar-form navbar-right">
  <input type="text" class="form-control" value="Buscar..." onfocus="if(this.value=='Buscar...'){this.value = ''};" onblur="if (this.value == '') {this.value = 'Buscar...';}">
</form> -->
<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse">
        <ul class="nav" id="side-menu">
            <li> 
                <a href="?option=home"><i class="fa fa-dashboard fa-fw nav_icon"></i>Inicio</a>
            </li>
            <?php 
            if($_SESSION['rolUsu'] == 'Administrador'){
                ?>
                <li>
                    <a href="#"><i class="fa fa-indent nav_icon"></i>Usuarios<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="#" class="user">Clientes</a>
                        </li>
                        <li>
                            <a href="#" class="personal">Personal</a>
                        </li>
                    </ul>
                    <!-- /.nav-second-level -->
                </li>
                <li>
                    <a href="#"><i class="fa fa-envelope nav_icon"></i>Inventario<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="#" class="product">Listar Inventario</a>
                        </li>
                    </ul>
                    <!-- /.nav-second-level -->
                </li>
                       <!--  <li>
                            <a href="#"><i class="fa fa-flask nav_icon"></i>Widgets</a>
                        </li> -->
                        <?php 
                    }
                    elseif($_SESSION['rolUsu'] == 'Medico'){
                        ?>
                        <li>
                            <a href="#"><i class="fa fa-envelope nav_icon"></i>Citas<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="#" class="con_cita">Consultar cita</a>
                                </li>
                                
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                        
                        <!-- <li class="historial">
                            <a href="#"><i class="fa fa-indent nav_icon"></i>Historial Clinico Odontologico<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a id="un" class="history" href="#"><i class="fa fa-sitemap nav_icon"></i>Anamnesis</a>
                                </li>
                                <li>
                                    <a id="dos" href="#"><i class="fa fa-sitemap nav_icon"></i>Signos Actuales</a>
                                </li>
                                <li>
                                    <a id="tres" href="#"><i class="fa fa-sitemap nav_icon"></i>Diagnostico Clinico</a>
                                </li>
                                <li>
                                    <a id="cuatro" href="#"><i class="fa fa-sitemap nav_icon"></i>Tratamientos Requeridos</a>
                                </li>
                            </ul>
                        </li> -->
                        <?php 
                    
                }
                ?>
                        <!-- <li>
                            <a href="#"><i class="fa fa-table nav_icon"></i>Tables<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="#">Basic Tables</a>
                                </li>
                            </ul>
                            <!- /.nav-second-level -
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-sitemap fa-fw nav_icon"></i>Css<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="#">Media</a>
                                </li>
                                <li>
                                    <a href="?option=login">Login</a>
                                </li>
                            </ul>
                            <!- /.nav-second-level ->
                        </li> -->
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>