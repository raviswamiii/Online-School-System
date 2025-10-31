import React from "react";
import { PrincipalFooter } from "../components/PrincipalFooter";

export const PrincipalHome = () => {
  return (
    <div className="overflow-auto space-y-2">
      <div className="flex border p-4 justify-between">
        <p>logo</p>
        <div>chat</div>
      </div>
      <div className="border h-60 flex justify-center items-center">
        School's images/videos
      </div>
      <div className="border">
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta atque
          molestias necessitatibus vel voluptatum provident dolor, labore,
          obcaecati perferendis est odit reiciendis numquam minima debitis
          veniam? Earum minus quaerat quia unde cum sapiente, culpa accusamus,
          exercitationem hic voluptates aliquid dignissimos ex? Maxime nam quae
          eum autem placeat consequatur ab cumque commodi non, libero illum!
          Eveniet corrupti quas itaque perspiciatis veniam cupiditate officiis,
          aperiam veritatis alias quasi reprehenderit amet esse soluta illo,
          ratione expedita.
        </p>
      </div>
      <div className="border flex flex-col justify-center items-center space-y-4">
        <p>Meet Our Team</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="border px-4 py-6 rounded">
            <div className="border p-10 rounded-full h-10 w-10 flex justify-center items-center">
              img
            </div>
          </div>
          <div className="border px-4 py-6 rounded">
            <div className="border p-10 rounded-full h-10 w-10 flex justify-center items-center">
              img
            </div>
          </div>
          <div className="border px-4 py-6 rounded">
            <div className="border p-10 rounded-full h-10 w-10 flex justify-center items-center">
              img
            </div>
          </div>
          <div className="border px-4 py-6 rounded">
            <div className="border p-10 rounded-full h-10 w-10 flex justify-center items-center">
              img
            </div>
          </div>
          <div className="border px-4 py-6 rounded">
            <div className="border p-10 rounded-full h-10 w-10 flex justify-center items-center">
              img
            </div>
          </div>
          <div className="border px-4 py-6 rounded">
            <div className="border p-10 rounded-full h-10 w-10 flex justify-center items-center">
              img
            </div>
          </div>
        </div>
      </div>

      <div className="h-80 flex justify-center items-center">
        <p>Footer</p>
      </div>
      {/* <PrincipalFooter/> */}
    </div>
  );
};
