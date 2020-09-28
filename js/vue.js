new Vue({
    el: '#app',
    data() {
        return {
            info: null,
        }
    },
    mounted() {
        axios
            .get('./api/repos')
            .then(response => (this.info = response.data))
    }
})