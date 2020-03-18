// INFO: (COMPONENTE-VUE) -> COLOR PICKER.

// color picker.
const colorPicker = Vue.component('color_picker', {
    template: //html
    `
    <div class="row background-picker_edit">
        <div class="col-lg-12 col-md-12 col-xs-12">
            <button id="id" class="btn btn-primary p-2 jscolor {valueElement:'chosen-value', onFineChange:'setTextColor(this)'}">
                <i class="fas fa-palette"></i> 
            </button>
            <span>{{text}}</span>
        </div>
	</div>
    `,    
    data(){
        return{
            text: 'Fondo del componente'
        }
    },
    mounted(){ // se ejecuta al insertarse al DOM
        function setTextColor(picker) {            
            document.getElementById('my_color').style.color = '#' + picker.toString()            
        }
    }
})