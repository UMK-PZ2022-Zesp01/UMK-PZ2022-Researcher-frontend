const dictionary = {
    jan: 'stycznia',
    feb: 'lutego',
    mar: 'marca',
    apr: 'kwietnia',
    may: 'maja',
    jun: 'czerwca',
    jul: 'lipca',
    aug: 'sierpnia',
    sep: 'września',
    oct: 'października',
    nov: 'listopada',
    dec: 'grudnia',

    author: 'autor',
    poster: 'poster',
    title: 'tytuł badania',
    description: 'opis badania',

    'in-place': 'na miejscu',
    remote: 'zdalnie',

    gender: 'płeć',
    male: 'mężczyzna',
    female: 'kobieta',
    notgiven: 'nie podano',

    age: 'wiek',

    place: 'miejsce zamieszkania',
    village: 'wieś',
    citybelow50k: 'miasto do 50 000 mieszkańców',
    citybetween50kand150k: 'miasto od 50 000 do 150 000 mieszkańców',
    citybetween150kand500k: 'miasto od 150 000 do 500 000 mieszkańców',
    cityabove500k: 'miasto powyżej 500 000 mieszkańców',

    education: 'wykształcenie',
    primary: 'podstawowe',
    middle: 'średnie',
    vocational: 'zasadnicze zawodowe',
    college: 'wyższe',

    marital: 'stan cywilny',
    single: 'singiel(ka)',
    inrelationship: 'w związku',
    engaged: 'zaręczony(-a)',
    married: 'żonaty/zamężna',
    inseparation: 'w separacji',
    divorced: 'rozwiedziony(-a)',
    widowed: 'wdowiec/wdowa',

    cash: 'pieniądze',
    item: 'upominek',

    'other:': 'inne',
    other: 'inna',
};

export const useTranslate = () => {
    const translate = text => {
        if (typeof text === 'string') {
            const words = text.split(' ');
            const translateWord = word => {
                const tr = dictionary[word.toLowerCase()];
                return tr ? tr : word;
            };

            const translated = words.map(word => translateWord(word));
            return translated;
        }
        return '';
    };

    return translate;
};
