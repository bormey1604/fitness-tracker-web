import { useState, useEffect } from 'react';
import { createWorkout, fetchWorkouts } from '../utils/api';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    type: '',
    date: '',
    duration: '',
    caloriesBurned: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getData = async () => {
      const workouts = await fetchWorkouts();
      setWorkouts(workouts);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!form.type) errors.type = 'Type is required';
    if (!form.date) errors.date = 'Date is required';
    if (!form.duration) errors.duration = 'Duration is required';
    if (!form.caloriesBurned) errors.caloriesBurned = 'Calories burned are required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newWorkout = await createWorkout(form);
    setWorkouts([...workouts, newWorkout]);
    setForm({
      type: '',
      date: '',
      duration: '',
      caloriesBurned: '',
    });
    setErrors({});
    setFormVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Workout</h1>
        <button
          onClick={() => setFormVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Workout
        </button>
      </div>
      {formVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Workout</h2>
            <form onSubmit={handleSubmit} className="text-sm">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Type</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Strength Training">Strength Training</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Pilates">Pilates</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Running">Running</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Calories Burned</label>
                <input
                  type="number"
                  name="caloriesBurned"
                  value={form.caloriesBurned}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.caloriesBurned && <p className="text-red-500 text-sm">{errors.caloriesBurned}</p>}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Workout</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Type</th>
            <th className="py-2 px-4 border-b text-center">Date</th>
            <th className="py-2 px-4 border-b text-center">Duration (minutes)</th>
            <th className="py-2 px-4 border-b text-center">Calories Burned</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map(workout => (
            <tr key={workout.id}>
              <td className="py-2 px-4 border-b text-center">{workout.type}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(workout.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b text-center">{workout.duration}</td>
              <td className="py-2 px-4 border-b text-center">{workout.caloriesBurned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workout;