import Link from "next/link"
import { ArrowRight, CheckCircle2, Printer, Upload, CreditCard, Zap, Shield, Smartphone, Menu, FileText, Palette, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] font-sans selection:bg-emerald-900 selection:text-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0a0a]/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative h-16 w-48">
              <Image
                src="/logo.png"
                alt="Quick Copy"
                fill
                className="object-contain object-left invert opacity-90"
                priority
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-400 hover:text-emerald-400 transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-medium text-black shadow-md transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-gray-200" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#0a0a0a] border-zinc-800">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link href="#features" className="text-lg font-medium text-gray-200 hover:text-emerald-400">
                    Features
                  </Link>
                  <Link href="#how-it-works" className="text-lg font-medium text-gray-200 hover:text-emerald-400">
                    How it Works
                  </Link>
                  <Link href="#pricing" className="text-lg font-medium text-gray-200 hover:text-emerald-400">
                    Pricing
                  </Link>
                  <hr className="border-zinc-800" />
                  <Link href="/login" className="text-lg font-medium text-gray-200">
                    Log in
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-400 px-8 text-base font-medium text-black shadow-md transition-all hover:bg-emerald-500"
                  >
                    Get Started
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden py-12 md:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_450px] lg:gap-16 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-serif font-extrabold tracking-tight text-gray-200 sm:text-5xl xl:text-7xl/none">
                    Print documents, <br />
                    <span className="font-sans text-emerald-400">
                      in seconds.
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-400 text-lg md:text-xl leading-relaxed">
                    The modern way to print. Upload from your phone, pay instantly, and collect from any Quick Copy kiosk. No drivers, no hassle.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link
                    href="/p/DEMO"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-400 px-8 text-base font-medium text-black shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-500 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Scan QR Code
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="#locations"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 px-8 text-base font-medium text-gray-200 shadow-sm transition-all hover:bg-zinc-800 hover:border-zinc-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Quick Copy Locations
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-[#0a0a0a] bg-zinc-700" />
                    ))}
                  </div>
                  <p>Trusted by 10,000+ students & pros</p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative h-[300px] md:h-[400px] w-full max-w-[500px] overflow-hidden rounded-2xl bg-[#0a0a0a] shadow-2xl ring-1 ring-white/10 lg:h-[600px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="mx-auto h-24 w-24 rounded-2xl bg-emerald-900/20 flex items-center justify-center border border-emerald-500/20">
                        <Smartphone className="h-12 w-12 text-emerald-400" />
                      </div>
                      <p className="text-zinc-500 font-medium">App Interface Mockup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="w-full py-16 md:py-32 bg-[#0a0a0a]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-5xl text-gray-200">Effortless Printing</h2>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                From file to paper in three simple steps.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
              {[
                { icon: Upload, title: "Upload", desc: "Drag & drop any file. We handle the formatting automatically." },
                { icon: CreditCard, title: "Pay", desc: "Secure UPI & Card payments. Only pay for what you print." },
                { icon: Printer, title: "Print", desc: "Scan the QR at any kiosk to release your documents instantly." }
              ].map((step, i) => (
                <div key={i} className="group relative flex flex-col items-center space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center transition-all hover:bg-zinc-900 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a0a0a] shadow-sm ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-200">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full py-16 md:py-32 bg-zinc-900/20 border-y border-zinc-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-200">
                  Enterprise quality, <br />
                  <span className="text-emerald-400">consumer simplicity.</span>
                </h2>
                <p className="text-gray-400 md:text-xl/relaxed">
                  We've rebuilt the printing experience from the ground up to be secure, reliable, and incredibly fast.
                </p>
                <div className="grid gap-6 pt-4">
                  {[
                    { title: "End-to-End Encrypted", desc: "Your files are encrypted in transit and at rest." },
                    { title: "Auto-Deletion", desc: "Files are permanently wiped 1 hour after printing." },
                    { title: "Smart Formatting", desc: "Perfect margins and layout, every single time." }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/50">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-200">{feat.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 hover:bg-zinc-900 transition-colors">
                  <Zap className="h-8 w-8 text-emerald-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2 text-gray-200">Lightning Fast</h4>
                  <p className="text-gray-400 text-sm">Optimized print queues mean no waiting around.</p>
                </div>
                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 hover:bg-zinc-900 transition-colors sm:translate-y-8">
                  <Shield className="h-8 w-8 text-emerald-400 mb-4" />
                  <h4 className="font-bold text-lg mb-2 text-gray-200">Guest Mode</h4>
                  <p className="text-gray-400 text-sm">Print without creating an account. Pure anonymity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-16 md:py-32 bg-[#0a0a0a]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-5xl text-gray-200">Simple, Transparent Pricing</h2>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                No subscription fees. No hidden charges. Just pay for what you print.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {[
                {
                  icon: FileText,
                  title: "Black & White",
                  price: "₹2",
                  unit: "/ page",
                  desc: "Crisp, high-contrast monochrome printing on 75 GSM paper.",
                  color: "text-gray-200"
                },
                {
                  icon: Palette,
                  title: "Color Print",
                  price: "₹5",
                  unit: "/ page",
                  desc: "Vibrant, full-color printing for presentations and photos.",
                  color: "text-emerald-400"
                },
                {
                  icon: FolderOpen,
                  title: "Spiral Binding",
                  price: "₹15",
                  unit: "/ kit",
                  desc: "Professional spiral binding with cover and back sheet.",
                  color: "text-blue-400"
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black ring-1 ring-white/10 ${item.color}`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-200">{item.title}</h3>
                  <div className="my-4 flex items-baseline text-gray-200">
                    <span className="text-4xl font-extrabold tracking-tight">{item.price}</span>
                    <span className="ml-1 text-sm font-medium text-gray-400">{item.unit}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-[#0a0a0a] border-t border-zinc-800 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-400 flex items-center justify-center">
                  <Printer className="h-4 w-4 text-black" />
                </div>
                <span className="text-xl font-bold text-gray-200">Quick Copy</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                The modern printing infrastructure for the digital age. Fast, secure, and everywhere you need it.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-200">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#features" className="hover:text-emerald-400 transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
                <li><Link href="#locations" className="hover:text-emerald-400 transition-colors">Locations</Link></li>
                <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Print Now</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-200">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-200">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">© 2024 Quick Copy Inc. All rights reserved.</p>
            <div className="flex gap-6">
              {/* Social Icons could go here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
