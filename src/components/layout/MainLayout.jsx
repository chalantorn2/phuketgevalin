import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children, forceSolid = false }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header forceSolid={forceSolid} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
