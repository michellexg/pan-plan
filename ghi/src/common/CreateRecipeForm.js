import { useState } from 'react'

function CreateRecipeForm(props){

    const [recipe, setRecipe] = useState({})

    return (
        <div className="my-5 container">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h2 className="text-center">Create a new recipe</h2>
                <form id="create-recipe-form">
                  <div className="form-floating mb-3">
                    <input onChange={handleVinChange} value={vin} placeholder="VIN" required type="text" name="vin" className="form-control"/>
                    <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleCostumerNameChange} value={customerName} placeholder="Costumer name" required type="text" name="costumer_name" className="form-control"/>
                    <label htmlFor="costumer_name">Costumer name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleDateTimeChange} value={dateTime} placeholder="Date and time" required type="datetime-local" name="date_time" className="form-control"/>
                    <label htmlFor="date_time">Date and time</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea onChange={handleReasonChange} value={reason} placeholder="Reason for service" required type="text" name="reason" className="form-control"/>
                    <label htmlFor="reason">Reason for service</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={handleTechnicianNameChange} value={technicianName}  name="name" className="form-select">
                    <option>Choose a technician</option>
                    {technicians.map(technician => {
                        return (
                        <option key={technician.id} value={technician.id}>
                            {technician.technician_name}
                        </option>
                        );
                    })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Enter</button>
                </form>
              </div>
            </div>
          </div>
        );
}

export default CreateRecipeForm
