export const useQuestion = () => {
        let arr = [];
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                arr.push({firstNumber: i, secondNumber: j});
            }
        }

        let shuffled = arr
                        .slice(1)
                        .map(value => ({ value, sort: Math.random() }))
                        .sort((a, b) => a.sort - b.sort)
                        .map(({ value }) => value)
    
        return shuffled;
}