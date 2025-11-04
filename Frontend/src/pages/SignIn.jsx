import React from 'react'
import { Link } from 'react-router-dom'

export const SignIn = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>Sign In as:</p>
      <div className="flex flex-col">
        <Link to={"/schoolSignIn"}>School</Link>
        <Link to={"/collegeSignIn"}>College</Link>
        <Link to={"/soloSignIn"}>Solo</Link>
      </div>
    </div>
  )
}
