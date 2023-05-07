export const listOptions = () => {
    let options = [];

    for(let i = 10; i <= 50; i++) {
        options.push(i.toString());
    }

    return options;
}