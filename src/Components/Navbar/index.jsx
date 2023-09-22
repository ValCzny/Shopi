import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../Context';
import { ShoppingCart } from "../ShoppingCart";

const Navbar = () => {
    const context = useContext(Context);
    const activeStyle = 'underline underline-offset-4';
    
    //Sign Out
    const signOut = localStorage.getItem('sign-out');
    const parsedSignOut = JSON.parse(signOut);
    const isUserSignOut = context.signOut || parsedSignOut;    
    //Account
    const account = localStorage.getItem('account');
    const parsedAccount = JSON.parse(account);
    //Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true);
        localStorage.setItem('sign-out', stringifiedSignOut);
        context.setSignOut(true);
    }
    
    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className='text-black/60'>
                        valen.czny@gmail.com
                    </li>
                    <li>
                        <NavLink 
                        to='/my-orders'
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            My Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to='/my-account'
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to='/sign-in'
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                        onClick={() => handleSignOut()}>
                            Sign Out
                        </NavLink>
                    </li>
                    <li className="flex justify-center items-center">
                        <ShoppingCart />
                    </li>
                </>
            )
        } else {
            return (
                <li>
                    <NavLink
                    to={`${isUserSignOut ? '/sign-in' : '/'}`}
                    className={({isActive}) => isActive ? activeStyle : undefined}
                    onClick={() => handleSignOut()}>
                        Sign In
                    </NavLink>
                </li>
            )
        }
    }
    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                    <NavLink 
                    to='/'>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/'
                    onClick={() => context.setSearchByCategory()}
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/women_clothes'
                    onClick={() => context.setSearchByCategory("women's clothing")}
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Women's Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/men_clothes'
                    onClick={() => context.setSearchByCategory("men's clothing")}
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Men's Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/electronics'
                    onClick={() => context.setSearchByCategory('electronics')}
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/jewelery'
                    onClick={() => context.setSearchByCategory('jewelery')}
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Jewelery
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/others'
                    onClick={() => context.setSearchByCategory('others')}
                    className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                {renderView()}
            </ul>
        </nav>
    )
}

export { Navbar };