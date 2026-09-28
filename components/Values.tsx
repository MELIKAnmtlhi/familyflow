// import StackedImages from "./StackedImages";

// export default function Values() {
//   return (
//     <section className="max-w-5xl mx-auto px-6 py-20 relative">

//       <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-white/30 -translate-x-1/2 hidden md:block" />

//       {/* Respect - راست */}
//       <div className="relative flex justify-end mb-24">
//         <div className="flex items-center gap-6 md:w-1/2 pl-8">
//           <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C48CB3] hidden md:block" />
//           <div>
//             <h3 className="text-white font-bold text-xl mb-2">Respect</h3>
//             <p className="text-white/60 text-sm leading-relaxed">
//               Respect begins at home. FamilyFlow helps every member feel valued and heard.
//             </p>
//           </div>
//           <StackedImages src="/respect.jpg" alt="Respect" />
//         </div>
//       </div>

//       {/* Upbringing - چپ */}
//       <div className="relative flex justify-start mb-24">
//         <div className="flex items-center gap-6 md:w-1/2 pr-8 flex-row-reverse">
//           <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C48CB3] hidden md:block" />
//           <div className="text-right">
//             <h3 className="text-white font-bold text-xl mb-2">Upbringing</h3>
//             <p className="text-white/60 text-sm leading-relaxed">
//               Good upbringing shapes responsible, kind, and aware generations. We walk this path with families.
//             </p>
//           </div>
//           <StackedImages src="/upbringing.jpg" alt="Upbringing" />
//         </div>
//       </div>

//       {/* Responsibility - راست */}
//       <div className="relative flex justify-end">
//         <div className="flex items-center gap-6 md:w-1/2 pl-8">
//           <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C48CB3] hidden md:block" />
//           <div>
//             <h3 className="text-white font-bold text-xl mb-2">Responsibility</h3>
//             <p className="text-white/60 text-sm leading-relaxed">
//               Every task done right builds a stronger family. FamilyFlow keeps things organized, so nothing is forgotten.
//             </p>
//           </div>
//           <StackedImages src="/responsibility.jpg" alt="Responsibility" />
//         </div>
//       </div>

//     </section>
//   );
// }



import StackedImages from "./StackedImages";

export default function Values() {
  return (
    <section className="max-w-5xl mx-auto px-3 sm:px-6 py-20 relative overflow-hidden">

      <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-white/30 -translate-x-1/2" />

      {/* Respect - راست */}
      <div className="relative flex justify-end mb-12 sm:mb-24">
        <div className="flex items-center gap-2 sm:gap-6 w-[48%] pl-2 sm:pl-8">
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#C48CB3]" />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-xs sm:text-xl mb-1 sm:mb-2">Respect</h3>
            <p className="text-white/60 text-[9px] sm:text-sm leading-relaxed break-words">
              Respect begins at home. FamilyFlow helps every member feel valued and heard.
            </p>
          </div>
          <StackedImages src="/respect.jpg" alt="Respect" />
        </div>
      </div>

      {/* Upbringing - چپ */}
      <div className="relative flex justify-start mb-12 sm:mb-24">
        <div className="flex items-center gap-2 sm:gap-6 w-[48%] pr-2 sm:pr-8 flex-row-reverse">
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#C48CB3]" />
          <div className="flex-1 min-w-0 text-right">
            <h3 className="text-white font-bold text-xs sm:text-xl mb-1 sm:mb-2">Upbringing</h3>
            <p className="text-white/60 text-[9px] sm:text-sm leading-relaxed break-words">
              Good upbringing shapes responsible, kind, and aware generations. We walk this path with families.
            </p>
          </div>
          <StackedImages src="/upbringing.jpg" alt="Upbringing" />
        </div>
      </div>

      {/* Responsibility - راست */}
      <div className="relative flex justify-end">
        <div className="flex items-center gap-2 sm:gap-6 w-[48%] pl-2 sm:pl-8">
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#C48CB3]" />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-xs sm:text-xl mb-1 sm:mb-2">Responsibility</h3>
            <p className="text-white/60 text-[9px] sm:text-sm leading-relaxed break-words">
              Every task done right builds a stronger family. FamilyFlow keeps things organized, so nothing is forgotten.
            </p>
          </div>
          <StackedImages src="/responsibility.jpg" alt="Responsibility" />
        </div>
      </div>

    </section>
  );
}