import {useEffect, useState} from "react";
import Portal from "./../portal";
import PreviewImage from "./../image";
import Controls from "./../controls";
import styles from './styles.module.scss';

const LIMIT = 8;

const getLim = (elements, maxElements) => Math.min(
    elements - 1,
    Math.floor(LIMIT / 2),
    Math.floor((maxElements - 1) / 2),
);

const infiniteList = (current, list, lim) => {
    if (lim === 0) return [list[current]];

    const displayList = [];
    displayList.push(list[current]);

    const fromStart = list.slice(0, current).splice(-lim);
    const fromEnd = fromStart.length === lim ? [] : list.slice((lim - fromStart.length) * -1);

    displayList.unshift(...[...fromEnd, ...fromStart]);

    const pos = (current >= (list.length - 1)) ? 0 : current + 1;
    const pushfromEnd = list.slice(pos, pos + lim);
    const pushfromStart = list.slice(0, lim - pushfromEnd.length);

    displayList.push(...[...pushfromEnd, ...pushfromStart]);
    return displayList;
}

function Preview({ list, current, onClose, onNext, onPrev, onSetCurrent }) {
    const [width, setWidth] = useState(window.innerWidth);
    const maxElements = Math.round((width - 200) / 70);
    const lim = getLim(list.length, maxElements);
    const displayList = infiniteList(current, list, lim);

    useEffect(() => {
        const fn = e => {
            if (e.code === 'Escape') onClose();
            if (e.code === 'ArrowLeft') onSetCurrent(displayList[lim - 1].id);
            if (e.code === 'ArrowRight') onSetCurrent(displayList[lim + 1].id);
        };

        window.document.body.addEventListener('keyup', fn);
        return () => window.document.body.removeEventListener('keyup', fn);
    }, [onClose, onSetCurrent, displayList, lim]);

    useEffect(() => {
        const fn = () => setWidth(window.innerWidth);
        window.addEventListener('resize', fn);
        return () => window.removeEventListener('resize', fn);
    }, []);

    return (
        <Portal>
            <div className={styles.overlay} />
            <div className={styles.container}>
                <PreviewImage image={list[current]} num={current + 1} total={list.length} onClose={onClose}/>
                <Controls current={lim} onNext={onNext} onPrev={onPrev} onSetCurrent={onSetCurrent} list={displayList} />
            </div>
        </Portal>
    );

}

export default Preview;
