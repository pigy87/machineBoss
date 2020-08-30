const checkMillionDollarIdea = (instance) => {
    let totalValue = Number(instance.numWeeks) * Number(instance.weeklyRevenue);
    if (totalValue >= 1000000) {
        return 'It is a million dolars Idea!'
    } else {
        return "it is not a million dolars Idea!"
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;