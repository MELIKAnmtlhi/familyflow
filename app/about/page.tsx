import Link from "next/link";

export default function AboutPage() {
  const features = [
    { icon: "📋", title: "Task Management", desc: "Organize daily family tasks with ease." },
    { icon: "👨‍👩‍👧‍👦", title: "Member Management", desc: "Add and manage every family member." },
    { icon: "💰", title: "Expense Tracking", desc: "Keep your family budget under control." },
    { icon: "📅", title: "Event Calendar", desc: "Never miss birthdays or anniversaries." },
    { icon: "💕", title: "Memory Keeper", desc: "Save precious family moments forever." },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-16 md:px-20">
      <div className="max-w-3xl mx-auto">

        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[#0D1E4C] mb-4">
            Hi, I&apos;m Melika 👋
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-[#26415E]">
            Senior Front-end Developer
          </p>
        </section>

       
        <div className="border-t border-[#26415E]/20 mb-16" />

       
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1E4C] mb-6">
            About FamilyFlow
          </h2>
          <p className="text-[#26415E] text-lg leading-relaxed">
            FamilyFlow is an all-in-one platform designed to help families stay
            organized and connected. From managing tasks and expenses to saving
            memories and planning events — everything your family needs, in one
            place. Built with love for families who want to simplify their daily
            lives and focus on what truly matters: each other.
          </p>
        </section>

      
        <div className="border-t border-[#26415E]/20 mb-16" />

       
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1E4C] mb-8">
            ✨ Features
          </h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-[#0D1E4C] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#26415E]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-[#26415E]/20 mb-16" />

      
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1E4C] mb-6">
            Why FamilyFlow?
          </h2>
          <p className="text-[#26415E] text-lg leading-relaxed">
            Family life is busy. Between school runs, work, chores, and
            everything in between — it&apos;s easy to lose track. FamilyFlow was
            created to bring calm to the chaos. It&apos;s simple, beautiful,
            and made for real families who want to stay connected without the
            stress.
          </p>
        </section>

       
        <div className="border-t border-[#26415E]/20 mb-16" />

        <section className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1E4C] mb-6">
            Get in Touch
          </h2>
          <div className="space-y-3 text-[#26415E] text-lg">
            <p>📧 mlykanmtallhy@gmail.com</p>
            <p>💼 www.linkedin.com/in/melika-nematollahi</p>
          </div>
        </section>

        
        <Link
          href="/"
          className="inline-block bg-[#26415E] hover:bg-[#0D1E4C] text-white px-6 py-3 rounded-full font-semibold mb-12 transition shadow-md"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}