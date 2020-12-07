const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users"
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const dataPanel = document.querySelector('.card-deck')
const paginator = document.querySelector('#paginator')
const personInfoModal = document.querySelector('#personInfoModal')
const pageMessage = document.querySelector('.message')
const socialLists = []
const SOCIAL_PER_PAGE = 12
const lists = JSON.parse(localStorage.getItem('favoritePals'))

function renderSocialLists(data) {
  if (lists.length === 0) {
    pageMessage.innerText = 'You haven\'t add any favorite pal yet.'
  }
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `
    <div class="social-list-card col-sm-3 my-1 p-3">
      <img
        src="${item.avatar}"
        class="card-img mt-1" data-toggle="modal" data-target="#personInfoModal" data-id="${item.id}" alt = "image">
      <p class="card-name py-2 mt-1">${item.name}</p>
    </div>
    `
  })
  dataPanel.innerHTML = rawHTML
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / SOCIAL_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML +=
      `<li class="page-item"> <a class="page-link" href="#" data-page="${page}">${page}</a></li >`
  }
  paginator.innerHTML = rawHTML
}

function getSocialByPage(page) {
  const startIndex = (page - 1) * SOCIAL_PER_PAGE
  return socialLists.slice(startIndex, startIndex + SOCIAL_PER_PAGE)
}

function showPersonInfoModal(id) {
  const modalHeader = document.querySelector('#personInfoModalLabel')
  const modalBody = document.querySelector('.modal-body')
  const modalFooter =
    document.querySelector('.modal-footer')
  axios.get(`${INDEX_URL}/${id}`).then((response) => {
    modalHeader.innerHTML = `
    <div class="modal-title p-0"> 
      <div class="d-flex flex-column justify-content-center align-items-center">
        <img
          src="${response.data.avatar}"
          class="modal-img mt-3" alt= "image">
        <div class="modal-name"> 
          <h4 class="mt-3 mx-3"> ${response.data.name} ${response.data.surname} </h4>
          <p class="modal-age ml-3">${response.data.age} years old</p>
        </div>
      </div> 
    </div>
    `
    modalBody.innerHTML = `
    <span class="modal-region">
    <i class="fas fa-globe-americas m-2"></i>
    ${response.data.region}</span>
    <span class="modal-gender"><i class="fas fa-child m-2"></i>${response.data.gender}</span>
    <span class="modal-birthday"><i class="fas fa-birthday-cake m-2"></i>${response.data.birthday}</span>
    
    <span class="modal-email"><i class="fas fa-envelope m-2"></i>${response.data.email}</span>
    `
    modalFooter.innerHTML = `
    <button type="button" class="btn-remove-favorite btn" data-id="${response.data.id}" data-dismiss="modal">Remove <i class="fas fa-heart-broken"></i></button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
  })
}
function removeFromFavorite(id) {
  if (!lists) return
  const palIndex = lists.findIndex((pal) => Number(pal.id) === Number(id))
  console.log(palIndex)
  console.log(lists)
  console.log(id)
  if (palIndex === -1) return
  lists.splice(palIndex, 1)
  localStorage.setItem('favoritePals', JSON.stringify(lists))
  renderSocialLists(lists)
}

//監聽事件在頭像照片
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.card-img')) {
    showPersonInfoModal(event.target.dataset.id)
  }
})

// searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
//   event.preventDefault()
//   const keyword = searchInput.value.trim().toLowerCase()
//   let filteredNames = []
//   filteredNames = socialLists.filter((socialList) =>
//     socialList.name.toLowerCase().includes(keyword))
//   if (filteredNames.length === 0) {
//     return alert("It looks like there are not great matches for your search.")
//   }
//   renderSocialLists(filteredNames)
// })

personInfoModal.addEventListener('click', function onPanelclicked(event) {
  if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(event.target.dataset.id)
  }
})

//監聽分頁
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  renderSocialLists(getSocialByPage(page))
})


renderSocialLists(lists)
