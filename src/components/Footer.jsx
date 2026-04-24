export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 mt-auto flex flex-col md:flex-row justify-between items-start gap-8 bg-zinc-900 dark:bg-black font-['Space_Grotesk'] text-sm border-t border-zinc-800 text-white">
      <div>
        <div className="text-lg font-bold text-[#E7308C] mb-4">
          MathCom Sport Unity
        </div>
        <p className="text-zinc-400">
          © 2026 Department of Mathematics and Computer Science, Chulalongkorn University. All Rights Reserved.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <a
          className="text-zinc-400 hover:text-[#E7308C] hover:underline decoration-[#E7308C]"
          href="#"
        >
          Contact Us
        </a>
        <a
          className="text-zinc-400 hover:text-[#E7308C] hover:underline decoration-[#E7308C]"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="text-zinc-400 hover:text-[#E7308C] hover:underline decoration-[#E7308C]"
          href="#"
        >
          Department Site
        </a>
        <a
          className="text-zinc-400 hover:text-[#E7308C] hover:underline decoration-[#E7308C]"
          href="#"
        >
          Technical Support
        </a>
      </div>
    </footer>
  )
}
