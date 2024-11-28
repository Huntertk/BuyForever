import { useEffect, useState } from 'react';
import '../styles/updatePassword.scss';
import toast from 'react-hot-toast';
import { useUpdateProfileMutation } from '../redux/api/userApi';
import { VscLoading } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const UpdateProfilePage = () => {
    const {name, email} = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [updateProfile, {isLoading:updateProfileLoading, data:updateProfileData, error}] = useUpdateProfileMutation()
  const [formData, setFormData] = useState<{name:string; email:string;}>({
      name:"",
      email:""
  })

  const handleFormDataChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
        ...prev,
        [event.target.name]:event.target.value
    }))
  }

  const handleFormSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!formData.name || !formData.email){
      return toast.error("Please provide all values")
    }
    updateProfile({name:formData.name, email:formData.email})
  }

  const intialSettingInput = () => {
    if(email && name){
        setFormData({
            name,
            email
        })
    }
  }

  useEffect(() => {
    if(updateProfileData){
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
    intialSettingInput();
  }, [updateProfileData,error])


  return (
    <form className="update_password_form_container" onSubmit={handleFormSubmit}>
      <h1>Update Profile Details</h1>
      <div className="update_password_input_container">
        <input
        type="text"
        placeholder="Name"
        name='name'
        value={formData.name}
        onChange={handleFormDataChange}
        autoComplete='off'
        required/>
        <input 
        type="email" 
        placeholder="Email" 
        name='email' 
        autoComplete='off'
        value={formData.email} 
        onChange={handleFormDataChange}
        required/>
        <button type='submit' disabled={updateProfileLoading}>{updateProfileLoading ? <VscLoading className='loading' /> : "Update Profile"}</button>
      </div>
    </form>
  )
}

export default UpdateProfilePage