import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              K
            </div>
            <span className="text-lg font-bold text-white">Katece HR</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-white/80 hover:text-white">
              About
            </Link>
            <Link href="#" className="text-sm font-medium text-white/80 hover:text-white">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/Auth">
              <Button variant="secondary" size="sm" className="font-semibold">
                Employee Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex min-h-screen flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-factory.png"
            alt="Katece Garment Factory"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 pt-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 backdrop-blur-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
              Internal Systems v2.0 Live
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
              Precision in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Every Thread
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-300 md:text-xl leading-relaxed">
              Welcome to the Katece Garment Factory Employee Portal. 
              Manage your shifts, check your payroll, and stay connected with the factory floor—all in one place.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/Auth">
                <Button size="lg" className="h-12 w-full gap-2 bg-blue-600 px-8 text-base hover:bg-blue-700 sm:w-auto">
                  Access Portal <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-12 w-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto">
                  System Status
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-gray-400">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Secure Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Real-time Check-in</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Payroll Tracking</span>
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clients Section */}
      <section id="clients" className="py-20 bg-gray-50 dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500 mb-8">
            Trusted by Global Fashion Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholder Logos */}
            {['Zara', 'H&M', 'Uniqlo', 'Levi\'s', 'Nike', 'Adidas'].map((brand) => (
               <span key={brand} className="text-2xl font-bold font-serif text-gray-800 dark:text-gray-200">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-4">
                    World-Class Manufacturing
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                    From raw fabric to finished garment, we ensure quality at every step of the supply chain.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Precision Cutting", desc: "Automated layouts and laser cutting systems minimize waste." },
                    { title: "High-Volume Sewing", desc: "1,500+ sewing stations capable of 500k units monthly." },
                    { title: "Quality Assurance", desc: "AQL 2.5 standards verified by independent audit teams." },
                ].map((service, i) => (
                    <div key={i} className="group p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl transition-all duration-300">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                           <span className="font-bold text-xl">{i + 1}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{service.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Corporate/Careers Section */}
      <section className="relative py-24 bg-zinc-900 text-white overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-20 bg-[url('/hero-factory.png')] bg-cover bg-fixed bg-center" />
         <div className="container relative z-10 mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Join the Katece Family</h2>
             <p className="mx-auto max-w-2xl text-xl text-gray-300 mb-10">
                 We offer fair wages, a safe working environment, and opportunities for growth. 
                 Currently employing over 2,000 skilled workers via our digital platform.
             </p>
             <div className="flex justify-center gap-4">
                 <Button size="lg" className="bg-white text-black hover:bg-gray-100">View Open Positions</Button>
                 <Button size="lg" className="border-white/20 text-white hover:bg-white/10">Learn About Our Culture</Button>
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 text-gray-400 border-t border-zinc-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                 <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 font-bold text-white text-xs">K</div>
                    <span className="font-bold text-white">Katece HR</span>
                </div>
                <p className="text-sm">Empowering the textile industry with modern workforce solutions.</p>
            </div>
            <div>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link href="#" className="hover:text-white">About Us</Link></li>
                    <li><Link href="#" className="hover:text-white">Sustainability</Link></li>
                    <li><Link href="#" className="hover:text-white">Careers</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-white mb-4">Office</h4>
                <p className="text-sm mb-2">123 Garment Way, District 7</p>
                <p className="text-sm mb-2">Ho Chi Minh City, Vietnam</p>
                <p className="text-sm">contact@katece.com</p>
            </div>
            <div>
                 <p className="text-xs text-gray-600 mt-8 md:mt-0">© 2024 Katece Garment Factory. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
