import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PublicRoot({ children } : { children: React.ReactNode }){
    return(
        <>
            <Header />
            <main className="containerr">
                { children }
            </main>
            <Footer />
        </>
    );
}