import { createContext, useState, useEffect } from 'react';

export const Context = createContext();

export const initializeLocalStorage = () => {
    const accountInLocalStogare = localStorage.getItem('account');
    const signOutInLocalStorage = localStorage.getItem('sign-out');
    let parsedAccount;
    let parsedSignOut;

    if (!accountInLocalStogare) {
        localStorage.setItem('account', JSON.stringify({}));
        parsedAccount = {};
    } else {
        parsedAccount = JSON.parse(accountInLocalStogare);
    }

    if (!signOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false));
        parsedSignOut = false;
    } else {
        parsedSignOut = JSON.parse(signOutInLocalStorage);
    }
}

export const Provider = ({children}) => {
    //My account
    const [account, setAccount] = useState({});

    //Sign Out
    const [signOut, setSignOut] = useState(false);

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

    //Get Products
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then(data => setItems(data))
      }, [])
    
    //Get Products By Title
    const [searchByTitle, setSearchByTitle] = useState(null);
    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    //Get Products By Category
    const [searchByCategory, setSearchByCategory] = useState(null);
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return (filteredItemsByTitle(items, searchByTitle))
        }
        if (searchType === 'BY_CATEGORY') {
            return (filteredItemsByCategory(items, searchByCategory))
        } 
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return (filteredItemsByCategory(items, searchByCategory)).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if (!searchType) {
            return items
        }
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    }, [items, searchByTitle, searchByCategory])

    console.log('filtered Items:', filteredItems);

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
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </Context.Provider>
    )
}