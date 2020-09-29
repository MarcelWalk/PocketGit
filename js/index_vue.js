new Vue({
    el: '#app',
    data() {
        return {
            data: new Array,
        }
    },
    mounted() {
        axios
            .get('./api/repos')
            .then(response => (
                response.data.forEach(element => {
                    this.data.push({name: element, url:'./repository?repo=' + element})
                })
            ))
    }
})