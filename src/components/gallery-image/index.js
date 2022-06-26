import { useState} from "react";
import loadingImage from "./../../images/loading";
import styles from './styles.module.scss'

function GalleryImage ({ name, url }) {
    const [loaded, setLoaded] = useState(false);
    const onLoad = () => {
        setLoaded(true);
    }

    if (!loaded) return <>
        <img alt="loading" src={loadingImage} className={styles.loading} />
        <img alt={name} src={url} onLoad={onLoad} style={{ display:'none'}} />
    </>;

    return <img alt={name} src={url} />;
}

export default GalleryImage;
