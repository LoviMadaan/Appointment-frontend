import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showDoctors } from '../../redux/docter/doctorSlice';

const DoctorDetails = () => {
  const doctor = useSelector((state) => state.doctors.details);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showDoctors(id));
  }, [dispatch, id]);

  return (
    <div className="container mt-5">
      <div>
        <div>
          <img
            src={doctor.image}
            alt={doctor.name}
            className="img-fluid rounded-lg"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>
        <div>
          <h2>{doctor.name && doctor.name.toUpperCase()}</h2>
          <p>{doctor.bio}</p>
          <button
            type="button"
            className="btn btn-info btn-lg rounded-pill text-light"
            onClick={() => {
              navigate('/doctors/new_appointment');
            }}
          >
            Make an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
