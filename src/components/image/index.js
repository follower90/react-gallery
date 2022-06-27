import loadingImage from "./../../images/loading";
import styles from './styles.module.scss';
import {useEffect, useState} from "react";

function PreviewImage({ image, num, total, onClose }) {
    const [loaded, setLoaded] = useState(false);
    const onLoad = () => {
        setLoaded(true);
    }

    useEffect(() => {
        setLoaded(false);
    }, [image])

    return (
        <div className={styles.image}>
            <div className={styles.imageWrapper}>
                <div className={styles.close} onClick={onClose}>╳</div>
                <div className={styles.image}>
                    <img alt="loading" src={loadingImage} className={`${loaded ? styles.loaded : styles.loading}`} />
                    <img src={image.url} alt={image.name} className={`${loaded ? '' : styles.imageLoading}`} onLoad={onLoad} />
                </div>
                <div className={styles.description}>
                    <p className={styles.name}>{image.name}</p>
                    <p className={styles.counter}>{num} / {total} </p>
                </div>
            </div>
        </div>
    );
}

export default PreviewImage;
