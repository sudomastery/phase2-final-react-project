import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Label, TextInput, Alert } from 'flowbite-react'
import userFetch from '../store/userFetchStore'

/**
 
 
  
 @param {Object} user - If provided, form is in "edit mode". If null/undefined, form = create mode
 */
function UserForm({ user = null }) {
    const navigate = useNavigate()
    
    // get actions from Zustand store
    const { createUser, updateUser, loading } = userFetch()
    
    
    // console.log('UserForm', !!createUser, 'updateUser available:', !!updateUser)
    
    // identify mode based on user prop
    const isEditMode = user !== null
    
    // Local form state
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    })
    
    const [message, setMessage] = useState('')

    // populate form fields when in edit mode
    useEffect(() => {
        if (isEditMode && user) {
            setFormData({
                email: user.email || '',
                username: user.username || '',
                password: '',
                firstname: user.name?.firstname || '',
                lastname: user.name?.lastname || ''
            })
        }
    }, [user, isEditMode])

    // handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //  form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Form submitted, isEditMode:', isEditMode)
        console.log('Form data:', formData)

        try {
            const userData = {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                name: {
                    firstname: formData.firstname,
                    lastname: formData.lastname
                }
            }
            
            // console.log('Prepared userData:', userData)

            if (isEditMode) {
                console.log('Calling updateUser for user ID:', user.id)
                await updateUser(user.id, userData)
                setMessage('User updated successfully!')
            } else {
                console.log('Calling createUser')
                const result = await createUser(userData)
                console.log('CreateUser result:', result)
                setMessage('User created successfully!')
                setFormData({
                    email: '',
                    username: '',
                    password: '',
                    firstname: '',
                    lastname: ''
                })
            }
            
            setTimeout(() => navigate('/'), 1500)
            
        } catch (error) {
            console.error('Form submission error:', error)
            setMessage(`Error: ${error.message}`)
        }
    }

    return (
        <div className="min-h-screen p-6" style={{backgroundColor: '#242424'}}>
            <div className="max-w-md mx-auto">
                <div className="mb-6">
                    <Button color="blue" size="sm" onClick={() => navigate('/')}>
                        ← Back
                    </Button>
                </div>

                <Card className="w-full">
                    <div className="space-y-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                            {isEditMode ? 'Edit User' : 'Create New User'}
                        </h1>
                        
                        {message && (
                            <Alert color={message.includes('Error') ? 'failure' : 'success'}>
                                {message}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="username" value="Username" />
                                <TextInput
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" value={isEditMode ? "New Password (optional)" : "Password"} />
                                <TextInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required={!isEditMode}
                                />
                            </div>

                            <div>
                                <Label htmlFor="firstname" value="First Name" />
                                <TextInput
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="lastname" value="Last Name" />
                                <TextInput
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={loading}
                                color="blue"
                            >
                                {loading ? 'Processing...' : (isEditMode ? 'Update User' : 'Create User')}
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UserForm