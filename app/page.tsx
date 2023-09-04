"use client";
import Image from "next/image";
import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export default function Home() {
  const [image, setImage] = useState(null);
  const [fontSize, setFontSize] = useState(20);

  const getImage = async () => {
    const response = await fetch("/api/getimage");
    const data = await response.json();
    if (data.ok) {
      setImage(data.message);
    }
  };

  const handleResize = (event: any, { node, size, handle }: any) => {
    const font = Math.max(size.width / 5, 20);
    setFontSize(font);
  };

  return (
    <div>
      <button onClick={getImage}>Get Image</button>
      <div className="w-[100vw] flex justify-center">
        {image && (
          <div className="w-[500px] h-[500px] relative">
            <Image
              src={image}
              layout="fill" // Fill the parent container
              alt=""
              className="relative"
            />
            <div className="w-[500px] h-[500px]">
              <Draggable bounds={"parent"}>
                <div className="inline-block">
                  <ResizableBox
                    height={50}
                    width={100}
                    maxConstraints={[500, 500]}
                    resizeHandles={["n", "s", "e", "w", "ne", "nw", "se", "sw"]}
                    className="bg-white opacity-50"
                    onResize={handleResize}
                  >
                    <input
                      placeholder="Insert text"
                      style={{ fontSize: fontSize }}
                      className={`h-full w-full p-2 opacity-100`}
                      width={100}
                      height={100}
                    />
                  </ResizableBox>
                </div>
              </Draggable>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
