import Link from 'next/link';

export default function FooterSection() {
  const links = [
    { title: 'Inicio', href: '#hero' },
    { title: 'Galería', href: '#gallery' },
    { title: 'Registro', href: '#register' },
  ];

  return (
    <footer id="footer" className="text-gray-300 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <span className="text-lg">
          &copy; {new Date().getFullYear()} GamerCo - Todos los derechos reservados
        </span>
        <div className="flex space-x-6 text-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:text-white"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
