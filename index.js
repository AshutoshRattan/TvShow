let searchBox = document.querySelector("#searchBox")
let endDiv = document.querySelector("#end")
let topDiv = document.querySelector("#top")
let body = document.querySelector('body')

let favourite = JSON.parse(localStorage.getItem('favourite'))
if (!favourite) {
    let arr = []
    localStorage.setItem('favourite', JSON.stringify(arr))
    favourite = []
}

searchBox.addEventListener('input', async function (e) {
    let query = e.target.value
    console.log(query)
    endDiv.innerHTML = ""
    let res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    let data = res.data
    console.log(data)
    if (data == []) return
    res.data.forEach(element => {
        let div = document.createElement('div')
        let img = document.createElement('img')
        let textDiv = document.createElement('div')
        let title = document.createElement('div')
        let details = document.createElement('a')
        let fav = document.createElement('a')

        if (element.show.image) img.setAttribute('src', element.show.image.medium)
        img.setAttribute('height', 150)
        img.setAttribute('width', 150)
        div.appendChild(img)

        title.innerText = element.show.name
        title.classList.add('title')
        textDiv.appendChild(title)

        details.innerText = "Details💪"
        details.setAttribute('href', `./details.html?q=${element.show.externals.thetvdb}`)
        details.classList.add('details')
        textDiv.appendChild(details)
        if (favourite && favourite.includes(element.show.externals.thetvdb)) { fav.innerText = "Remove From My Favourites❌" }
        else { fav.innerText = "Add to My Favourites❤️" }
        // fav.setAttribute('href', `./favourites.html`)

        fav.addEventListener('click', function (e) {
            let favourite = JSON.parse(localStorage.getItem('favourite'))
            if (fav.innerText == "Remove from My Favourites❌") {
                favourite = favourite.filter(e => e !== element.show.externals.thetvdb)
                localStorage.setItem('favourite', JSON.stringify(favourite))
                fav.innerText = 'Add to My Favourites❤️'

                let temp = document.createElement('div')
                temp.classList.add('tempBanner')
                temp.innerText = "Removed from Favourites"
                body.appendChild(temp)
                setTimeout(function () {
                    console.log(123)
                    body.removeChild(temp)
                }, 1000)

            }
            else {
                favourite.push(element.show.externals.thetvdb)
                localStorage.setItem('favourite', JSON.stringify(favourite))
                fav.innerText = "Remove from My Favourites❌"

                let temp = document.createElement('div')
                temp.classList.add('tempBanner')
                temp.innerText = "Added to Favourites"
                body.appendChild(temp)
                setTimeout(function () {
                    console.log(123)
                    body.removeChild(temp)
                }, 1000)

            }

        })
        fav.classList.add('fav')
        textDiv.appendChild(fav)

        div.appendChild(textDiv)
        textDiv.classList.add('textDiv')
        div.classList.add("card")
        endDiv.appendChild(div)

    })

})
