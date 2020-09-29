new Vue({
    el: '#app',
    data() {
        return {
            commits: null,
        }
    },
    mounted() {
        const queryString = window.location.href;
        var url = new URL(queryString);
        var c = url.searchParams.get("repo");
        console.log(c);

        axios
            .get('./api/readme?repo=' + c)
            .then(response => (
                this.commits = response.data
            ))
    }
})