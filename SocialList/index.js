const BASE_URL = "https://lighthouse-user-api.herokuapp.com"
const INDEX_URL = BASE_URL + "/api/v1/users"
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const dataPanel = document.querySelector('.card-deck')
const paginator = document.querySelector('#paginator')
const personInfoModal = document.querySelector('#personInfoModal')
const modalHeader = document.querySelector('#personInfoModalLabel')
const modalBody = document.querySelector('.modal-body')
const modalFooter =
  document.querySelector('.modal-footer')
const socialLists = []
const SOCIAL_PER_PAGE = 16
let filteredNames = []

function renderSocialLists(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `
    <div class="social-list-card col-sm-3 my-1 p-3">
      <img
        src="${item.avatar}"
        class="card-img mt-1" data-toggle="modal" data-target="#personInfoModal" data-id="${item.id}" alt = "image">
      <p class="card-name py-2 mt-1">${item.name}
      ${favoriteAdded(item.id) ? '<i class="fas fa-heart pl-2"></i>' : ''}
      </p>
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
  const data = filteredNames.length ? filteredNames : socialLists
  const startIndex = (page - 1) * SOCIAL_PER_PAGE
  return data.slice(startIndex, startIndex + SOCIAL_PER_PAGE)
}

function showPersonInfoModal(id) {
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
    <div class="message mr-3"></div>
    <button type="button" class="btn-add-favorite btn" data-id="${response.data.id}">Add Favorite <i class="fas fa-heart"></i></button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    `
  })
}

//檢查是否已加入最愛
function favoriteAdded(id) {
  const list = JSON.parse(localStorage.getItem('favoritePals')) || []
  return list.some((pal) => pal.id === id)
}

//判斷頁數
function currentPages(page) {
  if (filteredNames.length !== 0) {
    displaySocialListPanel(page, filteredNames.length)
  } else {
    displaySocialListPanel(page, socialLists.length)
  }
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem('favoritePals')) || []
  const pal = socialLists.find((pal) => pal.id === id)
  if (favoriteAdded(id)) {
    return document.querySelector('.message').innerHTML = `          
    <p class="p-2 m-0">Favorite Already Added!!</p>`
    // return alert('Already Added!') //取消原本提示方式
  } else {
    document.querySelector('.message').innerHTML = `          
    <p class="p-2 m-0">Favorite Add!</p>`
  }
  list.push(pal)
  localStorage.setItem('favoritePals', JSON.stringify(list))
  currentPages(dataPanel.dataset.page)
  // if (filteredNames.length !== 0) {
  //   displaySocialListPanel(dataPanel.dataset.page, filteredNames.length)
  // } else {
  //   displaySocialListPanel(dataPanel.dataset.page, socialLists.length)
  // }
  // // displaySocialListPanel(dataPanel.dataset.page, socialLists.length)
}

function displaySocialListPanel(page, socialLength) {
  renderSocialLists(getSocialByPage(page))
  renderPaginator(socialLength)
}

//監聽事件在頭像照片
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.card-img')) {
    showPersonInfoModal(event.target.dataset.id)
  }
})

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredNames = socialLists.filter((socialList) =>
    socialList.name.toLowerCase().includes(keyword))
  if (filteredNames.length === 0 || keyword === '') {
    return alert("It looks like there are not great matches for your search.")
  }
  displaySocialListPanel(1, filteredNames.length)
})

searchForm.addEventListener('input', function onSearchFormInput(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  const page = dataPanel.dataset.page
  if (keyword === '') {
    filteredNames = []
    displaySocialListPanel(page, socialLists.length)
  }
})

personInfoModal.addEventListener('click', function onPanelclicked(event) {
  if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})


//監聽分頁
paginator.addEventListener('click', function onPaginatorClicked(event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  dataPanel.dataset.page = page
  document.getElementById("slogan").scrollIntoView() //新增錨點
  currentPages(page)
  paginator.children[page - 1].classList.add('active')
})
//ocument.querySelector("[data-page='6']").parentElement.classList.add("active")

axios
  .get(INDEX_URL)
  .then((response) => {
    socialLists.push(...response.data.results)
    displaySocialListPanel(1, socialLists.length)
  })
  .catch((err) => console.log(err))