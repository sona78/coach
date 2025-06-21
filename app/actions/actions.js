


export async function newUser(formData) {
    const { name, goal } = Object.fromEntries(formData);
    console.log(name, goal);
    redirect(`/events/`)
}


