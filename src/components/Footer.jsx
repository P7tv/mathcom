export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 mt-auto border-t border-primary/10 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <img src="/assets/all-seeing-eye.png" alt="" className="w-6 h-6 opacity-50" />
            <span className="font-h1 text-lg font-bold tracking-tight text-on-surface/60">MATHCOM SPORTS DAY</span>
          </div>
          <p className="text-on-surface/30 text-sm max-w-sm">
            ระบบลงทะเบียนกีฬาสีประจำภาคคณิตศาสตร์และวิทยาการคอมพิวเตอร์
          </p>
        </div>
        <div className="flex gap-8">
          {[{ label: 'ลงทะเบียน', href: '/register' }, { label: 'เช็คสถานะ', href: '/check' }].map(link => (
            <a key={link.label} className="text-on-surface/40 hover:text-primary text-sm font-semibold transition-colors" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-on-surface/20 text-xs">© 2026 ภาควิชาคณิตศาสตร์และวิทยาการคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย</p>
      </div>
    </footer>
  )
}
