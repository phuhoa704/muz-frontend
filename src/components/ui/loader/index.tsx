const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-[60]">
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
