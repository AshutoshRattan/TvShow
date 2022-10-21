let img = document.querySelector("#img")
let title = document.querySelector("#heading")

window.onload = async function () {
    //let queryParameter = window.location.search
    let urlParams = new URLSearchParams(location.href)
    let query
    for (let value of urlParams.values()) {
        query = value
    }    
    console.log(query)
    let res = await axios.get(`https://api.tvmaze.com/lookup/shows?thetvdb=${query}`)
    let data = res.data
    let name = data.name
    let imgUrl = data.image.medium
    img.setAttribute('src', imgUrl)
    title.innerText = name
}