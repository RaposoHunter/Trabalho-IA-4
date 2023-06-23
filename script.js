const max_generations = 3000;
const mutation_rate = 0.01;
const population_size = 200;
const population = new Population(max_generations, mutation_rate, population_size);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('statistics__total__population').innerHTML = population.length;
    document.getElementById('statistics__mutation__rate').innerHTML = (population.getMutationRate() * 100) + '%';

    const loop = setInterval(function () {
        population.naturalSelection();
        population.generate();
        population.calculateFitness();
        population.evaluate();
    
        document.getElementById('statistics__total__generations').innerHTML = population.generations;
        document.getElementById('statistics__average__fitness').innerHTML = population.getAverageFitness().toFixed(4);

        // document.querySelectorAll('.attempt').forEach(el => el.remove());

        // for(let i = 0; i < Math.min(population.length, 50); i++) {
        //     const attemp = document.createElement('span');
        //     attemp.className = 'attempt';
        //     attemp.innerHTML = getPharse(this.getBest())
        //     document.getElementById('right__container').appendChild(attemp);
        // }

        if(population.isFinished()) {
            console.log(population.getBest());
            clearInterval(loop);
        }
    }, 5);
});