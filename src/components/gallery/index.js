import {useEffect, useState} from "react";
import Preview from "./../preview";
import GalleryImage from "./../gallery-image";
import styles from './styles.module.scss'


function Gallery() {
    const [preview, setPreview] = useState(false);
    const [current, setCurrent] = useState(0);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        setFiles(window.initialState.map((item, id) => ({ ...item, id })));
    }, []);

    const onClick = (index) => {
        setPreview(true);
        setCurrent(index);
    }
    const onClose = () => {
        setPreview(false);
    }

    const onNext = () => {
        const next = current + 1;
        if (files[next]) setCurrent(next);
        else setCurrent(0);
    }
    const onPrev = () => {
        const prev = current - 1;
        if (files[prev]) setCurrent(prev);
        else setCurrent(files.length - 1);
    }

    const onSetCurrent = (id) => {
        setCurrent(files.findIndex(i => i.id === id));
    }

    return (
        <div className={styles.grid}>
            {files.map((file, i) => {
                return (<div className={styles.item} key={i} onClick={() => onClick(i)}>
                    <GalleryImage name={file.name} url={file.preview_url || file.url} />
                    <div className={styles.overlay}>{file.name}</div>
                </div>);
            })}
            {preview && <Preview
                list={files}
                current={current}
                onClose={onClose}
                onNext={onNext}
                onPrev={onPrev}
                onSetCurrent={onSetCurrent}
            />}
        </div>
    );
}

export default Gallery;
