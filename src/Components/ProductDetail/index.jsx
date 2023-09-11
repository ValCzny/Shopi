import { XMarkIcon } from '@heroicons/react/24/solid';
import { Context } from '../../Context';
import { useContext } from 'react';
import './styles.css';

const ProductDetail = () => {
    const context = useContext(Context);

    return(
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Detail</h2>
                <div>
                    <XMarkIcon 
                        className='h-6 w-6 text-black cursor-pointer'
                        onClick={() => context.closeProductDetail()}/>
                </div>
            </div>
            <figure className='px-6 w-2/3 h-2/3'>
                <img 
                className='w-full h-full rounded-lg' 
                src={context.productToShow.image} 
                alt={context.productToShow.title} />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl mb-2'>{context.productToShow.price}</span>
                <span className='font-medium text-md'>{context.productToShow.title}</span>
                <span className='font-light text-sm'>{context.productToShow.description}</span>
            </p>
        </aside>
    )
}

export { ProductDetail }