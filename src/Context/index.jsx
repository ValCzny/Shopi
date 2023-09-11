import { createContext, useState } from 'react';

export const Context = createContext();

export const Provider = ({children}) => {
    //Shopping Cart · cart count
    const [count, setCount] = useState(0);

    //Shopping Cart · add products to cart
    const [cartProducts, setCartProducts] = useState([]);
    
    //Shopping Cart · Order
    const [order, setOrder] = useState([]);

    //Product Detail · Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    //Product Detail · Show product
    const [productToShow, setProductToShow] = useState({});

    //Checkout Side Menu · Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);



    return (
        <Context.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder
        }}>
            {children}
        </Context.Provider>
    )
}