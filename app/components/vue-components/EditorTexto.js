// INFO: (COMPONENTE-VUE) -> EDITOR DE TEXTO CON QUILL-JS

const textEdit = Vue.component('text_editor', {
    props:[
        'title'
    ],
    template: //html
    `
    <div class="row text_edit">

        <div class="col-lg-12 col-md-12 col-xs-12">
            <h5>{{title}}</h5>
            <div id="editor">        
                <slot>Ingrese su texto</slot>        
            </div>
        </div>
        
    </div>
    `, 
    mounted(){
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons                                  
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript                                              
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],          
            ['clean']                                         // remove formatting button
          ];
          
          var quillJsEditor = new Quill('#editor', {
            modules: {
              toolbar: toolbarOptions
            },
            theme: 'snow'
          });
    }
})