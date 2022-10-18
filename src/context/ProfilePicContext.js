import React from 'react'
import { useState } from 'react'


export const profilePicContext=React.createContext()
const ProfilePicContext = ({children}) => {
    const [profilePic,setProfilePic]=useState('pic');
    
  return (
    <div>
        <profilePicContext.Provider value={{setProfilePic,profilePic}}>
         {children}
    </profilePicContext.Provider>
    </div>
  )
}

export default ProfilePicContext