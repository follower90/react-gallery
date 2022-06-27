import styles from './styles.module.scss';

function Controls({ list, current, onNext, onPrev, onSetCurrent }) {
    const onNextClick = (e) => onNext() && e.stopPropagation();
    const onPrevClick = (e) => onPrev() && e.stopPropagation();
    const onImageClick = (e, id) => onSetCurrent(id) && e.stopPropagation();

    return (
        <div className={styles.container}>
            <div className={styles.control} onClick={onPrevClick}>{'◀'}</div>
            <div className={styles.items}>
                <div className={styles.scroll}>
                    {list.map((file,i) => {
                        const className = (i === current) ? `${styles.item} ${styles.active}` : styles.item;
                        return <div key={i} className={className} onClick={(e) => onImageClick(e, file.id)}>
                            <img alt={file.name} src={file.preview_url || file.url} />
                        </div>
                    })}
                </div>
            </div>
            <div className={styles.control} onClick={onNextClick}>{'▶'}</div>
        </div>
    );
}

export default Controls;
