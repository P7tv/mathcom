

export default function GamesPage() {
  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin py-margin">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-stack-md border-b border-outline-variant pb-stack-sm">
          <div>
            <h1 className="font-h1 text-h1 text-on-surface mb-stack-xs">Match Center</h1>
            <p className="font-body-lg text-body-lg text-secondary">Schedules, live scores, and recent results.</p>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <section className="lg:col-span-12 mb-stack-sm">
            <div className="bg-surface rounded-xl overflow-hidden shadow-sm border-b-4 border-primary relative flex flex-col md:flex-row">
              <div className="md:w-1/3 min-h-[200px] bg-cover bg-center relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUv5uPcDv8UWmpCAos-27XmjM9sRhy2oydrMJafcYTNUewhJUpphKHgpnS704blgz7vQsUOIgFzym9rBpm7QAe0Btl16c8N5zVmt3gfAYhvbGTTlO13KD76Ra6pUZQ87mh58yFfaAL5yHm6i-N16qV31ciBPPTEQhQLX-GcgMUHL1Xvh5dOl_KzHMRQdfwkRC0ECLH1JcgzKFTTqHN0OnJVejx1nARo3FOvcp3SyurL14hdar5I9WrPol3-1FUhf4Ss6YhD7v3XjRj')" }}></div>
              <div className="p-stack-md md:w-2/3 flex flex-col justify-center">
                <div className="flex items-center justify-between mt-stack-sm">
                  <div className="flex flex-col items-center">
                    <span className="font-h3 text-h3 text-on-surface mb-1">Homeless</span>
                  </div>
                  <div className="flex flex-col items-center px-gutter">
                    <div className="flex items-baseline gap-unit">
                      <span className="font-stat-value text-[48px] text-primary">67</span>
                      <span className="font-h3 text-h3 text-secondary">-</span>
                      <span className="font-stat-value text-[48px] text-on-surface">55</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-h3 text-h3 text-on-surface mb-1">NIG</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
    </main>
  )
}
