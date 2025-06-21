'use server';

export async function newUser(formData) {
  try {
    const name = formData.get('name');
    const goal = formData.get('goal');

    // Validate the data
    if (!name || !goal) {
      return { success: false, error: 'Name and goal are required' };
    }

    // Here you can add your database logic
    // Example: Save to database, send email, etc.
    console.log('New user created:', { name, goal });

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return { 
      success: true, 
      message: 'User created successfully!',
      data: { name, goal }
    };

  } catch (error) {
    console.error('Error creating user:', error);
    return { 
      success: false, 
      error: 'Failed to create user. Please try again.' 
    };
  }
} 



export async function newEvent(formData) {
  try {
    const situation = formData.get('situation');
    const reaction = formData.get('reaction');

    // Validate the data
    if (!situation || !reaction) {
      return { success: false, error: 'Situation and reaction are required' };
    }

    // Here you can add your database logic
    // Example: Save to database, send email, etc.
    console.log('New event created:', { situation, reaction });

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return { 
      success: true, 
      message: 'Event created successfully!',
      data: { situation, reaction }
    };

  } catch (error) {
    console.error('Error creating user:', error);
    return { 
      success: false, 
      error: 'Failed to capture event. Please try again.' 
    };
  }
} 
