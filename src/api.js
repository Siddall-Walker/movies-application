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
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            }).then(response => response.json());
    },

    DeleteMovie: (mid) => {


        return fetch(`/api/movies/${mid}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            }).then(response => response.json());
    },
};


