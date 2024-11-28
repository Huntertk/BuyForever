import { useEffect, useState } from 'react';
import '../styles/updatePassword.scss';
import toast from 'react-hot-toast';
import { useUpdatePasswordMutation } from '../redux/api/userApi';
import { VscLoading } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

const UpdatePasswordPage = () => {
  const navigate = useNavigate()
  const [updatePassword, {isLoading:updatePasswordLoading, data:updatePasswordData, error}] = useUpdatePasswordMutation()
  const [formData, setFormData] = useState<{currentPassword:string; newPassword:string;}>({
      currentPassword:"",
      newPassword:""
  })

  const handleFormDataChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
        ...prev,
        [event.target.name]:event.target.value
    }))
  }

  const handleFormSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!formData.currentPassword || !formData.newPassword){
      return toast.error("Please provide all values")
    }
    updatePassword({currentPassword:formData.currentPassword, newPassword:formData.newPassword})
  }

  useEffect(() => {
    if(updatePasswordData){
      toast.success('Password Updated Successfully')
      navigate('/profile')
    }
    if(error){
      if(error){
          if ('data' in error) {
            toast.error(`${error.data}`);
          }
        }
  }

  }, [updatePasswordData,error])


  return (
    <form className="update_password_form_container" onSubmit={handleFormSubmit}>
      <h1>Update Password</h1>
      <div className="update_password_input_container">
        <input
        type="text"
        placeholder="Current Password"
        name='currentPassword'
        value={formData.currentPassword}
        onChange={handleFormDataChange}
        autoComplete='off'
        required/>
        <input 
        type="text" 
        placeholder="New Password" 
        name='newPassword' 
        autoComplete='off'
        value={formData.newPassword} 
        onChange={handleFormDataChange}
        required/>
        <button type='submit' disabled={updatePasswordLoading}>{updatePasswordLoading ? <VscLoading className='loading' /> : "Change Password"}</button>
      </div>
    </form>
  )
}

export default UpdatePasswordPage