class Population extends Array
{
    generations = 0;
    _finished = false;
    _mating_pool = [];
    _perfect_score = 1;
    _best = '';

    constructor(target, mutation_rate, size)
    {
        super(size);

        this._target = target;
        this._mutation_rate = mutation_rate;

        for(let i = 0; i < size; i++) {
            this[i] = new DNA(target.length);
        }

        this.calculateFitness();
    }

    calculateFitness()
    {
        this.forEach(dna => dna.calculateFitness(this._target));
    }

    naturalSelection()
    {
        this._mating_pool = [];
        const total_fitness = this.reduce((carry, dna) => carry + dna._fitness , 0);

        this.forEach((dna, index) => {
            if(dna._fitness != 0) {
                if(this._mating_pool.length === 0) {
                    this._mating_pool.push({
                        dna,
                        prob: dna._fitness / total_fitness
                    });
                } else {
                    this._mating_pool.push({
                        dna,
                        prob: Math.min(this._mating_pool.at(-1).prob + (dna._fitness / total_fitness), 1)
                    });
                }
            }
        });
    }

    generate()
    {
        this.forEach((dna, index) => {
            // const partner_a = this._mating_pool[Math.floor(Math.random() * this._mating_pool.length)];
            // const partner_b = this._mating_pool[Math.floor(Math.random() * this._mating_pool.length)];

            let random_pick = Math.random();
            const partner_a = this._mating_pool.find(function (area) {
                return area.prob >= random_pick;
            }).dna;

            random_pick = Math.random();
            const partner_b = this._mating_pool.find(function (area) {
                return area.prob >= random_pick;
            }).dna;

            const child = partner_a.crossover(partner_b);
            child.mutate(this._mutation_rate);

            this[index] = child;
        });

        this.generations++;
    }

    evaluate()
    {
        let max_fitness = 0;

        this.forEach((dna) => {
            if(dna._fitness > max_fitness) {
                this._best = getPhrase(dna);
                max_fitness = dna._fitness;
            }

            if(dna._fitness >= this._perfect_score) {
                this._finished = true;
            }
        });
    }

    getAverageFitness()
    {
        return this.reduce((carry, dna) => carry + dna._fitness , 0) / this.length;
    }

    isFinished()
    {
        return this._finished;
    }
}