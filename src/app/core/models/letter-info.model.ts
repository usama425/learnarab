export interface LetterInfo {
    meta: LetterInfoMeta;
    auther: string[];
    terms: string[];
}

interface LetterInfoMeta {
    arabic_letter: string;
    phonetic: string;
    long_vowel: object[];
    short_vowels: object[];
    writing_reperate: string;
    writing_beginning: string;
    writing_inbetween: string;
    writing_end: string;
    image: string;
    sound: string;
}