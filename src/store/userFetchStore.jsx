
import { create } from 'zustand';

//create the store
const userFetch = create((set) => ({
    user: [],
    loading: false,
    error: null,


    //fetch data from api
    fetchData: async(apiUrl) => {
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
        }

        //create user post function
        createUser: async (newUser) => {
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

                set(state => ({
                    user: [...state.user, { ...createdUser, id:}]
                }))




            }


        }





    }

));
export default userFetch;
