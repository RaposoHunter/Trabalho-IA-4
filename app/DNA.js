class DNA extends Array
{
    _fitness = 0;

    constructor(length)
    {
        super(length);

        for(let i = 0; i < length; i++) {
            this[i] = newChar();
        }
    }

    calculateFitness(target)
    {   
        this._fitness = this.reduce((carry, gene, index) => {
            if(target[index] === gene) return carry + 1;

            return carry;
        }, 0);

        this._fitness /= target.length;
        this._fitness = Math.pow(this._fitness, 4);
    }

    crossover(partner)
    {
        const child = new DNA(this.length);
        const midpoint = Math.floor(Math.random() * this.length);

        child.forEach((gene, index) => {
            child[index] = index > midpoint
                ? this[index]
                : partner[index];
        });

        return child;
    }

    mutate(mutation_rate)
    {
        this.forEach((gene, index) => {
            if(Math.random() < mutation_rate) {
                this[index] = newChar();
            }
        }); 

        return this;
    }
}
