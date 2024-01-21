$('.search-btn').on('click', function() {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=f85d757b&s=' + $('.input-keyword').val(),
        success: result => {

            const search = result.Search;
            console.info(search);
            let kotak = '';
            search.forEach(s => {
                kotak += showcards(s);
            });
            $('.filmku ').html(kotak)

            // ketika show detail di klik
            $('.modal-detail-btn').on('click', function() {
                // console.info($(this).data('imdbid'))
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=f85d757b&i=' + $(this).data("imdbid"),
                    success: m => {
                        const movieDetail = detailMovie(m)
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.info(e.responseText);
                    }
                });
            });
        },
        error: (e) => {
            console.info(e.responseText);
        }
    });

});

function showcards(m) {
    return `<div class="col-md-4 my-5">
                    <div class="card">
                        <img src="${m.Poster}" class=" card-img-top " alt=" ">
                        <div class="card-body ">
                            <h5 class="card-title ">${ m.Title }
                            </h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary ">${ m.Year }
                            </h6>
                            <a href="# " class="btn btn-primary modal-detail-btn " data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${m.imdbID}"> Show Details</a>
                        </div>
                    </div>
                </div>`
}

function detailMovie(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid" alt="">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h2>${m.Title} (${m.Year})</h2></li>
                            <li class="list-group-item"><strong>Released :</strong>${m.Released}</li>
                            <li class="list-group-item"><strong>Director :</strong>${m.Director}</li>
                            <li class="list-group-item"><strong>Languange :</strong>${m.Language}</li>
                            <li class="list-group-item"><p>Plot : </p>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}