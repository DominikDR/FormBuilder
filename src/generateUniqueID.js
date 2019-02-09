const generateUniqueID = () => {
    const ASCII_CODE_SMALL_A = 97;
    const ASCII_CODE_SMALL_Z = 122;
    const STRING_LENGTH = 1;
    let uniqueID = '';

    for (let i = 0; i < STRING_LENGTH; i++) {
        const randomNum = Math.random() * (ASCII_CODE_SMALL_Z - ASCII_CODE_SMALL_A) + ASCII_CODE_SMALL_A;
        const randomASCII = Math.ceil(randomNum);
        uniqueID += String.fromCharCode(randomASCII);
    }
    const RANDOM_NUM_LENGTH = 6;
    for (let i = 0; i < RANDOM_NUM_LENGTH; i++) {
        const randomNum = Math.floor(Math.random() * 10);
        uniqueID += randomNum;
    }
    return uniqueID;
};

export default generateUniqueID;
