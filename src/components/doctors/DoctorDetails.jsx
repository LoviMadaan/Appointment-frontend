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
      <div className="doctor-details-container">
        <div className="doctor-image-container">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="doctor-image"
          />
        </div>
        <div className="doctor-info-container">
          <h2 className="doctor-name">{doctor.name && doctor.name.toUpperCase()}</h2>
          <p className="doctor-bio">{doctor.bio}</p>
          <button
            type="button"
            className="btn-make-appointment"
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
