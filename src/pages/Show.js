import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Show = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const people = props.cheese
  console.log(id);
  
  const indvcheese = people ? people.find((p) => p._id === id ) : null

  const [ editForm, setEditForm ] = useState(indvcheese)

  const [ isEditing, setIsEditing ] = useState(false)

  useEffect( () => {
    if (indvcheese) {
        setEditForm(indvcheese)
    }
  }, [indvcheese])

  // handling form data change
  const handleChange = (e) => {
    setEditForm( {
      ...editForm,
     [e.target.name]: e.target.value 
    })
  }
  
  // handling submit event for edit form
  const handleUpdate = (e) => {
    e.preventDefault()
    props.updateCheese(editForm, indvcheese._id)
  }
  const handleEdit = () => (
    setIsEditing(prevState => !prevState)
  )
  const handleDelete = () => {
    props.deleteCheese(indvcheese._id)
    navigate('/')
  }

  const loaded = () => {
    return (
      <>
        <h1>{indvcheese.name}</h1>
        <h2>{indvcheese.countryOfOrigin}</h2>
        <img 
          className="avatar-image" 
          src={indvcheese.image} 
          alt={indvcheese.name} 
        />
        <button onClick={handleEdit}>{ isEditing ? 'Cancel Edit' : 'Edit' }</button>
        <button onClick={handleDelete}>Delete</button>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="indvcheese">
      { indvcheese ? loaded() : loading() }
      { isEditing &&
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="countryOfOrigin"
          onChange={handleChange}
        />
        <input type="submit" value="Update Cheese" />
      </form>
      }
    </div>
  )
}

export default Show;