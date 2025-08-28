
import { create } from 'zustand';

//create the store
const userFetch = create((set) => ({
    user: [],
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
            const userData = await response.json()
            //update store
            set({user:userData, loading: false})
                } catch (error){
                    console.error('Fetch error:', error);
                    set({error: error.message, loading:false})
                }
        },

        //action function to post create user post function
        async createUser(newUser) {
            set({loading: true, error: null})
            try{

                const response = await fetch ("https://fakestoreapi.com/users/", {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json' 
                    }, 
                    body: JSON.stringify(newUser)

                })
                if (!response.ok) throw new Error ('User fetch failed')
                    const createdUser = await response.json()

                //create a random id for id
                const randomId = Math.floor(Math.random() * 1000) + 1;
                set(state => ({
                    user: [...state.user, { ...createdUser, id: randomId }],
                    loading: false
                }))
                return createdUser

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

                set(state => ({
                    user: state.user.map(user =>
                        user.id === userId ? {...user, ...updatedUserData} : user
                    ),
                    loading: false

                }))
                return updatedUserData

            } catch (error){
                console.error('Updated user error', error)
                set({error: error.message, loading: false})
                throw error
            }

        }

        //ADD DELETE 




    }

));
export default userFetch;
