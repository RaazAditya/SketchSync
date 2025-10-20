import { SparklesCore } from '@/components/ui/sparkles'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const LandingPage = () => {

  const handleClick=()=>{
    console.log("hyy i am in landing page")
  }
  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
       {/* Main Content */}
  <div className="relative z-20 flex flex-col items-center text-center px-4">
    
    {/* Main Title */}
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white">
      SketchSync Collaborative Board
    </h1>

    {/* Subtitle */}
    <p className="text-white/70 mt-4 max-w-xl text-lg md:text-xl">
      Collaborate in real-time, share ideas, and bring your team’s creativity to life.
    </p>

    {/* Call-to-Action Button */}
    <Link to="/login">
    <Button
      onClick={handleClick}
      size="lg"
      className="mt-8 px-6 py-2 bg-white text-black font-semibold rounded-md shadow-md hover:bg-gray-100 transition"
    >
      Get Started
    </Button>
    </Link>
    
  </div>
    </div>
  );
}

export default LandingPage
