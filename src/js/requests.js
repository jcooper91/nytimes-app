const getArticles = async (url) => {
    const response = await fetch(url)
    if(response.status === 200) {
        const data = await response.json()
        return data.response.docs
    } else {
        throw new Error("Error retrieving data")
    }
}

export { getArticles }