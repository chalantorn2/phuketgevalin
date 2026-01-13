import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children, currentPage, setCurrentPage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
