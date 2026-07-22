import Category from "../components/ui/CategorySection"
import Hero from "../components/ui/HeroSection"
import ProductSection from "../components/ui/ProductSection"
import Subscripion from "../components/ui/Subscripion"
import Work from "../components/ui/Work"
import useProducts from "../redux/useProduct"
import usewishLists from "../redux/useWishList"

const Home = () => {
    const products = useProducts();
    const wishlists = usewishLists();

    return (
        <>
            <section className="max-md:pb-30 max-md:pt-30 pt-20 pb-20 md:min-h-screen bg-[#493fd7] text-white flex items-center">
                <Hero />
            </section>
            <section className="py-16">
                <Category />
            </section>
            <section className="pt-16 pb-10">
                <ProductSection products={products} wishlists={wishlists} />
            </section>
            <section className="py-16 bg-white dark:bg-gray-950">
                <Work />
            </section>

            <section className="pb-10 px-5 bg-white dark:bg-gray-950">
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
