import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TeamsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex flex-col w-full max-w-[1280px] mx-auto px-margin pt-stack-lg pb-stack-lg gap-stack-lg">
        {/* Header */}
        <section className="flex flex-col gap-stack-md">
          <div>
            <h1 className="font-h1 text-h1 text-on-surface mb-stack-xs uppercase">
              Elite Rosters
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Browse MathCom's premier athletic teams. Review rosters, check
              recruitment status, and explore team histories.
            </p>
          </div>
        </section>

        {/* Team Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <article className="col-span-1 lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-sm border-b-4 border-primary overflow-hidden flex flex-col md:flex-row group cursor-pointer transition-all hover:shadow-md">
            <div className="w-full md:w-2/5 h-48 md:h-auto bg-surface-container relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX8ylT0kdZeUk8KJ4I3l-judfZk5YWHX53S0ZVBp0NEtEhXUWxwSeOLHJrdYZTV3fNnwunpXW6A1f4guLdmFt6h3tbO8iMpeHBclAx8P-FHnYS56JXfUuwS0IxJK_pgW88wt3WXx0UhryKy58a_PH1nosPaCkkoIrZDnswc0KBi0sRn1UfdhWABEQqlqCNQYIchSG2MMDRRnl7KEIuVhCREE1utk6xzc9wtygvhKA-hAPkcBcd65l-4JhXhpr5T0z6Rv4-MCBPUT9P"
                alt="CU Pink Panthers team"
              />
            </div>
            <div className="p-stack-md flex flex-col justify-between flex-grow w-full md:w-3/5">
              <div>
                <h2 className="font-h2 text-h2 text-on-surface mb-stack-sm uppercase">
                  ComSci Homeless
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
                  Home is where we roam. We own every corner of this campus.
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  )
}
