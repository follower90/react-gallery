import styles from './styles.module.scss';

function PreviewImage({ image, num, total }) {
    return (
        <div className={styles.image}>
            <div className={styles.imageWrapper}>
                <img src={image.url} alt={image.name} />
                <div className={styles.description}>
                    <p className={styles.name}>{image.name}</p>
                    <p className={styles.counter}>{num} / {total} </p>
                </div>
            </div>
        </div>
    );
}

export default PreviewImage;
