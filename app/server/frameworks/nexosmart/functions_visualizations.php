<?php
/* @author www.nexosmart.com.ar
 * @mail_support maxirodr@nexosmart.com.ar
 * @title visualizatons
 * @about_doc here are listining the functions to listing elements in the shop
 * 
 * please add here all custom functions/classes to get imported into framework
 * without erase in each update
 */

function generate__item($id_prod,$title,$img,$section,$descripcion) {
	global $url_web;
	//function that scrap the info
	$array_response = generate__item_db($id_prod,$title,$img,$section,$descripcion);
	
	return <<<HTML
	<div class="col-md-3 col-sm-4 col-xs-6">
		<div class="item-home" data-id="{$array_response[id_producto]}">
			<div class="item-photo" style="background: url('$array_response[url_img]');">
				<a href="//$url_web/$section/$array_response[id_producto]" style="display: block; width: 100%; height: 100%;">
					<div class="overlay-diff">{$array_response[descripcion]}</div>
				</a>
				<div class="item-icons">
					{$array_response[buy_button]}
				</div>
			</div>
			<div class="item-info">
				{$array_response[title]}
			</div>
		</div>
	</div>
HTML;
}


function generate_mini_box($cols, $image, $price, $section, $id_producto, $title, $discount) {
	global $url_web;
	
	$array_response = generate_mini_box_db($cols, $image, $price, $section, $id_producto, $title, $discount);
	
	echo "<div class=\"col-md-{$cols} col-sm-4 col-xs-$$array_response[sm_cols]\">
		<div class=\"mini-product\" data-id=\"{$id_producto}\">
			<div class=\"m-pic overlay-effect\" style=\"background: url('$array_response[image]');\">
				<a href=\"//$url_web/producto/$id_producto\"> </a>
			</div>
			<div class=\"descripciones\">
				<div id=\"titulo\">
					<a href=\"//$url_web/producto/$id_producto\">{$array_response[title]}</a>
				</div>

				<div id=\"precio\">
					{$array_response[print_price]}
				</div>

				<div class='row'>
					<div class='col-sm-9'>
					   <span class='small-cuotas'>
					       <span>6</span> cuotas de <span>$$array_response[cuotas_print_price]</span>
				       </span>
				       <span class='small-cft'>
                           CFT: 43.47% - TEA: 33.14%
                       </span>
				    </div>
				    <div class='col-sm-3 tarjeta'>
                       <i class=\"fa fa-cc-visa\" aria-hidden=\"true\"></i>
                    </div>
				</div>

			</div>
		</div>
	</div>";
}

function paginar_resultados_view($part='') {
	if($part==1) {
		$return = "<div style=\"text-align:right;padding:4px;float:left;clear:both;margin-top:5px;margin-bottom:5px;\">Página de los resultados: ";
	}
	if($part==2) {
		global $url,$i;
		$return = '<a href='.$url.'&pagina='.$i.'>'.$i.'</a>';
	}
	if($part==3) {
		$return = "</div><br/>";
	}
	if($part==4) {
		$return = '<div class="col-sm-12 notice_display"><i class="fa fa-file" aria-hidden="true"></i> Aún no hay información suficiente para mostrar resultados</div>';
	}
	
	if( isset($return) ) return $return;
}
 
?>