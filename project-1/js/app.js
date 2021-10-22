// variables
const userProfile = document.querySelector('.user-profile');
const userName = document.querySelector('#user_name');

// User Class
class User {
  async getUser() {
    try {
      let response = await fetch(
        `https://api.github.com/users/${userName.value}`
      );
      let userData = await response.json();

      let reposRes = await fetch(
        `https://api.github.com/users/${userData.login}/repos`
      );
      let userRepos = await reposRes.json();
      let latestRepos = userRepos
        .sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
        .slice(0, 5);
      return { userData, latestRepos };
    } catch (error) {
      console.log(error);
    }
  }

  showUserProfile(userData) {
    const createdDate = this.formateDate(userData.created_at);
    userProfile.innerHTML = `<div class="card mt-3">
    <div class="card-header">${userData.name}</div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-3">
          <img
            src=${userData.avatar_url}
            class="card-img-top"
            alt="profil-img"
          />
          <div class="my-3">
            <a href=${
              userData.html_url
            } target="_blank" class="btn btn-info col-md-12">View Profile</a>
          </div>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${
            userData.public_repos
          }</span>
          <span class="badge badge-secondary">Public Gists: ${
            userData.public_gists
          }</span>
          <span class="badge badge-success">Followers: ${
            userData.followers
          }</span>
          <span class="badge badge-danger">Following: ${
            userData.following
          }</span>
          <div class="mt-3">
            <ul class="list-group">
              <li class="list-group-item">Company: ${
                userData.company ?? 'Not Available'
              }</li>
              <li class="list-group-item">Website/blog: <a href=${
                userData.blog
              }>
              ${userData.blog}</a></li>
              <li class="list-group-item">Location: ${userData.location}</li>
              <li class="list-group-item">Member Since: ${createdDate}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card my-3">
    <div class="card-header">Latest Repos</div>

    <ul id='latest_repo' class="list-group list-group-flush">
      
    </ul>
  </div>`;
  }

  showLatestRepo(reposArr) {
    const repoList = document.querySelector('#latest_repo');
    let list = reposArr.map((repo) => {
      const listItem = `<li class='list-group-item'>
                        <div class='row'>
                          <div class='col-md-6'>
                            <strong>${repo.name}</strong>: ${repo.description}
                          </div>
                          <div class='col-md-3 mb-3'>
                            <span class='badge badge-secondary'>Forks: ${repo.forks}</span>
                            <span class='badge badge-success'>Watchers: ${repo.watchers}</span>
                            <span class='badge badge-danger'>Stars: ${repo.forks}</span>
                          </div>
                          <div class='col-md-3'>
                            <a href=${repo.html_url} target='_blank' class='btn btn-dark btn-block'>
                              Repo Page
                            </a>
                          </div>
                        </div>
                      </li>`;
      return listItem;
    });

    repoList.innerHTML = list.reduce((current, item) => {
      return current + item;
    }, ``);
  }

  formateDate(date) {
    const dateObj = new Date(date);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return dateObj.toLocaleDateString('en-US', options);
  }
}

// event listner
const user = new User();

// debounce function
function debounce(fn, delay) {
  let clearTimer;
  return function (...arg) {
    clearTimeout(clearTimer);
    clearTimer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}

function fetchUserInfo() {
  user.getUser().then((data) => {
    user.showUserProfile(data.userData);
    user.showLatestRepo(data.latestRepos);
  });
}

const delayFetchUserInfo = debounce(fetchUserInfo, 1000);

userName.addEventListener('keyup', () => {
  delayFetchUserInfo();
});
