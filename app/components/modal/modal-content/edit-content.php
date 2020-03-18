<!-- INFO: CONTENIDO DEL MODAL -> REGISTRO -->

<section>
    <div class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <form method="post" id="edit_user" name="save_user">
                <div class="form-group">
                    <label for="name">Nombre</label>
                    <input type="text" class="form-control" id="edit_name" name="edit_name" placeholder="Enter name" >   
                    <small id="success_name"></small>                 
                </div>

                <div class="form-group">
                    <label for="lastname">Apellido</label>
                    <input type="text" class="form-control" id="edit_lastname" name="edit_lastname" placeholder="Enter lastname"> 
                    <small id="success_lastname"></small>                   
                </div>

                <div class="form-group">
                    <label for="email">Ingrese su email</label>
                    <input type="email" class="form-control" id="edit_email" name="edit_email" placeholder="Enter email">      
                    <small id="success_email"></small>              
                </div>

                <div class="form-group">
                    <label for="password">Ingrese su contraseña</label>
                    <input type="password" class="form-control" id="edit_password" name="edit_password" placeholder="Enter Password">
                    <small id="success_password"></small>
                </div>
                
                <div class="form-group">
                    <label for="phone">Ingrese su número de telefono</label>
                    <input type="text" class="form-control" id="edit_phone" name="edit_phone" placeholder="Enter Phone">
                    <small id="success_phone"></small>
                </div>       
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-salir-registro btn-secondary" data-dismiss="modal">Salir</button>
                    <button type="submit"  id="btn_editar" class="btn btn-continuar-registro btn-primary">Continuar</button>
                </div>      
            </form>
        </div>
    </div>
</section>