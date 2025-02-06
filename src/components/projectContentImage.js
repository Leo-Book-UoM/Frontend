import React from 'react'

export default function ProjectContentImage({ courseParams, image }) {
    
  return (
    <div>
    <h1 className="text-3xl text-blue-600 font-bold mb-6">{courseParams}</h1>
    <img src={image} alt={courseParams} className="w-full h-64 object-cover rounded mb-4" />
    </div>
  )
}
