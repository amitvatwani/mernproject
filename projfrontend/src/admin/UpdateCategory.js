import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({match}) => {
  const { user, token } = isAuthenticated();
  
  const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	
	
	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
		</div>
	);
	
	const handleChange = event => {
		setError("");
		setName(event.target.value)
	};
	
	const onSubmit = (event) => {
		event.preventDefault();
		setError("");
		setSuccess(false);
		
		//backend request fired
		updateCategory(match.params.categoryId, user._id, token, {name} )
		.then(data => {
			if(data.error) {
				setError(true);
			}else {
				setError("");
				setSuccess(true);
				setName("");
			}
		})
	};
	

  const preload = (categoryId) => {
    getCategories(categoryId).then(data => {
      //console.log(data);
      if (data.error) {
        setError(true);
      } else {
				preloadCategories();
				setError("");
				setSuccess(true);
				setName("");
			
		}
      }
    )
  };
  
  const preloadCategories = () => {
	  getCategories().then(data => {
		if(data.error) {
			setError(true);
		} else {
				setError("");
				setSuccess("");
				setName("");
			}
		}
	  );
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const successMessage = () => {
		if(success) {
			return <h6 className="text-success">Category updated Successfully</h6>;
		}
	};
	
	const warningMessage = () => {
		if(error) {
			return <h6 className="text-warning">Failed to Update Category</h6>;
		}
	}

  const updateCategoryForm = () => (
    <form>
			<div className="form-group">
				<p className="lead">Enter the Category Name to Update</p>
				<input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required placeholder="For Ex. Summer" />
				<button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
			</div>
		</form>
  );

  return (
    <Base
      title="Update a product here!"
      description="Welcome to product Updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
		  {warningMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
