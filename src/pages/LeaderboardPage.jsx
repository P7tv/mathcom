

export default function LeaderboardPage() {
  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin py-stack-lg flex flex-col gap-stack-lg">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-md border-b border-surface-variant pb-stack-md">
          <div>
            <h1 className="font-h1 text-h1 text-on-surface mb-stack-xs">Championship Leaderboard</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Current standings for the annual team sports championship.</p>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-end mt-stack-md">
          <div className="bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-[#E7308C]/30 flex flex-col items-center text-center order-1 md:order-2 z-10 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#E7308C]"></div>
            <h2 className="font-h2 text-h2 text-on-surface mb-stack-xs mt-4">Homeless</h2>
            <div className="font-stat-value text-stat-value text-primary mb-stack-md text-4xl">67 pts</div>
          </div>
        </section>
    </main>
  )
}
