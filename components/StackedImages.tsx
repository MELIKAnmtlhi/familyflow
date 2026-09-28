// import Image from "next/image";

// type StackedImagesProps = {
//   src: string;
//   alt: string;
// };

// export default function StackedImages({ src, alt }: StackedImagesProps) {
//   return (
//     <div className="relative flex-shrink-0" style={{ width: "200px", height: "200px" }}>
//       <Image
//         src={src}
//         alt={alt}
//         width={200}
//         height={200}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "160px",
//           height: "160px",
//           objectFit: "cover",
//           borderRadius: "8px",
//           transform: "translate(20px, 20px) rotate(-15deg)",
//           opacity: 0.5,
//         }}
//       />
//       {/* عکس وسطی */}
//       <Image
//         src={src}
//         alt={alt}
//         width={200}
//         height={200}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "160px",
//           height: "160px",
//           objectFit: "cover",
//           borderRadius: "8px",
//           transform: "translate(10px, 10px) rotate(-8deg)",
//           opacity: 0.75,
//         }}
//       />
//       {/* عکس جلویی */}
//       <Image
//         src={src}
//         alt={alt}
//         width={200}
//         height={200}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "160px",
//           height: "160px",
//           objectFit: "cover",
//           borderRadius: "8px",
//           transform: "translate(0, 0) rotate(0deg)",
//         }}
//       />
//     </div>
//   );
// }


import Image from "next/image";

type StackedImagesProps = {
  src: string;
  alt: string;
};

export default function StackedImages({ src, alt }: StackedImagesProps) {
  return (
    <div className="relative w-12 h-12 sm:w-32 sm:h-32 flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="absolute top-0 left-0 w-10 h-10 sm:w-32 sm:h-32 rounded-lg object-cover rotate-[-15deg] translate-x-1 translate-y-1 opacity-50"
      />
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="absolute top-0 left-0 w-10 h-10 sm:w-32 sm:h-32 rounded-lg object-cover rotate-[-8deg] translate-x-0.5 translate-y-0.5 opacity-75"
      />
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="absolute top-0 left-0 w-10 h-10 sm:w-32 sm:h-32 rounded-lg object-cover"
      />
    </div>
  );
}