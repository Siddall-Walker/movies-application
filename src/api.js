module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },


    addMovie: (movie) => {
    return fetch(`/api/movies`,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }).then(response => response.json());
},

    editMovie: (movie) => {


        return fetch(`/api/movies/${movie.id}`,
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            }).then(response => response.json());
    },
};


