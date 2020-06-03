<div class="grid_3 grid_5 text-center">
  <div class="bs-example2 bs-example-padded-bottom">
    <h3>PERSONAL DEL SISTEMA</h3>
</div>
</div> 
<div class="grid_3 grid_4 ">
  <div class="bs-example">
    <div class="pull-left">
        <div class="col-md-1"></div>
        <div class="col-md-8">
            <input type="text" id="search_adm" class="form-control" placeholder="Buscar Personal por Cedula">
        </div>
    </div>
    <div class="pull-right">
      <button type="button" class="btn btn-primary btn-lg" id="modal_show" data-toggle="modal" data-target="#myModal">
        + 
    </button>
</div>
<br>
<div class="bs-example4" data-example-id="simple-responsive-table">
  <div class="table-responsive">
    <table class="table text-center">
      <thead>
        <tr>
          <th class="text-center">Documento</th>
          <th class="text-center">Nombres</th>
          <th class="text-center">Apellido</th>
          <th class="text-center">Telefono</th>
          <th class="text-center">Correo</th>
          <th class="text-center">Dirección</th>
          <th class="text-center">Opciones</th>
      </tr>
  </thead>
  <tbody class="user_list ">
    <tr>
      <th scope="row">1081420317</th>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
  </tr>
  <tr>
      <th scope="row">1079412118</th>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
  </tr>
  <tr>
      <th scope="row">1081419077</th>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
  </tr>
</tbody>
</table>
</div><!-- /.table-responsive -->

</div>
</div>
</div> 


<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
   <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h2 class="modal-title text-center">Registrar usuario</h2>
        </div>
          <div class="modal-body">
            <hr>
            <form class="contact">
              <div class="form-group">
                <label class="control-label"  for="tipo_doc">Tipo documento</label>
                <select name="tipo_doc" id="tipo_doc" class="form-control" required>
                  <option value="">Seleccionar</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CC">Cédula de Ciudadania</option>
              </select>
              </div>
              <div class="form-group">
                <label class="control-label"  for="identificacion">Identificación</label>
                <input type="number" name="identificacion" id="identificacion" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label" for="nombres">Nombres</label>
                <input type="text" name="nombres" id="nombres" class="form-control" required>
              </div>
              <div class="form-group">
                  <label class="control-label" for="apellido1">Primer Apellido</label>
                  <input type="text" name="apellido1" id="apellido1" class="form-control" required>
              </div>
              <div class="form-group">
                  <label class="control-label" for="apellido2">Segundo Apellido</label>
                  <input type="text" name="apellido2" id="apellido2" class="form-control">
              </div>
              <div class="form-group">
                  <label class="control-label" for="apellido2">Correo electronico</label>
                  <input type="email" name="email" id="email" class="form-control" required>
              </div>
              <div class="form-group">
                  <label class="control-label"  for="fecha_na">Fecha de Nacimiento</label>
                  <input type="date" name="fecha_na" id="fecha_na" class="form-control" required>
              </div>
              <div class="form-group">
                  <label class="control-label"  for="direccion">Dirección vivienda:</label>
                  <input type="text" name="direccion" id="direccion" class="form-control" required>
              </div>
              <div class="form-group">
                  <label for="Género" class="control-label">Género</label>
                  <input type="radio" id="MASCULINO" value="M" name="Genero"> Masculino
                  <input type="radio" id="FEMENINO" value="F" name="Genero"> Femenino
              </div>                   
              <div class="form-group">
                <label class="control-label"  for="telefono">Telefono</label>
                <input type="number" name="telefono" id="telefono" class="form-control" required>
              </div>
              <div class="form-group">
                  <label class="control-label"  for="tipo_user">Tipo de Usuario</label>
                  <select name="tipo_user" id="tipo_user" class="form-control" required>
                    <option value="Administrador">Seleccionar</option>
                    <option value="Administrador">Administrador</option>
                </select>
              </div>  
            </form>
          </div>
          <div class="modal-body adm_msj">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" onclick="clean_user()" name="cancel" id="cancel_adm" data-dismiss="modal">Cancelar    </button>
            <button type="submit" class="btn btn-primary" name="save" id="save_adm">Guardar</button>
        
          </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h2 class="modal-title text-center">Actualizar usuario</h2>
          </div>
          <div class="modal-body">
            <hr>
            <form class="contact">
              <div class="form-group">
                <label class="control-label"  for="tipo_doc">Tipo documento</label>
                <select name="tipo_doc" id="tipo_doc" class="form-control" required>
                  <option value="">Seleccionar</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CC">Cédula de Ciudadania</option>
                </select>
              </div>
              <div class="form-group">
                <label class="control-label"  for="identificacion">Identificación</label>
                <input type="number" name="identificacion" id="identificacion" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label" for="nombres">Nombres</label>
                <input type="text" name="nombres" id="nombres" class="form-control" required>
              </div>
              <div class= "form-group">
                <label class="control-label" for="apellido1">Primer Apellido</label>
                <input type="text" name="apellido1" id="apellido1" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label" for="apellido2">Segundo Apellido</label>
                <input type="text" name="apellido2" id="apellido2" class="form-control">
              </div>
              <div class="form-group">
                <label class="control-label" for="apellido2">Correo electronico</label>
                <input type="email" name="email" id="email" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label"  for="fecha_na">Fecha de Nacimiento</label>
                <input type="date" name="fecha_na" id="fecha_na" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label"  for="direccion">Dirección vivienda:</label>
                <input type="text" name="direccion" id="direccion" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="Género" class="control-label">Género</label>
                <input type="radio" id="MASCULINO" value="M" name="Genero"> Masculino
                <input type="radio" id="FEMENINO" value="F" name="Genero"> Femenino
              </div>                   
              <div class="form-group">
              <label class="control-label"  for="telefono">Telefono</label>
              <input type="number" name="telefono" id="telefono" class="form-control" required>
              </div>
            </form>
          </div>           
          <div class="modal-body adm_msj2">
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" onclick="clean_user()" name="cancel" id="cancel_act_adm" data-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary" name="save" id="save_adm_edit">Guardar</button>    
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<!-- <h2>Overflowing text to show scroll behavior</h2>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p> -->