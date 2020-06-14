<div class="grid_3 grid_5 text-center">
  <div class="bs-example2 bs-example-padded-bottom">
    <h3>USUARIO</h3>
</div>
</div> 
<div class="grid_3 grid_4 ">
  <div class="bs-example">
    <div class="pull-left">
        <div class="col-md-1"></div>
        <div class="col-md-8">
            <input type="text" id="search_pac" class="form-control" placeholder="Buscar usuario por Cedula">
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
          <th class="text-center">Tipo documento</th>
          <th class="text-center">Numero de Documento</th>
          <th class="text-center">Nombres</th>
          <th class="text-center">Primer apellido</th>
          <th class="text-center">Segundo apellido</th>
          <th class="text-center">Correo electronico</th>
          <th class="text-center">Fecha de Nacimiento</th>
          <th class="text-center">Direccion</th>
          <th class="text-center">Genero</th>
          <th class="text-center">Telefono</th>
      </tr>
  </thead>
  <tbody class="user_list ">
    <tr>
      <th scope="row">Table cell</th>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
  </tr>
  <tr>
      <th scope="row">Table cell</th>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
  </tr>
  <tr>
      <th scope="row">Table cell</th>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
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
                <label class="control-label"  for="identificacion">Numero de documento</label>
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
                <label class="control-label" for="email">Correo electronico</label>
                <input type="email" name="email" id="email" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label"  for="fecha_na">Fecha de Nacimiento</label>
                <input type="date" name="fecha_na" id="fecha_na" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label"  for="direccion">Dirección</label>
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
          <div class="modal-body pac_msj">
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" onclick="clean_user()" name="cancel" id="cancel" data-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary" name="save" id="save">Guardar</button>    
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
                <label class="control-label"  for="identificacion">Numero de Documento</label>
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
                <label class="control-label" for="email">Correo electronico</label>
                <input type="email" name="email" id="email" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label"  for="fecha_na">Fecha de Nacimiento</label>
                <input type="date" name="fecha_na" id="fecha_na" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="control-label"  for="direccion">Dirección</label>
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
          <div class="modal-body pac_msj2">
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" onclick="clean_user()" name="cancel" id="cancel_act_pac" data-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary" name="save" id="save_pac_edit">GUARDAR CAMBIOS</button>    
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
