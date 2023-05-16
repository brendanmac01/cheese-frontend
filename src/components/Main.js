import React, {useEffect, useState} from 'react'
import { Routes, Route } from "react-router-dom"

import Index from '../pages/Index'
import Show from '../pages/Show'

const Main = (props) => {
    const [ cheese, setCheese ] = useState(null)

    const URL = "https://cheese-backend-fxmc.onrender.com/cheese/"

    const getCheese = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setCheese(data)
    }

   const createCheese = async (person) => {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(person)
        })
    }
    const updateCheese = async (person, id) => {
        // make put request to create Cheese
        await fetch(URL + id, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(person),
        });
        // update list of Cheese
        getCheese();
      }
    
      const deleteCheese = async id => {
        // make delete request to create Cheese
        await fetch(URL + id, {
          method: "DELETE",
        })
        // update list of Cheese
        getCheese();
      }

    useEffect(() => getCheese(), [])

  return (
    <main>
    <Routes>
        <Route exact path="/" element={<Index cheese={cheese} createCheese={createCheese}/>} />
        <Route
          path="/cheese/:id"
          element = {
            <Show
              cheese={cheese}
              updateCheese={updateCheese}
              deleteCheese={deleteCheese}
            />
          }
        />
    </Routes>
   </main>
     )
}

export default Main;