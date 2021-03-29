//---------- Global Variables ----------//
const userBoard = document.querySelector('#searched-github-users')

const searchBar = document.querySelector('#search-bar')
const userList = document.querySelector('#github-user-list')

//---------- API(s) ----------//

const githubSearchUrl = "https://api.github.com/search/users?q="
const githubUserUrl = "https://api.github.com/users/"

//---------- Search Bar Event Listener ----------//
searchBar.addEventListener('keyup', event =>{
    const searchValue = searchBar.value

    if (searchValue === ""){
        //In essance this if will change the between the dashboard and the search div
        userBoard.hidden = true
        userList.innerHTML = ""
    }
    else {
        //I will add table head and table body to this if
        userBoard.hidden = false
        gitUserSearch(searchValue)
    }
})

//---------- Fetch from Github API for Search Bar ----------//

const gitUserSearch = (value) => {
    fetch("https://api.github.com/users/BigRichi") /* [url]*/
    // fetch("https://api.github.com/users/BigRichi/repos") /* [repos_url]*/
    // fetch(`${githubSearchUrl}${value}`)
    .then(response => response.json())
    .then(gitUsers => {
        console.clear
        console.log(gitUsers)
        /* We will need to fetch from [url] to get the user information */
            /*
                .login //-for username
                .avatar_url //-for Image
                .html_url //-for actual site url
                .location
                .bio 
                .public_repos
                .hireable
                .followers
                .following
            */ 
        /* We will also need to fetch from [repos_url] to get the repo information */
            /*
                .name
                .html_url
                .description
                .size
                .language
                .watchers_count
                .stargazers_count
                .forks_count

            */
        /* We will also need to fetch from [events_url] which is located inside of [repos_url] in order to get the "PushEvent" aka commits */
            /*
                This api is organized as an Array of Objects
                To get a count of commits you will need to dive into each object a pull out the [type] that === "PushEvent"
            */
        // gitUsers.items.forEach(gitUser => {
            // singleUser(gitUser)    
            // console.log(gitUser)
        // })
    })
}

//---------- Fetch from Github API for single Github User ----------//
const singleUser = (value) => {
    const userUrl = value.url

    fetch(userUrl)
    .then(response => response.json())
    .then(gitUser => {
        const username = gitUser.login //-for username
        const image = gitUser.avatar_url //-for Image
        const gitLink = gitUser.html_url //-for actual site url
        const location = gitUser.location
        const bio = gitUser.bio 
        const publicRepos = gitUser.public_repos
        const hirable = gitUser.hireable
        const followers = gitUser.followers
        const following = gitUser.following
    })
}

//---------- Fetch from Github API for single Github User Repo ----------// ** Will break this out into seperate functions.
const singleUserRepo = (value) => {
    const reposUrl = value.repos_url

    fetch(reposUrl)
    .then(response => response.json())
    .then(userRepos => {
        userRepos.forEach(userRepo => {
            const name = userRepo.name
            const repoLink = userRepo.html_url
            const description = userRepo.description
            const size = userRepo.size
            const language = userRepo.language
            const watchersCount = userRepo.watchers_count
            const stargazersCount = userRepo.stargazers_count
            const forksCount = userRepo.forks_count
        })
        
    })
}