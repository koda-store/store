import Category from "../components/ui/CategorySection"
import Hero from "../components/ui/HeroSection"
import ProductSection from "../components/ui/ProductSection"
import Subscripion from "../components/ui/Subscripion"
import Work from "../components/ui/Work"
import useProducts from "../redux/useProduct"

const Home = () => {
    const products = useProducts()

    return (
        <>
            <section className="max-md:pb-30 max-md:pt-40 pt-35 pb-15 md:min-h-screen bg-[#493fd7] text-white flex items-center">
                <Hero />
            </section>
            <section className="py-16">
                <Category />
            </section>
            <section className="pt-16 pb-10">
                <ProductSection products={products} />
            </section>
            <section className="py-16 bg-white">
                <Work />
            </section>
            <section className="pb-10 bg-white px-5">
                <Subscripion />
            </section>
        </>
    )
}

export default Home

/*
== Hero
== Category
== Featured Products
== How it Work
== stay update
== Footer
*/