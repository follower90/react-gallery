import styles from './styles.module.scss';

function PreviewImage({ image, num, total, onClose }) {
    return (
        <div className={styles.image}>
            <div className={styles.imageWrapper}>
                <div className={styles.close} onClick={onClose}>╳</div>
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
