"use client";
import { log } from "console";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const getImage = async () => {
    const response: any = await fetch("/api/getimage");
    const data = await response.json();
    if (data.ok) {
      setImage(data.message);
    }
  };

  return (
    <div>
      <button onClick={getImage}>get image</button>
      <div className="w-[100vw] flex justify-center">
        {image && (
          <div>
            <Image src={image} height={500} width={500} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
