import {useEffect, useState} from "react";
import Preview from "./../preview";
import GalleryImage from "./../gallery-image";
import styles from './styles.module.scss'

const PAGE_SIZE = 50;
const NEXT_PAGE_THRESHOLD = 30;
const ROW_SIZE = 5;
const ROW_HEIGHT = 150;

function Gallery() {
    const [preview, setPreview] = useState(false);
    const [current, setCurrent] = useState(0);
    const [files, setFiles] = useState([]);

    const [visibleFiles, setVisibleFiles] = useState([]);

    useEffect(() => {
        setFiles(window.initialState.map((item, id) => ({ ...item, id })));
    }, []);


    useEffect(() => {
        setVisibleFiles(files.slice(0, PAGE_SIZE));
    }, [files]);

    useEffect(() => {
        const cb = () => {
            if (files.length > visibleFiles.length) {
                 if (window.scrollY > ( visibleFiles.length - NEXT_PAGE_THRESHOLD) / ROW_SIZE * ROW_HEIGHT) {
                     setVisibleFiles([...visibleFiles, ...files.slice(visibleFiles.length, visibleFiles.length + PAGE_SIZE)]);
                }
            }
        }
        window.addEventListener('scroll', cb);
        return () => window.removeEventListener('scroll', cb);
    })

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
            {visibleFiles.map((file, i) => {
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
