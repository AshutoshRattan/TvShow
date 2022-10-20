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
        let title = document.createElement('div')
        let details = document.createElement('div')
        let fav = document.createElement('div')

        if(element.show.image) img.setAttribute('src', element.show.image.medium)
        img.setAttribute('height', 100)
        img.setAttribute('width', 70)
        div.appendChild(img)

        title.innerText = element.show.name
        div.appendChild(title)

        details.innerText = "Details"
        div.appendChild(details)

        fav.innerText = "Add to My Favourites"
        div.appendChild(fav)

        endDiv.classList.add("card")
        endDiv.appendChild(div)

    })

})
