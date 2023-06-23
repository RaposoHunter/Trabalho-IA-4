const target = 'A morte e como o vento esta sempre ao meu lado';
const mutation_rate = 0.01;
const population_size = 200;
const population = new Population(target, mutation_rate, population_size);

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('statistics__total__population').innerHTML = population.length;
    document.getElementById('statistics__mutation__rate').innerHTML = (population._mutation_rate * 100) + '%';
    
    const loop = setInterval(function () {
        population.naturalSelection();
        population.generate();
        population.calculateFitness();
        population.evaluate();
    
        document.getElementById('statistics__best__phrase').innerHTML = population._best;
        document.getElementById('statistics__total__generations').innerHTML = population.generations;
        document.getElementById('statistics__average__fitness').innerHTML = population.getAverageFitness().toFixed(4);

        document.querySelectorAll('.attempt').forEach(el => el.remove());

        for(let i = 0; i < Math.min(population.length, 50); i++) {
            const attemp = document.createElement('span');
            attemp.className = 'attempt';
            attemp.innerHTML = getPhrase(population[i]);
    
            document.getElementById('right__container').appendChild(attemp);
        }

        if(population.isFinished()) {
            clearInterval(loop);
        }
    }, 10)
});