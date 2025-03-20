import React from 'react'
import { useState, useTransition } from 'react'

const App = () => {
    const [image, setImage] = useState()
    const [pending, startTransition] = useTransition()

    function callApi() {
        startTransition(async() => {
                await new Promise(res=>setTimeout(res,5000))  // ChatGPT used it as a different function called delay
                let data = await fetch("https://dog.ceo/api/breeds/image/random")
                let link = await data.json()
                setImage(link.message)
        })




    }

    return (
        <div>
            <button disabled={pending} onClick={callApi} >Button Click</button>
            <img src={image} alt="" width={"300px"} height={"300px"} />

        </div>
    )
}

export default App
