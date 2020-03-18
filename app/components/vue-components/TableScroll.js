// INFO: (componente VUE) -> tabla con srcoll usando simplebar

const table_scroll = Vue.component('table_scroll',{
    template: //html
    `
    <div class="table_scroll" style="width: 100%;">
        <table class="">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">nombre</th>
                    <th scope="col">cantidad</th>
                    <th scope="col">color</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(fruta, index) of frutas">
                    <th scope="row">{{index}}</th>
                    <td>{{fruta.nombre}}</td>
                    <td>{{fruta.cantidad}}</td>
                    <td>{{fruta.color}}</td>
                    <td></td>
                </tr>                
            </tbody>
        </table>
    </div>
    `,
    data(){
        return{
            frutas: [
                {nombre: 'pera', cantidad: 10, color: 'verde'},
                {nombre: 'manzana', cantidad: 5, color: 'rojo'},
                {nombre: 'platano', cantidad: 0, color: 'amarillo'},
                {nombre: 'pera', cantidad: 10, color: 'verde'},
                {nombre: 'manzana', cantidad: 5, color: 'rojo'},
                {nombre: 'platano', cantidad: 0, color: 'amarillo'},
                {nombre: 'pera', cantidad: 10, color: 'verde'},
                {nombre: 'manzana', cantidad: 5, color: 'rojo'},
                {nombre: 'platano', cantidad: 0, color: 'amarillo'},
                {nombre: 'pera', cantidad: 10, color: 'verde'},
                {nombre: 'manzana', cantidad: 5, color: 'rojo'},
                {nombre: 'platano', cantidad: 0, color: 'amarillo'},
                {nombre: 'pera', cantidad: 10, color: 'verde'},
                {nombre: 'manzana', cantidad: 5, color: 'rojo'},
                {nombre: 'platano', cantidad: 0, color: 'amarillo'},
                {nombre: 'pera', cantidad: 10, color: 'verde'},
                {nombre: 'manzana', cantidad: 5, color: 'rojo'},
                {nombre: 'platano', cantidad: 0, color: 'amarillo'},
                {nombre: 'pera', cantidad: 10, color: 'verde'},
                {nombre: 'manzana', cantidad: 5, color: 'rojo'},
                {nombre: 'platano', cantidad: 0, color: 'amarillo'},
                {nombre: 'pera', cantidad: 10, color: 'verde'},
                {nombre: 'manzana', cantidad: 5, color: 'rojo'},
                {nombre: 'platano', cantidad: 0, color: 'amarillo'},
            ],
        }
    }
})