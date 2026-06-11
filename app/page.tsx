
export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-primary">
          University Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Welcome to the professional university portal. 
          Explore our directory, academic programs, and research initiatives.
        </p>
      </div>
    </main>
  )
}
