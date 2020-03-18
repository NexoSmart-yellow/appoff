<?php

require "../config/config.php";

$content = '<div class="seguro">
                <img height="100px" src="assets/images/img/pdf.png">
                <br>
                <span>Descarga</span>
            </div>
            <div class="vence_docs">
                <h5>25-04-2020</h5>
                <p>Vencimiento</p>
            </div>';

$response['content'] = $content;

echo json_encode($response);

?>