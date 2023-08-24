import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../../redux/appointment/appointmentSlice';

const NewAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors);
  const formRef = useRef();
  const [doctorId, setDoctorId] = useState('');

  const handleDoctorChange = (event) => {
    setDoctorId(event.target.value);
  };

  const appointmentHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      id: doctorId,
      appointment: {
        date: formData.get('date'),
        city: formData.get('city'),
      },
    };

    const result = await dispatch(createAppointment(data));

    if (!result.error) {
      navigate('/doctors');
    }
    e.target.reset();
  };

  const renderDoctorOptions = () => (
    <>
      <option value="" disabled>Select a Doctor</option>
      {doctors.map((doctor) => (
        <option key={doctor.id} value={doctor.id}>
          {doctor.name}
        </option>
      ))}
    </>
  );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1 className="text-center mb-4">Add Appointment</h1>
          <form onSubmit={appointmentHandle} ref={formRef}>
            <div className="mb-3">
              <select value={doctorId} onChange={handleDoctorChange} required className="form-select">
                {renderDoctorOptions()}
              </select>
            </div>
            <div className="mb-3">
              <input
                id="date"
                name="date"
                className="form-control"
                placeholder="Add date"
                type="date"
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <input
                id="city"
                name="city"
                className="form-control"
                placeholder="Add city"
                type="text"
                required
                autoComplete="city"
                autoCapitalize="true"
              />
            </div>
            <button type="submit" className="btn btn-primary">Create Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
