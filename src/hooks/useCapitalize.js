export const useCapitalize = () => {
    const capitalize = word => {
        if (word == null) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return capitalize;
};
