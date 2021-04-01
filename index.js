//---------- Global Variables ----------//
const userSearchTable = document.querySelector('#searched-github-users')

const title = document.querySelector('#body > h1')

const loginDiv = document.querySelector('#client-login')
const createDiv = document.querySelector('#account-creation')

const searchDiv = document.querySelector('#gituser-search')

const loginForm = loginDiv.querySelector('#login-form')
const createForm = createDiv.querySelector('#create-form')
const searchForm = searchDiv.querySelector('#search-form')

const gitUserTable = document.querySelector('#github-user-table')
const repoTable = document.querySelector('#github-user-repo-table')

const gitUserDashboard = document.querySelector('#dashboard')
const profile = gitUserDashboard.querySelector('#profile-info')
const favoriteButton = profile.querySelector('#FavoriteButton')

const favoriteGitusersDiv = document.querySelector('#favorite-gitusers')
const favoriteGitusersUl = favoriteGitusersDiv.querySelector('#gitusers')

const createButton = loginDiv.querySelector('#create-button')
const loginButton = createDiv.querySelector('#login-button')

const navBar = document.querySelector('#nav-bar')
const clientUserName = navBar.querySelector('#username')
const clientInfo = navBar.querySelector('#client-info')
const clientFirstName = clientInfo.querySelector('#first-name')
const clientLastName = clientInfo.querySelector('#last-name')
const clientLocation = clientInfo.querySelector('#location')

const clientEditDiv = navBar.querySelector('#edit-client-button-div')
const updateButton = clientEditDiv.querySelector('#client-button')
const updateForm = clientEditDiv.querySelector('#update-form')

const mainPage = document.querySelector('#main-page')

//---------- Backend Url(s) ----------//
const githubUserBackend = "http://localhost:3000/git_users"
const clientsBackend = "http://localhost:3000/clients"
const gitUserClients = "http://localhost:3000/git_user_clients"
const reposBackend = "http://localhost:3000/repositories"


//---------- API(s) ----------//

const githubSearchApi = "https://api.github.com/search/users?q="
const githubUserApi = "https://api.github.com/users/"

//---------- Client Information Render ----------//
const renderClient = (client) => {
    clientUserName.textContent = `Logged in as : ${client.username}`
    clientInfo.dataset.id = client.id
    clientInfo.dataset.username = client.username
    clientFirstName.textContent = client.first_name
    clientLastName.textContent = client.last_name
    clientLocation.textContent = client.location
}

//---------- Login Form Event Listener ----------//

loginForm.addEventListener('submit', event => {
    event.preventDefault()
    const userName = event.target.username.value

    fetch(`${clientsBackend}/${userName}`)
    .then(response => response.json())
    .then(client => {
        renderClient(client)
        searchDiv.style ="display:block" 
        loginDiv.style ="display:none" 
        createDiv.style ="display:none" 
        mainPage.style ="display:block" 
        renderFavorites()
    })
})



//---------- Toggle Create Form Event Listener ----------//
createButton.addEventListener('click', event => {
    loginDiv.style ="display:none" 
    createDiv.style ="display:block" 
})
loginButton.addEventListener('click', event => {
    loginDiv.style ="display:block" 
    createDiv.style ="display:none" 
})
 

//---------- Create Form Event Listener ----------//

createForm.addEventListener('submit', event => {
    event.preventDefault()
    const newClient = {
        first_name: createForm.firstName.value,
        last_name: createForm.lastName.value,
        location: createForm.location.value,
        username: createForm.userName.value
    }

    fetch(clientsBackend,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newClient)
    })
    .then(response => response.json())
    .then(client => {
        searchDiv.hidden = false
        loginDiv.hidden = true
        createDiv.hidden = true
        renderClient(client)
    })
})

//---------- Toggle update Form Event Listener ----------//
updateButton.addEventListener('click', event => {
    updateForm.hidden = false 
})

//---------- Update Form Event Listener ----------//
updateForm.addEventListener('submit', event => {
    if (event.target.matches('submit')){
        event.preventDefault()
        const updatedClient = {
            first_name: event.target.firstName.value,
            last_name: event.target.lastName.value,
            location: event.target.location.value
        }
        fetch(`${clientsBackend}/${clientInfo.dataset.username}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedClient)
        })
        .then(response => response.json())
        .then(newClientInfo => {
            firstName.textContent = newClientInfo.first_name
            lastName.textContent = newClientInfo.last_name 
            location.textContent = newClientInfo.location
        })
    }
})
//---------- Search Bar Event Listener ----------//
searchForm.addEventListener('submit', event =>{
    event.preventDefault()
    const searchValue = searchForm.username.value

    if (searchValue === ""){
        //In essance this if will change the between the dashboard and the search div
        userSearchTable.hidden = true
        gitUserTable.innerHTML = ""
    }
    else {
        //I will add table head and table body to this if
        gituserTableReset()
        userSearchTable.hidden = false
        gitUserSearch(searchValue)
    }
})

//---------- Fetch from Github API for Search Bar ----------//

const gitUserSearch = (value) => {
    fetch(`${githubSearchApi}${value}`)
    .then(response => response.json())
    .then(gitUsers => {
        gitUsers.items.forEach(gitUser => {
            singleUser(gitUser)    
            // console.log(gitUser)
        })
    })
}

//---------- GitUser Table Reset ----------//
const gituserTableReset = () => {
    gitUserTable.innerHTML = `
    <table id="github-user-table" style="width:100%">
        <tr>
            <th>Picture</th>
            <th>Username</th>
            <th>Location</th>
            <th>Public Repos</th>
            <th>Hirable</th>
            <th>Followers</th>
            <th>See User Page</th>
            <th>Favorite</th>
        </tr>
    </table>
    `
}

const repoTableReset = () => {
    gitUserTable.innerHTML = `
    <table id="github-user-table" style="width:100%">
        <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Forks Count</th>
        </tr>
    </table>
    `
}

/*//---------- Search Results Fetch ----------// trying to figure out how to put a gituser into an fetch function
const searchResult = () => {
    fetch(userUrl)
    .then(response => response.json())
    .then(gitUser => {
        const githubId = gitUser.id
        const username = gitUser.login //-for username
        const name = gitUser.name
        const image = gitUser.avatar_url //-for Image
        const bio = gitUser.bio 
        const location = gitUser.location
        const siteAdmin = gitUser.site_admin
        const hireable = gitUser.hireable
        const publicRepos = gitUser.public_repos
        const followers = gitUser.followers
        const following = gitUser.following

        globalThis.newGitUser = {
            githubId: gitUser.id,
            username: gitUser.login, //-for username
            name: gitUser.name,
            image: gitUser.avatar_url, //-for Image
            bio: gitUser.bio, 
            location: gitUser.location,
            siteAdmin: gitUser.site_admin,
            hireable: gitUser.hireable,
            publicRepos: gitUser.public_repos,
            followers: gitUser.followers,
            following: gitUser.following
        }
    })
}
*/

//---------- Fetch from Github API for single Github User ----------//
const singleUser = (gitUser) => {
    const userUrl = gitUser.url
    // debugger
    fetch(userUrl)
    .then(response => response.json())
    .then(gitUser => {
        const githubId = gitUser.id
        const username = gitUser.login //-for username
        const name = gitUser.name
        const image = gitUser.avatar_url //-for Image
        const bio = gitUser.bio 
        const location = gitUser.location
        const siteAdmin = gitUser.site_admin
        const hireable = gitUser.hireable
        const publicRepos = gitUser.public_repos
        const followers = gitUser.followers
        const following = gitUser.following
        favoriteButton.dataset.id = gitUser.reposUrl
        tableCreation(image, username, location, publicRepos, hireable, followers)
        // userDashboard(githubId, username, name, image, bio, location, siteAdmin, hireable, publicRepos, followers, following)

    })
}
//---------- Git User Search Table appends [8 columns] ----------//
const tableCreation = (image, username, location, publicRepos, hireable, followers) => {
    const tr = document.createElement('tr')

    const td1 = document.createElement('td')
    const img = document.createElement('img')
    img.src = image
    img.alt = username
    td1.append(img)
    tr.append(td1)

    const td2 = document.createElement('td')
    td2.textContent = username
    tr.append(td2)

    const td3 = document.createElement('td')
    td3.textContent = location
    tr.append(td3)

    const td4 = document.createElement('td')
    td4.textContent = publicRepos
    tr.append(td4)

    const td5 = document.createElement('td')
    td5.textContent = hireable
    tr.append(td5)

    const td6 = document.createElement('td')
    td6.textContent = followers
    tr.append(td6)

    const td7 = document.createElement('td')
    const userBtn = document.createElement('button')
    userBtn.textContent = 'Show Me'
    userBtn.classList = "button is-black is-small"
    userBtn.id = 'UserButton'
    userBtn.dataset.id = username
    td7.append(userBtn)
    tr.append(td7)


    gitUserTable.append(tr)
    
}


//---------- Event Listener on Github User Table to add that user to the BackEnd ----------//
// const userDashboard = (githubId, username, name, image, bio, location, siteAdmin, hireable, publicRepos, followers, following) => {
gitUserTable.addEventListener('click', event =>{
    if (event.target.matches('#UserButton')){
        const userName = event.target.dataset.id
        userSearchTable.hidden = true
        gitUserDashboard.style ="display:block" 
        
        fetch(`${githubUserApi}${userName}`)
        .then(response => response.json())
        .then(gitUser => {       
            const newUser = {
                github_id: gitUser.id,
                login: gitUser.login, //-for username
                name: gitUser.name,
                avatar_url: gitUser.avatar_url, //-for Image
                bio: gitUser.bio, 
                location: gitUser.location,
                site_admin: gitUser.site_admin,
                hireable: gitUser.hireable,
                public_repos: gitUser.public_repos,
                repos_url: gitUser.repos_url,
                followers: gitUser.followers,
                following: gitUser.following
            }
            // debugger
            fetch(githubUserBackend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(newGitUser => {
                renderReposTable(newGitUser.repos_url)
                renderDashboard(newGitUser)
            })
        })
    }
    
})

//---------- Render Repos ----------// 
const renderReposTable = (repos_api) => {
    // const sortedRepoApi = `${repos_api}?q=blog&sort=updated_at&order=desc`
    fetch(`${repos_api}?q=blog&sort=updated_at&order=desc`)
    .then(response => response.json())
    .then(repos => {
        repos.forEach(repo =>{
            const tr = document.createElement('tr')

            const atag = document.createElement('a')
            atag.href = repo.html_url
            atag.target = "_blank"

            const td1 = document.createElement('td')
            td1.textContent = repo.name
            atag.append(td1)
            tr.append(atag)
            
            const td2 = document.createElement('td')
            td2.textContent = repo.language
            tr.append(td2)
            
            const td3 = document.createElement('td')
            td3.textContent = repo.forks_count
            tr.append(td3)
            
            
            repoTable.append(tr)
        })
    })
}
//---------- Render Dashboard ----------// 
const renderDashboard = (newGitUser) => {
    const img = gitUserDashboard.querySelector("#gituser-img")
    const userName = gitUserDashboard.querySelector('#gituser-username')
    const name = gitUserDashboard.querySelector('#gituser-name')
    const location = gitUserDashboard.querySelector('#gituser-location')
    const hireable = gitUserDashboard.querySelector('#hireable')
    const divUserStats = gitUserDashboard.querySelector('#user-stats')

    const siteAdmin = divUserStats.querySelector("#user-stats > span:nth-child(1)")
    const publicRepos = divUserStats.querySelector("#user-stats > span:nth-child(2)")
    const followers = divUserStats.querySelector("#user-stats > span:nth-child(3)")
    const following = divUserStats.querySelector("#user-stats > span:nth-child(4)")
    
    
    
    img.src = newGitUser.avatar_url
    userName.textContent = newGitUser.login
    name.textContent = newGitUser.name
    location.textContent = newGitUser.location
    hireable.textContent = newGitUser.hireable
    profile.dataset.id = newGitUser.id

    siteAdmin.textContent = `Site Admin: ${newGitUser.site_admin}`
    publicRepos.textContent = `Number of public repositories: ${newGitUser.public_repos}`
    followers.textContent = `Followers: ${newGitUser.followers}`
    following.textContent = `Following: ${newGitUser.following}`
    singleUserRepo(newGitUser.repos_url)
}

//---------- Event Listener on Fav button ----------// 
favoriteButton.addEventListener('click', event => {
    const newGitUserClient = {
        client_id: clientInfo.dataset.id,
        git_user_id: profile.dataset.id
    }

    fetch(gitUserClients,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newGitUserClient)
    })
    .then(response => response.json())
    .then(gitUserClient => {
        console.log(gitUserClient)
    })

})

//---------- Fetch from Github API for single Github User Repo ----------// ** Will break this out into seperate functions.
const singleUserRepo = (reposApi) => {
    const sortedRepoApi = `${reposApi}?q=blog&sort=updated_at&order=desc`
    
    fetch(sortedRepoApi)
    .then(response => response.json())
    .then(userRepos => {
        userRepos.forEach(userRepo => {
            fetch(userRepo.events_url)
            .then(response => response.json())
            .then(events => {
                // array.filter(e => {return e.type === "PushEvent"})
                // console.log(events)
                // event.type === "PushEvent"
                const commits = events.filter(event => {return event.type === "PushEvent"})
                const commitsCount = commits.length


                const lastCommitDate = () => {
                    if (commitsCount > 0){
                        return commits[0].created_at
                    }
                    else  {
                        return  userRepo.created_at
                    } 
                }

                

                const newRepo = {
                    git_user_id: profile.dataset.id,
                    name: userRepo.name,
                    repo_id: userRepo.id,
                    description: userRepo.description,
                    html_url: userRepo.html_url,
                    language: userRepo.language,
                    size: userRepo.size,
                    forks_count: userRepo.forks_count,
                    commits: commitsCount,
                    events_url: userRepo.events_url,
                    last_commit_date: lastCommitDate(),
                    repo_creation: userRepo.created_at
                }
                
                gitUserRepo(newRepo)
               
            })       
        })

    })
}

const gitUserRepo = (newRepo) => {
    fetch(reposBackend, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newRepo)
    })
    .then(response => response.json())
    .then(repo =>{
        console.log(repo)
        // renderARepo(repo)
    }) 
}

//---------- Render repos to dashboard ----------// 
const renderARepo = (repo) =>{
    
}

//---------- Render Favorite Git Users ----------// 
const renderFavorites = () => {
    fetch(`${clientsBackend}/${clientInfo.dataset.username}`)
    .then(response => response.json())
    .then(client => {
        client.git_user_clients.forEach(gitUserClient => {
            
            const li = document.createElement('li')
            li.dataset.id = gitUserClient.id
            const gitUser = gitUserClient.git_user
            li.textContent = gitUser.name
            const deleteButton = document.createElement('button')
            deleteButton.textContent = "Delete"
            deleteButton.classList = "button is-black is-small"
            deleteButton.id = "delete-favorite"
            const div = document.createElement('div')
            div.classList.add("block")
            li.append(deleteButton)
            div.append(li)
            favoriteGitusersUl.append(div)

        })
    })
}



//---------- Event Listener favorite gitusers list ----------// 
favoriteGitusersUl.addEventListener('click', event => {

    if(event.target.matches('#delete-favorite')){
        const li = event.target.closest('li')
        const id = li.dataset.id
        fetch(`${gitUserClients}/${id}`, {
            method: 'DELETE',
        })
        li.remove()
    }
})







// Parameters: {"github_id"=>4323180, 
// "login"=>"adamwathan", 
// "name"=>"Adam Wathan", 
// "avatar_url"=>"https://avatars.githubusercontent.com/u/4323180?v=4", 
// "bio"=>"Creator of Tailwind CSS, author of Refactoring UI, host of Full Stack Radio.", 
// "location"=>"Ontario, Canada", 
// "site_admin"=>false, 
// "hireable"=>nil, 
// "public_repos"=>136, 
// "repos_url"=>"https://api.github.com/users/adamwathan/repos", 
// "followers"=>6426, 
// "following"=>12, 

// "git_user"=>{"github_id"=>4323180, "login"=>"adamwathan", "name"=>"Adam Wathan", "avatar_url"=>"https://avatars.githubusercontent.com/u/4323180?v=4", "bio"=>"Creator of Tailwind CSS, author of Refactoring UI, host of Full Stack Radio.", "location"=>"Ontario, Canada", "site_admin"=>false, "hireable"=>nil, "public_repos"=>136, "repos_url"=>"https://api.github.com/users/adamwathan/repos", "followers"=>6426, "following"=>12}}

// #<ActionController::Parameters {"github_id"=>68611902,
//  "login"=>"jpham1109", 
//  "name"=>"J Hoa Pham L-H",
//   "avatar_url"=>"https://avatars.githubusercontent.com/u/68611902?v=4",
//    "bio"=>"Future Full-stack Developer ", 
//    "location"=>"Brooklyn, NY", 
//    "site_admin"=>false, 
//    "hireable"=>nil, 
//    "public_repos"=>173, 
//    "repos_url"=>"https://api.github.com/users/jpham1109/repos", 
//    "followers"=>1, 
//    "following"=>1, 
//    "controller"=>"git_users", 
//    "action"=>"create", 

//    "git_user"=>{"github_id"=>68611902, "login"=>"jpham1109", "name"=>"J Hoa Pham L-H", "avatar_url"=>"https://avatars.githubusercontent.com/u/68611902?v=4", "bio"=>"Future Full-stack Developer ", "location"=>"Brooklyn, NY", "site_admin"=>false, "hireable"=>nil, "public_repos"=>173, "repos_url"=>"https://api.github.com/users/jpham1109/repos", "followers"=>1, "following"=>1}} permitted: false>
// nil


// #<ActionController::Parameters {"github_id"=>74831533, "login"=>"maxmiller413", "name"=>nil, "avatar_url"=>"https://avatars.githubusercontent.com/u/74831533?v=4", "bio"=>nil, "location"=>nil, "site_admin"=>false, "hireable"=>nil, "public_repos"=>165, "repos_url"=>"https://api.github.com/users/maxmiller413/repos", "followers"=>1, "following"=>1, "controller"=>"git_users", "action"=>"create", 

// "git_user"=>{"github_id"=>74831533, "login"=>"maxmiller413", "name"=>nil, "avatar_url"=>"https://avatars.githubusercontent.com/u/74831533?v=4", "bio"=>nil, "location"=>nil, "site_admin"=>false, "hireable"=>nil, "public_repos"=>165, "repos_url"=>"https://api.github.com/users/maxmiller413/repos", "followers"=>1, "following"=>1}} permitted: false>