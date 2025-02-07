"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    username:'',
    email: '',
    password: '',
    role: ''
  })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
        setIsLoading(true)
        const res = axios.post('/api/auth/signup',user)
        console.log("sent sign up data ");
    } catch (error) {
        console.log("error in signing");
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
       <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="enter username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="enter email" value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})} type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={user.password} 
        onChange={(e) => setUser({...user, password: e.target.value})} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select onValueChange={(value)=>{
            setUser({...user,role: value})
        }} required>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="seller">Seller</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  )
}

