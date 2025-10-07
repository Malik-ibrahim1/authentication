"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import React, {useState} from "react"

interface UserProfileProps {
  params: {
    id: string
  }
}

export default function UserProfile({ params }: UserProfileProps) {
  const router = useRouter()
  const [data, setData] = useState("Nothing")

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error: unknown) {
      console.log(error)
      toast.error("Logout failed. Please try again.")
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me")
    console.log(res.data)
    setData(res.data.data._id)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mt-5">Profile</h1>
      <hr />
      <p className="text-4xl py-5">
        Welcome to your profile page! {params.id}
      </p>
      <h2 className="p-3 rounded bg-green-500">{data === "Nothing" ? "nothing" : <Link href={`/profile/${data}`} >
      {data}
      </Link>
        }</h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      
      <button
        onClick={getUserDetails}
        className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  )
}
