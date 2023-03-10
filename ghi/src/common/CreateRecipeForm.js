import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

function CreateRecipeForm(props){

    const [name, setName] = useState("")
    const [URL, setURL] = useState("")
    const [ingredientsList, setIngredientsList] = useState([ {ingredient: ""} ])
    const [stepsList, setStepsList] = useState([ {step: ""} ])
    const [creatorID, setCreatorID] = useState([])




    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }
    const handleURLChange = (event) => {
        const value = event.target.value
        setURL(value)
    }
    const handleIngredientListChange = (event,index) => {
      const {name, value} = event.target
      const list = [...ingredientsList]
      list[index][name] = value
      setIngredientsList(list)
    }
    const handleRemoveIngredientClick = index => {
      const list = [...ingredientsList];
      list.splice(index, 1);
      setIngredientsList(list);
    }
    const handleAddIngredientClick = () => {
      setIngredientsList([...ingredientsList, { ingredient: "" }]);
    }
    const handleStepListChange = (event,index) => {
      const {name, value} = event.target
      const list = [...stepsList]
      list[index][name] = value
      setStepsList(list)
    }
    const handleRemoveStepClick = index => {
      const list = [...stepsList];
      list.splice(index, 1);
      setStepsList(list);
    }
    const handleAddStepClick = () => {
      setStepsList([...stepsList, { step: "" }]);
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      const data = {}

      let combinedIngredients = ""
      for (let ingredient of ingredientsList) {
        combinedIngredients += ingredient.ingredient+","
      }
      const splitIngredients = combinedIngredients.split(",")
      splitIngredients.pop()
      combinedIngredients = splitIngredients.join("@#$")

      let combinedSteps = ""
      for (let step of stepsList) {
        combinedSteps += step.step+","
      }
      const splitSteps = combinedSteps.split(",")
      splitSteps.pop()
      combinedSteps = splitSteps.join("@#$")

      data.name = name
      data.image_url = URL
      data.ingredients = combinedIngredients
      data.steps = combinedSteps
      data.creator_id = creatorID

      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/recipes`;
      const fetchConfig = {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const response = await fetch(url, fetchConfig)
      if (response.ok) {
          setName("")
          setURL("")
          setIngredientsList([ {ingredient: ""} ])
          setStepsList([ {step: ""} ])
          props.fetchRecipes()
        }

    }

    const fetchToken = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
      const fetchConfig = {
        method: 'get',
        credentials: 'include',
      }
      const response = await fetch(url,fetchConfig)
      if (response.ok) {
        const data = await response.json()
        setCreatorID(data.account.id)
      }
    }

    useEffect(() => {
    fetchToken()
  }, [])

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
              <div className="modal-body p-4 mt-4">
                <h2 className="text-center">Create a new recipe</h2>
                <form onSubmit={handleSubmit} id="create-recipe-form">
                  <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" className="form-control"/>
                    <label htmlFor="name">Recipe Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleURLChange} value={URL} placeholder="URL" required type="text" name="URL" className="form-control"/>
                    <label htmlFor="image_url">Image URL</label>
                  </div>
                  {ingredientsList.map((x,i) => {
                    return (
                      <div className="form-floating mb-3" key={i}>
                        <input name="ingredient" value={x.ingredient} placeholder="Ingredient" onChange={e => handleIngredientListChange(e, i)} />
                          <code> </code>
                          {ingredientsList.length !== 1 && <button className="mr10" onClick={() => handleRemoveIngredientClick(i)}>Remove</button>}
                          <code> </code>
                          {ingredientsList.length - 1 === i && <button onClick={handleAddIngredientClick}>Add</button>}

                      </div>
                    )
                  })
                  }
                  {stepsList.map((x,i) => {
                    return (
                      <div className="form-floating mb-3" key={i}>
                        <input name="step" value={x.step} placeholder="Step" onChange={e => handleStepListChange(e, i)} />
                          <code> </code>
                          {stepsList.length !== 1 && <button className="mr10" onClick={() => handleRemoveStepClick(i)}>Remove</button>}
                          <code> </code>
                          {stepsList.length - 1 === i && <button onClick={handleAddStepClick}>Add</button>}
                      </div>
                    )
                  })
                  }
                  <button className="btn m-3 create-recipe">Create</button>
                </form>
              </div>
            </div>
          </div>
        );


}

export default CreateRecipeForm
