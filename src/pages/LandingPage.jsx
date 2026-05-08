import { useNavigate } from 'react-router-dom'
import CosmicBackground from '../components/GeometricBackground'

const FEATURES = [
  {
    title: 'ลงทะเบียน',
    description: 'สมัครเข้าร่วมกีฬาสีประจำภาค ง่ายๆ แค่กรอกข้อมูล',
    icon: '/assets/compass-rose.png',
    step: '01'
  },
  {
    title: 'รอจัดทีม',
    description: 'ทีมงานจะจัดสรรทีมสีให้คุณอย่างยุติธรรม',
    icon: '/assets/mystic-eye.png',
    step: '02'
  },
  {
    title: 'แข่งขัน!',
    description: 'ร่วมแข่งขันกีฬาสุดมันส์กับเพื่อนๆ ในภาค',
    icon: '/assets/all-seeing-eye.png',
    step: '03'
  }
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-on-background">
      <CosmicBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/assets/all-seeing-eye.png" alt="" className="w-9 h-9 drop-shadow-lg" />
            <span className="font-h1 text-xl font-bold tracking-tight gold-text">MATHCOM</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/check')}
              className="px-6 py-2 text-on-surface/70 hover:text-primary transition-colors font-medium"
            >
              เช็คสถานะ
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn-primary py-2 px-6"
            >
              ลงทะเบียน
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Floating Planets */}
        <img 
          src="/assets/saturn.png" 
          alt="" 
          className="absolute top-10 right-[5%] w-44 md:w-64 opacity-20 animate-float-slow pointer-events-none"
        />
        <img 
          src="/assets/planet-venus.png" 
          alt="" 
          className="absolute bottom-10 left-[3%] w-28 md:w-40 opacity-15 animate-float-medium pointer-events-none"
        />
        <img 
          src="/assets/moon-soft.png" 
          alt="" 
          className="absolute top-[40%] right-[15%] w-16 md:w-24 opacity-10 animate-float-fast pointer-events-none"
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            เปิดลงทะเบียนแล้ว!
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/assets/all-seeing-eye.png" 
              alt="MathCom Sports Day" 
              className="w-28 h-28 md:w-36 md:h-36 drop-shadow-2xl animate-float-slow"
            />
          </div>

          <h1 className="font-h1 text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            <span className="gold-text">กีฬาสี</span>
            <br />
            <span className="text-on-surface">ภาคคณิตศาสตร์</span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface/60 mb-6 max-w-2xl mx-auto leading-relaxed">
            MathCom Sports Day 2026
          </p>
          <p className="text-base text-on-surface/40 mb-12 max-w-lg mx-auto">
            มาร่วมสร้างความสามัคคี แข่งกีฬา สนุกสนาน กับเพื่อนๆ ในภาค
          </p>

          {/* Hands + CTA */}
          <div className="flex items-center justify-center gap-2 md:gap-6 mb-8">
            <img 
              src="/assets/hand-left.png" 
              alt="" 
              className="w-16 md:w-24 opacity-60 animate-float-medium hidden sm:block"
            />
            <button
              onClick={() => navigate('/register')}
              className="btn-primary text-lg px-12 py-4 shadow-glow-gold"
            >
              ✦ ลงทะเบียนเข้าร่วม
            </button>
            <img 
              src="/assets/hand-right.png" 
              alt="" 
              className="w-16 md:w-24 opacity-60 animate-float-medium hidden sm:block"
            />
          </div>

          <button
            onClick={() => navigate('/check')}
            className="text-on-surface/40 hover:text-primary transition-colors text-sm font-medium underline underline-offset-4"
          >
            เช็คสถานะการลงทะเบียน →
          </button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-h1 text-3xl md:text-4xl font-bold mb-4">ขั้นตอนการเข้าร่วม</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="glass-panel p-8 rounded-2xl group hover:border-primary/50 transition-all duration-500 text-center"
              >
                <div className="text-xs font-mono text-primary/60 mb-4">{feature.step}</div>
                <div className="flex justify-center mb-6">
                  <img 
                    src={feature.icon} 
                    alt="" 
                    className="w-16 h-16 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 gold-text">
                  {feature.title}
                </h3>
                <p className="text-on-surface/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-24 px-6 bg-surface/30 backdrop-blur-sm border-y border-primary/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="font-h1 text-4xl md:text-5xl font-bold mb-8">
              <span className="gold-text">รายละเอียด</span>
              <br />
              งานกีฬาสี
            </h2>
            <div className="space-y-5">
              {[
                { icon: '📅', label: 'วันที่', value: '9 พฤษภาคม 2026' },
                { icon: '📍', label: 'สถานที่', value: 'อาคารมหาวชิรุณหิศ' },
                { icon: '🏃', label: 'กิจกรรม', value: 'กีฬาแข่งขัน, เชียร์, กองเชียร์' },
                { icon: '👥', label: 'ทีม', value: '4 สี — แดง, น้ำเงิน, เหลือง, เขียว' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 text-lg">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-xs text-on-surface/40 font-bold uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-on-surface/80">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/register')}
              className="mt-10 btn-primary"
            >
              ลงทะเบียนเลย
            </button>
          </div>
          <div className="flex-1 relative flex justify-center">
            <div className="relative">
              <img 
                src="/assets/jupiter.png" 
                alt="" 
                className="w-64 h-64 md:w-80 md:h-80 animate-float-slow drop-shadow-2xl"
              />
              <img 
                src="/assets/star-8pt.png" 
                alt="" 
                className="absolute -top-4 -right-4 w-10 h-10 animate-twinkle"
              />
              <img 
                src="/assets/star-8pt.png" 
                alt="" 
                className="absolute -bottom-2 -left-6 w-8 h-8 animate-twinkle"
                style={{ animationDelay: '1s' }}
              />
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 blur-3xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/20 blur-3xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-primary/10 bg-background text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/assets/all-seeing-eye.png" alt="" className="w-8 h-8 opacity-50" />
            <span className="font-h1 text-lg font-bold tracking-tight text-on-surface/50">MATHCOM SPORTS DAY</span>
          </div>
          <p className="text-on-surface/30 text-sm max-w-md mx-auto">
            © 2026 ภาควิชาคณิตศาสตร์และวิทยาการคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
      </footer>
    </div>
  )
}
