let mainDiv = document.querySelector("#main")

let list = JSON.parse(window.localStorage.getItem("favourite"))
if (!list) {
    list = []
    window.localStorage.setItem("favourite", JSON.stringify(list))
}



window.onload = async function () {
    await list.forEach(async element => {
        let body = document.querySelector('body')
        element = parseInt(element)
        let card = document.createElement('div')
        card.classList.add("card")

        let img = document.createElement('img')
        img.classList.add("img")
        let title = document.createElement('h1')
        title.classList.add("title")
        let like = document.createElement('div')
        like.classList.add("like")
        let details = document.createElement('a')
        details.classList.add("details")

        let res = await axios.get(`https://api.tvmaze.com/lookup/shows?thetvdb=${element}`)
        let data = res.data
        let name = data.name
        let imgUrl = data.image.medium

        img.setAttribute('src', imgUrl)
        title.innerText = name
        if (list.includes(element)) {
            like.innerText = "❤️"
        }
        else {
            like.innerText = "🖤"
        }

        details.innerText = 'Details'
        details.setAttribute('href', `http://127.0.0.1:5500/details.html?q=${element}`)

        like.addEventListener('click', function (e) {
            if (like.innerText == "❤️") {
                console.log("red")
                like.innerText = "🖤"
                list = list.filter(e => e != element)
                window.localStorage.setItem('favourite', JSON.stringify(list))

                let temp = document.createElement('div')
                temp.classList.add('tempBanner')
                temp.innerText = "Removed from Favourites"
                body.appendChild(temp)
                setTimeout(function () {
                    console.log(123)
                    body.removeChild(temp)
                }, 1000)
                card.remove()
            }
            else {
                console.log("black")
                like.innerText = "❤️"
                list.push(parseInt(element))
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

        card.appendChild(img)
        card.appendChild(title)
        card.appendChild(like)
        card.appendChild(details)
        mainDiv.appendChild(card)
    })

}