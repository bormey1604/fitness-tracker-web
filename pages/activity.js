import { useState, useEffect } from 'react';
import { createActivity, fetchActivities } from '../utils/api';

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    date: '',
    steps: '',
    distance: '',
    caloriesBurned: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getData = async () => {
      const activities = await fetchActivities();
      setActivities(activities);
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
    if (!form.date) errors.date = 'Date is required';
    if (!form.steps) errors.steps = 'Steps are required';
    if (!form.distance) errors.distance = 'Distance is required';
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
    const newActivity = await createActivity(form);
    setActivities([...activities, newActivity]);
    setForm({
      date: '',
      steps: '',
      distance: '',
      caloriesBurned: '',
    });
    setErrors({});
    setFormVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Activity</h1>
        <button
          onClick={() => setFormVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Activity
        </button>
      </div>
      {formVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Activity</h2>
            <form onSubmit={handleSubmit} className="text-sm">
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
                <label className="block text-sm font-medium text-gray-700">Steps</label>
                <input
                  type="number"
                  name="steps"
                  value={form.steps}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
                <input
                  type="number"
                  step="0.1"
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.distance && <p className="text-red-500 text-sm">{errors.distance}</p>}
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
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Date</th>
            <th className="py-2 px-4 border-b text-center">Steps</th>
            <th className="py-2 px-4 border-b text-center">Distance (km)</th>
            <th className="py-2 px-4 border-b text-center">Calories Burned</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td className="py-2 px-4 border-b text-center">{new Date(activity.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b text-center">{activity.steps}</td>
              <td className="py-2 px-4 border-b text-center">{activity.distance}</td>
              <td className="py-2 px-4 border-b text-center">{activity.caloriesBurned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activity;