import { useParams } from "react-router-dom"

function DisplayRecipeDetails(props) {

    return (
        <div className="my-5 container">
            <div className='mb-3'>
                {props.recipe.name}
            </div>
            <div className='mb-3'>
                {props.recipe.image_url}
            </div>
            <div className='mb-3'>
                {props.recipe.ingredients}
            </div>
            <div className='mb-3'>
                {props.recipe.steps}
            </div>
        </div>
    )




}

export default DisplayRecipeDetails
