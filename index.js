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

//---------- Fetch from GitHub API for Search Bar ----------//

const gitUserSearch = (value) => {
    // fetch("https://api.github.com/users/BigRichi") /* [url]*/
    fetch("https://api.github.com/users/BigRichi/repos") /* [repos_url]*/
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
        // gitUsers.items.forEach(gitUser => {
        //     console.log(gitUser)
        // })

    })
}
