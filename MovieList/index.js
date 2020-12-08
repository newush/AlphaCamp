const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const movies = [] //電影總清單
let filteredMovies = [] //搜尋清單

const MOVIES_PER_PAGE = 12

const dataPanel = document.querySelector('#data-panel')
const dataPanelList = document.querySelector('#data-panel-list')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const iconCard = document.querySelector('.show-card')
const iconList = document.querySelector('.show-list')
const paginator = document.querySelector('#paginator')

function renderMovieList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image, id
    rawHTML += `
    <li class="list-group-item d-flex row justify-content-between align-items-center">
      <h5>${item.title}</h5>
      <div class="d-flex justify-content-end">
      ${renderButtons(item.id)}
      </div>
    </li>
    `
  })
  dataPanelList.innerHTML = rawHTML
}

function renderMovieCard(data) {
  let rawHTML = ''
  data.forEach((item) => {
    // title, image, id
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image
      }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          ${renderButtons(item.id)}
        </div>
      </div>
    </div>
  </div>`
  })
  dataPanel.innerHTML = rawHTML
}

function renderButtons(id) {
  return `<button class="btn btn-primary btn-show-movie mr-2" onClick="showMovieModal(${id})" data-toggle="modal" data-target="#movie-modal">More</button>
          <button class="btn btn-info btn-add-favorite" onClick="addToFavorite(${id})">+</button>`
}
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE

  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function showMovieModal(id) {
  // get elements
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')

  // send request to show api
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results

    // insert data into modal ui
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
  })
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
  const movie = movies.find((movie) => movie.id === id)

  if (list.some((movie) => movie.id === id)) {
    return alert('此電影已經在收藏清單中！')
  }

  list.push(movie)
  localStorage.setItem('favoriteMovies', JSON.stringify(list))
}

function displayDataPanel(page, movieLength) {
  if (dataPanel.dataset.display === 'card') {
    renderMovieCard(getMoviesByPage(page))
    renderPaginator(movieLength)
  } else {
    renderMovieList(getMoviesByPage(page))
    renderPaginator(movieLength)
  }
}

//判斷頁數
function currentPages(page) {
  if (filteredMovies.length !== 0) {
    displayDataPanel(page, filteredMovies.length)
  } else {
    displayDataPanel(page, movies.length)
  }
}
//listen to search form
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  )
  if (filteredMovies.length === 0 || keyword === '') {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
  dataPanel.dataset.page = 1
  currentPages(dataPanel.dataset.page)
  // displayDataPanel(page, filteredMovies.length)
  // if (dataPanel.dataset.display === 'card') {
  //   renderMovieCard(getMoviesByPage(1))
  // } else {
  //   renderMovieList(getMoviesByPage(1))
  // }
  // renderPaginator(filteredMovies.length)
})

searchForm.addEventListener('input', function onSearchFormInput(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  const page = dataPanel.dataset.page
  if (keyword === '') {
    filteredMovies = []
    currentPages(page) //因為清空回到原本畫面不會顯示當下頁碼，所以改成回到第一頁
    // if (dataPanel.dataset.display === 'card') {
    //   renderMovieCard(getMoviesByPage(page))
    //   renderPaginator(movies.length)
    // } else {
    //   renderMovieList(getMoviesByPage(page))
    //   renderPaginator(movies.length)
    // }
  }
})

// listen to paginator
paginator.addEventListener('click', function onPaginatorClicked(event) {
  event.preventDefault()
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  dataPanel.dataset.page = page
  currentPages(page)
  paginator.children[page - 1].classList.add('active')
  // displayDataPanel(page, movies.length)
  // if (dataPanel.dataset.display === 'card') {
  //   renderMovieCard(getMoviesByPage(page))
  // } else {
  //   renderMovieList(getMoviesByPage(page))
  // }
})

//listen to card icon
iconCard.addEventListener('click', function onIconCardClicked(event) {
  dataPanel.dataset.display = 'card'
  const page = Number(dataPanel.dataset.page)
  renderMovieCard(getMoviesByPage(page))
  dataPanelList.innerHTML = ''
})

//listen to list icon
iconList.addEventListener('click', function onIconListClicked(event) {
  dataPanel.dataset.display = 'list'
  const page = Number(dataPanel.dataset.page)
  renderMovieList(getMoviesByPage(page))
  dataPanel.innerHTML = ''
})

// send request to index api
axios
  .get(INDEX_URL)
  .then((response) => {
    movies.push(...response.data.results)
    // displayDataPanel(1, movies.length) //使用這個function 會在搜尋後無法卡片和列表顯示互換！ 不知道為什麼
    renderPaginator(movies.length)
    renderMovieCard(getMoviesByPage(1))
  })
  .catch((err) => console.log(err))
