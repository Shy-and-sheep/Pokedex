app.component('pokemon-display', {
    template: 
    /*html*/
    `<table v-for="pokemon in pokemons" v-on:click="getpokemon(GetIndice(pokemon))" :key="pokemon.url">
        <tr>
            <td><img class="pokemon-image" v-bind:src="getimage(GetIndice(pokemon))"></td>
        </tr>
        <tr>    
            <td>#{{GetIndice(pokemon)}}</td> 
        </tr>
        <tr>
            <td>{{pokemon.name}} </td>
        </tr>
        <tr>
            <td style="color: #f2f2f2">espace</td>
        </tr>
    </table>`,
    data(){
        return{
            pokemons:[{}],
        }
    },
    methods:{
        GetIndice(pokemon){
        return this.pokemons.indexOf(pokemon) +1
        },
        getimage(indice){
            mystring="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/"+indice+".svg";
            return mystring
        },
        async getpokemon(indice){
            axios.get('https://pokeapi.co/api/v2/pokemon/'+indice+'/')
            .then(response=>this.result=(response.data))
        },   
    },
    mounted () {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151').then(response => this.pokemons=(response.data.results)).finally(() => {  
            this.$emit('endLoad')})
    }
})