
import { create } from 'zustand';

// LocalStorage helpers for persisting locally-created/edited users
const LOCAL_KEY = 'localUsers';
function loadLocalUsers() {
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Failed to load local users', e);
        return [];
    }
}
function saveLocalUsers(users) {
    try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
    } catch (e) {
        console.error('Failed to save local users', e);
    }
}

//create the store
const userFetch = create((set, get) => ({
        users: loadLocalUsers() || [],
        loading: false,
        error: null,


    //action function to fetch data from api
    async fetchData(apiUrl) {
        //set to update store state
        set({ loading:true, error:null})

        try {
            const response = await fetch(apiUrl)
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
                    }
            const fetchedUsers = await response.json()
            // Prefer local edits / local-created users by deduping fetched results in favor of state.users
            set((state) => {
                const stateUsers = state.users || [];
                const merged = [
                    // include fetched users that are not overridden locally
                    ...fetchedUsers.filter(f => !stateUsers.some(s => s.id === f.id)),
                    // then include all state users (local or previously merged)
                    ...stateUsers
                ];
                // Persist only local users to localStorage
                try { saveLocalUsers(merged.filter(u => u.__local)); } catch (e) {}
                return { users: merged, loading: false };
            })
                } catch (error){
                    console.error('Fetch error:', error);
                    set({error: error.message, loading:false})
                }
        },
        //incomplete----->
        //action function to post create user post function
        async createUser(newUser) {
            set({loading: true, error: null})
            try{

                const response = await fetch ("https://fakestoreapi.com/users", {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json' 
                    }, 
                    body: JSON.stringify(newUser)

                })
                if (!response.ok) throw new Error ('User fetch failed')
                    const createdUser = await response.json()

                // Create proper user structure with a unique ID and mark as local
                const newUserWithId = {
                    id: createdUser.id || Date.now(), // Use API ID or timestamp
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password,
                    name: {
                        firstname: newUser.name.firstname,
                        lastname: newUser.name.lastname
                    },
                    phone: newUser.phone || '1-000-000-0000', // Default phone
                    address: newUser.address || {
                        geolocation: { lat: "0", long: "0" },
                        city: "Unknown",
                        street: "Unknown",
                        number: 0,
                        zipcode: "00000"
                    },
                    __v: 0,
                    __local: true
                };

                // update state and persist local users
                set((state) => {
                    const next = [...state.users, newUserWithId];
                    try { saveLocalUsers(next.filter(u => u.__local)); } catch (e) {}
                    return { users: next, loading: false };
                })
                return newUserWithId

            } catch (error) {
                console.error("Creating user failed", error)
                set({error: error.message, loading: false})
                throw error

            }


        },

        //function to update user
        async updateUser(userId, updatedUser) {
            set({loading: true, error: null})
            try{
                const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUser)
                })

                if (!response.ok) throw new Error ('Failed to update user')
                    const updatedUserData = await response.json()

                // Ensure updated user has nested name structure
                const merged = {
                    ...updatedUserData,
                    name: updatedUserData.name || { firstname: updatedUserData.firstname || '', lastname: updatedUserData.lastname || '' }
                };

                set((state) => {
                    const next = state.users.map(user =>
                        user.id === userId ? { ...user, ...merged } : user
                    );
                    try { saveLocalUsers(next.filter(u => u.__local)); } catch (e) {}
                    return { users: next, loading: false };
                })
                return merged

            } catch (error){
                console.error('Updated user error', error)
                set({error: error.message, loading: false})
                throw error
            }

        },

        //delete
        async deleteUser(userId) {
            set({loading: true, error: null})
            try{
                const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
                    method: 'DELETE'
                })

                if (!response.ok) throw new Error ('Failed to delete user')
                
                
                const deletedUserData = await response.json()

                
                set((state) => {
                    const next = state.users.filter(user => user.id !== userId);
                    try { saveLocalUsers(next.filter(u => u.__local)); } catch (e) {}
                    return { users: next, loading: false };
                })   

                return deletedUserData

            } catch (error){
                console.error('Delete user error:', error)
                set({error: error.message, loading: false})
                throw error
            }
        }
       




    }

));
export default userFetch;
