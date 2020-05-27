// Estado da aplicação (state)

let usersFoundList = null;
let userSearch = null;

let allUsers = [];
let filteredUsers = [];

let countMale = 0;
let countFemale = 0;
let sumAge = 0;
let meanAge = 0;

let totalUsersFound = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  usersFoundList = document.querySelector('#usersFoundList');
  userSearch = document.querySelector('#userSearch');
  totalUsersFound = document.querySelector('#usersFound');

  countMale = document.querySelector('#countMale');
  countFemale = document.querySelector('#countFemale');
  sumAge = document.querySelector('#sumAge');
  meanAge = document.querySelector('#meanAge');

  userSearch.addEventListener('keyup', () => render());

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
  render();
}

function render() {
  filterUserList(userSearch.value.toLowerCase());
  renderUserList();
  renderUserCount();
  renderStats();
}

function filterUserList(nameToFilter) {
  console.log(nameToFilter);
  filteredUsers = allUsers.filter((user) => {
    return user.nameFull.toLowerCase().includes(nameToFilter);
  });
}

function renderUserList() {
  let usersHTML = '<div>';

  filteredUsers.forEach((user) => {
    const { id, nameFirst, nameLast, avatar, age } = user; // destructuring

    const userHTML = `
    <div class='user' id='${id}'>
      <div>
        <img src="${avatar}" alt="${nameFirst}-${nameLast}"/>
      </div>
      <div>
        <p><span>${nameFirst} ${nameLast}</span>, <span>${age}</span> anos</p>
      </div>
    </div>
    `;

    usersHTML += userHTML;
  });

  usersHTML += '</div>'; //fechando a div

  usersFoundList.innerHTML = usersHTML;
}

function renderUserCount() {
  totalUsersFound.innerHTML = filteredUsers.length;
}

function renderStats() {
  //prettier-ignore
  countMale.innerHTML = filteredUsers.filter((user) => user.gender === 'male').length;
  //prettier-ignore
  countFemale.innerHTML = filteredUsers.filter((user) => user.gender === 'female').length;

  sumAge.innerHTML = filteredUsers.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);

  meanAge.innerHTML = sumAge.innerHTML / filteredUsers.length;
}
