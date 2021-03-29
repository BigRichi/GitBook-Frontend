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
    // fetch("https://api.github.com/users/BigRichi") /* [url]*/
    // fetch("https://api.github.com/users/BigRichi/repos") /* [repos_url]*/
    fetch(`${githubSearchUrl}${value}`)
    .then(response => response.json())
    .then(gitUsers => {
        console.log(gitUsers)
        singleUser(gitUsers)
        gitUsers.items.forEach(gitUser => {
            singleUser(gitUser)    
            console.log(gitUser)
        })
    })
}
    /*
        This api is organized as an Array of Objects
        To get a count of commits you will need to dive into each object a pull out the [type] that === "PushEvent"
    */

//---------- Fetch from Github API for single Github User ----------//
const singleUser = (gitUser) => {
    const userUrl = gitUser.url
    const reposUrl = gitUser.repos_url

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
