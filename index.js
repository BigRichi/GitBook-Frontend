//---------- Global Variables ----------//
const userSearchTable = document.querySelector('#searched-github-users')

const searchForm = document.querySelector('#search-form')
const gitUserTable = document.querySelector('#github-user-table')
const gitUserDashboard = document.querySelector('#dashboard')

//---------- Url(s) ----------//
const githubUserUrl = "http://localhost:3000/git_users"
//---------- API(s) ----------//

const githubSearchApi = "https://api.github.com/search/users?q="
const githubUserApi = "https://api.github.com/users/"

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
        tableReset()
        userSearchTable.hidden = false
        gitUserSearch(searchValue)
    }
})

//---------- Fetch from Github API for Search Bar ----------//

const gitUserSearch = (value) => {
    // fetch("https://api.github.com/users/BigRichi") /* [url]*/
    // fetch("https://api.github.com/users/BigRichi/repos") /* [repos_url]*/
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
const tableReset = () => {
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

/*//---------- Search Results Fetch ----------//
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
    const reposUrl = gitUser.repos_url
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
    userBtn.classList = 'button'
    userBtn.id = 'UserButton'
    userBtn.dataset.id = username
    td7.append(userBtn)
    tr.append(td7)

    const td8 = document.createElement('td')
    const favoriteBtn = document.createElement('button')
    favoriteBtn.textContent = 'Favorite'
    favoriteBtn.classList = 'button'
    favoriteBtn.id = 'FavoriteButton'
    userBtn.dataset.id = username
    td8.append(favoriteBtn)
    tr.append(td8)

    gitUserTable.append(tr)
    
}


//---------- Event Listener on Github User Table to add that user to the BackEnd ----------//
// const userDashboard = (githubId, username, name, image, bio, location, siteAdmin, hireable, publicRepos, followers, following) => {
gitUserTable.addEventListener('click', event =>{
    if (event.target.matches('#UserButton')){
        const id = event.target.dataset.id
        userSearchTable.hidden = true
        gitUserDashboard.hidden = false
        
        fetch(`${githubUserApi}${id}`)
        .then(response => response.json())
        .then(gitUser => {        
            const newGitUser = {
                github_id: gitUser.id,
                login: gitUser.login, //-for username
                name: gitUser.name,
                avatar_url: gitUser.avatar_url, //-for Image
                bio: gitUser.bio, 
                location: gitUser.location,
                site_admin: gitUser.site_admin,
                hireable: gitUser.hireable,
                public_repos: gitUser.public_repos,
                followers: gitUser.followers,
                following: gitUser.following
            }
            fetch(githubUserUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newGitUser)
            })
            .then(response => response.json())
            .then(newGitUser => {
                console.log(newGitUser)
            })
        })
    }
})
//---------- Fetch from Github API for single Github User Repo ----------// ** Will break this out into seperate functions.
const singleUserRepo = (reposUrl) => {
    fetch(reposUrl)
    .then(response => response.json())
    .then(userRepos => {
        userRepos.forEach(userRepo => {
            const repoEventUrl = userRepo.events_url
            console.log(repoEventUrl)
            // const name = userRepo.name
            // const repoLink = userRepo.html_url
            // const description = userRepo.description
            // const size = userRepo.size
            // const language = userRepo.language
            // const watchersCount = userRepo.watchers_count
            // const stargazersCount = userRepo.stargazers_count
            // const forksCount = userRepo.forks_count 
            repoEvent(repoEventUrl)          
        })    
    })
}

const repoEvent = (repoEventUrl) => {
    fetch(repoEventUrl)
    .then(response => response.json())
    .then(repoEvents =>{
        console.log(repoEvents)


    })  
}
