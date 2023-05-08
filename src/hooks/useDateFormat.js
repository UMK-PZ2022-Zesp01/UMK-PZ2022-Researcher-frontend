import { useTranslate } from './useTranslate';
import { useCapitalize } from './useCapitalize';

export const useDateFormat = (format = 'pl') => {
    const translate = useTranslate();
    const capitalize = useCapitalize();

    const toPolish = date => {
        const arrayDate = new Date(date).toDateString().split(' ');
        const day = arrayDate[2][0] === '0' ? arrayDate[2][1] : arrayDate[2];
        const month = translate(arrayDate[1]);
        const year = arrayDate[3];

        return `${day} ${month} ${year}`;
    };

    switch (format) {
        case 'pl':
            return toPolish;
        default:
            return toPolish;
    }
};
