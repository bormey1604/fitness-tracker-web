export const fetchStats = async () => {
    const response = await fetch('http://localhost:8080/api/v1/stats');
    return response.json();
  };
  
  export const fetchGraphStats = async () => {
    const response = await fetch('http://localhost:8080/api/v1/stats/graphs');
    return response.json();
  };
  
  export const fetchActivities = async () => {
    const response = await fetch('http://localhost:8080/api/v1/activities');
    return response.json();
  };
  
  export const createActivity = async (activity) => {
    const response = await fetch('http://localhost:8080/api/v1/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });
    return response.json();
  };
  
  export const fetchGoals = async () => {
    const response = await fetch('http://localhost:8080/api/v1/goals');
    return response.json();
  };
  
  export const createGoal = async (goal) => {
    const response = await fetch('http://localhost:8080/api/v1/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goal),
    });
    return response.json();
  };
  export const updateGoalStatus = async (id) => {
    const response = await fetch(`http://localhost:8080/api/v1/goals/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to update goal status');
    }
    return response.json();
  };
  
  export const createWorkout = async (workout) => {
    const response = await fetch('http://localhost:8080/api/v1/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout),
    });
    return response.json();
  };

  export const fetchWorkouts = async () => {
    const response = await fetch('http://localhost:8080/api/v1/workouts');
    return response.json();
  };