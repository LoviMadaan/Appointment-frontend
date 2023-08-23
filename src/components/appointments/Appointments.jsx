import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../redux/appointment/appointmentSlice';

const Appointments = () => {
  const appointments = useSelector((state) => state.appointments.appointments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);
  return (
    <div className="pt-5">
      <h2 className="text-center mb-3">My Appointments</h2>
      <ul className="list-group appointments-container">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="list-group-item appointments-list">
            <div className="appointments-card">
              <div className="appointments-card-details">
                <h5>{appointment.doctor_name}</h5>
                <span className="d-block">{appointment.city}</span>
                <span>{appointment.date}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
