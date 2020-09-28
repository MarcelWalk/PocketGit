new Vue({
    el: '#app',
    data() {
        return {
            info: null
        }
    },
    mounted() {
        axios
            .get('http://localhost:7000/repos')
            .then(response => (this.info = response.data))
    }
})