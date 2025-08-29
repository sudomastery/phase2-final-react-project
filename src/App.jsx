import './App.css'
import UserFetch from './components/UserFetch'
import UserDetail from './components/UserDetail'
import UserForm from './components/UserForm'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import userFetch from './store/userFetchStore'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserFetch />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/create-user" element={<UserForm />} />
        <Route path="/edit-user/:id" element={<EditUserWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}

// Wrapper component to handle edit mode
function EditUserWrapper() {
  const { id } = useParams();
  const { users: usersArray } = userFetch();

  // Find the user to edit
  const userToEdit = usersArray && usersArray.find(user => user.id === parseInt(id));
  
  if (!userToEdit) {
    return <div>User not found</div>;
  }
  
  return <UserForm user={userToEdit} />;
}

export default App
