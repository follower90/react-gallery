import {useEffect} from "react";
import Portal from "./../portal";
import PreviewImage from "./../image";
import Controls from "./../controls";
import styles from './styles.module.scss';

const lim = 2;

const infiniteList = (current, list) => {
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
    const displayList = infiniteList(current, list);

    useEffect(() => {
        const fn = e => {
            if (e.code === 'Escape') onClose();
            if (e.code === 'ArrowLeft') onSetCurrent(displayList[lim - 1].id);
            if (e.code === 'ArrowRight') onSetCurrent(displayList[lim + 1].id);
        };

        window.document.body.addEventListener('keyup', fn);
        return () => window.document.body.removeEventListener('keyup', fn);

    }, [onClose, onSetCurrent, displayList]);

    return (
        <Portal>
        <div className={styles.container} onClick={onClose}>
            <PreviewImage image={list[current]} />
            <Controls current={lim} onNext={onNext} onPrev={onPrev} onSetCurrent={onSetCurrent} list={displayList} />
        </div>
        </Portal>
    );

}

export default Preview;
