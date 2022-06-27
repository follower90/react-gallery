import { useState} from "react";
import loadingImage from "./../../images/loading";
import styles from './styles.module.scss'

function GalleryImage ({ name, url }) {
    const [loaded, setLoaded] = useState(false);
    const onLoad = () => {
        setLoaded(true);
    }

    return <div className={styles.container}>
        <img alt="loading" src={loadingImage} className={`${loaded ? styles.loaded : styles.loading}`} />
        <img alt={name} src={url} onLoad={onLoad} />
    </div>;

}

export default GalleryImage;
