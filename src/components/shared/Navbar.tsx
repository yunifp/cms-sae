"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Menu, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

import logo from '@/assets/logo.png'; 

export function Navbar() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    // Projects tetap bahasa Inggris dan dicetak miring (italic)
    { name: <i className="italic">Projects</i>, href: '/projects' },
    { name: 'Layanan', href: '/services' },
    { name: 'Artikel', href: '/posts' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#121418] border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-12 h-24 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src={logo} 
            alt="SaeBoemi Logo" 
            width={40} 
            height={40} 
            className="object-contain"
            priority 
          />
          <span className="text-3xl font-medium tracking-tight text-white">SaeBoemi</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors hover:text-white group ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute left-0 bottom-0 h-[2px] w-full bg-[#DDF247] transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button 
            asChild 
            className="bg-[#DDF247] text-black hover:bg-white hover:text-black transition-colors duration-300 rounded-none px-6 py-6 font-semibold"
          >
            <Link href="https://wa.link/w7chgd">
              Konsultasi Sekarang <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-[80vw] sm:w-[350px] bg-[#121418] border-l-white/10 text-white overflow-y-auto p-6"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-5 mt-8 pb-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`text-base font-medium transition-colors ${
                        isActive ? 'text-[#DDF247]' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                
              
                <Button 
                  className="mt-6 w-full h-12 bg-[#DDF247] text-black hover:bg-white hover:text-black rounded-none transition-colors duration-300 text-sm font-semibold" 
                  asChild
                >
                  <Link href="https://wa.link/w7chgd">Konsultasi Sekarang</Link>
                </Button>
              </nav>
            </SheetContent>
            
          </Sheet>
        </div>
        
      </div>
    </header>
  );
}