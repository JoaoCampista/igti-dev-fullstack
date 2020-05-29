// Estado da aplicação (state)

let usersFoundList = null;
let usersFavoriteList = null;
let userSearch = null;
let textUsersFound = null;
let textInitial = null;
let dataContainer = null;
let numberFormat = null;
let loadingContainer = null;

let allUsers = [];
let filteredUsers = [];
let favoriteUsers = [];

let countMale = 0;
let countFemale = 0;
let sumAge = 0;
let meanAge = 0;
let totalUsersFound = 0;
let count = 0;

window.addEventListener('load', () => {
  userSearch = document.querySelector('#userSearch');
  dataContainer = document.querySelector('#dataContainer');
  loadingContainer = document.querySelector('#loadingContainer');

  loadingStatus();

  userSearch.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      filterUserList(userSearch.value.toLowerCase());
      render();
      renderUserFavoriteList();

      if (favoriteUsers.length !== 0) {
        handleFavoriteButtons();
      }
    } else {
      if (event.key === 'Enter' && userSearch.value.trim() === '') {
        render();
      }
    }
  });
  numberFormat = Intl.NumberFormat('pt-BR');
  fetchUsers();
});

async function fetchUsers() {
  // prettier-ignore
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();

  allUsers = json.results.map((user) => {
    const { name, picture, dob, gender, login } = user; // destructuring

    return {
      id: login.uuid,
      nameFirst: name.first,
      nameLast: name.last,
      nameFull: name.first + ' ' + name.last,
      avatar: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });
  //render();
}

function render() {
  renderUserList();
  renderStats();
  handleUsersButtons();
}

function filterUserList(nameToFilter) {
  filteredUsers = allUsers.filter((user) => {
    return user.nameFull.toLowerCase().includes(nameToFilter);
  });

  if (favoriteUsers.length !== 0) {
    favoriteUsers.forEach((userFavorite) => {
      filteredUsers = filteredUsers.filter(
        (user) => user.id !== userFavorite.id
      );
    });
  }
  filteredUsers.sort((a, b) => {
    return a.nameFull.localeCompare(b.nameFull);
  });
}

function renderUserList() {
  if (userSearch.value.trim() !== '') {
    const dataContainerHTML = `
      <div class="w-50 border rounded-lg bg-white mr-3">
        <h4 class="d-flex justify-content-center mb-3" id="textInitial"><span class="mr-2" id="usersFound"></span><span id="textUsersFound"></span></h4>
        <div id="usersFoundList"></div>
      </div>

      <div class="w-50 d-flex flex-column">
        <div class="border rounded-lg bg-white">
          <h4 class="d-flex justify-content-center mb-3">informações</h4>
          <div class="d-flex flex-column ml-3 mb-3">
            <p class="my-0">sexo masculino: <span id="countMale"></span></p>
            <p class="my-0">sexo feminino: <span id="countFemale"></span></p>
            <p class="my-0">soma das idades: <span id="sumAge"></span></p>
            <p class="my-0">média das idades: <span id="meanAge"></span></p>
          </div>
        </div>
        <div id = "containerFavorites"></div>
      </div>
    `;
    dataContainer.innerHTML = dataContainerHTML;

    usersFoundList = document.querySelector('#usersFoundList');
    containerFavorites = document.querySelector('#containerFavorites');

    totalUsersFound = document.querySelector('#usersFound');
    textUsersFound = document.querySelector('#textUsersFound');

    textInitial = document.querySelector('#textInitial');

    countMale = document.querySelector('#countMale');
    countFemale = document.querySelector('#countFemale');
    sumAge = document.querySelector('#sumAge');
    meanAge = document.querySelector('#meanAge');

    let usersHTML = `<div class='d-flex justify-content-start flex-column'>`;

    filteredUsers.forEach((user) => {
      const { id, nameFirst, nameLast, avatar, age } = user; // destructuring
      const userHTML = `
    <div class='d-flex flex-row align-items-center bd-highlight mb-3 ml-3 id='${id}'>
      <div class='d-flex flex-row align-items-center flex-fill'>
        <div>
          <img src="${avatar}" alt="${nameFirst}-${nameLast}" class="rounded-circle mr-2"/>
        </div>
        <div>
          <span>${nameFirst} ${nameLast}</span>, <span>${age}</span> anos
        </div>
      </div>
        <div class='d-flex justify-content-end mx-3'>
          <button type="button" id="${id}"class="btn btn-dark">+</button>
        </div>
    </div>
    `;
      usersHTML += userHTML;
    });
    usersHTML += '</div>'; //fechando a div
    usersFoundList.innerHTML = usersHTML;
    renderUserCount();
  } else dataContainer.innerHTML = '';
}

function renderUserFavoriteList() {
  if (favoriteUsers.length !== 0) {
    containerFavorites.innerHTML = `
    <div class="border rounded-lg bg-white mt-3 mb-3">
      <h4 class="d-flex justify-content-center">favoritos</h4>
      <div class="d-flex flex-column" id="usersFavoriteList"></div>
    </div>
    `;
    usersFavoriteList = document.querySelector('#usersFavoriteList');

    let favoritesHTML = `<div class='d-flex justify-content-start flex-column'>`;

    favoriteUsers.forEach((user) => {
      const { id, nameFirst, nameLast, avatar, age } = user; // destructuring
      const favoriteHTML = `
            <div class='d-flex flex-row align-items-center bd-highlight mb-3 ml-3 id='${id}'>
              <div class='d-flex flex-row align-items-center flex-fill'>
                <div>
                  <img src="${avatar}" alt="${nameFirst}-${nameLast}" class="rounded-circle mr-2"/>
                </div>
                <div>
                  <span>${nameFirst} ${nameLast}</span>, <span>${age}</span> anos
                </div>
              </div>
                <div class=' d-flex justify-content-end mx-3'>
                  <button type="button" id="${id}"class="btn btn-dark">-</button>
                </div>
            </div>
            `;
      favoritesHTML += favoriteHTML;
    });
    favoritesHTML += '</div>'; //fechando a div
    usersFavoriteList.innerHTML = favoritesHTML;
  }
}

function renderUserCount() {
  totalUsersFound.innerHTML = filteredUsers.length;

  if (filteredUsers.length === 1) {
    textUsersFound.innerHTML = 'usuário encontrado';
  } else {
    textUsersFound.innerHTML = 'usuários encontrados';
  }
}

function renderStats() {
  countMale.innerHTML = filteredUsers.filter(
    (user) => user.gender === 'male'
  ).length;
  countFemale.innerHTML = filteredUsers.filter(
    (user) => user.gender === 'female'
  ).length;

  sumAge.innerHTML = formatNumber(
    filteredUsers.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0)
  );

  meanAge.innerHTML = Math.round(
    filteredUsers.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0) / filteredUsers.length
  );
}

function handleUsersButtons() {
  const userButtons = Array.from(usersFoundList.querySelectorAll('.btn'));

  userButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });
}

function handleFavoriteButtons() {
  // prettier-ignore
  const favoriteButtons = Array.from(usersFavoriteList.querySelectorAll('.btn'));

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const userToAdd = filteredUsers.find((user) => user.id === id);

  favoriteUsers = [...favoriteUsers, userToAdd];

  favoriteUsers.sort((a, b) => {
    return a.nameFull.localeCompare(b.nameFull);
  });

  filteredUsers = filteredUsers.filter((user) => user.id !== id);

  render();
  renderUserFavoriteList();
  handleFavoriteButtons();
}

function removeFromFavorites(id) {
  const userToRemove = favoriteUsers.find((user) => user.id === id);

  filteredUsers = [...filteredUsers, userToRemove];

  filteredUsers.sort((a, b) => {
    return a.nameFull.localeCompare(b.nameFull);
  });

  favoriteUsers = favoriteUsers.filter((user) => user.id !== id);
  render();
  renderUserFavoriteList();
  handleFavoriteButtons();
}

function formatNumber(number) {
  return numberFormat.format(number);
}

function loadingStatus() {
  loadingContainer.innerHTML = `
  <div class="spinner-border text-danger my-5" style="width: 4rem; height: 4rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>`;
  const interval = setInterval(() => {
    loadingContainer.innerHTML = '';
  }, 2000);
}
