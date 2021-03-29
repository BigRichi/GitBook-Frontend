//---------- Global Variables ----------//
const searchBar = document.querySelector('#search-bar')
const userList = document.querySelector('#github-user-list')

//---------- Search Bar Event Listener ----------//
searchBar.addEventListener('keyup', event =>{
    const searchValue = searchBar.value

    if (searchValue === ""){
        const li = document.createElement('li')
        li.textContent = "Nothing"
        userList.append(li)
    }
    else {
        const li = document.createElement('li')
        li.textContent = searchValue
        userList.append(li)
    }
})