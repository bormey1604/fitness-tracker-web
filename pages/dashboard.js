import { useState, useEffect } from 'react';
import { fetchStats, fetchGraphStats } from '../utils/api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const stats = await fetchStats();
      setStats(stats);
      const graphData = await fetchGraphStats();
      setGraphData(graphData);
    };
    getData();
  }, []);

  if (!stats || !graphData) return <div>Loading...</div>;

  const recentWorkouts = graphData.workouts.slice(0, 3).map(workout => ({
    ...workout,
    date: new Date(workout.date).toLocaleDateString(),
  }));
  const recentActivities = graphData.activities.slice(0, 3).map(activity => ({
    ...activity,
    date: new Date(activity.date).toLocaleDateString(),
  }));

  return (
    <div className="container mx-auto p-4 pt-1">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-md font-semibold">Total Calories Burned</h2>
          <p className="text-lg">{stats.totalCaloriesBurned}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-md font-semibold">Total Distance Covered</h2>
          <p className="text-lg">{stats.distance} km</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-md font-semibold">Total Steps Taken</h2>
          <p className="text-lg">{stats.steps}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-md font-semibold">Total Time Spent</h2>
          <p className="text-lg">{stats.duration} minutes</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-md font-semibold">Achieved Goals</h2>
          <p className="text-lg">{stats.achievedGoals}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md text-center">
          <h2 className="text-md font-semibold">Not Achieved Goals</h2>
          <p className="text-lg">{stats.notAchievedGoals}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-md font-semibold mb-4">Recent Workouts</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={recentWorkouts} barSize={50}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="caloriesBurned" name="Calories Burned" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-md font-semibold mb-4">Recent Activities</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={recentActivities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="caloriesBurned" name="Calories Burned" stroke="#8884d8" />
              <Line type="monotone" dataKey="steps" name="Steps" stroke="#82ca9d" />
              <Line type="monotone" dataKey="distance" name="Distance (km)" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;