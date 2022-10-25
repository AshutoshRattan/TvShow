let img = document.querySelector("#img")
let title = document.querySelector("#heading")
let likes = document.querySelector("#like")
let body = document.querySelector("body")

let list = JSON.parse(window.localStorage.getItem('favourite'))
if (!list) {
    list = []
    window.localStorage.setItem('favourite', "[]")
}

let urlParams = new URLSearchParams(location.href)
let query
for (let value of urlParams.values()) {
    query = parseInt(value)
}

window.onload = async function () {
    // let urlParams = new URLSearchParams(location.href)
    // let query
    // for (let value of urlParams.values()) {
    //     query = value
    // }    
    console.log(query)
    let res = await axios.get(`https://api.tvmaze.com/lookup/shows?thetvdb=${query}`)
    let data = res.data
    let name = data.name
    let imgUrl = data.image.medium
    img.setAttribute('src', imgUrl)
    title.innerText = name
    if (list.includes(query)) {
        likes.innerText = "❤️"
    }
    else {
        likes.innerText = "🖤"
    }
}




likes.addEventListener('click', function () {
    if (likes.innerText == "❤️") {
        console.log("red")
        likes.innerText = "🖤"
        list = list.filter(e => e != query)
        window.localStorage.setItem('favourite', JSON.stringify(list))

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
        console.log("black")
        likes.innerText = "❤️"
        list.push(parseInt(query))
        window.localStorage.setItem('favourite', JSON.stringify(list))

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