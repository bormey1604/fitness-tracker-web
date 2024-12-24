import { useState, useEffect } from 'react';
import { createGoal, fetchGoals, updateGoalStatus } from '../utils/api';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    description: '',
    startDate: '',
    endDate: '',
    achieved: false,
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      const goals = await fetchGoals();
      setGoals(goals);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!form.description) errors.description = 'Description is required';
    if (!form.startDate) errors.startDate = 'Start date is required';
    if (!form.endDate) errors.endDate = 'End date is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const newGoal = await createGoal(form);
      setGoals([...goals, newGoal]);
      setForm({
        description: '',
        startDate: '',
        endDate: '',
        achieved: false,
      });
      setErrors({});
      setFormVisible(false);
    } catch (error) {
      setErrorMessage('Failed to create goal');
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      const updatedGoal = await updateGoalStatus(id);
      setGoals(goals.map(goal => (goal.id === id ? updatedGoal : goal)));
    } catch (error) {
      setErrorMessage('Failed to update goal status');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Goals</h1>
        <button
          onClick={() => setFormVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Goal
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {formVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Goal</h2>
            <form onSubmit={handleSubmit} className="text-sm">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Achieved</label>
                <input
                  type="checkbox"
                  name="achieved"
                  checked={form.achieved}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Description</th>
            <th className="py-2 px-4 border-b text-center">Start Date</th>
            <th className="py-2 px-4 border-b text-center">End Date</th>
            <th className="py-2 px-4 border-b text-center">Achieved</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map(goal => (
            <tr key={goal.id}>
              <td className="py-2 px-4 border-b text-center">{goal.description}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(goal.startDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(goal.endDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b text-center">{goal.achieved ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleUpdateStatus(goal.id)}
                  className={`px-2 py-1 rounded-md ${goal.achieved ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'}`}
                  disabled={goal.achieved}
                >
                  {goal.achieved ? 'Achieved' : 'Update Status'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Goals;