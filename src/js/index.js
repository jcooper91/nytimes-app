import { getArticles } from './requests'

 let baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
 let key = '8GniSN6Tu0eosz2s5D7twa45AXn2GBWj'
 let url

 let searchTerm = document.querySelector('.search')
 let startDate = document.querySelector('.start-date')
 let endDate = document.querySelector('.end-date')
 let searchForm = document.querySelector('form')
 let submitBtn = document.querySelector('.submit')

 let nextBtn = document.querySelector('.next')
 let previousBtn = document.querySelector('.prev')

 let section = document.querySelector('section')
 let nav = document.querySelector('nav')

 // Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
 nav.style.display = 'none'

 // define the initial page number and status of the navigation being displayed
 let pageNumber = 0;
 let displayNav = false

 // Event listeners to control the functionality
 searchForm.addEventListener('submit', submitSearch)

 function submitSearch(e) {
     pageNumber = 0
     fetchResults(e)
 }

 function fetchResults(e) {
    e.preventDefault()
    
    // url = baseURL + `?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`
    // url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8GniSN6Tu0eosz2s5D7twa45AXn2GBWj&page=0&q=football&fq=document_type:("article")'
    if(startDate.value !== '') {
        url += `&begin_date=${startDate.value}`
    }

    if(endDate.value !== '') {
        url += `&begin_date=${endDate.value}`
    }
 }

    let retrieveArticles = getArticles('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8GniSN6Tu0eosz2s5D7twa45AXn2GBWj&page=0&q=football&fq=document_type:("article")')

    retrieveArticles.then((articles) => {
        if(articles.length === 11) {
            nav.style.display = 'block'
        } else {
            nav.style.display = 'none'
        }

        if(articles.length === 0) {
            let para = document.createElement('p')
            para.textContent = 'No results returned.'
            section.appendChild(para);
        } else {
            articles.forEach((item, index) => {
                console.log(articles)
                let article = document.createElement('article')
                let heading = document.createElement('h2')
                let link    = document.createElement('a')
                let img     = document.createElement('img')
                let para1   = document.createElement('p')
                let para2   = document.createElement('p')
                let clearfix = document.createElement('div')
                let current = item

                link.href = current.web_url
                link.textContent = current.headline.main
                para1.textContent = current.snippet
                para2.textContent = `Keywords: `
                current.keywords.forEach((keyword, index) => {
                    let span = document.createElement('span')
                    span.textContent = keyword.value
                    para2.appendChild(span)
                    
                })
                if(current.multimedia.length > 0) {
                    img.src = `http://www.nytimes.com/${current.multimedia[0].url}`
                    img.alt = current.headline.main
                }

                clearfix.classList.add('clearfix')

                article.appendChild(heading)
                heading.appendChild(link)
                article.appendChild(img)
                article.appendChild(para1)
                article.appendChild(para2)
                article.appendChild(clearfix)
                section.appendChild(article)
            })
        }
    })