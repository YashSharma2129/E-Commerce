
"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Camera } from "lucide-react"
export default function Profile() {
  const [showProfile, setShowProfile] = useState(true);
  const [profileImage, setProfileImage] = useState("/photo.svg");

  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "United States" },
    { code: "+44", country: "United Kingdom" },
    { code: "+86", country: "China" },
    { code: "+81", country: "Japan" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+61", country: "Australia" },
    { code: "+7", country: "Russia" },
    { code: "+55", country: "Brazil" }
  ];

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (

    <>
      <Card className="w-max  sm:max-xl:mx-10 max-xl:my-10   max-lg:flex-col   mx-auto flex flex-row mx-auto border-solid border-2 h-fit shadow-md shadow-gray-500    border-gray-400 mt-[50px]   ">
        <div className="flex flex-row mx-auto gap-8 rounded-l-3xl max-sm:flex-col max-sm:w-60">
          <div className="flex flex-col rounded-l-3xl pl-4 max-md:px-2">
            <div className="relative mb-10 flex flex-row">
              {/* Profile Image */}
              <img
                className="rounded-full border-4 border-blue-700 h-[100px] w-[100px] object-cover mx-auto -mt-8"
                src={profileImage}
                alt="Profile image"
              />

              {/* Camera Icon  */}
              <label htmlFor="imageUpload" className="absolute right-0 bottom-0 cursor-pointer">
                <Camera className="bg-white p-1 rounded-full h-8 w-8 -ml-16 max-md:-ml-24 text-gray-700" />
              </label>
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col gap-11">
              <Button className="font-bold bg-transparent hover:bg-blue-900 hover:text-white text-gray-700 sm:max-md-mr-4" onClick={() => { setShowProfile(true) }} >Edit Profile</Button>
              <Button className="font-bold bg-transparent hover:bg-blue-900 hover:text-white text-gray-700" onClick={() => { setShowProfile(false) }}>Password & Security</Button>
            </div>
          </div>

          {showProfile ? (
            <div className="   max-sm:justify-end">
              <CardHeader>
                <CardTitle>Even Yates</CardTitle>
                <CardDescription className="font-bold text-gray-600">Description</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-row  max-sm:flex-col  max-sm:gap-y-10 gap-x-14">
                    {/* Profile Form */}
                    <div className="grid items-center gap-4 w-1/2  max-lg:w-full">
                      <h2 className="font-extrabold text-gray-600">Edit Profile</h2>
                      <div className="flex flex-row space-y-1.5 gap-x-10">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">First Name</Label>
                          <Input id="name" className="w-full" placeholder="First Name" />
                        </div>

                        <div className="flex flex-col">
                          <Label htmlFor="name">Last Name</Label>
                          <Input id="name" className=" overflow-hidden" placeholder=" Last Name" />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="nationalcode">National Code</Label>
                        <Input id="nationalcode" placeholder="Enter your National Code" />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="dob">Date Of Birth</Label>
                        <Input type="date" placeholder="Enter your DOB" />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="education">Education Level</Label>
                        <Input id="education" placeholder="Enter your Education Level" />
                      </div>
                    </div>

                    <div className="grid items-center gap-0 w-1/2 max-lg:w-full">
                      <div className="grid items-center gap-4 w-full">
                        <h2 className="font-extrabold text-gray-600">Contact</h2>
                        <div className="flex flex-col space-y-1.5 ">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" placeholder="Enter your Email" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="flex flex-row gap-x-3">
                            <div>
                              <Select>
                                <SelectTrigger id="phone">
                                  <SelectValue placeholder="+91" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {countryCodes.map((country) => (
                                    <SelectItem key={country.code} value={country.code}>
                                      {country.country} {country.code}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                           <Input placeholder="9917******"></Input>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" placeholder="Enter your Country" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="Enter your City" />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button className="bg-blue-900" variant="outline">Save</Button>
              </CardFooter>
            </div>
          ) : (
            <div className="w-[820px] h-[486px] gap-y-60     lg:max-xl:w-[650px]  lg:max-xl:pl-28 md:max-lg:pl-28  md:max-lg:w-[510px] sm:max-md:w-[400px] sm:max-md:pl-32]  max-sm:w-[500px] ">
              <div className="grid items-center  gap-4 w-1/2 max-sm:px-10">
                <div className="grid items-center gap-4 w-full pt-20  ">
                  <h2 className="font-extrabold text-gray-600">Password</h2>
                  <div className="flex flex-col w-fit space-y-1.5">
                    <Label htmlFor="cpassword">Current Password</Label>
                    <Input type="password" id="cpassword" placeholder="Enter your Current Password" />
                  </div>

                  <div className="flex flex-col w-fit space-y-1.5">
                    <Label htmlFor="npassword">New Password</Label>
                    <div className="w-full">
                      <Input type="password" value="npassword" placeholder="" />
                    </div>
                  </div>
                    <div className="flex flex-col w-fit space-y-1.5">
                  <Label htmlFor="cnpassword">Confirm New Password</Label>
                  <Input type="password" id="npassword" placeholder="Confirm New Password" />
                </div>
                </div>

              

                <CardFooter className="flex -ml-6 sm:max-md:ml-4">
                  <Button className="bg-blue-900 sm:max-md:ml-4" variant="outline">Save</Button>
                </CardFooter>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* </div> */}
    </>


  );
}
