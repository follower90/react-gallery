import styles from './styles.module.scss';

function PreviewImage({ image }) {
    return (
        <div className={styles.image}>
            <img src={image.url} alt={image.name} />
            <div className={styles.name}>
                <p>{image.name}</p>
            </div>
        </div>
    );
}

export default PreviewImage;
