import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function LazyLoadGameImage({image}){
    return(
        <LazyLoadImage 
            alt="game image"
            className='object-cover rounded-xl'
            effect="blur"
            wrapperProps={{
                style: {transitionDelay: "0.5s"},
            }}
            width={250}
         
            
            src={image} />
    )
}