let searchBox = document.querySelector("#searchBox")
let endDiv = document.querySelector("#end")

searchBox.addEventListener('input', async function(e){
    let query = e.target.value
    console.log(query)
    endDiv.innerHTML = ""
    let res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    let data = res.data
    console.log(data)
    if(data == []) return
    res.data.forEach(element => {
        let div = document.createElement('div')
        let img = document.createElement('img')
        let textDiv = document.createElement('div')
        let title = document.createElement('div')
        let details = document.createElement('a')
        let fav = document.createElement('a')

        if(element.show.image) img.setAttribute('src', element.show.image.medium)
        img.setAttribute('height', 150)
        img.setAttribute('width', 150)
        div.appendChild(img)

        title.innerText = element.show.name
        title.classList.add('title')
        textDiv.appendChild(title)

        details.innerText = "Details"
        details.classList.add('details')
        textDiv.appendChild(details)

        fav.innerText = "Add to My Favourites"  
        fav.classList.add('fav')
        textDiv.appendChild(fav)

        div.appendChild(textDiv)
        textDiv.classList.add('textDiv')
        div.classList.add("card")
        endDiv.appendChild(div)

    })

})
