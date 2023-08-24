import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDoctor } from '../../redux/docter/doctorSlice';

const NewDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const implementDoctor = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('doctor[name]', e.target.name.value);
    formData.append('doctor[bio]', e.target.bio.value);
    formData.append('doctor[image]', e.target.image.value);

    dispatch(createDoctor(formData)).then((result) => {
      if (result && result.error) return;
      navigate('/doctors');
    });
    e.target.reset();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Add Doctor</h1>
              <form onSubmit={implementDoctor}>
                <input
                  id="name"
                  placeholder="Name"
                  type="text"
                  name="name"
                  className="form-control mb-3"
                  required
                  autoComplete="name"
                  autoCapitalize="true"
                />

                <input
                  id="bio"
                  name="bio"
                  className="form-control mb-3"
                  placeholder="Add bio"
                  type="text"
                  required
                  autoComplete="bio"
                  autoCapitalize="true"
                />

                <input
                  id="image"
                  name="image"
                  className="form-control mb-3"
                  placeholder="Add photo.."
                  type="text"
                  required
                  autoComplete="off"
                />

                <button type="submit" className="btn btn-primary">
                  Create doctor
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDoctor;
