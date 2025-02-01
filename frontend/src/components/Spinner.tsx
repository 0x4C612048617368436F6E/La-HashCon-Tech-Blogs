import React from "react";

const Spinner = ()=>{
    return(
        <>
            <div className="grid place-items-center bg-gray-100 h-screen">
  <div
    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
    role="status">
  </div>
  <span className="absolute mt-16">Loading...</span>
</div>
        </>
    )
}

export default Spinner;

