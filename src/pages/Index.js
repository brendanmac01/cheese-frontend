import React, { useState } from 'react'
import { Link } from 'react-router-dom'
 
const Index = (props) => {

    const [ newForm, setNewForm ] = useState({
        name: "",
        countryOfOrigin: "",
        image: ''
    })

    const handleChange = (event) => {
        setNewForm({ ...newForm, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.createCheese(newForm)
        setNewForm({
            name: "",
            countryOfOrigin: "",
            image: ''
        })
    }

    const loaded = () => {
        return props.cheese.map((indvcheese) => (
            <div key={indvcheese._id} className="indvcheese">
            <Link to={`/cheese/${indvcheese._id}`}><h1>{indvcheese.name}</h1></Link>
            <img src={indvcheese.image} alt={indvcheese.name} />
            <h3>{indvcheese.countryOfOrigina}</h3>
          </div>  
        )
        )
    }

    const loading = () => {
        return <h1> Loading...</h1>
    }


    return (
        <section>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newForm.name}
              name="name"
              placeholder="name"
              onChange={handleChange}
            />
            <input
              type="text"
              value={newForm.countryOfOrigin}
              name="countryOfOrigin"
              placeholder="Origin Country"
              onChange={handleChange}
            />
            <input
              type="text"
              value={newForm.image}
              name="image"
              placeholder="image URL"
              onChange={handleChange}
            />
            <input type="submit" value="Create a Cheese" />
          </form>
          {props.cheese ? loaded() : loading()}
        </section>
    )
}

export default Index;